import cn from 'classnames'
import { Icon } from 'common/Icon'
import { memo } from 'react'

export const Logo = memo(function Logo(props: { className?: string }) {
  return (
    <Icon
      name="logo-full"
      className={cn(
        "h-6 w-[142px] text-181b1f dark:bg-[url('/images/iridescent.jpg')]",
        props.className
      )}
    />
  )
})
