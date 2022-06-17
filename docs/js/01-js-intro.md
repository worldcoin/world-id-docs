---
title: JS Introduction
id: intro
slug: /js
---

import Link from "@docusaurus/Link";

The World ID Javascript integration is the simplest way to start using World ID. The JS package currently supports **web applications** and requires only a few lines of code.

## Installation

The JS package can be included in your project either as a module (which supports tree shaking to reduce bundle size) or you can add the script directly to your website.

```bash
npm install @worldcoin/id
# or
yarn add @worldcoin/id
```

To add the script directly in your HTML, just add this tag to your `<head>`.

```html
<script
  type="text/javascript"
  src="//unpkg.com/@worldcoin/id/dist/world-id.js"
></script>
```

## Usage

<!-- spell-checker: disable -->

```js
import worldID from "@worldcoin/id"; // If you installed the JS package as a module

worldID.init("world-id-container", {
  enable_telemetry: true,
  action_id: "wid_BPZsRJANxct2cZxVRyh80SFG",
});
```

<!-- spell-checker: enable -->

Enable the package by calling `.enable()`. You will receive a promise with the results of the verification process.

```js
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await worldID.enable();
    console.log("World ID verified succesfully:", result);
  } catch (failure) {
    console.warn("World ID verification failed:", failure);
    // Re-activate here so your end user can try again
  }
});
```

:::tip
We strongly recommend that on verification failure, you **call `.enable()` again** and listen for the verification process results once more. This will ensure your user can try again (otherwise the World ID widget will remain disabled).
:::

Check out the [JS Reference](/docs/js/reference) for full details on how to use the JS package.

:::note
The JS package is open source and accepts contributions! Head over to [GitHub](https://github.com/worldcoin/world-id-js) and submit a pull request.
:::

## Hosted version

To make it easier to use World ID, we have a hosted version of the frontend side of World ID (basically just mounting the World ID widget). This page can be particularly helpful for off-chain use cases as you can receive the World ID verification without needing to add the widget to your own page. The hosted World ID widget can be found at: `https://id.worldcoin.org/use`.

The way it works is:

1. You send the required parameters for the World ID verification and a return URL via query string.
2. After the user completes the verification process, you receive the proof results via query string to the return URL you specified.

#### Input parameters

Here's an example of your request could look like. **Remember to URL encode all parameters!**

```
https://id.worldcoin.org/use?action_id=0x32D59776E91fdb3F377755e12cEC05d9067c2B4F&signal=0x0000000000000000000000000000000000000000&return_to=https%3A%2F%2Fmyapp.worldcoin.org
```

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>
        <code>return_to</code>
      </td>
      <td>Yes</td>
      <td>
        The URL to where the user will be redirected upon successful completion. All the response attributes will be included as query string parameters. Please make sure your URL:
        <ul>
        <li>Does not contain any query string or hash parameters itself</li>
        <li>Is served over HTTPs</li>
        <li>Is from a domain the user can recognize and trust</li>
        <li>Is URL encoded</li>
        </ul> 
      </td>
    </tr>
    <tr>
      <td>
        <code>action_id</code>
      </td>
      <td>Yes</td>
      <td>
        Unique identifier for the action being verified. Read more about the{" "}
        <Link to="/docs/about/glossary#action-id">action ID</Link>.
      </td>
    </tr>
    <tr>
      <td>
        <code>signal</code>
      </td>
      <td>Yes</td>
      <td>
        Read more about the{" "}
        <Link to="/docs/about/glossary#signal">signal</Link>. You will
        usually want to use your user's wallet address as the signal if you're using a crypto app.
      </td>
    </tr>
    <tr>
      <td>
        <code>app_name</code>
      </td>
      <td>No</td>
      <td>
        <b>Highly recommended!</b> The name of your app/project/company. This
        will be shown to the users in the WLD app, unless you have a{" "}
        <Link to="/docs/advanced/verified-actions">Verified action</Link>.
      </td>
    </tr>
    <tr>
      <td>
        <code>signal_description</code>
      </td>
      <td>No</td>
      <td>
        <b>Highly recommended!</b> The description of the specific action the
        user is verifying. This will be shown to the users in the WLD app,
        unless you have a{" "}
        <Link to="/docs/advanced/verified-actions">Verified action</Link>.
      </td>
    </tr>
  </tbody>
</table>

#### Response

The ZKP and related parameters which the World ID verification outputs will be sent to you via query string parameters to your return URL. The parameters that will be sent are the same which the World ID widget sends ([docs here](/docs/js/reference#response)). Below is an example of a response to the return URL `https://myapp.worldcoin.org`

```
https://myapp.worldcoin.org/?merkle_root=0x2a92313324532131530395d13b8a0e230149fa9bf8feb677ecea7749937083f6&nullifier_hash=0x2de0cf609355bb58ca267bc495a9603bd2e00ef2afda676b2927c4be533a5923&proof=0x2a2d8fdf047570e92dc37816849dadd87827e3b555828cdc84c2d42c8e4f6bb6102328fa1936b1ababde362faa03d23654a3b0187ba4f0fed55abd0d11cf1b8a0bdf6b8c683f8b610f93014e40aa245c1578f1e558db3ff99ec78f19c6493fb22dd14ae3b30cff03e5ccddf8f390739cb3e9dc7fd5a09115f26671b7d42dfd981e2c63484361883100b35c1f0b3f405bc4134284c2a7fdfb0b338e8554c5c7ca034a903497cea8e5c1e325ecd801e006be2de521112a39cbab6f389e3eecee37056d3e46bca9e704f8faaa52dba47c83e5cd7d4b9b6ca6b8d6fa03939bb0483c2065d6bd6502bea669daaee2ebf46d70170800a834e571661f87ef01512fabe0
```
