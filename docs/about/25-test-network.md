---
title: Test network
---

:::tip
Go to [https://mock-app.id.worldcoin.org](https://mock-app.id.worldcoin.org) for a hosted version of the Worldcoin Mock App.
:::

To make sure the World ID flow can be fully tested at any time, we created a _Test network_ which doesn't require physically going to an orb to do the identity verification. If you have verified your identity at an orb, you will be able to try the full World ID flow soon. We're working on integrating World ID on the Worldcoin app.

The test network is basically an isolated Semaphore instance where anyone can submit "verified identities" without going to an orb, and anyone can verify ZKPs on-chain. The staging network can be used through our sequencer at this endpoint, `https://signup.stage-crypto.worldcoin.dev`.

The test network is currently available through the [mockWLD app](https://github.com/worldcoin/world-id-mock-app). The mockWLD app simulates the behavior related to World ID that would normally pertain to the Worldcoin app.

## Using test network on-chain

A critical piece of using the test network is making sure your smart contract connects to the test Semaphore network when verifying the ZKPs. Otherwise, you will get an error as the identity from the test network will not be registered in the list of verified identities. To use the staging network just make sure to point your smart contract to our Semaphore instance contract. See our Airdrop [example](/examples) for more details on this.

```
0x505Fd4741F00850024FBD3926ebECfB4c675A9fe
```

## Identity generation

When you use the mockWLD app you are required to generate or load a World ID (Semaphore) identity first. You can either generate a temporary identity which is stored on `localStorage` and persisted until you log out or clear your browser storage, or generate an identity with any ETH wallet for stronger persistence.

When you generate an identity with an external wallet, we use your wallet to generate the seed entropy for your identity (through a signature request). This means, if you ever use the same wallet again on the mockWLD app, the same World ID identity will be fetched, which can help with persistence and working across devices. **Your wallet's address or private key are never exposed to the app.**

## Identity verification

Generating an identity is not enough to use World ID. You also need to verify the identity. This is the equivalent of going to an orb and doing the [Proof of personhood](/docs/advanced/proof-of-personhood). For the mock version, we created a **faucet** where you can simply add your identity to the list of "verified identities" which can be later used to sign and verify ZKPs.

:::note
The faucet can be accessed directly from the mockWLD app.
:::

:::caution
Please mind that identities verified with the faucet will **only be valid for ~1 hour**. If you want to keep using your identity simply add it again with the faucet.
:::

## Chain test network

We have a couple of [Examples](/examples) deployed on test networks on-chain to make it easy to test World ID flows end-to-end. All of our examples are deployed on Polygon's [Mumbai-Testnet](https://docs.polygon.technology/docs/develop/network-details/network/). This testnet makes it easy to interact with World ID and has very short contract execution times so you can test and debug quickly. To access this network, we recommend using a [MetaMask](https://metamask.io) wallet and configuring as follows (both mobile and desktop work fine):

1. Go to Settings -> Networks.
2. Click on "Add network" and set the following parameters.
   1. Network Name: **Matic Mumbai**
   2. RPC URL: `https://rpc-mumbai.maticvigil.com` or `https://rpc-mumbai.matic.today` or `https://matic-mumbai.chainstacklabs.com`
   3. Chain ID: `80001`
   4. Symbol: `MATIC`
   5. Block Explorer URL: `https://mumbai.polygonscan.com/`
3. After adding your network and switching to it, copy the wallet address.
4. Go to a Mumbai Faucet, for example [https://faucet.polygon.technology](https://faucet.polygon.technology) and get some `MATIC` on your wallet.
5. Done! You can now use any example to test World ID, try [https://example.id.worldcoin.org](https://example.id.worldcoin.org).
