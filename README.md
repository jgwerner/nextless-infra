# Nextless.js Infra for SaaS 🚀

Nextless.js Infra is needed for setting up infrastructure on Cloud. It include code for automatically configuring AWS Cognito and DynamoDB without any manual intervention to your AWS account. The repository isn't needed for local development.

The Nextless-infra handles the long-living/long-term/slowly-changing infrastructure. In the opposite, Nextless-backend focuses on often-updated business logic. By separating into 2 repos, it drastically cuts down the deployment time.

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment after cloning the project:

```
cd my-project-name-infra
npm install
```

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

For your information, you don't need to customize the `sst.json` file for one project. But, when you have multiple projects, it'll have name collision. So, you need to update the name in `sst.json` file by choosing a new name instead `nextless`. And, don't forget to append the '-infra' at the end of the name.

### Going further with third party tool (optional)

- Add Seed.run for automatic deployment integrated to your GitHub workflow.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)
