import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		externalResolver: true,
	},
}

// creates a new "try it out" action in the Worldcoin Developer Portal
// replaces dynamic action creation functionality
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const action = req.body.action
	const app_id =
		req.body.isStaging
			? process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP
			: process.env.NEXT_PUBLIC_TRY_IT_OUT_APP

    const devPortalResponse = await fetch(`https://developer.worldcoin.org/api/v2/create-action/${app_id}`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            name: action,
            description: "test World ID in the Worldcoin Developer Documentation.",
            max_verifications: 1,
        }),
    })

    if (devPortalResponse.ok) {
        res.status(200)
    } else {
        res.status(400)
    }
}
