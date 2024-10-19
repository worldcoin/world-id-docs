import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export const QRCodeGenerator: React.FC = () => {
	const [url, setUrl] = useState<string>('')
	const [isValid, setIsValid] = useState<boolean>(true)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const regex = /^app_[a-f0-9]+$/
		setUrl(event.target.value)
		setIsValid(regex.test(value))
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Enter App Id eg. app_f88bb2a...."
				value={url}
				onChange={handleInputChange}
				className="rounded-lg p-2 border-2 w-96"
			/>
			{!isValid && <p style={{ color: 'red' }}>Invalid App Id. Eg. app_xxxxxxxxxxx</p>}
			<div style={{ marginTop: '20px' }}>
				{url && isValid && <QRCodeCanvas value={`https://worldcoin.org/mini-app?app_id=${url}`} size={200} />}
				{!url ||
					(!isValid && (
						<div className="h-[200px] w-[200px] bg-gray-100 rounded-lg text-red-700 items-center flex justify-center font-bold"></div>
					))}
			</div>
		</div>
	)
}
