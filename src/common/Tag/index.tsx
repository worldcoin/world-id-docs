import { memo, ReactNode } from 'react'

export const Tag = memo(function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-accents-warning-200 px-2 py-1 font-bold text-accents-warning-700">
      {children}
    </span>
  )
})
