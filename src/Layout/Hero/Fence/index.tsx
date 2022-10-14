import { memo, useState } from 'react'
import { Language } from 'prism-react-renderer'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { Icon } from 'common/Icon'
import { CodeBlock } from 'common/CodeBlock'
import { Tab } from './Tab'



export const Fence = memo(function Fence(props: {
  tabs: Array<{name: string, language: Language, code: string}>
}) {
  const [currentTab, setCurrentTab] = useState(props.tabs[0])

  return (
    <div className="relative min-w-[550px]">
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

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl',
          styles.heroFenceShadow
        )}
      >
        <div className={styles.fenceBorder} />

        <div
          className={cn(
            'space-y-6 bg-ebedef p-6 dark:bg-161b22',
            styles.fenceBorderInner
          )}
        >
          <div className="flex gap-1 opacity-20 dark:opacity-100">
            <span className="w-3 h-3 border rounded-full border-363a45" />
            <span className="w-3 h-3 border rounded-full border-363a45" />
            <span className="w-3 h-3 border rounded-full border-363a45" />
          </div>

          <div className="flex items-center gap-2 font-roboto-mono text-14">
            {props.tabs.map((tab, tabIndex) => (
              <Tab key={tabIndex} isActive={tab === currentTab} onSelect={() => setCurrentTab(tab)}>{tab.name}</Tab>
            ))}
          </div>

          <pre>
            <CodeBlock language={currentTab.language} showLines>
              {currentTab.code}
            </CodeBlock>
          </pre>
        </div>
      </div>
    </div>
  )
})
