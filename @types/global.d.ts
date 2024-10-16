// global.d.ts
interface Ethereum {
	isMetaMask?: boolean
	request: (args: { method: string; params?: Array<any> }) => Promise<any>
}

interface Window {
	ethereum?: Ethereum
}
