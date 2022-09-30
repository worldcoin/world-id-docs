import { memo, ReactNode, useEffect, useState, Fragment, useMemo } from 'react'
import NextLink from 'next/link'

export const Link = memo(function Link(props: {
  href?: string
  children?: ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)
  const isExternal = useMemo(() => props.href?.startsWith('http'), [props.href])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!props.href || !props.children) {
    return null
  }

  return (
    <Fragment>
      {isMounted && !isExternal && (
        <NextLink href={props.href}>
          <a>{props.children}</a>
        </NextLink>
      )}

      {isMounted && isExternal && (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      )}

      {!isMounted && <Fragment></Fragment>}
    </Fragment>
  )
})
