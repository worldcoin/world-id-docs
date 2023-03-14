import { Icon } from 'common/Icon'
import { Fragment, memo } from 'react'
import { useSearch } from '../useSearch'

export const SearchButton = memo(function SearchButton(props: {
  className?: string
}) {
  const { onOpen, modal } = useSearch()

  return (
    <Fragment>
      <button onClick={onOpen} className="rounded-lg border p-1.5 text-94a2b8">
        <Icon name="search" className="h-4 w-4" />
      </button>
      {modal}
    </Fragment>
  )
})
