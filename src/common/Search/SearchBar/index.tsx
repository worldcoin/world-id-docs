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
          'group flex w-80 items-center rounded-lg border px-4 py-3 transition-colors lg:w-96 text-14',
          'bg-neutral-0 border-161718/10 hover:border-161718/20',
          'dark:bg-000000 dark:border-d5dee8/20 hover:dark:border-d5dee8/30',
          props.className
        )}
        onClick={onOpen}
      >
        <Icon className="flex-none w-4 h-4" name="search" />
        <span className="block ml-4 text-neutral-400 leading-[1px]">Search docs</span>
        {modifierKey && (
          <kbd className="block ml-auto font-medium leading-[1px]">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      {modal}
    </Fragment>
  )
})
