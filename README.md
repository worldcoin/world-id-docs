<a href="https://world.org/world-id">
  <img src="/public/images/shared-readme/readme-header.png" alt="" />
</a>

# World Documentation

This repository contains the technical documentation for the World SDK and the World ID Protocol.

# World ID

## <img align="left" width="28" height="28" src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/readme-world-id.png" alt="" style="margin-right: 0; padding-right: 4px;" /> About World ID

World ID is the privacy-first identity protocol that brings global proof of personhood to the internet. More on World ID in the [announcement blog post](https://world.org/blog/announcements/introducing-world-id-and-sdk).

World ID lets you seamlessly integrate authentication into your app that verifies accounts belong to real persons through [Sign in with World ID](https://docs.world.org/world-id/id/sign-in). For additional flexibility and cases where you need extreme privacy, [Incognito Actions]docs.world.org/world-id/idld.org/id/incognito-actions) lets you verify users in a way that cannot be tracked across verifications.

Follow the [Quick Start](https://docs.world.org/world-id/) guide for the easiest way to get started.

## Mini Apps

Mini apps enable third-party developers to create native-like applications within World App. We currently support World ID, Payments, and Sign in with Ethereum. Building a mini app will provide access to our rapidly growing user network and monetization opportunities via WLD and USDC.

### How it Works

Mini Apps work by sending [Commands](http://docs.world.org/mini-apps/quick-start/commands) via the MiniKit SDK to World App, and listening for [Responses](http://docs.world.org/mini-apps/quick-start/responses) passed back.

To make it easy to build mini apps, we have released the [MiniKit-JS SDK](https://www.npmjs.com/package/@worldcoin/minikit-js).

## World Chain

World Chain is a blockchain for humans. World chain offers several unique primitives:

-   Free gas fees for all verified humans
-   Native mobile distribution to all World App users through mini-apps
-   Simplified crypto transaction through mini apps
-   Sybil resistance for developers via World ID
-   Airdrop of WLD tokens to all verified humans

These primitives enable World Chain builders to build never before possible applications and reach a global audience.

World Chain is built on the [Superchain](https://docs.optimism.io/stack/explainer).

## 📄 Documentation

All the technical docs for the World SDK, World ID Protocol, World Chain, Mini Apps and their examples, guides can be found at <https://docs.world.org/>.

<a href="https://docs.world.org">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-dark.png" height="50px" />
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

## 🧑‍💻 Developing locally

To develop locally and contribute to these docs, you can follow these steps after cloning the repo.

-   Activate required Node version (LTS 18)

```bash
nvm use
```

-   Install dependencies

```bash
pnpm install
```

-   Run locally

```bash
pnpm dev
```

-   Open browser at `http://localhost:3000`
-   To build the production bundle you can simply run.

```bash
pnpm build
```

## ✨ Contributors

Thanks to all [the contributors](CONTRIBUTING.md) who have made the World SDK possible!

<p align="right"> Powered by
  <a href="https://world.org">
    <picture align="right">
      <source media="(prefers-color-scheme: light)" srcset="public/world-logo.svg" height="24" />
      <source media="(prefers-color-scheme: dark)" srcset="public/world-logo-white.svg" height="24" />
      <img />
    </picture>
  </a>
</p>
