import { App, Stack, StackProps } from "@serverless-stack/resources";
import { CfnOutput } from "@aws-cdk/core";
import { AttributeType, BillingMode, Table } from "@aws-cdk/aws-dynamodb";

export default class DynamoDBStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "Table", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
    });

    // Output values
    new CfnOutput(this, "TableName", {
      value: table.tableName,
      exportName: scope.logicalPrefixedName("TableName"),
    });

    new CfnOutput(this, "TableArn", {
      value: table.tableArn,
      exportName: scope.logicalPrefixedName("TableArn"),
    });
  }
}
