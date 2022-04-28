---
title: Glossary
---

There are a few terms that are used all throughout the World ID protocol.

<div id="external-nullifier"></div>

### Action ID

The action ID sets a unique identifier for each action verified with World ID and helps guarantee uniqueness. **A single user will only be able to use a World ID proof for an action once.** Together with the identity nullifier (which is handled internally in the Worldcoin app) and signal, they form an opaque nonce that helps uniquely associate an identity with a specific action (without exposing any information on the identity).

**Each action must have a unique action ID**. A single app/project could have multiple actions if they are performing different actions for which they want to ensure human-uniqueness. Examples:

- candyApp airdrop 2022 could have a `candyApp-airdrop-2022` action ID.
- candyApp airdrop 2023 could have a `candyApp-airdrop-2023` action ID. Users who claimed `candyApp-airdrop-2022` will be able to claim `candyApp-airdrop-2023`, but not claim `candyApp-airdrop-2022` again.

Read more about the Semaphore protocol which World ID relies on in the [Semaphore withepaper](https://docs.zkproof.org/pages/standards/accepted-workshop3/proposal-semaphore.pdf).

:::note
On the Semaphore protocol the Action ID is called the _External nullifier_.
:::

### Signal

The signal is an arbitrary message. One of the main security claims of the Semaphore protocol (used in the foundation of World ID) is that users cannot broadcast two different signals for the same [action ID](#action-id).

The developer integrating World ID selects the signal to use. For most use cases, we **recommend using the end user's wallet address as the signal**. Another example of a signal: for a voting/survey app the signal could be the vote/answer to the question.

### Uniqueness hash

The uniqueness hash is a string generated together with the [ZKP](/docs/advanced/zero-knowledge-proofs) (by the Worldcoin app). The uniqueness hash is derived from the user's identity and the [action ID](#action-id) and is what ensures uniqueness. This generated hash should be stored and compared for uniqueness when new proofs are submitted. The same identity and [action ID](#action-id) pair will always generate the same uniqueness hash.

:::note
On the Semaphore protocol the uniqueness hash is called the _Nullifier hash_ (not to be confused with External nullifier).
:::

### Merkle root

The Merkle root is the hash of the top-level element of a Merkle tree. For the World ID protocol we use a Merkle tree to store the identity set and prove membership to the set. The Merkle root hash of the tree to which the user belongs to is required to prove the user belongs to the set of verified identities. Given the Merkle root changes every time a new identity is added or removed, multiple valid Merkle trees can exist. As a security precaution, the protocol only accepts recent trees (to protect leaking information about the user belonging to an older, smaller set).

Currently, the Worldcoin sequencer helps with the computation of the Merkle root for a given identity, and the Merkle root is transferred to the client app from the Worldcoin app.

### Actions (advanced)

For the context of World ID, an action can only be performed once by a single person. When a user receives a verification request for an action, they can only verify it once. This means the action determines the scope for which identity uniqueness is considered. For instance, a project doing an airdrop can have an action for this particular airdrop, and no single person will be able to claim it twice. If the project then decides to do a new airdrop, they can use a new action and every one who claimed the first action will be able to claim the second action, but not the first action again.

- Each action has its own set of _used_/_claimed_ identities, which is a set of [uniqueness hashes](#uniqueness-hash).
- An action is defined by a unique [action ID](#action-id).
