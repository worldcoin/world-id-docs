import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export const usePostHog = (): void => {
  const router = useRouter()

  useEffect((): (() => void) => {
    // Track $pageview
    const handleRouteChange = (_: any, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        posthog.capture('$pageview')
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
