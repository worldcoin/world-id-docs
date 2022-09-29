import { memo, ReactNode } from 'react'
import NextLink from 'next/link'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const Link = memo(function Link(props: {
  href?: string
  children?: ReactNode
}) {
  if (!props.href || !props.children) {
    return null
  }

  let isExternal = !props.href.startsWith(appUrl)
  let is3rdParty = isExternal && !/https?:\/\/.*worldcoin\.org/.test(props.href)

  console.log({ href: props.href, appUrl, isExternal, is3rdParty })

  return (
    <NextLink href={props.href}>
      <a
        target={isExternal ? '_blank' : undefined}
        rel={is3rdParty ? 'noopener noreferrer' : ''}
      >
        {props.children}
      </a>
    </NextLink>
  )
})
