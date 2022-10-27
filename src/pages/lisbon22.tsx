import React, { useEffect } from 'react'

// FIXME: Temporary redirect for Blokchain week at Lisbon 2022
export default function Redirect(): JSX.Element {
  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href =
          'https://worldcoin.notion.site/Worldcoin-Lisbon-Blockchain-Week-2022-042d35008b9748188687eb3916606a51'),
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
