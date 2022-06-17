---
sidebar_position: 5
title: Quick start
---

**The fastest way to get rolling with World ID is through the [Developer Portal](https://developer.worldcoin.org)!**

1. Sign up to the [Developer Portal](https://developer.worldcoin.org) and create your first [action](/docs/about/protocol#what-are-actions).

   > An action is something that a single human can perform only once.

2. Select whether you want to run this action [on-chain](#on-chain-verification) or [cloud-based](#cloud-verification). In essence, if your mission-critical functionality is performed by a smart contract, select **on-chain**. Select **cloud** otherwise (including for in real life [IRL] verifications). **Take note of your action ID** (which looks something like <!-- spell-checker: disable -->`wid_GBkZ1KlVUdFTjeMXskrX`<!-- spell-checker: enable -->).

   :::tip
   If you want to test your integration and you haven't been verified by an orb, select the **Staging** environment. You'll be able to use the [Simulator](/docs/about/test-network) instead.
   :::

   <img src="/img/dev-portal-engine-selection.png" alt="Screenshot of Dev Portal: Engine selection" />

:::note
If you selected the **cloud** engine, these instructions continue with details on the **API & JS widget** user interface option. If you want to use another user interface, please follow the deployment instructions on the **Development Portal**.
:::

3. Install the [JS widget](/docs/js/) in your frontend app/dapp.

   ```bash
   npm install @worldcoin/id
   # or
   yarn add @worldcoin/id
   ```

4. Add a `div` to mount World ID, and later initialize. You'll want to do this on the screen where the user executes the protected action (e.g. before they click "Claim airdrop" or "Create account").

   ```html
   <div id="world-id-container"></div>
   ```

   Now initialize World ID from your JS code. You can choose any signal you want, but we recommend reading [on signals](/docs/about/glossary#signal) to select an optimal signal.

   <!-- spell-checker: disable -->

   ```js
   import worldID from "@worldcoin/id";
   worldID.init("world-id-container", {
     enable_telemetry: true,
     action_id: "wid_staging_fMY8wNIw2AKLjcb7tVyI", // <- use the address from the Developer Portal
     signal: "your_signal_here",
   });
   ```

   <!-- spell-checker: enable -->

5. On document load, enable the widget and listen for verification results.

   <!-- spell-checker: disable -->

   ```js
   document.addEventListener("DOMContentLoaded", async function () {
     try {
       const result = await worldID.enable(); // <- Pass this `result` to your backend or smart contract (see below)
       console.log("World ID verified succesfully!");
     } catch (failure) {
       console.warn("World ID verification failed:", failure);
       // Re-activate here so your end user can try again
     }
   });
   ```

   <!-- spell-checker: enable -->

## Cloud verification

**Continue here if you selected the cloud engine.** Go to [on-chain verification](#on-chain-verification) otherwise.

:::info
Cloud actions are verified by the Developer Portal. You can validate a user is a unique human with a simple API request or a JWT signature verification.
:::

6. Send the following API request to the Developer Portal's API. Please check the [API reference](/api/reference#verify) for details on anticipated error responses.

   ```
   POST https://developer.worldcoin.org/api/v1/verify
   ```

   **Headers**

   ```json
   {
     "Content-Type": "application/json"
   }
   ```

   **Request body**

<!-- spell-checker: disable -->

```json
{
  "merkle_root": "0x1f38b57f3bdf96f05ea62fa68814871bf0ca8ce4dbe073d8497d5a6b0a53e5e0",
  "nullifier_hash": "0x0339861e70a9bdb6b01a88c7534a3332db915d3d06511b79a5724221a6958fbe",
  "action_id": "wid_staging_fMY8wNIw2AKLjcb7tVyI",
  "signal": "your_signal_here",
  "proof": "0x063942fd7ea1616f17787d2e3374c1826ebcd2d41d2394d915098c73482fa59516145cee11d59158b4012a463f487725cb3331bf90a0472e17385832eeaec7a713164055fc43cc0f873d76752de0e35cc653346ec42232649d40f5b8ded28f202793c4e8d096493dc34b02ce4252785df207c2b76673924502ab56b7e844baf621025148173fc74682213753493e8c90e5c224fc43786fcd09b624115bee824618e57bd28caa301f6b21606e7dce789090de053e641bce2ce0999b64cdfdfb0a0734413914c21e4e858bf38085310d47cd4cc6570ed634faa2246728ad64c49f1f720a39530d82e1fae1532bd7ad389978b6f337fcd6fa6381869637596e63a1"
}
```

   <!-- spell-checker: enable -->

**Response (200)**

```json
{
  "success": true,
  "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
  "return_url": ""
}
```

7. The user is a unique human! Execute your action on your backend (e.g. create an account).

## On-chain verification

:::info
On-chain actions are verified by your own smart contract. You will simply call a `verifyProof` function on our World ID smart contract to verify the proof, and then execute the rest of your contract normally.
:::

6. Clone our [starter kit](https://github.com/worldcoin/world-id-starter) (or [HardHat version](https://github.com/worldcoin/world-id-starter-hardhat) here).
7. Update `src/Contract.sol` with your `action_id` & adjusting the signal if relevant. After the `verifyProof` call & `nullifierHashes` record, add your own smart contract code that should run after a user is verified (e.g. minting an NFT).
8. Deploy your contract. If the provided proof is valid, your contract will execute successfully. If the proof is invalid, the contract will revert execution.
   ```bash
   cp .env.example .env # update with `RPC_URL` for the network you're deploying to & `PRIVATE_KEY` for the deployer wallet
   make deploy
   ```

## Testing your integration

Last step is test your entire integration. Open the JS widget where you'll see a QR code (or "Open Worldcoin app" button if on mobile).

- If you created a **Production** action, use the [Worldcoin app](https://worldcoin.org/download) from the App Store or Google Play to scan the QR code.
- If you created a **Staging** action, use the [Simulator](https://simulator.worldcoin.org) to scan the QR code.
