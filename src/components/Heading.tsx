import Link from 'next/link'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { useInView } from 'framer-motion'
import AnchorIcon from '@/components/icons/AnchorIcon'
import { useSectionStore } from '@/components/SectionProvider'
import { FC, PropsWithChildren, useEffect, useRef } from 'react'

const Eyebrow: FC<{
	tag?: 'get' | 'post' | 'put' | 'delete'
	label?: string
}> = ({ tag, label }) => {
	if (!tag && !label) return null

	return (
		<div className="flex items-center gap-x-3 mb-2">
			{tag && <Tag>{tag}</Tag>}
			{tag && label && <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />}
			{label && <span className="font-mono text-xs text-zinc-400">{label}</span>}
		</div>
	)
}

const Anchor: FC<
	PropsWithChildren<{
		id: string
		inView: boolean
	}>
> = ({ id, inView, children }) => (
	<Link href={`#${id}`} className="group text-inherit no-underline hover:text-inherit">
		{inView && (
			<div className="absolute mt-1 ml-[calc(-1*var(--width))] hidden w-[var(--width)] opacity-0 transition [--width:calc(1.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
				<div className="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600">
					<AnchorIcon className="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white" />
				</div>
			</div>
		)}
		{children}
	</Link>
)

export const Heading: FC<
	PropsWithChildren<{
		level: number
		id: string
		tag?: 'get' | 'post' | 'put' | 'delete'
		label?: string
		anchor?: boolean
	}>
> = ({ level = 2, children, id, tag, label, anchor = true, ...props }) => {
	let Component = `h${level}`
	let ref = useRef<HTMLHeadingElement>(null)
	let registerHeading = useSectionStore(s => s.registerHeading)

	let inView = useInView(ref, {
		margin: `${remToPx(-3.5)}px 0px 0px 0px`,
		amount: 'all',
	})

	useEffect(() => {
		if (level === 2) {
			registerHeading({ id, ref, offsetRem: tag || label ? 8 : 6 })
		}
	})

	return (
		<>
			{/* @ts-ignore */}
			<Component
				ref={ref}
				id={anchor ? id : undefined}
				className={tag || label ? ' scroll-mt-32' : 'scroll-mt-24'}
				{...props}
			>
				{anchor ? (
					<Anchor id={id} inView={inView}>
						{children}
					</Anchor>
				) : (
					children
				)}
			</Component>
			<Eyebrow tag={tag} label={label} />
		</>
	)
}
