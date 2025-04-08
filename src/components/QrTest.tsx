import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export const QRCodeGenerator: React.FC = (props: { appId?: string; hideInput?: boolean }) => {
	const [appId, setAppId] = useState<string>(props.appId || '')
	const [isValid, setIsValid] = useState<boolean>(true)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const regex = /^app_[a-f0-9]+$/
		setAppId(event.target.value)
		setIsValid(regex.test(value))
	}

	return (
		<div>
			{!props.hideInput && (
				<input
					type="text"
					placeholder="Enter App Id (eg. app_f88bb2a....)"
					value={appId}
					onChange={handleInputChange}
					className="rounded-lg p-2 border-2 w-96"
				/>
			)}
			{!isValid && <p style={{ color: 'red' }}>Invalid App Id. Eg. app_xxxxxxxxxxx</p>}
			<div style={{ marginTop: '20px' }}>
				{appId && isValid && (
					<QRCodeCanvas value={`https://worldcoin.org/mini-app?app_id=${appId}`} size={200} />
				)}
				{!appId ||
					(!isValid && (
						<div className="h-[200px] w-[200px] bg-gray-100 rounded-lg text-red-700 items-center flex justify-center font-bold"></div>
					))}
			</div>
		</div>
	)
}
