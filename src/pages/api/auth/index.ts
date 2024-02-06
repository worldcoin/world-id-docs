
import { NextApiRequest, NextApiResponse } from "next"
import { redirect } from "next/dist/server/api-utils"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const url = new URL(req.url!, process.env.NEXT_PUBLIC_APP_URL)
	const params = new URLSearchParams(url.search)
	const code = params.get('code')
	const state = params.get('state')

	// TODO: Properly generate and store temporary nonces to exemplify proper usage

    if (!code) {
		return redirect(res, `${process.env.NEXT_PUBLIC_APP_URL}/try-callback/?error=code_not_provided`)
	}

	if (!state) {
		return redirect(res, `${process.env.NEXT_PUBLIC_APP_URL}/try-callback/?error=state_not_provided`)
    }

	const client_id = (state == "production") ? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP : process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP
	const client_secret = state == "production" ? process.env.PROD_CLIENT_SECRET : process.env.STAGING_CLIENT_SECRET

	const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_SIGN_IN_WITH_WORLDCOIN_ENDPOINT}/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			client_id: client_id!,
			client_secret: client_secret!,
			redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
		}).toString(),
	})

	if (!tokenResponse.ok) {
		return redirect(res, `${process.env.NEXT_PUBLIC_APP_URL}/try-callback/?error=token_endpoint_error`)
	}

	const access_token = (await tokenResponse.json()).access_token

    return redirect(res, `${process.env.NEXT_PUBLIC_APP_URL}/try-callback/?token=${access_token}`)
}