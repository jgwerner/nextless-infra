import { Construct } from "@aws-cdk/core";
import {
  Role,
  FederatedPrincipal,
  PolicyStatement,
  Effect,
} from "@aws-cdk/aws-iam";
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
} from "@aws-cdk/aws-cognito";
import CognitoStack from "./CognitoStack";

type ICognitoAuthRole = {
  identityPool: CfnIdentityPool;
};

export default class CognitoAuthRole extends Construct {
  private role: Role;

  constructor(scope: CognitoStack, id: string, props: ICognitoAuthRole) {
    super(scope, id);

    this.role = new Role(this, "CognitoDefaultAuthenticatedRole", {
      assumedBy: new FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": props.identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
    });

    this.role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "mobileanalytics:PutEvents",
          "cognito-sync:*",
          "cognito-identity:*",
        ],
        resources: ["*"],
      })
    );

    new CfnIdentityPoolRoleAttachment(this, "IdentityPoolRoleAttachment", {
      identityPoolId: props.identityPool.ref,
      roles: { authenticated: this.role.roleArn },
    });
  }

  getRole(): Role {
    return this.role;
  }
}
