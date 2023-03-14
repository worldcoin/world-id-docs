import { Button } from 'common/Button'
import { IDKitWidget } from '@worldcoin/idkit'
import { memo, Suspense } from 'react'

const Try = (): JSX.Element => {
  return (
    <div>
      <h1>Try It Out</h1>
      <p>
        As you&apos;ll see in the IDKit section later, the World ID protocol
        makes use of a web widget to communicate with the World App installed in
        the user&apos;s phone and verify their identity. If you have{' '}
        <a
          href="https://worldcoin.org/download"
          target="_blank"
          rel="noreferrer"
        >
          downloaded the app
        </a>
        , you can try it out by yourself below.
      </p>
      <Suspense>
        <IDKitWidget app_id={process.env.NEXT_PUBLIC_IDKIT_APP!} action="">
          {({ open }) => (
            <Button variant="secondary" onClick={open}>
              Open widget
            </Button>
          )}
        </IDKitWidget>
      </Suspense>
    </div>
  )
}

export default memo(Try)
