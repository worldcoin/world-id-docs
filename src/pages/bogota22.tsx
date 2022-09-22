import React, { useEffect } from "react";

// FIXME: Temporary redirect for ETHBogotá hackathon
export default function Redirect(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          "https://worldcoin.notion.site/Worldcoin-ETHBogot-ec4159a9a95a4bc5a51036e6afd98c28"),
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
