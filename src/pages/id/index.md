# Overview

World ID is a privacy-first identity protocol that brings global proof of personhood to the internet. It allows verified users to prove they are a unique person, and optionally prove they are performing a given action only once. This is accomplished with a combination of blockchain technology and [Zero-knowledge Proofs](/advanced/zero-knowledge-proofs).

## How does it work?

A user's World ID lives in their device, and only in their device. The user installs a compatible identity wallet (such as [World App](https://worldcoin.org/download)). A unique and random private key is generated on-device, where it is securely stored. Identity wallets may incorporate their own recovery mechanisms, however Protocol-level recovery is being implemented soon.

From the user's private key, a public _identity commitment_ is generated and published on-chain (currently Polygon), which acts at the source of truth for the protocol. An identity commitment is analogous to a public key in an asymmetric key-pair, or a wallet address, but in the World ID protocol this value is not broadly shared.The private key is used as input to each World ID verification, specifically as part of the [ZKP](/advanced/zero-knowledge-proofs).

The user's wallet (e.g. World App) generates a ZKP for every verification a user makes. Verifications cannot be linked across applications or actions, which means that the user's privacy is cryptographically protected.

<!-- ![TODO] Diagram -->

After a user verifies, a _nullifier hash_ is returned to the application. The nullifier hash is the user's unique identifier for the application (and the action, if using [Anonymous Actions](/id/anonymous-actions)). Nullifiers are unique to the application, and cannot be linked to other nullifiers from the same person, even resistant to colluding applications.

## Developer Portal

It is highly recommended to first register any applications in the [Developer Portal](https://developer.worldcoin.org). The portal provides a simple UI to manage applications, actions, and user metrics. The portal is the easiest way to verify the proofs returned by [IDKit](/idkit), and performs much of the on-chain lookups for the integrating application.

Additionally, those familiar with OpenID Connect (OIDC) will be able to use World ID as their [Identity Provider](/id/sign-in). We support all of the most common integrations, such as Auth0 and Cloudflare.

## Proof of personhood

The protocol enables many usecases for these new types of credentials. A user's World ID, once biometrically verified (such as by the Orb), can be used to assert to any application that the holder is human with the highest degree of accuracy. All verified user's must be unique, thanks to the advanced imaging methods used by the [Orb hardware](https://github.com/worldcoin/orb-hardware), and in the future other hardware devices which the protocol makes utilizes.
