---
title: Protocol internals
---

Documentation of certain protocol elements, intended for **internal use only.**

## Universal link

The universal link is used so that the Worldcoin mobile app (iOS & Android) can recognize a World ID request and handle it correctly. The structure of the universal link is documented here. The source of truth function for this can be found [on GitHub](https://github.com/worldcoin/world-id-js/blob/master/id/src/utils.ts#L131), `buildQRData` function.

- The universal link base is: `https://worldcoin.org/verify`.
- The following parameters must be passed as query string attributes (**all required**)
  - `t` contains the connector's handshake topic (from WalletConnect)
  - `k` contains the connector's key (from WalletConnect)
  - `b` contains the bridge's URL (with protocol) and must be properly URL encoded (from WalletConnect)
  - `v` contains the version of WalletConnect used. **Currently only WalletConnect v1 is supported.**
