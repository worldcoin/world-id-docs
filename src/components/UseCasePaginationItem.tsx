import clsx from 'clsx'
import Image from 'next/image'
import { Link } from '@/components/Link'
import ArrowIcon from '@/components/icons/ArrowIcon'

export const UseCasePaginationItem = (props: {
	variant: 'prev' | 'next'
	color: string
	image: string
	title: string
	url: string
}) => {
	return (
		<Link
			className={clsx('flex items-center gap-x-4 no-underline group', {
				'flex-row-reverse': props.variant === 'next',
			})}
			href={props.url}
		>
			<ArrowIcon
				className={clsx('w-6 h-6 text-gray-500 group-hover:text-primary transition-colors', {
					'-mr-3 transform rotate-180': props.variant === 'prev',
					'-ml-3': props.variant === 'next',
				})}
			/>
			<div className="text-gray-500 group-hover:text-primary transition-colors leading-[1.2]">{props.title}</div>
		</Link>
	)
}
