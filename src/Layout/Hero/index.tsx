import { styles } from 'common/helpers/styles'
import cn from 'classnames'
import { Fence } from 'Layout/Hero/Fence'
import Link from 'next/link'
import { Icon } from 'common/Icon'
import { Language } from 'prism-react-renderer'

const tabs: Array<{ name: string; language: Language; code: string }> = [
  {
    name: 'world-id.ts',
    language: 'javascript',
    code: `import worldID from "@worldcoin/id";

worldID.init("worldid-container",{
  action_id: "wid_staging_fMy8wNIw2AKLjcb7tVyI",
});`,
  },
  {
    name: 'package.json',
    language: 'bash',
    code: `npm install @worldcoin/id
# or
yarn add @worldcoin/id`,
  },
]

export function Hero(props: { className?: string }) {

  return (
    <div className="mb-12 pb-12 border-b border-b-f3f4f5">
      <h1
        className={cn(
          'font-sora text-5xl font-bold leading-none uppercase tracking-wide',
          'text-191c20 dark:text-white',
        )}
      >
        Sybil resistance, finally.
      </h1>
      <p className="lg:max-w-[580px] mt-3 text-24 text-3c424b dark:text-f3f4f5">
        Anonymously verify your users are real humans, and ensure they can
        only perform action once.
      </p>
      <div className="my-8 flex">
        <Link
          href="https://github.com/worldcoin/world-id-js"
          target="_blank"
          className={cn(
            'flex items-center gap-2 rounded-lg bg-fbfbfc dark:bg-191c20 border border-f3f4f5 dark:border-3c424b px-4 h-11 text-181b1f dark:text-ffffff',
          )}
        >
          <Icon
              name="github"
              className="h-4 w-4"
          />
          <span className="font-medium text-14 uppercase tracking-wide leading-[1px]">View on GitHub</span>
        </Link>
      </div>
      <div className="hidden justify-self-center md:block">
        <Fence tabs={tabs} />
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        styles.screenPadding,
        'grid justify-between gap-x-44 gap-y-20 py-12 lg:grid-cols-2 lg:py-36',
        props.className
      )}
    >
      <div className="grid content-start gap-6 place-items-start">
        <h1
          className={cn(
            'font-sora text-44 font-semibold',
            "bg-181b1f bg-clip-text bg-center text-transparent dark:bg-[url('/images/iridescent.jpg')]"
          )}
        >
          Sybil resistance, finally.
        </h1>

        <p className="text-26 text-black/60 dark:text-white/60">
          Anonymously verify your users are real humans, and ensure they can
          only perform an action once.
        </p>

        <div className="flex gap-4">
          <Link
            href="#!"
            className={cn(
              'rounded-2xl bg-181b1f px-6 py-3 shadow-[0_0_16px] shadow-d2e7f7/25',
              'dark:bg-gradient-to-r dark:from-fff0ed dark:to-edecfc'
            )}
          >
            <span
              className={cn(
                'text-16 font-medium dark:text-111f24',
                styles.textGradient
              )}
            >
              Get started
            </span>
          </Link>

          <Link
            href="https://github.com/worldcoin/world-id-js"
            target="_blank"
            className={cn(
              'flex items-center gap-2 rounded-2xl bg-gradient-to-r px-6 py-3 text-181b1f',
              'dark:from-e6cfcf/10 dark:to-cde0ec/10 dark:text-d7dae1'
            )}
          >
            <span className="font-medium text-16">View on GitHub</span>
            <Icon
              name="github"
              className="text-[color-inherit] h-[18px] w-[18px]"
            />
          </Link>
        </div>
      </div>

      <div className="hidden justify-self-center md:block">
        <Fence tabs={tabs} />
      </div>
    </div>
  )
}
