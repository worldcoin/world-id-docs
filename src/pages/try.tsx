import { Button } from 'common/Button'
import dynamic from 'next/dynamic'
const IDKitWidget = dynamic(
  () => import('@worldcoin/idkit').then((mod) => mod.IDKitWidget),
  { ssr: false }
)

const Try = (): JSX.Element => {
  return (
    <div>
      <h1>Try It Out</h1>
      <IDKitWidget app_id={process.env.NEXT_PUBLIC_IDKIT_APP!} action="">
        {({ open }) => (
          <Button variant="secondary" onClick={open}>
            Open widget
          </Button>
        )}
      </IDKitWidget>
    </div>
  )
}

export default Try
