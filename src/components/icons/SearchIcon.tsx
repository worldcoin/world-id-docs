import { FC, SVGAttributes } from 'react'

const SearchIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
		/>
	</svg>
)

export default SearchIcon
