import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import SESStack from "./SESStack";

type IVerifySESEmailAddress = {
  emailAddress: string;
};

export default class VerifySESEmailAddress extends Construct {
  constructor(scope: SESStack, id: string, props: IVerifySESEmailAddress) {
    super(scope, id);

    new AwsCustomResource(this, 'VerifyEmailIdentity' + props.emailAddress, {
      onCreate: {
        service: 'SES',
        action: 'verifyEmailIdentity',
        parameters: {
          EmailAddress: props.emailAddress,
        },
        physicalResourceId: PhysicalResourceId.of('verify-' + props.emailAddress),
      },
      onDelete: {
        service: 'SES',
        action: 'deleteIdentity',
        parameters: {
          Identity: props.emailAddress,
        },
      },
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          actions: ['ses:VerifyEmailIdentity', 'ses:DeleteIdentity'],
          effect: Effect.ALLOW,
          // PolicySim says ses:SetActiveReceiptRuleSet does not allow specifying a resource, hence use '*'
          resources: ['*'],
        }),
      ])
    });
  }
}
