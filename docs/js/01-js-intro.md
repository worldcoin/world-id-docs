---
title: JS Introduction
id: intro
slug: /js
---

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

```js
import worldID from "@worldcoin/id"; // If you installed the JS package as a module

worldID.init("world-id-container", {
  enableTelemetry: true,
  actionId: "0x330C8452C879506f313D1565702560435b0fee4C",
});
```

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

Head over to the [JS Reference](/docs/js/reference) for full details on how to use the JS package.

:::note
The JS package is open source and accepts contributions! Head over to [GitHub](https://github.com/worldcoin/world-id-js) and submit a pull request.
:::
