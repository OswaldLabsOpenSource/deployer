# ☁️ Deployer

[![GitHub](https://img.shields.io/github/license/OswaldLabsOpenSource/deployer.svg)](https://github.com/OswaldLabsOpenSource/deployer/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/OswaldLabsOpenSource/deployer.svg)](https://snyk.io/test/github/OswaldLabsOpenSource/deployer)
[![Oswald Labs Platform](https://img.shields.io/badge/oswald%20labs-platform-brightgreen.svg)](https://oswaldlabs.com/platform/)

This tools helps us deploy applications to our servers.

## ⭐ How it works

As part of a CI pipeline, the Deployer webhook is called:

```bash
curl "https://deployer.oswaldlabs.com/platform/GENERATED_PASSWORD"
```

Here, `GENERATED_PASSWORD` is replaced with an environment variable which has a deployment key.

Similarly, other services can be deployed, based on the [deployer.yml](https://github.com/OswaldLabsOpenSource/deployer/blob/master/deployer.yml) file.

## 🛠️ Development

Install dependencies:

```bash
yarn
```

Compile Typescript to CommonJS before running the server:

```bash
yarn build
```

Run local server:

```bash
yarn start
```

## 📝 License

MIT
