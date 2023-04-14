import clsx from 'clsx'
import Image from 'next/image'

export const UseCaseHeader = (props: {
	color: string
	image: string
	title: string
	titleClassName?: string
	description: string
}) => {
	return (
		<div className="flex flex-col items-center">
			<div
				className="relative"
				style={{
					borderRadius: `28.8px`,
					boxShadow: `0px 7.26545px 10.9091px rgba(${props.color}, 0.08), 0px 21.8182px 29.0836px rgba(${props.color}, 0.16)`,
				}}
			>
				<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_320_10358)">
						<rect width="96" height="96" rx="28.8" fill={`rgb(${props.color})`} />
						<rect opacity="0.5" width="96" height="96" rx="28.8" fill="url(#paint0_radial_320_10358)" />
					</g>
					<defs>
						<radialGradient
							id="paint0_radial_320_10358"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(3.49669 -19.0526) rotate(55.0103) scale(140.436 139.83)"
						>
							<stop stopColor="white" />
							<stop offset="1" stopColor="white" stopOpacity="0" />
						</radialGradient>
						<clipPath id="clip0_320_10358">
							<rect width="96" height="96" fill="white" />
						</clipPath>
					</defs>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<Image width={48} height={48} src={props.image} alt={props.title} />
				</div>
			</div>

			<div className="mt-12 font-medium text-sm uppercase leading-4" style={{ color: `rgb(${props.color})` }}>
				World ID use cases
			</div>
			<h1 className={clsx(props.titleClassName, 'm-0 mt-3 font-bold text-5xl text-center')}>{props.title}</h1>
			<p className="m-0 mt-4 lg:px-12 font-medium text-center leading-6">{props.description}</p>
		</div>
	)
}
