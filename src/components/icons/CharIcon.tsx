import { FC, SVGAttributes } from 'react'

const ChartIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M2.98438 18.1144L9.86213 9.00423L13.2862 13.2135L18.4149 6.85547"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M20.1391 9.16788V16.3501C20.1391 18.9256 18.0342 21.0008 15.4551 21.0008H7.18398C4.59 21.0008 2.5 18.9109 2.5 16.3501V8.432C2.5 5.85642 4.60483 3.78125 7.18398 3.78125H15.4551"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M19.4682 7.03261C20.5898 7.03261 21.4989 6.12988 21.4989 5.0163C21.4989 3.90272 20.5898 3 19.4682 3C18.3467 3 17.4375 3.90272 17.4375 5.0163C17.4375 6.12988 18.3467 7.03261 19.4682 7.03261Z"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeMiterlimit="10"
		/>
	</svg>
)

export default ChartIcon
