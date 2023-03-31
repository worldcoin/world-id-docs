<img src="/public/images/shared-readme/readme-header.png" alt="" />

# Worldcoin Technical Docs

This repository contains the technical documentation for the Worldcoin SDK and the World ID Protocol.

<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->
<!-- The contents of this file are inserted to all World ID repositories to provide general context on World ID. -->

## <img align="left" width="28" height="28" src="/public/images/shared-readme/readme-world-id.png" alt="" style="margin-right: 0; padding-right: 4px;" /> About World ID

World ID is the privacy-first identity protocol that brings global proof of personhood to the internet. More on World ID in the [announcement blog post](https://worldcoin.org/blog/announcements/introducing-world-id-and-sdk).

World ID lets you seamlessly integrate authentication into your app that verifies accounts belong to real persons through [Sign in with Worldcoin](https://docs.worldcoin.org/id/sign-in). For additional flexibility and cases where you need extreme privacy, [Anonymous Actions](https://docs.worldcoin.org/id/anonymous-actions) lets you verify users in a way that cannot be tracked across verifications.

## 📄 Documentation

All the technical docs for the Wordcoin SDK, World ID Protocol, examples, guides can be found at https://docs.worldcoin.org/.

<a href="https://worldcoin.org">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: light)" srcset="worldcoin-logo.svg" height="48" />
      <source media="(prefers-color-scheme: dark)" srcset="worldcoin-logo-white.svg" height="48" />
      <img />
    </picture>
  </p>
</a>

<!-- WORLD-ID-SHARED-README-TAG:END -->

## 🧑‍💻 Developing locally

To develop locally and contribute to these docs, you can follow these steps after cloning the repo.

-   Activate required Node version (18.x)

    ```
    nvm use 18 # only if you are using nvm
    ```

-   Install dependencies
    ```bash
    pnpm install
    ```
-   Run locally
    ```bash
    pnpm start
    ```
-   Open browser at `http://localhost:3000`
-   To build the production bundle you can simply run.
    ```bash
    pnpm build
    ```

## ✨ Contributors

Thanks to all [the contributors](CONTRIBUTING.md) who have made the Worldcoin SDK possible!
