import { config } from "dotenv-flow";

config({
  default_node_env: "production",
  silent: true,
});

import type { SSTConfig } from "sst";
import CognitoStack from "./lib/CognitoStack";
import SESStack from "./lib/SESStack";
import DynamoDBStack from './lib/DynamoDBStack';
import { Env } from "./lib/utils/Env";

export default {
  config() {
    return {
      name: `${Env.getValue('PROJECT_NAME')}-infra`,
      region: Env.getValue('REGION'),
    }
  },

  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64",
    });

    new DynamoDBStack(app, 'Database');

    new CognitoStack(app, "Cognito");

    new SESStack(app, "SES");
  },
} satisfies SSTConfig;
