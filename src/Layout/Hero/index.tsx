import { styles } from 'common/helpers/styles'
import cn from 'classnames'
import { Fence } from 'Layout/Hero/Fence'
import Link from 'next/link'
import { Icon } from 'common/Icon'

const code = `import worldID from "@worldcoin/id";

worldID.init("worldid-container",{
  action_id: "wid_staging_fMy8wNIw2AKLjcb7tVyI",
});`

export function Hero(props: { className?: string }) {
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
        <Fence language="javascript">{code}</Fence>
      </div>
    </div>
  )
}
