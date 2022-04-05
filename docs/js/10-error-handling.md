---
title: Error Handling
---

Errors in the JS package will generally be returned in the Promise rejection of the [`.init()`](/docs/js/reference#init) method. In exceptional cases, some errors may be thrown in the Javascript console (though this is mostly for unhandled errors, and is not normal behavior).

The `errorResult` object that is returned in the Promise rejection has the following structure:

```json
{
  "code": "already_signed",
  "detail": "User has previously signed and submitted proof for this action."
}
```

:::tip
When debugging, we always recommend you also check the Javascript console for any additional details.
:::

:::note
If you enabled telemetry, any errors will be reported to help us proactively detect and fix any bugs. If you are running into an issue and don't have telemetry enabled, we recommend enabling it so the error can be reported.
:::

## Error codes

The JS package may return any of the following error codes.

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
      <th>How to fix?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>connection_failed</code>
      </td>
      <td>
       Could not establish a connection to the WLD app.
      </td>
      <td>
       Ask the user to check their internet connection on both devices running your dapp and their WLD app. Additionally, make sure the user has the latest WLD app version.
      </td>
    </tr>
    <tr>
      <td>
        <code>verification_rejected</code>
      </td>
      <td>
       User rejected the World ID request in their WLD app.
      </td>
      <td>
       If this was a mistake, ask the user to go through the flow again.
      </td>
    </tr>
    <tr>
      <td>
        <code>already_signed</code>
      </td>
      <td>
       This person has already submitted a proof for the particular action (i.e. <code>externalNullifier</code>).
      </td>
      <td>
       Nothing to do. User cannot submit a request for the same action twice.
      </td>
    </tr>
    <tr>
      <td>
        <code>invalid_external_nullifier</code>
      </td>
      <td>
       The external nullifier provided to the JS package from your dapp is not valid.
      </td>
      <td>
       Check the external nullifier. Make sure it's an <a href="/docs/js/reference#parameter-encoding">ABI-encoded</a> string.
      </td>
    </tr>
    <tr>
      <td>
        <code>invalid_proof_signal</code>
      </td>
      <td>
       The proof signal provided to the JS package from yoru dapp is not valid.
      </td>
      <td>
       Check the proof signal. Make sure it's an <a href="/docs/js/reference#parameter-encoding">ABI-encoded</a> string or address.
      </td>
    </tr>
    <tr>
      <td>
        <code>unexpected_response</code>
      </td>
      <td>
       There was a problem with the response obtained from the WLD app.
      </td>
      <td>
       Check the JS console for further details, though in most cases these will require contacting us to report the bug.
      </td>
    </tr>
    <tr>
      <td>
        <code>generic_error</code>
      </td>
      <td>
       An unhandled exception occurred.
      </td>
      <td>
       Check the JS console for further details, though in most cases these will require contacting us to report the bug.
      </td>
    </tr>
  </tbody>
</table>
