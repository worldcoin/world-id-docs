---
title: Non-crypto Projects
---

World ID introduces a new web3 primitive, however its use is not limited to web3 projects. There are multiple use cases for traditional web applications not on the blockchain (e.g. spam prevention, individual accounts creation, etc.). Integrating World ID with a traditional web project is not difficult, here are the main distinctions.

- Validation of ZKPs need to be implemented and executed on your own backend (as opposed to the blockchain).
- Backend must keep track of all the uniqueness hashes to guarantee uniqueness.

Currently we don't have implementation examples for traditional web applications, but we plan on adding a few soon for some common languages/frameworks. You can use the smart contract [examples](/docs/examples) as reference for how to implement ZKP validation on a different language.

:::note
If you want to improve the protocol's availability and help others use World ID, share your custom integration by opening an issue on [GitHub](https://github.com/worldcoin/world-id-docs).
:::

## Hosted World ID

:::caution
This is still a concept for the near future and we expect some changes to still be introduced.
:::

To make it easy for anyone with a traditional web/mobile application to use World ID, we're looking to introduce a hosted version of World ID. The idea of this concept is a centralized Worldcoin service that verifies proofs remotely and handles all the legwork of ZKP verification and uniqueness tracking. With a system like this, only a simple server-to-server integration would be needed so submit and validate proofs. Very similar to how captcha services work today.

If you're interested in this hosted World ID version, reach out on [Discord](https://discord.gg/worldcoin).
