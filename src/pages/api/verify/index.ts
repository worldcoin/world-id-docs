import type { NextApiRequest, NextApiResponse } from 'next'
import { IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit'

export const config = {
	api: {
		externalResolver: true,
	},
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IVerifyResponse>) {
	const proof = {
		nullifier_hash: req.body.nullifier_hash,
		merkle_root: req.body.merkle_root,
		proof: req.body.proof,
		verification_level: req.body.verification_level,
	}

	const app_id =
		req.body.env === 'production'
			? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP
			: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP

    const wldResponse: IVerifyResponse = await verifyCloudProof(proof, app_id as `app_${string}`, req.body.action)

    if (wldResponse.success) {
        res.status(200).send(wldResponse)
    } else {
        res.status(400).send(wldResponse)
    }
}
