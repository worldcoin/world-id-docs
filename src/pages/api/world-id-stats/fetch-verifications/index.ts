import dayjs from 'dayjs'
import { fetchStat } from './fetch-stat'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchActivatedReward } from './fetch-activated-reward'
dayjs.Ls.en.weekStart = 1
const format = 'YYYY-MM-DD'

const fetchVerifications = async (_request: NextApiRequest, response: NextApiResponse) => {
	const lastWeekStart = dayjs().subtract(7, 'day').startOf('week').format()
	const lastWeekEnd = dayjs(lastWeekStart).endOf('week').format()

	try {
		const totalData = fetchStat('2021-01-01', dayjs().format(format))
		const lastWeekData = fetchStat(lastWeekStart, lastWeekEnd)
		const totalResult = await (await totalData).json()
		const lastWeekResult = await (await lastWeekData).json()
		const activatedRewardCountData = await (await fetchActivatedReward(lastWeekStart, lastWeekEnd)).json()

		return response.json({
			lastWeekCount: lastWeekResult.count,
			totalCount: totalResult.count,
			totalSignups: activatedRewardCountData?.data?.totalSignups?.aggregate?.count,
			lastWeekSignups: activatedRewardCountData?.data?.lastWeekSignups?.aggregate?.count,
			success: true,
		})
	} catch (error) {
		console.error(error)
		return response.status(500).json({ error: 'Error fetching', success: false })
	}
}

export default fetchVerifications
