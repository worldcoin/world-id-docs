---
sidebar_position: 10
title: API Reference
---

## REST endpoints

### /verify

Enables you to verify a World ID proof for a **Cloud action.**

```
POST http://localhost:3000/api/verify
```

**Headers**

```json
{
  "Content-Type": "application/json"
}
```

**Request**

```json
{
  "merkleRoot": "0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2",
  "nullifierHash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
  "actionId": "wid_staging_eee20a5954e033deb983f48180ecac6c",
  "signal": "mySignal",
  "proof": "0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fbeadf792c6f62dcd481f36819cd6d28380bd76dc30000449d6d81b87a60c5c9cecf97f25350063bfa9606419483ced7f78b450ff429c3e710b2575c62316daf97756236dcfcbb26351afc990874e5a0659995a4ac8e3eef5f721ac2b900136c3a152ef5c0b68e1786f797309e3bd97dc2183aab3b988437c61acc60d6f213fb1675a302c7ebd437d77bf36f0d5054a2eded3d4ec72ff9aa3fabea9609e18dbdffabd8012071c114e89df8209f36e5c9079b8ff237c7f3abe14076edf740058b5848efbd3d4b7ffb1fc7637311ea4e4511564a770bf189b7063d61d73df"
}
```

### /jwks

Coming soon

## GraphQL endpoints
