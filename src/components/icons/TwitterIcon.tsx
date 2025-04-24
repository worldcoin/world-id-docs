import { FC, SVGAttributes } from 'react'

const TwitterIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
		<path
			d="M11.9 8.45L19.35 0h-1.76L11.12 7.35L5.96 0H0L7.81 11.11L0 20h1.76l6.84-7.8L14.05 20H20L11.9 8.45zM9.49 11.2l-0.8-1.11L2.4 1.3h2.71l5.08 7.1l0.81 1.1l6.6 9.2h-2.71L9.49 11.2z"
			fill="currentColor"
		/>
	</svg>
)

export default TwitterIcon
