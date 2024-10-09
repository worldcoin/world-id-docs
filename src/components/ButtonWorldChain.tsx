import clsx from 'clsx'
import { Link } from '@/components/Link'
import ArrowIcon from './icons/ArrowIcon'
import type { AllHTMLAttributes, FC, PropsWithChildren } from 'react'

const variantStyles = {
	primary:
		'rounded-lg bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300',
	neutral: 'rounded-lg bg-gray-200 py-1 px-3 text-gray-900 hover:bg-gray-100/60',
	text: 'text-primary dark:text-emerald-400 dark:hover:text-primary',
}

type Props = PropsWithChildren<
	{
		variant?: keyof typeof variantStyles
		className?: string
		arrow?: 'left' | 'right'
		testnet?: boolean
	} & AllHTMLAttributes<HTMLElement>
>

export const ButtonWorldChain: FC<Props> = ({ variant = 'primary', className = '', children, arrow, ...props }) => {
	let Component = props.href ? Link : 'button'

	let arrowIcon = (
		<ArrowIcon
			className={clsx(
				'mt-0.5 h-5 w-5',
				variant === 'text' && 'relative top-px',
				arrow === 'left' && '-ml-1 rotate-180',
				arrow === 'right' && '-mr-1'
			)}
		/>
	)

	const addWorldChainToMetaMask = async (testnet: boolean) => {
		if (window.ethereum && testnet == false) {
			try {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x1e0', // Replace with World Chain's Chain ID
							chainName: 'World Chain',
							nativeCurrency: {
								name: 'Ether',
								symbol: 'ETH', // Replace with World Chain's native token symbol
								decimals: 18,
							},
							rpcUrls: ['https://worldchain-mainnet.g.alchemy.com/public'], // Replace with World Chain RPC URL
							blockExplorerUrls: ['worldchain-mainnet.explorer.alchemy.com'], // Replace with World Chain explorer URL
						},
					],
				})
				console.log('World Chain added to MetaMask')
			} catch (error) {
				console.error('Failed to add World Chain to MetaMask', error)
			}
		} else if (window.ethereum && testnet == true) {
			try {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x12C1',
							chainName: 'World Chain Sepolia Testnet',
							nativeCurrency: {
								name: 'Ether',
								symbol: 'ETH',
								decimals: 18,
							},
							rpcUrls: ['https://worldchain-sepolia.g.alchemy.com/public'], // Replace with World Chain Testnet RPC URL
							blockExplorerUrls: ['worldchain-seolia.explorer.alchemy.com'], // Replace with World Chain Testnet explorer URL
						},
					],
				})
				console.log('World Chain Testnet added to MetaMask')
			} catch (error) {
				console.error('Failed to add World Chain Testnet to MetaMask', error)
			}
		} else {
			alert('MetaMask is not installed. Please install MetaMask and try again.')
		}
	}

	return (
		// @ts-ignore
		<Component
			{...props}
			onClick={() => addWorldChainToMetaMask(props.testnet ?? false)}
			className={clsx(
				'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
				variantStyles[variant],
				className
			)}
		>
			{arrow === 'left' && arrowIcon}
			{children}
			{arrow === 'right' && arrowIcon}
		</Component>
	)
}
