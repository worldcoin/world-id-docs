import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import WorldcoinDocs from './icons/WorldcoinDocs'

export const config = {
	runtime: 'edge',
}

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	const title = searchParams.get('title')

	const twkLausanne300 = await fetch('/fonts/TWKLausanne-300.woff')
	const twkLausanne450 = await fetch('/fonts/TWKLausanne-450.woff')

	const twkLausanne300Data = await twkLausanne300.arrayBuffer()
	const twkLausanne450Data = await twkLausanne450.arrayBuffer()

	return new ImageResponse(
		(
			<div tw="flex flex-col w-full h-full bg-white px-24 py-28 border-2 border-gray-300 rounded-xl">
				<WorldcoinDocs tw="w-[675px] h-16 text-gray-900" />

				<hr tw="bg-[#9ba3ae] w-full h-px mt-8 mb-[130px]" />

				<div tw="flex flex-col">
					{category && (
						<span
							tw="text-[56px] text-gray-500 leading-none"
							style={{ fontFamily: 'TWK Lausanne', fontWeight: '300' }}
						>
							{category}
						</span>
					)}

					<span
						tw="text-[124px] text-gray-900 leading-[1] mt-8"
						style={{ fontFamily: 'TWK Lausanne', fontWeight: '450' }}
					>
						{title}
					</span>
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
			fonts: [
				{ name: 'TWK Lausanne', data: twkLausanne300Data, style: 'normal', weight: 300 },
				{ name: 'TWK Lausanne', data: twkLausanne450Data, style: 'normal', weight: 400 },
			],
		}
	)
}
