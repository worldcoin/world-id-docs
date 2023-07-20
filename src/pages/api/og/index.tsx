import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import WorldcoinDocs from './icons/WorldcoinDocs'
import LogoIcon from '@/components/icons/LogoIcon'

export const config = {
	runtime: 'edge',
}

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	const title = searchParams.get('title')
	const description = searchParams.get('description')

	const gtAmerica500 = await fetch(
		'https://world-id-public.s3.amazonaws.com/docs/gt-america-standard-medium-webfont.woff'
	)

	const gtAmerica900 = await fetch(
		'https://world-id-public.s3.amazonaws.com/docs/gt-america-standard-bold-webfont.woff'
	)

	const gtAmerica500Data = await gtAmerica500.arrayBuffer()
	const gtAmerica900Data = await gtAmerica900.arrayBuffer()

	return new ImageResponse(
		(
			<div tw="flex flex-col w-full h-full bg-white px-24 py-28 border-2 border-gray-300 rounded-xl">
				<WorldcoinDocs tw="w-[675px] h-16 text-gray-900" />

				<hr tw="bg-[#9ba3ae] w-full h-px mt-8 mb-[130px]" />

				<div tw="flex flex-col">
					<span
						tw="text-[56px] text-gray-500 leading-none"
						style={{ fontFamily: 'GT America 500' }}
					>{`${category} / ${title}`}</span>

					<span
						tw="text-[124px] text-gray-900 leading-[1] mt-8 font-bold"
						style={{ fontFamily: 'GT America 900' }}
					>
						{description}
					</span>
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
			fonts: [
				{
					name: 'GT America 900',
					data: gtAmerica900Data,
					style: 'normal',
				},
				{
					name: 'GT America 500',
					data: gtAmerica500Data,
					style: 'normal',
				},
			],
		}
	)
}
