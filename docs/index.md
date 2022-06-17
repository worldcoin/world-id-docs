---
sidebar_position: 1
title: Introduction
---

import Link from "@docusaurus/Link";

World ID is a way to anonymously verify someone is an actual human when performing an action, and that they have performed the action only once (without revealing anything about themselves). This happens through [Zero-knowledge proofs](/docs/advanced/zero-knowledge-proofs).

You can easily integrate World ID into your app and smart contract or backend. End user can easily and anonymously verify they are a unique human through the [Worldcoin app](https://worldcoin.org/download).

<div className="text--center">
<img src="/img/mesha-airdrop-render.jpg" alt="Example of World ID in a dapp" width="700" />
</div>

<!-- TODO: All the screenshots here need to be updated with the new UI -->
<table>
<tbody>
<tr>
<td className="text--center">
<img src="/img/world-id-widget.svg" alt="Render of World ID widget" />
</td>
<td className="text--center">
<img src="/img/world-id-js-modal.png" alt="Render of World ID widget" width="400" />
</td>
<td className="text--center">
<img src="/img/world-id-verification-drawer.png" alt="Render of World ID widget"  width="300" />
</td>
</tr>
<tr>
<td>
The lightweight <Link to="/docs/js">JS widget</Link> is added to your dapp.
</td>
<td>
<Link to="/docs/js">JS widget</Link> handles connection to Worldcoin app and provides instructions to the user.
</td>
<td>
User verifies they are a unique human with a <Link to="/docs/advanced/zero-knowledge-proofs">ZKP</Link>.
</td>
</tr>
</tbody>
</table>

:::cautionFYI
World ID is currently in **Beta** and some functionality might change. Please help us improve by sharing [feedback](/feedback) on your experience and any ideas for how to improve.
:::

## How it works

In broad strokes, this is how World ID works.

<img src="/img/how-it-works.png" alt="Render of World ID widget" />

1. End user verifies themself at a Worldcoin orb ([read more](https://worldcoin.org/how-the-launch-works)). User proves they are a unique human without requiring to store any PII (more on [Privacy](/docs/about/privacy)).

2. Project [integrates with World ID](/docs/quick-start).

3. Whenever performing a specific [action](/docs/about/protocol#what-are-actions), user proves they are a unique human by submitting a [Zero-knowledge proof](/docs/advanced/zero-knowledge-proofs) from the Worldcoin app.

4. Project validates the [Zero-knowledge proof](/docs/advanced/zero-knowledge-proofs) and executes the action (e.g. token airdrop, NFT minting, account creation, ...).

Read more about how World ID works in the [Protocol](/docs/about/protocol) section.

## Use cases

<!-- TODO: Add use cases for Cloud apps -->

World ID prevents sibyl attacks for actions on-chain and [off-chain](/docs/advanced/non-crypto-projects). Some use cases:

- **Receiving airdrops**. Reward early users of your project without abuse from bots, users creating multiple accounts, etc. For example, democratic airdrops like [Worldcoin](https://worldcoin.org).
- **Democratic voting**. Ensure one person equals one vote; e.g. governance, proposal voting, etc.
- **Quadratic funding**. Funding where the number of contributors matter more than the sheer number of dollars provided (to democratize the process). Ensure a single person only funds a project once. An example of quadratic funding is [Gitcoin](https://gitcoin.co/blog/gitcoin-grants-quadratic-funding-for-the-world/).
- **Person-bound NFTs**. Enables the possibility of blockchain-based records (e.g. university degrees, vaccination records, citizenship confirmation, ...). Without World ID you could transfer those NFTs to a third party which would make the records useless.

:::note
Spot an error in these docs? Our docs are open source too and contributions are welcome. Open a PR on [GitHub](https://github.com/worldcoin/world-id-docs).
:::
