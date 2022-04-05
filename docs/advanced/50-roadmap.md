---
title: Roadmap
---

This is still a nascent protocol and we just launched in a Beta phase, which means there'll be lots of learnings that will change how we think and evolve the protocol. We'll keep updating this document as we learn more.

:::tip
If you have any ideas or feedback on the future of the protocol, you can chat with the World ID team and other community members on [Discord](https://discord.gg/worldcoin).
:::

## Multiple assertions

We think that [Proof of Personhood](/docs/advanced/proof-of-personhood) will not be the only useful assertion that the World ID protocol can provide. There's multiple of other signals or assertions which would be helpful to share across the ecosystem, and particularly in the privacy-preserving way enabled by the underlying Semaphore protocol we use.

Consider for example the KYC (know your customer) process. A user could do the KYC process once and assert that they have done KYC to multiple projects. Further, this could potentially introduce a new standard where KYC information does not have to be shared by default with everyone, but only when there's a specific request from a government or other authorized entity.

An exciting consideration too is that Worldcoin doesn't need to backup all these different assertions. Similar to how Worldcoin asserts to Proof of Personhood by means of the orb, other projects could assert to other pieces of information (e.g. a government could assert that someone is a citizen of a given country, or a university that someone is an alumnus of their institution).

Some additional assertions we're particularly looking into including from Worldcoin itself are:

- **Unique device**. As we already validate device uniqueness to prevent fraud/abuse with the World ID protocol, we could share this signal on device uniqueness.
- **Physical location**. Verifying at an orb is a process that happens in the real world. This general location information (e.g. country and city) could prove useful for certain use cases (e.g. compliance).

## Batched ZKP submissions

Currently we have a sequencer implemented that assists with Merkle root calculations and ZKP submissions to the blockchain. The sequencer currently serves basic functionality, however we want to extend this to serve the purpose of submitting batched proofs to the blockchain in a way that saves gas for the entire protocol. Further, we hope that anyone can deploy their own sequencer to prevent potential censorship attacks.

## Integrations for mobile apps

The World ID protocol is platform agnostic on the frontend. However, we currently only have a [Javascript integration](/docs/js) to make it easier for anyone to quickly integrate World ID. We want to extend this facilities to other platforms, such as mobile apps.

## Multi-blockchain and multi-layer-2 support

Currently World ID operates on the Ethereum mainnet (aside from the [Test network](/docs/about/test-network)), however the protocol conceptually can operate in a multitude of different chains and layer 2s. We want to extend this support so projects operating in other chains can benefit from this new primitive as well as make the protocol more efficient and cost effective.
