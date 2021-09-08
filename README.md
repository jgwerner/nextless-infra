# Nextless.js Infra for SaaS 🚀

Nextless.js Infra is needed for setting up infrastructure on Cloud. It include code for automatically configuring AWS Cognito and DynamoDB without any manual intervention to your AWS account. The repository isn't needed for local development.

The Nextless-infra handles the long-living/long-term/slowly-changing infrastructure. In the opposite, Nextless-backend focuses on often-updated business logic. By separating into 2 repos, it drastically cuts down the deployment time.

### Requirements

- Node.js and npm

### Deploy to production

If you deploy for the first time, please checkout [this guide](https://github.com/Nextlessjs/Quick-Start/blob/main/PRODUCTION_DEPLOYMENT.md).

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
