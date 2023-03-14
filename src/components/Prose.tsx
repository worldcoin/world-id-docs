import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

export const Prose: FC<
	PropsWithChildren<{
		as?: keyof JSX.IntrinsicElements
		className?: string
	}>
> = ({ as: Component = 'div', className, ...props }) => (
	<Component className={clsx(className, 'prose dark:prose-invert')} {...props} />
)
