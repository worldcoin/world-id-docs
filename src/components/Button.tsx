import clsx from 'clsx'
import { Link } from '@/components/Link'
import ArrowIcon from './icons/ArrowIcon'
import type { AllHTMLAttributes, FC, PropsWithChildren } from 'react'

const variantStyles = {
	primary:
		'rounded-lg bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300',
	neutral: 'rounded-lg bg-gray-200 py-1 px-3 text-gray-900 hover:bg-gray-100/60',
	text: 'text-primary dark:text-emerald-400 dark:hover:text-primary',
}

type Props = PropsWithChildren<
	{
		variant?: keyof typeof variantStyles
		className?: string
		arrow?: 'left' | 'right'
	} & AllHTMLAttributes<HTMLElement>
>

export const Button: FC<Props> = ({ variant = 'primary', className = '', children, arrow, ...props }) => {
	let Component = props.href ? Link : 'button'

	let arrowIcon = (
		<ArrowIcon
			className={clsx(
				'mt-0.5 h-5 w-5',
				variant === 'text' && 'relative top-px',
				arrow === 'left' && '-ml-1 rotate-180',
				arrow === 'right' && '-mr-1'
			)}
		/>
	)

	return (
		// @ts-ignore
		<Component
			{...props}
			className={clsx(
				'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
				variantStyles[variant],
				className
			)}
		>
			{arrow === 'left' && arrowIcon}
			{children}
			{arrow === 'right' && arrowIcon}
		</Component>
	)
}
