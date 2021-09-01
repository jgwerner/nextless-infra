import { config } from "dotenv-flow";

config({
  default_node_env: "production"
});

import DynamoDBStack from "./DynamoDBStack";
import { App } from "@serverless-stack/resources";
import CognitoStack from "./CognitoStack";

export default function main(app: App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new DynamoDBStack(app, "dynamodb");

  new CognitoStack(app, "cognito");
}
