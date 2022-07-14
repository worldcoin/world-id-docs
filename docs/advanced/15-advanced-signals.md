---
title: Advanced signals
---

:::tip
Advanced signals are useful **mainly for web3 on-chain applications**. For Cloud-based applications it's easier to do some simple encoding yourself. For instance, if you want to include a User ID and Team ID as the signal, you could do something like: `{userId}-{teamId}` or `JSON.stringify({ userId, teamId })` and pass that as the signal.
:::

[Signals](/docs/about/glossary#signal) are a powerful security feature of the ZKPs World ID uses. Usually the signal is just a simple string message. Under the hood, this string is hashed and encoded so the Worldcoin app can generate a ZKP that can be shared with the World ID smart contracts. However sometimes a simple string is not enough. Given the limitation of string manipulation in smart contracts, we offer this option so your signal can become any arbitrary number of parameters.

## Your own advanced signal

Let's say you want to create an action that lets you vote on a proposal and indicate another address to receive an NFT that proves your vote. You should include both parameters (the vote, and the address) as part of the signal to prevent manipulation. Follow these steps:

1. After defining your signal, you'll need to hash it using `keccak256`, be sure to use the proper parameter types.

   ```typescript
   import { keccak256 } from "@ethersproject/solidity";
   const signalHash = keccak256(
     ["uint8", "address"],
     [userVote, nftRecipientAddress]
   );
   ```

   As you can see above, you can encode any number of parameters and any type of parameters as your signal.

2. After hashing you'll need to right shift the hash 8 bits <span className="text--muted">(to bring it into the polynomial field we use for the ZKP, all proofs use `mod p`, with p being [this number](https://github.com/worldcoin/semaphore-rs/blob/fca8183829491284fc160a5b0a7765698a9f39ed/src/field.rs#L11)).</span>

   ```typescript
   const signal = BigInt(signalHash) >> BigInt(8);
   ```

3. You can then pass this manually hashed and encoded signal to the JS widget and both the widget and the app will process it raw. **Remember to set `advanced_use_raw_signal` to `true`.**

   ```typescript
   worldID.update({
     signal,
     advanced_use_raw_signal: true,
   });
   ```

4. On your smart contract you'll need to hash and encode the signal in the same way.

   ```solidity
   /// uint8 userVote is an input param of the function
   /// address nftRecipientAddress is an input param of the function
   worldId.verifyProof(
       root,
       groupId,
       abi.encodePacked(userVote, nftRecipientAddress).hashToField(),
       nullifierHash,
       abi.encodePacked(ACTION_ID).hashToField(),
       proof
   );
   ```

## Advanced Action ID

The same functionality available for advanced signals can be used for Action IDs. While we don't recommend it's usage right now (as you won't be able to fully customize the user's experience in the Worldcoin app), you can do so by following the same steps as above.
