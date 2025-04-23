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
				<a target={props.target ?? '_blank'} href={props.href ?? '!#'} {...props}>
					{props.children}
				</a>
			)}

			{!external && (
				<NextLink href={props.href ?? '!#'} className="text-PB-2" {...props}>
					{props.children}
				</NextLink>
			)}
		</>
	)
}
