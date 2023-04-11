import { FC, SVGAttributes } from 'react'

const RedirectIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M12.4271 8.31246V11.8773C12.4271 12.5032 11.931 12.9994 11.305 12.9994H4.11431C3.48836 12.9994 2.99219 12.5032 2.99219 11.8773V4.68657C2.99219 4.06063 3.48836 3.56445 4.11431 3.56445H7.67913"
			stroke="currentColor"
			strokeMiterlimit="10"
		/>
		<path d="M7.35938 8.55715L12.9852 3" stroke="currentColor" strokeMiterlimit="10" />
		<path d="M9.36719 3H12.9931V6.62589" stroke="currentColor" strokeMiterlimit="10" />
	</svg>
)

export default RedirectIcon
