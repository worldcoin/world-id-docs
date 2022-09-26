import cn from 'classnames';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import { Fragment, memo } from 'react';

export const CodeBlock = memo(function CodeBlock(props: {
  children: string
  language: Language
  showLines?: boolean
}) {
  return (
    <Highlight
      {...defaultProps}
      code={props.children.trimEnd()}
      language={props.language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={cn(className, 'max-w-[calc(100vw_-_32px)] overflow-auto')} style={style}>
          <code className="relative !font-roboto-mono">
            {props.showLines && (
              <span className="line-border" />
            )}

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
        </pre>
      )}
    </Highlight>
  )
})