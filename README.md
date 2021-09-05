# Nextless.js Infra for SaaS 🚀

Nextless.js Infra is needed for setting up infrastructure on Cloud. It include code for automatically configuring AWS Cognito and DynamoDB without any manual intervention to your AWS account. The repository isn't needed for local development.

The Nextless-infra handles the long-living/long-term/slowly-changing infrastructure. In the opposite, Nextless-backend focuses on often-updated business logic. By separating into 2 repos, it drastically cuts down the deployment time.

### Requirements

- Node.js and npm

### Deploy to production

Before deploying to production, you need to generate `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from your AWS account by following this step:

- Login to your AWS account and go to the Identity & Access Management (IAM) page.
- Click on Users and then Add user. Enter a name in the first field to remind you this User is related to the Serverless Framework, like serverless-admin (you can customize the name). Enable Programmatic access by clicking the checkbox. Click Next to go through to the Permissions page. Click on Attach existing policies directly. Search for and select AdministratorAccess then click Next: Review. Check to make sure everything looks good and click Create user.
- View and copy the API Key & Secret to a temporary place. You'll need it in the next step.

(quote from https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#creating-aws-access-keys)

After generating your **API key** and **Secret**, you need to set up in your local machine with aws-cli:

- Install `aws-cli` command line by following this article https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
- Then, run the following command:

```
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: ENTER
```

(quote from https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#setup-with-the-aws-cli). You don't need to set up a `profile` if you have only one account or one AWS IAM user.

You can deploy to production with the following command:

```
npm run deploy
```

(optional) You can try Seed.run for an automatic backend deployment integrated to your GitHub workflow.

### Customization

You can easily configure Nextless by making a search in the whole project with `FIXME:` for making quick customization.

You have access to the whole code source if you need further customization. The provided code is only example for you to start your SaaS products. The sky is the limit 🚀.

### Going further with third party tool (optional)

- Add Seed.run for automatic deployment integrated to your GitHub workflow.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)
