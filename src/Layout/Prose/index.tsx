import cn from 'classnames'
import { ElementType, ReactNode } from 'react'

export function Prose({
  as: Component = 'div',
  className,
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Component
      className={cn(
        className,
        'prose prose-slate dark:prose-invert max-w-none',
        // paragraph
        'prose-p:text-6f7a85',
        // headings
        'prose-headings:scroll-mt-28 lg:prose-headings:scroll-mt-[8.5rem] prose-headings:text-211c29 prose-headings:font-semibold dark:prose-headings:bg-gradient-to-r dark:prose-headings:from-fff0ed dark:prose-headings:to-edecfc dark:prose-headings:bg-clip-text dark:prose-headings:text-transparent',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
        // links
        'prose-a:text-ff6848 prose-a:[text-decoration:_none] prose-a:font-normal',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-transparent',
        // hr
        'border-858494',
        // code
        'prose-code:font-bold prose-code:font-rubik',
        // strong
        'prose-strong:text-6f7a85'
      )}
    >
      {children}
    </Component>
  )
}
