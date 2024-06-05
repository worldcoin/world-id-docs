import { FC, SVGAttributes } from 'react'

const SuccessIcon: FC<SVGAttributes<SVGElement>> = props => (
	<svg width="88" height="89" viewBox="0 0 88 89" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_19560_45108)">
			<rect y="0.5" width="88" height="88" rx="44" fill="#E5F9E7" />
			<g filter="url(#filter0_d_19560_45108)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M43.9987 61.1673C53.2034 61.1673 60.6654 53.7054 60.6654 44.5007C60.6654 35.2959 53.2034 27.834 43.9987 27.834C34.794 27.834 27.332 35.2959 27.332 44.5007C27.332 53.7054 34.794 61.1673 43.9987 61.1673ZM51.6521 40.2681C52.0759 39.7232 51.9777 38.9379 51.4328 38.514C50.8879 38.0902 50.1025 38.1883 49.6787 38.7333L43.0003 47.3197C42.8518 47.5107 42.5725 47.5354 42.3927 47.3736L38.1682 43.5716C37.6551 43.1098 36.8647 43.1514 36.4029 43.6645C35.9411 44.1776 35.9827 44.968 36.4958 45.4298L40.7203 49.2318C41.9789 50.3645 43.9342 50.1911 44.9737 48.8546L51.6521 40.2681Z"
					fill="#00C313"
				/>
			</g>
		</g>
		<defs>
			<filter
				id="filter0_d_19560_45108"
				x="-6"
				y="4.5"
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
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.764706 0 0 0 0 0.0745098 0 0 0 0.5 0" />
				<feBlend mode="darken" in2="BackgroundImageFix" result="effect1_dropShadow_19560_45108" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19560_45108" result="shape" />
			</filter>
			<clipPath id="clip0_19560_45108">
				<rect y="0.5" width="88" height="88" rx="44" fill="white" />
			</clipPath>
		</defs>
	</svg>
)

export default SuccessIcon
