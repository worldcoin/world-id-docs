import React, { Fragment, memo } from 'react'
import { Icon } from 'common/Icon'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
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
          styles.headerButton,
          'group flex w-80 items-center rounded-lg border px-4 py-3 text-14 transition-colors lg:w-96',
          'text-9ba3ae bg-ffffff/60 border-161718/10 hover:bg-ffffff/70 hover:border-161718/20',
          'text-9ba3ae dark:bg-000000/60 dark:border-d5dee8/20 hover:dark:bg-000000/70 hover:dark:border-d5dee8/30',
          props.className
        )}
        onClick={onOpen}
      >
        <Icon className="flex-none w-4 h-4 text-191c20 dark:text-ffffff" name="search" />
        <span className="block ml-4 leading-[1px]">Search docs</span>
        {modifierKey && (
          <kbd className="block ml-auto font-medium text-191c20 dark:text-ffffff leading-[1px]">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      {modal}
    </Fragment>
  )
})
