import cn from 'classnames'
import { Icon } from 'common/Icon'
import { Fragment, memo } from 'react'
import { useSearch } from '../useSearch'

export const SearchButton = memo(function SearchButton(props: {
  className?: string
}) {
  const { onOpen, modal } = useSearch()

  return (
    <Fragment>
      <button
        onClick={onOpen}
        className="p-1 border rounded-lg border-262f41 bg-1a2436 text-94a2b8"
      >
        <Icon name="search" className="w-4 h-4" />
      </button>
      {modal}
    </Fragment>
  )
})
