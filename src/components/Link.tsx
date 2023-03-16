import NextLink from 'next/link'
import { FC, HTMLProps, PropsWithChildren, useMemo } from 'react'

export const Link: FC<PropsWithChildren<Omit<HTMLProps<HTMLAnchorElement>, 'ref'>>> = props => {
	const external = useMemo(() => {
		if (!props.href) return false
		return props.href.startsWith('http') || props.href.startsWith('mailto')
	}, [props.href])

	return (
		<>
			{external && (
				<a
					target={props.target ?? '_blank'}
					rel={props.rel ?? 'noreferrer'}
					href={props.href ?? '!#'}
					{...props}
				>
					{props.children}
				</a>
			)}

			{!external && (
				<NextLink href={props.href ?? '!#'} {...props}>
					{props.children}
				</NextLink>
			)}
		</>
	)
}
