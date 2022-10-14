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
        <div className='grid grid-cols-[auto,auto] gap-5 justify-start'>
          {props.showLines && (
            <div className="top-0 left-0 grid h-full pr-5 border-r select-none border-70868f">
              {tokens.map((_, lineIndex) => (
                <span className="text-70868f" key={lineIndex}>
                  {(lineIndex + 1).toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          )}

          <code
            className={cn(
              'relative !font-roboto-mono',
              className
            )}
            style={style}
          >
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => {
                    return !token.empty
                  })
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}

                {tokens.length > 1 && '\n'}
              </Fragment>
            ))}
          </code>
        </div>
      )}
    </Highlight>
  )
})
