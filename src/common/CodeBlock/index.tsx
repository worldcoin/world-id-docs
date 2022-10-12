import { FC, memo } from 'react'

type Props = { children: string; className?: string }

const CodeBlock: FC<Props> = ({ children, className = '' }) => {
  if (!children) return null

  return <div className="relative inline !font-roboto-mono">{children}</div>
}

export default memo(CodeBlock)
