import Link from 'next/link'

export const ToggleButton = (props: { isActive: boolean; label: string; href: string }) => (
	<Link
		className="font-medium text-sm py-2.5 text-gray-900 text-center relative"
		aria-disabled={props.isActive}
		href={props.href}
	>
		{props.label}
	</Link>
)
