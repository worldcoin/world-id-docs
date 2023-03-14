import { FC, SVGAttributes } from 'react'

const XIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" {...props}>
		<path d="m1.5 1 7 7M8.5 1l-7 7" />
	</svg>
)

export default XIcon
