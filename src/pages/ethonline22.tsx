import React, { useEffect } from "react";

// FIXME: Temporary redirect for ETHOnline hackathon
export default function Redirect(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          "https://worldcoin.notion.site/Worldcoin-ETHOnline-71c88760a85a49eb9fc383c8cdc241eb"),
      1000
    );
  }, []);
  return (
    <div
      style={{
        display: "flex",
        background: "#fafafa",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#777e91",
        fontSize: "2em",
      }}
    >
      🌐 Redirecting you....
    </div>
  );
}
