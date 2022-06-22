---
title: Proof of Personhood
---

The most critical piece of the World ID is Proof of Personhood. PoP is a mechanism with which any human can prove they are a unique alive human. World ID is the first and only scalable and privacy-preserving approach to solving this problem.

## Why World ID?

World ID started out of Worldcoin's mission of creating a new, collectively owned global currency that was distributed fairly to as many people as possible. We decided to solve this problem using biometrics and after realizing no device on the market was able to work at a 1B+ scale, we created the Orb (more on [Worldcoin](https://worldcoin.org/)).

The same problem we are solving for Worldcoin can be valuable for a myriad of other use cases and projects.

## Why is Proof of Personhood important?

Proof of Personhood will be a critical piece of the web3 ecosystem. It opens a whole new realm of possibilities of what can be accomplished with web3 applications. In particular, it can be the biggest effort to democratize web3.

In a trustless decentralized ecosystem as web3, proving you are a human becomes increasingly important. Multiple forms of fraud, abuse and misuse can thrive without Proof of Personhood. Consider for instance a democratic DAO that makes decisions based on member votes. I can simply create multiple wallets that are members of the DAO and undermine the democratic effort. The main problem Proof of Personhood tries to overcome is [Sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack).

There are multiple applications for which Proof of Personhood can be useful. More details can be found in the [Use cases](/docs/#use-cases) section.

## Approaches to Proof of Personhood

There are other approaches to Proof of Personhood, but following our mission of creating the most well distributed token and our goal of reaching at least 1B humans, we found no solution out there would scale beyond tens of millions of humans.

### Government IDs

Using government IDs ends up bringing a centralized solution to a decentralized ecosystem, you have to trust each government (which can be anything from a federal government to a local one) is a good actor, and a single bad actor could compromise the entire system.

Furthermore there are so many different types of IDs, the system would quickly become really hard to sustain. Just using passports would be restrictive and limit accessibility for a lot of people. Consider a well developed country as the US, according to the Secretary of State, only about [43.7%](https://travel.state.gov/content/travel/en/about-us/reports-and-statistics.html) of Americans had a valid passport in 2021.

And all of this doesn't even account for edge cases such as dual nationals, countries or territories with limited international recognition, etc.

### Fingerprints and other biometrics

We explored using other biometrics, such as fingerprints, palm prints and even DNA sequencing. We needed to optimize for several different factors in order to maximize exposure and accessibility for 1B+ people: privacy preservation, non-invasive techniques, feasibility of large-scale operation, and minimization of error rates.

Some techniques did not provide enough entropy to guarantee uniqueness at scale, 100M+ people (e.g. fingerprints or face recognition). It's important to remember that contrary to most fingerprint use cases (e.g. border crossing, security, etc.) are intended for authentication, meaning your seeking to validate some fingerprint to one in a particular set. Contrary to this, with World ID we have to a validate that some fingerprint is completely different to everyone elses'.

We also discarded DNA sequencing for lack of privacy preservation, scale feasibility, and general invasiveness of the procedure.

### FaceID, Phone Cameras, etc.

We explored using FaceID or other similar commercial and existing technologies to do uniqueness recognition, but these technologies proved unable to capture enough entropy required to guarantee a low enough error rate that permitted signing up hundreds of millions of users.

### Video Submissions

Another approach that is currently live is public submission of videos where you can clearly see the face of each person. There's an economic incentive to spot bad actors (e.g. repeated submissions, fraud through AI, ...) and you have to be vouched for by existing community members. In particular, the key issue we found with this approach is the lack of privacy. You have to make your face public.

## The Orb: Iris Image

World ID uses iris imaging to identify someone is a unique human. The orb which is responsible for this verification is a custom-built device with multiple sensors which take pictures of the iris in a way that later allows those pictures to be encoding into an Iris code (a numeric representation of the iris). The multitude of sensors in the orb are used to remove uncertainties and enable the required pictures to be as expected (i.e. positioning lenses correctly, ensuring correct pupil dilation, identifying shadows, eyelashes or other obstructions, etc.) and for fraud prevention (e.g. ensuring it's a human in front of the orb, aliveness, etc.)

<img src="/img/iris-capture-diagram.svg" alt="Iris capture diagram" />

### The verification process

The orb process lasts for about 1 minute. The user first creates a Semaphore identity in their Worldcoin app and shares a public identity commitment with the orb using a QR code.

- After the orb scans the QR code, the process of taking the required pictures starts. The orb provides audible feedback to the user in order to position themselves optimally while the pictures are taken and the pictures are analyzed in real-time.
- When the iris picture is taken, the orb encodes the picture into an IrisCode, and then signs the verification request using a trusted unique private key.
- The identity is then submitted to the Semaphore instance on the blockchain, using a sequencer in between to batch proofs.

When the identity is submitted to the blockchain, no PII is transferred. The blockchain only knows there's a new identity, verified by an orb, that should be added to the set (without any context on the particular identity). The verified user can prove they are in the verified set using a [Zero-knowledge proof](/docs/advanced/zero-knowledge-proofs) but they don't have to reveal anything about their identity; not even when claiming a free share of Worldcoin or any other airdrop.

As the orb continues to develop and we gather more data from field tests, we're improving the iris recognition process, as well as fraud prevention mechanisms with the use of neural networks. To build these neural networks we require an initial set of irises we can use for training. When doing the orb verification process through the Worldcoin app, the user has the option to opt-out of this anonymous store of their iris's images. We expect that as the system scales, this image storage will no longer be required.

The World ID Proof of Personhood protocol is meant to be decentralized. The identity trees will be kept public and decentralized on the blockchain, ZKP validation can also be done on-chain, and anyone could introduce their own sequencer for batching proofs. The only point of trust for the protocol is the orbs. It's a point of trust, because we're trusting the orb did all the required checks and validations before verifying and submitting an identity to the Semaphore instance. This is why the orb is equipped with a multitude of systems to prevent tampering or abuse. We expect to open source most of the orb components in the next several months.

### Introducing new crypto primitive

With the creation of the Worldcoin orb, we hope to bring a new Proof of Personhood primitive to the web3 ecosystem. We believe this is the only system today capable of handling billions of users in scale in a reliable way. World ID is already being used in the Worldcoin app to airdrop WLD shares as well as shares of other tokens, but this is just the beginning. There are a multitude of applications now enabled by the Proof of Personhood primitive.
