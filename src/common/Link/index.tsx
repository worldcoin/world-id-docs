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

  let isExternal = false;
  let is3rdParty = false;

  try {
    const url = new URL(props.href)
    isExternal = !url.hostname.startsWith(appUrl)
    is3rdParty = isExternal && !/^.*worldcoin\.org$/.test(url.hostname)
  } catch (err) {}

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
