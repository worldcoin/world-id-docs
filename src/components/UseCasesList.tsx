import { FC } from 'react'
import Image from 'next/image'
import { Link } from '@/components/Link'
import RedirectIcon from './icons/RedirectIcon'
import { UseCasesListItem } from '@/components/UseCasesListItem'

// ANCHOR: LinkCard component for the links in the bottom of the page
const LinkCard: FC<{ href: string; heading: string; description: string }> = ({ href, heading, description }) => {
	return (
		<Link
			className="grid gap-y-2 content-start py-6 px-5 bg-gray-50 border border-gray-100 rounded-xl relative no-underline hover:bg-gray-100/70 transition-colors"
			href={href}
		>
			<span className="text-sm font-medium text-gray-900 !m-0 leading-none">{heading}</span>
			<p className="text-sm text-gray-900/80 m-0 leading-[1.3]">{description}</p>
			<RedirectIcon className="absolute top-4 right-4 h-5 w-5 text-gray-900" />
		</Link>
	)
}

// ANCHOR: Main page component
export const UseCasesList: FC<{}> = () => {
	return (
		<div>
			<div className="flex flex-col items-center">
				<Image src="/images/docs/use-cases/illustration.svg" width={68} height={72} alt="Verified at Orb" />
				<div className="mt-12 font-medium text-sm text-[#007fd3] leading-4 uppercase">
					World ID USE CASES & IDEAS
				</div>
				<h1 className="m-0 mt-2 text-4xl text-center">
					The protocol to bring global proof of personhood to the internet.
				</h1>
				<p className="m-0 mt-4 text-base text-gray-400 leading-6">
					Privacy First. Self Custodial. Decentralized
				</p>
				<div className="mt-6 flex items-center gap-x-2">
					<Link
						className="px-4 py-3 bg-gray-900 text-white leading-4 no-underline rounded-[10px] hover:bg-gray-900/80"
						href="" // FIXME: Add link
					>
						Start building
					</Link>
					<Link
						className="px-5 py-3 bg-gray-200 text-gray-900 leading-4 no-underline rounded-[10px] hover:bg-gray-200/80"
						href="" // FIXME: Add link
					>
						Explore examples
					</Link>
				</div>
			</div>

			<h2 className="m-0 mt-16 font-bold text-sm text-gray-400 leading-4 uppercase">
				Explore World ID uses cases
			</h2>

			<div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
				<UseCasesListItem
					color="#9D50FF"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M24.9676 10.353H23.1672C21.9266 10.353 20.9209 11.3587 20.9209 12.5992V14.3996C20.9209 14.7692 21.0102 15.1179 21.1683 15.4253L15.8255 20.7681C15.5179 20.61 15.1692 20.5207 14.7996 20.5207H12.9992C11.7586 20.5207 10.7529 21.5264 10.7529 22.7669V24.5673C10.7529 25.8079 11.7586 26.8135 12.9992 26.8135H14.7996C15.1825 26.8135 15.543 26.7177 15.8585 26.5488L21.2238 31.914C21.0548 32.2295 20.959 32.59 20.959 32.9729V34.7733C20.959 36.0139 21.9647 37.0195 23.2053 37.0195H25.0057C26.2462 37.0195 27.2519 36.0139 27.2519 34.7733V32.9729C27.2519 32.5925 27.1573 32.2342 26.9904 31.9201L32.3203 26.5903C32.6343 26.7573 32.9927 26.8519 33.3732 26.8519H35.1736C36.4142 26.8519 37.4199 25.8463 37.4199 24.6057V22.8053C37.4199 21.5647 36.4142 20.5591 35.1736 20.5591H33.3732C32.9934 20.5591 32.6356 20.6533 32.322 20.8198L26.9531 15.4509C27.1195 15.1373 27.2138 14.7795 27.2138 14.3996V12.5992C27.2138 11.3587 26.2081 10.353 24.9676 10.353ZM22.1017 16.3776C22.4187 16.5487 22.7816 16.6459 23.1672 16.6459H24.9676C25.3429 16.6459 25.6967 16.5538 26.0077 16.3911L31.3818 21.7652C31.219 22.0762 31.127 22.43 31.127 22.8053V24.6057C31.127 24.9803 31.2187 25.3335 31.3809 25.6441L26.0442 30.9807C25.7336 30.8184 25.3804 30.7267 25.0057 30.7267H23.2053C22.833 30.7267 22.4819 30.8172 22.1728 30.9775L16.795 25.5997C16.9553 25.2906 17.0458 24.9395 17.0458 24.5673V22.7669C17.0458 22.3814 16.9487 22.0186 16.7776 21.7016L22.1017 16.3776Z"
								fill="white"
							/>
						</>
					}
					title="DeFi and Fintech"
					description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
					items={[
						'Undercollateralized lending & credit',
						'Credit card chargeback protection',
						'Zero-knowledge compliance with nationality, age and sanctions',
						'Private transaction mixer with daily amount limits and ZK compliance for MLP',
						'Private decentralized credit score',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#4940E0"
					icon={
						<>
							<path
								d="M15.0329 20.75L32.9671 20.75C33.9872 20.75 34.3878 19.3986 33.539 18.8206L25.1438 13.1038C24.4512 12.6321 23.5488 12.6321 22.8562 13.1038L14.461 18.8206C13.6122 19.3986 14.0128 20.75 15.0329 20.75Z"
								fill="white"
							/>
							<path d="M17.5 22.25H20.5V27.25H17.5V22.25Z" fill="white" />
							<path d="M30.5 22.25H27.5V27.25H30.5V22.25Z" fill="white" />
							<path d="M22.5 22.25H25.5V27.25H22.5V22.25Z" fill="white" />
							<path
								d="M32.2764 29.3028C32.107 28.964 31.7607 28.75 31.382 28.75L16.618 28.75C16.2393 28.75 15.893 28.964 15.7236 29.3028L14.7236 31.3028C14.3912 31.9677 14.8747 32.75 15.618 32.75H32.382C33.1253 32.75 33.6088 31.9677 33.2764 31.3028L32.2764 29.3028Z"
								fill="white"
							/>
						</>
					}
					title="Voting platforms"
					description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
					items={[
						'Deduplication in government elections',
						'Novel DAO governance including quadratic, and conviction voting',
						'Anonymous online polls platform',
						'Snapshot integration',
						'Change.org integration',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#487CA5"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M27.0936 22.9556H28.3379C31.4323 22.9556 33.9403 25.4636 33.9403 28.5579V31.6705C33.9403 33.0457 32.8256 34.1603 31.4505 34.1603H27.0936C23.9992 34.1603 21.4912 31.6523 21.4912 28.5579C21.4912 25.4636 23.9992 22.9556 27.0936 22.9556ZM26.3382 26.8351C26.3382 27.5959 26.9549 28.2126 27.7157 28.2126C28.4766 28.2126 29.0933 27.5959 29.0933 26.8351C29.0933 26.0742 28.4766 25.4575 27.7157 25.4575C26.9549 25.4575 26.3382 26.0742 26.3382 26.8351ZM25.3047 30.2796C25.3047 31.0405 26.3842 31.6572 27.7157 31.6572C29.0473 31.6572 30.1268 31.0405 30.1268 30.2796C30.1268 29.5187 29.0473 28.902 27.7157 28.902C26.3842 28.902 25.3047 29.5187 25.3047 30.2796Z"
								fill="white"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M26.1545 21.2157C26.3132 20.6887 26.3956 20.1277 26.3895 19.5474C26.3592 16.4578 23.7701 14.002 20.6805 14.002H19.5428C16.4484 14.002 13.9404 16.5099 13.9404 19.6043V22.7169C13.9404 24.092 15.0551 25.2067 16.4302 25.2067H20.2674C20.4467 25.2067 20.6102 25.0989 20.6805 24.9341C21.9599 21.9185 24.8023 21.5683 25.7401 21.5368C25.9315 21.5307 26.0987 21.4011 26.1545 21.2169V21.2157ZM20.1656 19.259C20.176 19.259 20.1864 19.2589 20.1968 19.2587C20.9432 19.2422 21.5432 18.6319 21.5432 17.8814C21.5432 17.1206 20.9265 16.5039 20.1657 16.5039C20.1553 16.5039 20.1449 16.504 20.1345 16.5042C19.388 16.5207 18.788 17.131 18.788 17.8815C18.788 18.6423 19.4047 19.259 20.1656 19.259ZM22.5461 21.5471C22.5664 21.4751 22.577 21.4012 22.577 21.326C22.577 20.5652 21.4975 19.9484 20.1659 19.9484C18.9679 19.9484 17.974 20.4476 17.7866 21.1019C17.7655 21.1752 17.7545 21.2505 17.7545 21.3272C17.7545 22.0881 18.834 22.7048 20.1656 22.7048C21.3662 22.7048 22.3619 22.2034 22.5461 21.5471Z"
								fill="white"
							/>
						</>
					}
					title="Social Media"
					description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
					items={[
						'Undercollateralized lending & credit',
						'Credit card chargeback protection',
						'Zero-knowledge compliance with nationality, age and sanctions',
						'Private transaction mixer with daily amount limits and ZK compliance for MLP',
						'Private decentralized credit score',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#00C313"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M22.348 34.0754H26.1297C29.994 34.0754 32.4797 29.9732 30.6893 26.5479L28.7132 22.7662C26.7501 19.0084 21.3388 19.1061 19.5114 22.9324L17.7059 26.7141C16.0752 30.1286 18.5641 34.0754 22.348 34.0754ZM25.9297 27.04C25.9297 27.9736 25.1728 28.7304 24.2393 28.7304C23.3057 28.7304 22.5488 27.9736 22.5488 27.04C22.5488 26.1064 23.3057 25.3496 24.2393 25.3496C25.1728 25.3496 25.9297 26.1064 25.9297 27.04Z"
								fill="white"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21.6385 19.4231C23.1877 18.5638 25.1193 18.5584 26.6729 19.4231C27.1107 18.8213 27.5376 18.2042 27.7951 17.5079C28.0797 16.7376 28.1373 15.8446 27.7592 15.1156C27.3812 14.3867 26.4969 13.8967 25.7114 14.1368C24.8825 14.3899 24.3349 15.3405 23.4702 15.3796C22.9661 15.4024 22.4968 15.0972 21.9927 15.0874C21.3463 15.0754 20.7629 15.5817 20.5565 16.1955C20.3501 16.8093 20.4696 17.4937 20.7433 18.0804C20.9715 18.5693 21.2985 19.0027 21.6385 19.4221V19.4231Z"
								fill="white"
							/>
						</>
					}
					title="Wealth Distribution"
					description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
					items={[
						'Deduplication in government elections',
						'Novel DAO governance including quadratic, and conviction voting',
						'Anonymous online polls platform',
						'Snapshot integration',
						'Change.org integration',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#FFB11B"
					icon={
						<>
							<path
								d="M26.7807 23.4492H20.8666C18.9474 23.4492 17.3916 25.005 17.3916 26.9242V30.6007C17.3916 32.5199 18.9474 34.0756 20.8666 34.0756H26.7807C28.6998 34.0756 30.2556 32.5199 30.2556 30.6007V26.9242C30.2556 25.005 28.6998 23.4492 26.7807 23.4492Z"
								fill="white"
							/>
							<path
								d="M20.4967 19.6396C21.6077 19.6396 22.6272 19.9357 23.4306 20.4305C23.6485 20.5646 23.9253 20.5646 24.1433 20.4305C24.9457 19.9357 25.9661 19.6396 27.0772 19.6396C28.061 19.6396 28.9743 19.8721 29.7275 20.2685C30.257 20.5472 30.8637 20.0746 30.7219 19.493C29.9638 16.3836 27.1601 14.0757 23.8173 14.0757C20.4745 14.0757 17.6968 16.3634 16.9243 19.4506C16.7796 20.0293 17.3776 20.5057 17.91 20.2357C18.6507 19.8595 19.5399 19.6396 20.4967 19.6396Z"
								fill="white"
							/>
							<path
								d="M23.8232 24.3907V19.1421"
								stroke="white"
								strokeWidth="0.781214"
								strokeMiterlimit="10"
							/>
							<path
								d="M28.5352 24.4087L30.3464 19.6992"
								stroke="white"
								strokeWidth="0.791823"
								strokeMiterlimit="10"
							/>
							<path
								d="M19.1277 24.436L17.3164 19.7266"
								stroke="white"
								strokeWidth="0.791823"
								strokeMiterlimit="10"
							/>
							<path
								d="M22.0381 25.7671H25.6095"
								stroke="white"
								strokeWidth="0.781214"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</>
					}
					title="Token Airdrops"
					description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
					items={[
						'Undercollateralized lending & credit',
						'Credit card chargeback protection',
						'Zero-knowledge compliance with nationality, age and sanctions',
						'Private transaction mixer with daily amount limits and ZK compliance for MLP',
						'Private decentralized credit score',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#FF5A76"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M26.8423 15H21.1577C19.6155 15 18.1912 15.8227 17.4201 17.1574L14.5783 22.0797C13.8072 23.4145 13.8072 25.0598 14.5783 26.3945L15.3719 27.7691C16.5187 26.9944 17.6373 26.1621 18.7376 25.2997L18.7641 25.2789L18.7923 25.2605C20.5211 24.1317 21.7984 23.958 22.9163 24.2974C23.4315 24.4537 23.8683 24.708 24.2218 24.9161L24.2553 24.9359C24.6156 25.1481 24.8854 25.307 25.1749 25.4069C25.4464 25.5005 25.73 25.5381 26.0857 25.4657C26.4569 25.3902 26.9483 25.1862 27.6091 24.7246C28.7137 23.953 30.1935 22.5328 32.2556 20.0599L30.5798 17.1574C29.8088 15.8227 28.3845 15 26.8423 15ZM17.4201 31.3168L16.1527 29.1215C17.364 28.3073 18.534 27.4377 19.6715 26.5468C21.1301 25.6012 21.9225 25.6236 22.4638 25.7879C22.78 25.8839 23.0711 26.0462 23.4314 26.2584L23.5039 26.3012C23.8278 26.4926 24.2239 26.7266 24.6669 26.8794C25.1704 27.0531 25.7371 27.1262 26.3963 26.9921C27.0401 26.8611 27.7283 26.5414 28.5011 26.0016C29.6916 25.1701 31.1647 23.7571 33.0841 21.495L33.4217 22.0797C34.1928 23.4145 34.1928 25.0598 33.4217 26.3945L30.5798 31.3168C29.8088 32.6516 28.3845 33.4742 26.8423 33.4742H21.1577C19.6155 33.4742 18.1912 32.6516 17.4201 31.3168ZM23.0485 19.3294C23.0485 20.4112 22.1715 21.2882 21.0897 21.2882C20.0078 21.2882 19.1309 20.4112 19.1309 19.3294C19.1309 18.2476 20.0078 17.3706 21.0897 17.3706C22.1715 17.3706 23.0485 18.2476 23.0485 19.3294Z"
								fill="white"
							/>
						</>
					}
					title="NFTs"
					description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
					items={[
						'Deduplication in government elections',
						'Novel DAO governance including quadratic, and conviction voting',
						'Anonymous online polls platform',
						'Snapshot integration',
						'Change.org integration',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#C4554D"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M30.5169 17.8241H31.9026C32.9673 17.8241 33.8307 18.6875 33.8307 19.7521V20.7155C33.8307 21.7801 32.9686 22.6435 31.9026 22.6435H16.4808C15.4162 22.6435 14.5527 21.7801 14.5527 20.7155V19.7521C14.5527 18.6875 15.4148 17.8241 16.4808 17.8241H17.8666C17.7493 17.5256 17.6867 17.2004 17.6867 16.8607C17.6867 15.3963 18.8726 14.2104 20.3369 14.2104C21.9559 14.2104 23.3776 15.0512 24.1931 16.3184C25.0072 15.0499 26.4302 14.2104 28.0492 14.2104C29.5135 14.2104 30.6994 15.3976 30.6994 16.8607C30.6994 17.2004 30.6355 17.5256 30.5195 17.8241H30.5169ZM19.6121 17.8241H23.3163C22.9099 16.5662 21.7293 15.6548 20.3356 15.6548C19.6707 15.6548 19.131 16.1944 19.131 16.8593C19.131 17.2537 19.3203 17.6029 19.6134 17.8227L19.6121 17.8241ZM28.7687 17.8241C29.0618 17.6042 29.2511 17.2537 29.2511 16.8607C29.2511 16.1958 28.7114 15.6562 28.0465 15.6562C26.6528 15.6562 25.4722 16.5662 25.0658 17.8254H28.77L28.7687 17.8241ZM31.9013 24.0892H16.4795V32.2824C16.4795 33.347 17.3416 34.2104 18.4075 34.2104H29.9746C31.0392 34.2104 31.9026 33.347 31.9026 32.2824V24.0892H31.9013Z"
								fill="white"
							/>
						</>
					}
					title="Customer Incentives"
					description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
					items={[
						'Undercollateralized lending & credit',
						'Credit card chargeback protection',
						'Zero-knowledge compliance with nationality, age and sanctions',
						'Private transaction mixer with daily amount limits and ZK compliance for MLP',
						'Private decentralized credit score',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#39B8A8"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M19.0537 14.2104H28.592C30.4084 14.2104 32.0423 15.4546 32.7183 17.3539L33.4759 19.4856C33.7053 20.1311 33.8643 20.8209 33.697 21.4858C33.3017 23.059 32.0147 24.2105 30.49 24.2105C28.6486 24.2105 27.1557 22.5323 27.1557 20.4601C27.1557 22.5309 25.6641 24.2105 23.8228 24.2105C21.9815 24.2105 20.4899 22.5323 20.4899 20.4601C20.4899 22.5309 18.997 24.2105 17.1557 24.2105C15.6309 24.2105 14.3453 23.059 13.9486 21.4858C13.7813 20.8223 13.9389 20.1311 14.1698 19.4856L14.9273 17.3539C15.6019 15.456 17.2359 14.2104 19.0537 14.2104ZM15.8231 25.5113V30.2099C15.8231 32.4189 17.6146 34.2105 19.8236 34.2105H20.8231V32.2102C20.8231 30.5527 22.1654 29.2105 23.8228 29.2105C25.4803 29.2105 26.8225 30.5541 26.8225 32.2102V34.2105H27.822C30.031 34.2105 31.8226 32.4203 31.8226 30.2099V25.5113C31.4037 25.6412 30.9572 25.7103 30.49 25.7103C29.1532 25.7103 28.0003 25.1477 27.1557 24.2657C26.3125 25.1477 25.1596 25.7103 23.8228 25.7103C22.4861 25.7103 21.3332 25.1477 20.4899 24.2657C19.6453 25.1477 18.4924 25.7103 17.1557 25.7103C16.6871 25.7103 16.2419 25.6398 15.8231 25.5113Z"
								fill="white"
							/>
						</>
					}
					title="Marketplaces"
					description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
					items={[
						'Deduplication in government elections',
						'Novel DAO governance including quadratic, and conviction voting',
						'Anonymous online polls platform',
						'Snapshot integration',
						'Change.org integration',
					]}
					linkHref="#" // FIXME: add link
				/>

				<UseCasesListItem
					color="#8A67AB"
					icon={
						<>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M20.1027 14.2095C20.5024 14.2095 20.8261 14.5332 20.8261 14.9329V16.3786H27.0909V14.9329C27.0909 14.5332 27.4146 14.2095 27.8143 14.2095C28.214 14.2095 28.5378 14.5332 28.5378 14.9329V16.3786H28.7789C30.908 16.3786 32.6348 18.1053 32.6348 20.2344V20.9578H15.2862V20.2344C15.2862 18.1053 17.0129 16.3786 19.142 16.3786H19.3832V14.9329C19.3832 14.5332 19.707 14.2095 20.1067 14.2095H20.1027ZM15.2836 22.4021H32.6321V30.3536C32.6321 32.4827 30.9054 34.2095 28.7763 34.2095H19.138C17.0089 34.2095 15.2822 32.4827 15.2822 30.3536V22.4021H15.2836Z"
								fill="white"
							/>
						</>
					}
					title="Events"
					description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
					items={[
						'Undercollateralized lending & credit',
						'Credit card chargeback protection',
						'Zero-knowledge compliance with nationality, age and sanctions',
						'Private transaction mixer with daily amount limits and ZK compliance for MLP',
						'Private decentralized credit score',
					]}
					linkHref="#" // FIXME: add link
				/>
			</div>

			<h2 className="m-0 mt-12 font-bold text-xl text-black text-center">Join Worldcoin builder community</h2>
			<div className="mt-6 grid md:grid-cols-3 gap-y-6 items-center justify-center">
				<div className="flex flex-col items-center w-[250px]">
					<div className="font-bold text-black text-[64px] leading-[64px]">5.4m</div>
					<div className="mt-2 text-xs text-black/50 leading-4">Developer verifications</div>
				</div>
				<div className="flex flex-col items-center w-[250px]">
					<div className="font-bold text-black text-[64px] leading-[64px]">1.5m</div>
					<div className="mt-2 text-xs text-black/50 leading-4">Biometric credentials</div>
				</div>
				<div className="flex flex-col items-center w-[250px]">
					<div className="font-bold text-black text-[64px] leading-[64px]">42.5k</div>
					<div className="mt-2 text-xs text-black/50 leading-4">Phone credentials</div>
				</div>
			</div>
			<div className="mt-6 text-2xs text-black/50 text-center">
				*as World ID is a fully open protocol and anyone can build their own implementations, it is not possible
				to have numbers on all usage and holders.
			</div>

			<div className="grid gap-y-2 mt-24">
				<h3 className="uppercase text-2xs m-0 font-medium text-gray-500">
					Learn how to use the Developer Portal
				</h3>

				<div className="grid lg:grid-cols-3 gap-2">
					<LinkCard
						href="https://developer.worldcoin.org/"
						heading="Start building"
						description="Build your apps using developer portal."
					/>

					<LinkCard
						href="#" // FIXME: Add proper url
						heading="Worldcoin Grants"
						description="Reach out to our team and talk about all the possibilities."
					/>

					<LinkCard
						href="https://discord.gg/worldcoin"
						heading="Join our Discord community"
						description="Jam on ideas, see what others are building, ask questions. Look for the #developers channel."
					/>
				</div>
			</div>
		</div>
	)
}
