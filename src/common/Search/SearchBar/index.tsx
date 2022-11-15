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
          'group flex w-80 items-center rounded-xl border px-4 py-3 text-14 transition-colors lg:w-96',
          'border-2c393e/10 bg-19272c/5 text-576469 dark:border-2c393e dark:bg-22262c',
          'hover:border-2c393e/[15%] hover:bg-19272c/10 hover:dark:border-363a45 hover:dark:bg-262f41',
          props.className
        )}
        onClick={onOpen}
      >
        <Icon className="flex-none w-4 h-4" name="search" />
        <span className="block ml-2">Search docs</span>
        {modifierKey && (
          <kbd className="block ml-auto font-medium">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      {modal}
    </Fragment>
  )
})
