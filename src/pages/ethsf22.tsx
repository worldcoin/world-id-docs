import React, { useEffect } from 'react'

// FIXME: Temporary redirect for ETHSanFrancisco hackathon
export default function Redirect(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          'https://worldcoin.notion.site/Worldcoin-ETHSanFrancisco-2ec56711d9464b7b8c26e764928d92cf'),
      1000
    )
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        background: '#fafafa',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777e91',
        fontSize: '2em',
      }}
    >
      🌐 Redirecting you....
    </div>
  )
}
