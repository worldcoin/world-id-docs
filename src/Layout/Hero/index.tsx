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
          'text-5xl font-bold leading-none uppercase tracking-wide',
        )}
      >
        Sybil resistance, finally.
      </h1>
      <p className="lg:max-w-[580px] mt-3 text-24 text-neutral-700 dark:text-neutral-100">
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
}
