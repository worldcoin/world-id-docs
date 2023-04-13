// TODO: temporary component, remove when use cases are ready
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

//ANCHOR: Single explore use cases link component
const Item: FC<{ image: string; title: string; }> = ({
	image,
	title,
}) => {
	return (
		<div
			className="grid grid-cols-auto/1fr gap-x-4 text-gray-300 !no-underline transition-color"
		>
			<div className="relative inline-flex self-center">
				<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="48" height="48" rx="16" fill="currentColor" />
					<rect opacity="0.5" width="48" height="48" rx="16" fill="url(#paint0_radial_20252_65810)" />
					<defs>
						<radialGradient
							id="paint0_radial_20252_65810"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(1.74834 -9.52632) rotate(55.0103) scale(70.2178 69.915)"
						>
							<stop stopColor="white" />
							<stop offset="1" stopColor="white" stopOpacity="0" />
						</radialGradient>
					</defs>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<Image width={24} height={24} src={image} alt={title} className="!m-0" />
				</div>
			</div>

			<h4 className="m-0 font-medium text-lg text-gray-900 !no-underline self-center">{title}</h4>
		</div>
	)
}

export const SoonUseCases: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={clsx('mt-10 grid gap-y-4', className)}>
			<h3 className="flex items-center uppercase text-2xs m-0 font-medium text-gray-500">
				World id use cases
				<div className="ml-2 inline flex items-center normal-case h-4 px-1 font-normal text-3xs text-white bg-gray-400 rounded">
					Coming soon
				</div>
			</h3>

			<div className="grid justify-center content-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
				<Item
					image="/images/docs/use-cases/icons/defi-and-fintech.svg"
					title="DeFi and Fintech"
				/>

				<Item
					image="/images/docs/use-cases/icons/voting-platforms.svg"
					title="Voting"
				/>

				<Item
					image="/images/docs/use-cases/icons/social-media.svg"
					title="Social Media"
				/>

				<Item
					image="/images/docs/use-cases/icons/wealth-distribution.svg"
					title="Wealth Distribution"
				/>

				<Item
					image="/images/docs/use-cases/icons/token-airdrops.svg"
					title="Token Airdrops"
				/>

				<Item
					image="/images/docs/use-cases/icons/nfts.svg"
					title="NFTs"
				/>

				<Item
					image="/images/docs/use-cases/icons/customer-incentives.svg"
					title="Customer Incentives"
				/>

				<Item
					image="/images/docs/use-cases/icons/marketplaces.svg"
					title="Marketplaces"
				/>

				<Item
					image="/images/docs/use-cases/icons/events.svg"
					title="Events"
				/>
			</div>
		</div>
	)
}
