import clsx from 'clsx'
import { Link } from '@/components/Link'
import { Heading } from '@/components/Heading'
import { FC, Fragment, PropsWithChildren, ReactNode } from 'react'
export { Button } from '@/components/Button'
import InfoIcon from './icons/InfoIcon'
import Tabs, { TabItem, Tab } from './Tabs'
import DangerIcon from './icons/DangerIcon'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
export { Cta } from '@/components/Cta'
export { UseCasePagination } from '@/components/UseCasePagination'
export { UseCasePaginationItem } from '@/components/UseCasePaginationItem'
export { UseCaseHeader } from '@/components/UseCaseHeader'
export { UseCasesList } from '@/components/UseCasesList'
export { Tabs, TabItem, Tab, Link as a }
export const h2: FC<
	PropsWithChildren<{
		id: string
		tag?: 'get' | 'post' | 'put' | 'delete'
		label?: string
		anchor?: boolean
	}>
> = props => <Heading level={2} {...props} />

export const Note: FC<PropsWithChildren<{ type?: 'info' | 'danger' | 'warning' }>> = ({ children, type = 'info' }) => (
	<div
		className={clsx(
			type == 'info' && 'border-gray-500/20 bg-gray-50/50 text-gray-700',
			type == 'warning' && 'border-yellow-500/20 bg-yellow-50/50 text-yellow-700 prose-strong:text-yellow-700',
			type == 'danger' && 'border-red-500/20 bg-red-50/50 text-red-700 prose-strong:text-red-700',
			'my-6 flex gap-2.5 rounded-2xl border p-4 leading-6'
		)}
	>
		{type == 'info' && <InfoIcon className="mt-1 h-4 w-4 flex-none fill-gray-500 stroke-white" />}
		{type == 'danger' && <DangerIcon className="mt-1 h-5 w-5 flex-none fill-red-500 stroke-white" />}
		{type == 'warning' && <DangerIcon className="mt-1 h-5 w-5 flex-none fill-warning-500 stroke-white" />}
		<div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
	</div>
)

export const Row: FC<PropsWithChildren<{}>> = ({ children }) => (
	<div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">{children}</div>
)

export const Col: FC<PropsWithChildren<{ sticky?: boolean }>> = ({ children, sticky = false }) => (
	<div className={clsx('[&>:first-child]:mt-0 [&>:last-child]:mb-0', sticky && 'xl:sticky xl:top-24')}>
		{children}
	</div>
)

export const Properties: FC<PropsWithChildren<{}>> = ({ children }) => (
	<div className="my-6">
		<ul
			role="list"
			className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0"
		>
			{children}
		</ul>
	</div>
)

export const Property: FC<
	PropsWithChildren<{
		name: string
		type: string
	}>
> = ({ name, type, children }) => (
	<li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
		<dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
			<dt className="sr-only">Name</dt>
			<dd>
				<code>{name}</code>
			</dd>
			<dt className="sr-only">Type</dt>
			<dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{type}</dd>
			<dt className="sr-only">Description</dt>
			<dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</dd>
		</dl>
	</li>
)

export const Steps: FC<{ steps: Array<ReactNode>; borders?: boolean }> = props => (
	<div className="grid items-center gap-2 lg:grid-flow-col">
		{props.steps.map((step, index) => (
			<Fragment key={index}>
				{index !== 0 && (
					<svg
						width="24"
						height="25"
						viewBox="0 0 24 25"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 rotate-90 justify-self-center text-000000 lg:rotate-0"
					>
						<path d="M4.00021 11.5014C3.65424 11.5014 3.37377 11.7819 3.37377 12.1278C3.37377 12.4738 3.65424 12.7543 4.00021 12.7543L4.00021 11.5014ZM19.8259 12.7543C20.1719 12.7543 20.4524 12.4738 20.4524 12.1278C20.4524 11.7819 20.1719 11.5014 19.8259 11.5014L19.8259 12.7543ZM14.9907 16.688C14.758 16.9439 14.7768 17.3401 15.0328 17.5729C15.2888 17.8056 15.685 17.7868 15.9177 17.5308L14.9907 16.688ZM20.0002 12.1094L20.4637 12.5308C20.681 12.2919 20.681 11.9269 20.4637 11.688L20.0002 12.1094ZM15.9177 6.68796C15.685 6.43197 15.2888 6.41313 15.0328 6.64587C14.7768 6.87861 14.758 7.27481 14.9907 7.53079L15.9177 6.68796ZM17.7272 14.6094L18.1907 15.0308L17.7272 14.6094ZM4.00021 12.7543L19.8259 12.7543L19.8259 11.5014L4.00021 11.5014L4.00021 12.7543ZM14.9907 7.53079L19.5367 12.5308L20.4637 11.688L15.9177 6.68796L14.9907 7.53079ZM15.9177 17.5308L18.1907 15.0308L17.2637 14.188L14.9907 16.688L15.9177 17.5308ZM18.1907 15.0308L20.4637 12.5308L19.5367 11.688L17.2637 14.188L18.1907 15.0308Z" />
					</svg>
				)}
				<div
					className={clsx('flex justify-center', {
						'rounded-xl border border-neutral-100 p-4': props.borders,
					})}
				>
					{step}
				</div>
			</Fragment>
		))}
	</div>
)

export const Tag: FC<PropsWithChildren<{}>> = ({ children }) => (
	<span className="rounded-md bg-accents-warning-200 px-2 py-1 font-bold text-accents-warning-700">{children}</span>
)

export const Fence: FC<
	PropsWithChildren<{
		className?: string
	}>
> = (props: { children?: ReactNode; className?: string }) => (
	<div
		className={clsx(
			'pre relative rounded-lg border border-neutral-200 flex items-center justify-center',
			props.className
		)}
	>
		<pre className="m-0 max-w-[calc(100vw_-_32px)] overflow-auto">{props.children}</pre>
	</div>
)
