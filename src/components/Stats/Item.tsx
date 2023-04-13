import clsx from 'clsx'
import { useCountUp } from 'react-countup'
import LoadingIcon from '../icons/LoadingIcon'
import { FC, memo, useCallback, useRef } from 'react'

export const Item: FC<{
	className?: string
	total: string
	lastWeek: number
	footnote: string
	isLoading?: boolean
}> = ({ className, total, lastWeek, footnote, isLoading }) => {
	const countUpRef = useRef(null)

	const formatting = useCallback(
		(value: number) => '+' + value.toLocaleString('en', { minimumIntegerDigits: lastWeek.toString().length }),
		[lastWeek]
	)

	useCountUp({
		ref: countUpRef,
		start: 0,
		end: lastWeek,
		enableScrollSpy: true,
		scrollSpyOnce: true,
		formattingFn: formatting,
	})

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<LoadingIcon className="w-20 h-20 animate-spin" />
			</div>
		)
	}

	return (
		<div className={clsx('grid gap-y-1 justify-items-center', className)}>
			<div className="leading-none text-[64px] font-bold text-black">{total}</div>

			<div className="leading-5 text-xl font-bold flex items-baseline">
				<span ref={countUpRef} className="text-black" />
				<span className="ml-1 text-black">last week</span>
			</div>

			<span className="mt-1 leading-5 text-sm text-black/50">{footnote}</span>
		</div>
	)
}

export default memo(Item)
