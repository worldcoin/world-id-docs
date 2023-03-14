import React, { Fragment, memo } from 'react'
import { Icon } from 'common/Icon'
import cn from 'classnames'
import { useSearch } from './../'

export const SearchBar = memo(function SearchBar(props: {
  className?: string
}) {
  const { modifierKey, onOpen, modal } = useSearch()

  return (
    <Fragment>
      <button
        type="button"
        className={cn(
          'group flex w-80 items-center rounded-lg border px-4 py-3 text-14 transition-colors lg:w-96',
          'border-161718/10 bg-neutral-0 hover:border-161718/20',
          props.className
        )}
        onClick={onOpen}
      >
        <Icon className="h-4 w-4 flex-none" name="search" />
        <span className="ml-4 block leading-[1px] text-neutral-400">
          Search docs
        </span>
        {modifierKey && (
          <kbd className="ml-auto block font-medium leading-[1px]">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      {modal}
    </Fragment>
  )
})
