import clsx from 'clsx'
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
		<div className="gap-y-3 grid p-5 border rounded-2xl border-gray-200 ">
			<Image
				width={300}
				height={300}
				src={imagePath}
				alt={alt}
				className={clsx('m-0 sm:h-32 w-auto', className)}
			/>
			<h1 className="text-gray-900 sm:text-lg text-2xl">{title}</h1>
			<p className="text-gray-500 sm:text-sm text-lg">{content}</p>
			<a className="text-primary text-lg sm:text-base" href={link}>
				Learn More
			</a>
		</div>
	)
}
