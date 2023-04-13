import clsx from 'clsx'
import Image from 'next/image'
import { CSSProperties, FC } from 'react'
import { Link } from '@/components/Link'

//ANCHOR: Single explore use cases link component
const UseCaseLink: FC<{ image: string; title: string; color: string; href: string }> = ({
	image,
	title,
	color,
	href,
}) => {
	return (
		<Link
			href={href}
			className={clsx("grid grid-cols-auto/1fr gap-y-1 gap-x-4 !no-underline transition-color",
				`text-gray-400 hover:!text-[--hoverColor]`
			)}
			style={{
				'--hoverColor': color,
			} as CSSProperties}
		>
			<div className="relative inline-flex row-span-2 self-center">
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

			<h4 className="m-0 font-medium text-lg text-gray-900 !no-underline self-end">{title}</h4>
			<span className="m-0 text-2xs leading-[1.33] text-primary !no-underline self-start">Show me more</span>
		</Link>
	)
}

export const ExploreUseCases: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={clsx('grid gap-y-4', className)}>
			<h3 className="uppercase text-2xs m-0 font-medium text-gray-500">Explore World ID uses cases</h3>

			<div className="grid justify-center content-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
				<UseCaseLink
					color="#9D50FF"
					image="/images/docs/use-cases/icons/defi-and-fintech.svg"
					title="DeFi and Fintech"
					href="/use-cases/defi-and-fintech"
				/>

				<UseCaseLink
					color="#4940E0"
					image="/images/docs/use-cases/icons/voting-platforms.svg"
					title="Voting platforms"
					href="/use-cases/voting-platforms"
				/>

				<UseCaseLink
					color="#487CA5"
					image="/images/docs/use-cases/icons/social-media.svg"
					title="Social Media"
					href="/use-cases/social-media"
				/>

				<UseCaseLink
					color="#00C313"
					image="/images/docs/use-cases/icons/wealth-distribution.svg"
					title="Wealth Distribution"
					href="/use-cases/wealth-distribution"
				/>

				<UseCaseLink
					color="#FFB11B"
					image="/images/docs/use-cases/icons/token-airdrops.svg"
					title="Token Airdrops"
					href="/use-cases/token-airdrops"
				/>

				<UseCaseLink
					color="#FF5A76"
					image="/images/docs/use-cases/icons/nfts.svg"
					title="NFTs"
					href="/use-cases/nfts"
				/>

				<UseCaseLink
					color="#C4554D"
					image="/images/docs/use-cases/icons/customer-incentives.svg"
					title="Customer Incentives"
					href="/use-cases/customer-incentives"
				/>

				<UseCaseLink
					color="#39B8A8"
					image="/images/docs/use-cases/icons/marketplaces.svg"
					title="Marketplaces"
					href="/use-cases/marketplaces"
				/>

				<UseCaseLink
					color="#8A67AB"
					image="/images/docs/use-cases/icons/events.svg"
					title="Events"
					href="/use-cases/events"
				/>
			</div>
		</div>
	)
}
