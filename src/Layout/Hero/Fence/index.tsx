import { memo } from 'react'
import { Language } from 'prism-react-renderer'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { Icon } from 'common/Icon'
import { CodeBlock } from 'common/CodeBlock'

export const Fence = memo(function Fence(props: {
  children: string
  language: Language
}) {
  return (
    <div className="relative">
      <Icon
        path="/images/hero-fence-frame.svg"
        className={cn(
          'absolute top-[-26px] right-[-16px] h-[181px] w-[332px] bg-contain bg-left-top bg-no-repeat',
          'bg-[image:linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.15)),_url(/images/iridescent.jpg)] dark:bg-[url(/images/iridescent.jpg)]'
        )}
      />

      <Icon
        path="/images/hero-fence-frame.svg"
        className={cn(
          'absolute bottom-[-26px] left-[-16px] h-[181px] w-[332px] rotate-180 bg-contain bg-left-top bg-no-repeat',
          'bg-[image:linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.15)),_url(/images/iridescent.jpg)] dark:bg-[url(/images/iridescent.jpg)]'
        )}
      />

      <div className={cn('relative rounded-2xl overflow-hidden', styles.heroFenceShadow)}>
        <div className={styles.fenceBorder}/>

        <div className={cn("p-6 space-y-6 bg-ebedef dark:bg-161b22", styles.fenceBorderInner)}>
          <div className="flex gap-1 opacity-20 dark:opacity-100">
            <span className="w-3 h-3 border rounded-full border-363a45" />
            <span className="w-3 h-3 border rounded-full border-363a45" />
            <span className="w-3 h-3 border rounded-full border-363a45" />
          </div>

          {/* FIXME: maybe need pass real tabs */}
          <div className="flex items-center gap-2 font-roboto-mono text-14">
            <span
              className={cn(
                styles.heroFenceTabBorder,
                'rounded-full dark:text-d8e1bd'
              )}
            >
              <span className="relative block px-3 py-2 rounded-full bg-181b1f dark:bg-363a45">
                world-id.ts
              </span>
            </span>

            <span className="px-3 py-2 rounded-full text-70868f">
              package.json
            </span>
          </div>

          <CodeBlock language={props.language} showLines>
            {props.children}
          </CodeBlock>
        </div>
      </div>
    </div>
  )
})
