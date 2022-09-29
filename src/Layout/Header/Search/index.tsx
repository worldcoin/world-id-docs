import React, {
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Router from 'next/router'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import { Icon } from 'common/Icon'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'

const docSearchConfig = {
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string,
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string,
}

export const Search = memo(function Search(props: { className?: string }) {
  let [isOpen, setIsOpen] = useState<boolean>(false)
  let [modifierKey, setModifierKey] = useState<string>()

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose })

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl '
    )
  }, [])

  return (
    <Fragment>
      <button
        type="button"
        className={cn(
          styles.headerButton,
          'group flex items-center border text-14 transition-colors md:w-80 md:rounded-xl md:px-4 md:py-3 lg:w-96',
          'md:border-2c393e/10 md:bg-19272c/5 md:text-576469 dark:md:border-2c393e dark:md:bg-22262c',
          'hover:md:border-2c393e/[15%] hover:md:bg-19272c/10 hover:dark:md:border-363a45 hover:dark:md:bg-262f41',
          props.className
        )}
        onClick={onOpen}
      >
        <Icon className="flex-none w-4 h-4" name="search" />

        <span className="hidden md:ml-2 md:block">Search docs</span>

        {modifierKey && (
          <kbd className="hidden ml-auto font-medium md:block">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            {...docSearchConfig}
            initialScrollY={window.scrollY}
            onClose={onClose}
            hitComponent={(props: {
              hit: InternalDocSearchHit | StoredDocSearchHit
              children: ReactNode
            }) => <Link href={props.hit.url}>{props.children}</Link>}
            navigator={{
              navigate({ itemUrl }) {
                Router.push(itemUrl)
              },
            }}
          />,
          document.body
        )}
    </Fragment>
  )
})
