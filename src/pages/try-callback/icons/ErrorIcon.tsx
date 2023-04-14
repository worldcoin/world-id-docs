import { FC, SVGAttributes } from 'react'

const ErrorIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#clip0_19560_45154)">
			<rect width="88" height="88" rx="44" fill="#FFF0ED" />
			<g filter="url(#filter0_d_19560_45154)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M40.612 30.9432C42.0881 28.3523 45.9093 28.3523 47.3854 30.9432L60.1722 53.3874C61.6069 55.9055 59.7396 59 56.7856 59H31.2118C28.2578 59 26.3905 55.9055 27.8251 53.3874L40.612 30.9432ZM45.6653 52.3333C45.6653 53.2538 44.9191 54 43.9986 54C43.0781 54 42.3319 53.2538 42.3319 52.3333C42.3319 51.4129 43.0781 50.6667 43.9986 50.6667C44.9191 50.6667 45.6653 51.4129 45.6653 52.3333ZM45.2486 39C45.2486 38.3096 44.689 37.75 43.9986 37.75C43.3082 37.75 42.7486 38.3096 42.7486 39V47.3333C42.7486 48.0237 43.3082 48.5833 43.9986 48.5833C44.689 48.5833 45.2486 48.0237 45.2486 47.3333V39Z"
					fill="#FF6848"
				/>
			</g>
		</g>
		<defs>
			<filter
				id="filter0_d_19560_45154"
				x="-6"
				y="4"
				width="100"
				height="100"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="10" />
				<feGaussianBlur stdDeviation="15" />
				<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.407843 0 0 0 0 0.282353 0 0 0 0.5 0" />
				<feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_19560_45154" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19560_45154" result="shape" />
			</filter>
			<clipPath id="clip0_19560_45154">
				<rect width="88" height="88" rx="44" fill="white" />
			</clipPath>
		</defs>
	</svg>
)

export default ErrorIcon
