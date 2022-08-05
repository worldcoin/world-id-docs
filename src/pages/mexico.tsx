import React, { useEffect } from "react";

// FIXME: Temporary redirect for ETHMexico hackathon
export default function Mexico(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          "https://www.notion.so/Worldcoin-ETH-Mexico-f996e98d8a4e4aeeabb1ce947863668b"),
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
      🌮 Redirecting you....
    </div>
  );
}
