---
title: Examples
sidebar_position: 20
---

import Link from "@docusaurus/Link";

This section contains full end-to-end examples of smart contracts and dapps for World ID.

:::tip
**Showcase your own examples!** Open a PR on [this repo](https://github.com/worldcoin/world-id-docs) and add your own example.
:::

### Mesha Airdrop

Sample airdrop app. Let users claim a free ERC-20 token airdrop but only once per person. Test and deployment instructions can be found in the Readme of each repository.

<div className="text--center">
<img src="/img/mesha-airdrop-render.jpg" alt="Mesha Airdrop Render" width="700" />
</div>

<table className="table--center margin-top--lg">
<tr>
<td>
<Link href="https://example.id.worldcoin.org">Demo</Link>
</td>
<td>
<Link href="https://github.com/worldcoin/world-id-example-airdrop">Smart contract source</Link>
</td>
<td>
<Link href="https://github.com/worldcoin/world-id-example-airdrop-dapp">dapp source</Link>
</td>
<td>
<div><b>Deployed example address (<Link to="https://mumbai.polygonscan.com/address/0x505Fd4741F00850024FBD3926ebECfB4c675A9fe">Mumbai Testnet</Link>)</b></div>
<code>0x505Fd4741F00850024FBD3926ebECfB4c675A9fe</code>
</td>
</tr>
</table>

### Usage instructions

Follow these instructions to test **Mesha Airdrop** completely.

1. Open the [hosted app](https://example.id.worldcoin.org). _Alternatively you can clone the [repo](https://github.com/worldcoin/world-id-example-airdrop) and run locally._
2. Click on "Connect Wallet to Claim" and connect a wallet on the **Mumbai-Testnet** (instructions on [Test Network](/docs/about/test-network#chain-test-network) section). **MetaMask** or the [WalletConnect test wallet](https://github.com/WalletConnect/walletconnect-test-wallet) are recommended.
3. After connecting your wallet, open the Worldcoin mock app at https://mock-app.id.worldcoin.org.
4. On the Worldcoin app, create or load an identity and verify it using the faucet.
5. Once you have a verified identity, click on the World ID widget and you'll see a QR code. Use the "Copy QR code" button and then paste it on the Worldcoin app.
6. You will see a prompt with the World ID verification request. Verify or confirm to generate the ZKP and send it back to the app.
7. Back on MeshaApp you will see a success message saying you've completed the World ID verification. You can now click on "Claim airdrop".
8. You will receive confirmation for the transaction in your wallet. Confirm it and you're done!
9. You will now be able to see your transaction on-chain via PolygonScan (link will be shown on MeshaApp).
10. If you try to do the process again using the same identity you'll see the smart contract execution will fail, because you can only receive the airdrop once.

### Coming soon! Cubed voting

Truly democratic voting on various topics. Each person gets only one vote.
