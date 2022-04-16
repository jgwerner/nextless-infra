import { Stack, App, StackProps } from "@serverless-stack/resources";
import { Env } from "./utils/Env";
import VerifySESEmailAddress from "./VerifySESEmailAddress";

export default class SESStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new VerifySESEmailAddress(this, 'SesEmailVerification', {
      emailAddress: Env.getValue('SENDER_EMAIL_ADDRESS')
    });
  }
}
