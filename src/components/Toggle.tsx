import clsx from 'clsx'
import Link from 'next/link'
import { Children, ReactNode, useMemo } from 'react'

export const ToggleButton = (props: { isActive: boolean; label: string; href: string }) => (
	<Link
		className={clsx('font-medium rounded-lg py-2.5 text-sm  text-gray-900 text-center', {
			'bg-white shadow-toggle': props.isActive,
		})}
		aria-disabled={props.isActive}
		href={props.href}
	>
		{props.label}
	</Link>
)
