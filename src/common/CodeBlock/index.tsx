import cn from 'classnames'
import { Fragment, memo, ReactNode, useMemo } from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'

export const CodeBlock = memo(function CodeBlock(props: {
  children?: ReactNode
  className?: string
  language?: Language
  showLines?: boolean
}) {
  const language = useMemo(
    () =>
      (props.language ||
        props.className?.match(/language-(.*)\b/)?.[1] ||
        'javascript') as Language,
    [props]
  )

  if (!props.children) return null

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      language={language}
      code={String(props.children).trimEnd()}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <code
          className={cn('relative !font-roboto-mono', className)}
          style={style}
        >
          {props.showLines && <span className="line-border" />}

          {tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {props.showLines && (
                <Fragment>
                  <span className="line number">
                    {(lineIndex + 1).toString().padStart(2, '0')}
                  </span>
                </Fragment>
              )}

              {line
                .filter((token) => !token.empty)
                .map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}

              {'\n'}
            </Fragment>
          ))}
        </code>
      )}
    </Highlight>
  )
})
