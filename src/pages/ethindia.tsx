import React, { useEffect } from 'react'

// FIXME: Temporary redirect for ETHIndia
export default function Redirect(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          'https://worldcoin.notion.site/Worldcoin-ETHIndia-031ba46df623412a9df1552337bcaa57'),
      1000
    )
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 200px)',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
      }}
      className="text-777e91 dark:text-white"
    >
      🌐 Redirecting you....
    </div>
  )
}
