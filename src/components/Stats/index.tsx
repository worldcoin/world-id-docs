import clsx from 'clsx'
import useSWR from 'swr'
import { Item } from './Item'
import { FC, memo, useMemo } from 'react'

const simplifyNumber = (number: number) => {
	if (number > 10 ** 6) {
		return (number / 10 ** 6).toFixed(1) + 'm'
	}

	if (number > 10 ** 3) {
		return (number / 10 ** 3).toFixed(1) + 'k'
	}

	return number.toString()
}

export const Stats: FC<{ className?: string }> = ({ className }) => {
	const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(response => response.json())

	const { data, isLoading } = useSWR<
		{
			lastWeekCount: number
			totalCount: number
			totalSignups: number
			lastWeekSignups: number
			success: true
		},
		{ error: string }
	>(`${process.env.NEXT_PUBLIC_APP_URL}/api/world-id-stats/fetch-verifications`, fetcher)

	const stats = useMemo(
		() => [
			{
				total: simplifyNumber(data?.totalCount || 0),
				lastWeek: data?.lastWeekCount || 0,
				footnote: 'Developer verifications',
				isLoading,
			},
			{
				total: simplifyNumber(data?.totalSignups || 0),
				lastWeek: data?.lastWeekSignups || 0,
				footnote: 'Biometric credentials',
				isLoading,
			},
			{
				total: simplifyNumber(42500),
				lastWeek: 8830,
				footnote: 'Phone credentials',
			},
		],
		[data, isLoading]
	)

	if (!data) return null

	return (
		<section className={clsx(className, 'grid gap-y-12')}>
			<div className="grid gap-6 md:grid-cols-3">
				{stats.map(item => (
					<Item
						key={item.footnote}
						total={item.total}
						lastWeek={item.lastWeek}
						footnote={item.footnote}
						isLoading={item.isLoading}
					/>
				))}
			</div>
		</section>
	)
}

export default memo(Stats)
