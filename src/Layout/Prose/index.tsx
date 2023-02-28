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
        'prose prose-slate max-w-none dark:prose-invert',
        // paragraph
        'prose-p:text-black/60 prose-li:text-black/60 dark:prose-p:text-white/60 dark:prose-li:text-white/60',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:text-211c29 dark:prose-headings:bg-gradient-to-r dark:prose-headings:from-fff0ed dark:prose-headings:to-edecfc dark:prose-headings:bg-clip-text dark:prose-headings:text-transparent lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
        // links
        'prose-a:font-normal prose-a:text-indigo-500 prose-a:[text-decoration:_none]',
        // pre
        'prose-pre:rounded-lg prose-pre:bg-transparent',
        // hr
        'border-858494',
        // images
        'prose-img:rounded-xl',
        // code
        'prose-code:font-rubik prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        // strong
        'prose-strong:text-6f7a85',
        // table
        'prose-table:border-separate prose-table:border-spacing-0 prose-table:border prose-table:border-neutral-100 dark:prose-table:border-neutral-700 prose-table:rounded-lg',
        'prose-th:leading-5 prose-th:px-6 prose-th:py-4',
        'prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-neutral-100 dark:prose-td:border-neutral-700',
        'prose-td:text-neutral-500'
      )}
    >
      {children}
    </Component>
  )
}
