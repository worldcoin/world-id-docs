import { Language } from 'prism-react-renderer'
import cn from 'classnames'
import { CodeBlock } from 'common/CodeBlock'
import { styles } from 'common/helpers/styles'

export function Fence(props: {
  children: string
  language: Language
  showLines?: boolean
}) {
  return (
    <div className="relative">
      <div className={styles.fenceBorder} />
      <div className={cn(styles.fenceBorderInner, 'bg-ebedef dark:bg-161b22')}>
        <CodeBlock language={props.language} showLines={props.showLines}>
          {props.children}
        </CodeBlock>
      </div>
    </div>
  )
}
