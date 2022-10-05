import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  MouseEventHandler,
} from 'react'
import {
  VerificationErrorResponse,
  VerificationResponse,
  WidgetProps,
} from '@worldcoin/id'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { Header } from 'Layout/Header'
import Link from 'next/link'
const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
  { ssr: false }
)

const validateUrl = (candidate: string | null): boolean => {
  try {
    const url = new URL(candidate as string)
    if (url.protocol !== 'https:') {
      console.error('Provided `returnTo` must always be over https.')
      return false
    }
    return true
  } catch {
    console.error('Provided `returnTo` url is not valid.')
    return false
  }
}

const pageMeta = {
  title: 'Verify with World ID',
  description:
    "Prove you're a unique human without revealing any personal data",
}

enum State {
  Initial,
  Ready,
  MissingParams,
}

export default function Use() {
  const [state, setState] = useState<State>(State.Initial)
  const [proof, setProof] = useState<string>()
  const [error, setError] = useState<VerificationErrorResponse>()
  const router = useRouter()
  const queryParams = useMemo(() => router?.query, [router?.query])

  useEffect(() => {
    if (
      queryParams.action_id &&
      queryParams.signal &&
      validateUrl(queryParams.return_to as string)
    ) {
      setState(State.Ready)
    } else {
      setState(State.MissingParams)
    }
  }, [queryParams])

  const handleSuccess = useCallback((response: VerificationResponse) => {
    setProof(response.proof)
  }, [])

  const handleError = useCallback((error: VerificationErrorResponse) => {
    setError(error)
    console.error(error)
  }, [])

  const handleContinue = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      const params = new URLSearchParams(
        proof as unknown as Record<string, string>
      )
      window.location.href = `${queryParams?.return_to}?${params.toString()}`
    },
    [proof, queryParams?.return_to]
  )

  return (
    <Fragment>
      <Head>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="og:description" content={pageMeta.description} />
      </Head>

      <div className="grid h-screen grid-rows-[auto_1fr] text-6f7a85">
        <Header disableSearch disableNav />

        <div
          className={cn(
            'self-center justify-self-center lg:max-w-[400px]',
            styles.screenPadding
          )}
        >
          <div className={cn('relative')}>
            <div className={styles.fenceBorder} />

            <div
              className={cn(
                'relative grid justify-items-center gap-4 bg-ebedef p-8 text-center dark:bg-161b22',
                styles.fenceBorderInner
              )}
            >
              <h1 className="font-semibold font-sora text-30">
                Welcome to World ID
              </h1>

              <p>Verify you are a unique human with World ID.</p>

              {state === State.Ready && (
                <Fragment>
                  <WorldIDWidget
                    actionId={queryParams.action_id as string}
                    signal={queryParams.signal as string}
                    enableTelemetry
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />

                  <button
                    onClick={handleContinue}
                    disabled={!proof}
                    className={cn(
                      'inline-block rounded-2xl bg-181b1f px-6 py-3 shadow-[0_0_16px] shadow-d2e7f7/25',
                      'disabled:opacity-20 dark:bg-gradient-to-r dark:from-fff0ed dark:to-edecfc'
                    )}
                  >
                    <span
                      className={cn(
                        'text-16 font-medium dark:text-111f24',
                        styles.textGradient
                      )}
                    >
                      Continue
                    </span>
                  </button>
                </Fragment>
              )}

              {state === State.MissingParams && (
                <div className="text-center">
                  <p className="text-ff6848">
                    It looks like some parameters are missing or invalid from
                    this request. Please check your link and try again.
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center">
                  <p className="text-ff6848">
                    Something doing wrong, check console for details
                  </p>
                </div>
              )}
            </div>
          </div>

          {state === State.MissingParams && (
            <p className="mt-4 text-center">
              If you&apos;re a developer, check&nbsp;
              <Link href="/js#hosted-version">
                <a className={cn('bg-8e87ff', styles.darkTextGradient)}>
                  the docs
                </a>
              </Link>{' '}
              for this hosted version of the World ID widget.
            </p>
          )}
        </div>
      </div>
    </Fragment>
  )
}
