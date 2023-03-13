import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

const docSearchConfig = {
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string,
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string,
}

export const useSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modifierKey, setModifierKey] = useState<string>()

  const router = useRouter()

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

  const modal = useMemo(() => {
    if (!isOpen) return null

    return createPortal(
      <DocSearchModal
        {...docSearchConfig}
        initialScrollY={window.scrollY}
        onClose={onClose}
        hitComponent={(props: {
          hit: InternalDocSearchHit | StoredDocSearchHit
          children: ReactNode
        }) => (
          <Link href={props.hit.url} legacyBehavior>
            {props.children}
          </Link>
        )}
        navigator={{
          navigate({ itemUrl }) {
            router.push(itemUrl)
          },
        }}
      />,
      document.body
    )
  }, [isOpen, onClose, router])

  return {
    onOpen,
    modal,
    modifierKey,
  }
}
