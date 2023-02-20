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
    <div className="dark:bg-191c20 rounded-lg shadow-1px shadow-eeeef7 dark:shadow-252526">
      <div className="flex items-center gap-6 px-5 pt-3 bg-fbfbfc dark:bg-3c424b rounded-t-lg">
        {props.tabs.map((tab, tabIndex) => (
            <Tab key={tabIndex} isActive={tab === currentTab} onSelect={() => setCurrentTab(tab)}>{tab.name}</Tab>
        ))}
      </div>
      <pre className="px-5 py-6">
        <CodeBlock language={currentTab.language} showLines>
          {currentTab.code}
        </CodeBlock>
      </pre>
    </div>
  )
})
