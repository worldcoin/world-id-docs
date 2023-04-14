const activatedRewardCountQuery = `query ActivatedRewardCount ($lastWeekStart: timestamptz, $lastWeekEnd: timestamptz) {
  lastWeekSignups: activatedReward_aggregate (where: {
    _and: [{createdAt: {_gte: $lastWeekStart}}, {createdAt: {_lte: $lastWeekEnd}}]
  }) {
    aggregate {
        count
    }
  }

  totalSignups: activatedReward_aggregate {
    aggregate {
      count
    }
  }
}`

export const fetchActivatedReward = async (lastWeekStart: string, lastWeekEnd: string) =>
	await fetch(process.env.NEXT_PUBLIC_OPERATOR_GRAPHQL_API_URL!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: activatedRewardCountQuery,
			variables: { lastWeekStart, lastWeekEnd },
		}),
	})
