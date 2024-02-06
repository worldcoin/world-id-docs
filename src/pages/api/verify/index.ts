import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		externalResolver: true,
	},
}

export type VerifyReply = {
	code: string
	detail: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<VerifyReply>) {
	const reqBody = {
		nullifier_hash: req.body.nullifier_hash,
		merkle_root: req.body.merkle_root,
		proof: req.body.proof,
		verification_level: req.body.verification_level,
		action: req.body.action,
	}

	const app_id =
		req.body.env === 'production'
			? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP
			: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP

	const verifyEndpoint = `https://developer.worldcoin.org/api/v1/verify/${app_id}`

	fetch(verifyEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reqBody),
	}).then(verifyRes => {
		verifyRes.json().then(wldResponse => {
			console.log(`Received ${verifyRes.status} response from World ID /verify endpoint:\n`, wldResponse)
			if (verifyRes.status == 200) {
				res.status(verifyRes.status).send({
					code: 'success',
					detail: 'This action verified correctly!',
				})
			} else {
				res.status(verifyRes.status).send({ code: wldResponse.code, detail: wldResponse.detail })
			}
		})
	})
	//   });
}
