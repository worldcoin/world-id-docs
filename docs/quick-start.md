---
sidebar_position: 5
title: Quick start
---

**Fastest way to get rolling with World ID!**

This tutorial assumes you already have a dapp and smart contract which perform some action that you want to protect with Proof of personhood. Of course, if you're interested in just testing World ID you can create a mock dapp and smart contract, or you can simply fork our sample from the JS integration on [GitHub](https://github.com/worldcoin/world-id-js) or from our [Examples](/docs/examples).

1.  Include the [Javascript integration](/docs/js/) in your dapp.

    ```bash
    npm install @worldcoin/id
    # or
    yarn add @worldcoin/id
    ```

2.  Add a `div` to mount World ID, and later initialize. You'll want to do this on the screen where the user executes the protected action (e.g. before they click "Claim airdrop" or "Vote on X"). For testing purposes, you can just use the [External nullifier](/docs/about/glossary#external-nullifier) below, but we recommend you [create your own](/docs/js/reference#encoding-helper).

    :::tip
    You'll want to enable World ID **after the user has logged in**, so you can use their wallet address as the [Proof signal](/docs/about/glossary#signal).
    :::

    ```html
    <div id="world-id-container"></div>
    ```

    Now initialize World ID from your JS code.

    ```js
    import worldID from "@worldcoin/id";
    worldID.init("world-id-container", {
      enableTelemetry: true,
      externalNullifier:
        "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001063616e64794170702d61697264726f7000000000000000000000000000000000",
      proofSignal: userWalletAddress, // <- Fill in with the user's wallet address here
    });
    ```

3.  On document load, enable the package and listen for the verification results.

    ```js
    document.addEventListener("DOMContentLoaded", async function () {
      try {
        const result = await worldID.enable();
        console.log("World ID verified succesfully:", result); // <- Pass this result to your wallet transaction
      } catch (failure) {
        console.warn("World ID verification failed:", failure);
        // Re-activate here so your end user can try again
      }
    });
    ```

4.  Update your action smart contract, using our [Examples](/docs/examples) as a starting point. Goal is to **verify the ZKP before executing the relevant action**. You will verify both the validity of the ZKP as well as the uniqueness (i.e. that it hasn't been used before for this action). Your smart contract will need to receive: external nullifier, signal, nullifier hash (provided by JS widget), merkle root (provided by JS widget) and the proof (provided by JS widget).

    :::tip
    Check out our Airdrop full example repo on [GitHub](https://github.com/worldcoin/world-id-example-airdrop). You can fork this repo to create your own smart contract.
    :::

5.  Update your wallet transaction to include the additional parameters related to the ZKP. The proof, merkle root & nullifier hash come from the promise result when you call `.enable()` on the JS package.
6.  [**🧪 Test your integration!**](/docs/about/test-network)
