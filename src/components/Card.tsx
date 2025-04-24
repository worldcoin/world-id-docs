import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

export const Card = (props: {
	title: string
	imagePath: string
	alt: string
	content: string
	link: string
	className?: string
}) => {
	const { imagePath, title, content, className, alt, link } = props
	return (
		<Link href={link} className="block no-underline hover:no-underline">
			<div className="gap-y-3 grid p-5 border rounded-2xl border-gray-200 h-full transition-all hover:shadow-md">
				<Image
					width={300}
					height={300}
					src={imagePath}
					alt={alt}
					className={clsx('m-0 sm:h-30 w-auto', className)}
				/>
				<h1 className="text-gray-900 sm:text-lg text-2xl">{title}</h1>
				<p className="text-gray-500 sm:text-sm text-lg">{content}</p>
				<span className="text-primary text-lg sm:text-base mt-auto">Learn More</span>
			</div>
		</Link>
	)
}
