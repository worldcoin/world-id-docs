export const fetchStat = async (start: string, end: string) =>
	await fetch(process.env.NEXT_PUBLIC_VERIFICATIONS_STATS!, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.NEXT_SERVER_VERIFICATIONS_STATS_AUTH_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			start,
			end,
			filter_dev_portal: false,
			filter_wld_claims: false,
			filter_airdrops: false,
			filter_phones: false,
			filter_tests: false,
		}),
	})
