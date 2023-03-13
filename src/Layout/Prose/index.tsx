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
        'prose prose-slate max-w-none',
        // paragraph
        'prose-p:text-black/60 prose-li:text-black/60',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:text-211c29 lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-slate-500',
        // links
        'prose-a:font-normal prose-a:text-indigo-500 prose-a:[text-decoration:_none]',
        // pre
        'prose-pre:rounded-lg prose-pre:bg-transparent',
        // hr
        'border-858494',
        // images
        'prose-img:rounded-xl',
        // code
        'prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        // strong
        'prose-strong:text-neutral-600',
        // table
        'prose-table:border-separate prose-table:border-spacing-0 prose-table:rounded-lg prose-table:border prose-table:border-neutral-100',
        'prose-th:px-6 prose-th:py-4 prose-th:leading-5',
        'prose-td:border-t prose-td:border-neutral-100 prose-td:px-6 prose-td:py-4',
        'prose-td:text-neutral-500'
      )}
    >
      {children}
    </Component>
  )
}
