# Nextless.js Infra for SaaS 🚀

Nextless.js Infra is needed for setting up infrastructure on Cloud. It include code for automatically configuring AWS Cognito and DynamoDB without any manual intervention to your AWS account. The repository isn't needed for local development.

### Requirements

- Node.js and npm

### Deploy to production

Before deploying to production, you need to generate `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from your AWS account by following this tutorial: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#creating-aws-access-keys.

After generating your **API key** and **Secret**, you need to set up in your local machine with aws-cli: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#setup-with-the-aws-cli. You don't need to set up a `profile` if you have only one account or one AWS IAM user.

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
