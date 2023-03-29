import { Env } from "./utils/Env";
import VerifySESEmailAddress from "./VerifySESEmailAddress";
import { App, Stack } from "sst/constructs";

export default class SESStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    new VerifySESEmailAddress(this, "SesEmailVerification", {
      emailAddress: Env.getValue("SENDER_EMAIL_ADDRESS"),
    });
  }
}
