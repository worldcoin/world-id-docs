import { FC, SVGAttributes } from 'react'

const AnchorIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg viewBox="0 0 20 20" fill="none" strokeLinecap="round" aria-hidden="true" {...props}>
		<path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
	</svg>
)

export default AnchorIcon
