import { FC, SVGAttributes } from 'react'

const CheckIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			opacity="0.1"
			d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.4605 6.40802C14.7874 6.66232 14.8463 7.13353 14.592 7.46049L10.585 12.6123C9.9613 13.4143 8.78809 13.5183 8.03296 12.8387L5.49828 10.5575C5.1904 10.2804 5.16544 9.80619 5.44254 9.49831C5.71963 9.19043 6.19385 9.16547 6.50173 9.44256L9.03641 11.7238C9.14429 11.8209 9.31189 11.806 9.40099 11.6914L13.408 6.53958C13.6623 6.21262 14.1335 6.15372 14.4605 6.40802Z"
			fill="currentColor"
		/>
	</svg>
)

export default CheckIcon
