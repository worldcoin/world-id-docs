import { FC, SVGAttributes } from 'react'

const ChevronRightIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M10 7L14 12L10 17"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export default ChevronRightIcon
