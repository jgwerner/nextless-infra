import { CfnOutput } from "@aws-cdk/core";
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
} from "@aws-cdk/aws-cognito";
import CognitoAuthRole from "./CognitoAuthRole";
import { Env } from "./utils/Env";

export default class CognitoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: false,
      signInAliases: { email: true },
      signInCaseSensitive: false,
      userPoolName: scope.logicalPrefixedName("userpool"),
    });

    userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: Env.getValue("USER_POOL_DOMAIN"),
      },
    });

    const identityGoogle = new UserPoolIdentityProviderGoogle(
      this,
      "UserPoolIdentityGoogle",
      {
        clientId: Env.getValue("GOOGLE_CLIENT_ID"),
        clientSecret: Env.getValue("GOOGLE_CLIENT_SECRET"),
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
        clientId: Env.getValue("FACEBOOK_CLIENT_ID"),
        clientSecret: Env.getValue("FACEBOOK_CLIENT_SECRET"),
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
        callbackUrls: [`${Env.getValue("WEB_DOMAIN")}/dashboard`],
        logoutUrls: [`${Env.getValue("WEB_DOMAIN")}`],
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.GOOGLE,
        UserPoolClientIdentityProvider.FACEBOOK,
      ],
      preventUserExistenceErrors: true,
    });

    userPoolClient.node.addDependency(identityGoogle);
    userPoolClient.node.addDependency(identityFacebook);

    const identityPool = new CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false, // Don't allow unathenticated users
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
