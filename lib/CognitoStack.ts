import { CfnOutput } from "aws-cdk-lib";
import { App, Stack, StackProps } from "@serverless-stack/resources";
import {
  UserPool,
  UserPoolClient,
  CfnIdentityPool,
  UserPoolIdentityProviderGoogle,
  UserPoolIdentityProviderFacebook,
  UserPoolClientIdentityProvider,
  ProviderAttribute,
  OAuthScope,
  Mfa,
} from "aws-cdk-lib/aws-cognito";
import CognitoAuthRole from "./CognitoAuthRole";
import { Env } from "./utils/Env";

export default class CognitoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: "Your 6-digit verification code",
        emailBody: "Hi there,<br /><br />This is your verification code:<br /><br />{####}<br /><br />If you believe you have received this email by mistake, feel free to ignore it.<br /><br />Thanks for your time."
      },
      signInAliases: { email: true },
      signInCaseSensitive: false,
      userPoolName: scope.logicalPrefixedName("userpool"),
      mfa: Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: false, // Arbitrary disabling SMS mfa authentication
        otp: true,
      },
    });

    userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: Env.getValue("USER_POOL_DOMAIN"),
      },
    });

    // FIXME: We only support Google and Facebook in the example Todo app.
    // If you want to use Google AND Facebook, you don't need to do anything.
    // But, you can add more identity provider like Apple or Amazon.
    // Or, you can remove some identityProvider if you don't want to support it.
    const identityGoogle = new UserPoolIdentityProviderGoogle(
      this,
      "UserPoolIdentityGoogle",
      {
        clientId: Env.getValue("GOOGLE_CLIENT_ID"), // The value will automatically retrieve from the environment variables.
        clientSecret: Env.getValue("GOOGLE_CLIENT_SECRET"), // The value will automatically retrieve from the environment variables.
        userPool: userPool,
        scopes: ["profile", "email", "openid"],
        attributeMapping: {
          email: ProviderAttribute.GOOGLE_EMAIL,
        },
      }
    );

    const identityFacebook = new UserPoolIdentityProviderFacebook(
      this,
      "UserPoolIdentityFacebook",
      {
        clientId: Env.getValue("FACEBOOK_CLIENT_ID"), // The value will automatically retrieve from the environment variables.
        clientSecret: Env.getValue("FACEBOOK_CLIENT_SECRET"), // The value will automatically retrieve from the environment variables.
        userPool: userPool,
        scopes: ["email", "public_profile"],
        attributeMapping: {
          email: ProviderAttribute.FACEBOOK_EMAIL,
        },
      }
    );

    const userPoolClient = new UserPoolClient(this, "UserPoolClient", {
      userPool,
      generateSecret: false, // Don't need to generate secret for web app running on browsers
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          OAuthScope.OPENID,
          OAuthScope.PROFILE,
          OAuthScope.COGNITO_ADMIN,
        ],
        callbackUrls: [`${Env.getValue("FRONTEND_DOMAIN_URL")}/dashboard/`],
        logoutUrls: [`${Env.getValue("FRONTEND_DOMAIN_URL")}`],
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.GOOGLE, // FIXME: Please don't forget to update this list based on the identity provide you want to support.
        UserPoolClientIdentityProvider.FACEBOOK,
      ],
      preventUserExistenceErrors: true,
    });

    userPoolClient.node.addDependency(identityGoogle);
    userPoolClient.node.addDependency(identityFacebook);

    const identityPool = new CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false, // Don't allow unauthenticated users
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
      identityPoolName: scope.logicalPrefixedName("identitypool"),
    });

    const authenticatedRole = new CognitoAuthRole(this, "CognitoAuthRole", {
      identityPool,
    });

    // Export values
    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, "IdentityPoolId", {
      value: identityPool.ref,
    });

    new CfnOutput(this, "AuthenticatedRoleName", {
      value: authenticatedRole.getRole().roleName,
      exportName: scope.logicalPrefixedName("CognitoAuthRole"),
    });
  }
}
