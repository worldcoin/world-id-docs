import { TOC } from 'common/types'
import { Fragment, memo, useEffect, useState } from 'react'
import { Items } from './Items'

export const TableOfContent = memo(function TableOfContent(props: {
  items: TOC
}) {
  const [activeItem, setActiveItem] = useState<string>()

  useEffect(() => {
    const handler: IntersectionObserverCallback = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const io = new IntersectionObserver(handler, {
      rootMargin: '100px 0px -50% 0px',
    })

    const article = document.querySelector('article')

    if (!article) return

    const observableItems = Array.from(
      article.querySelectorAll('h1,h2,h3,h4,h5,h6')
    )

    observableItems.map((item) => io.observe(item))

    return () => {
      observableItems.map((item) => io.unobserve(item))
    }
  }, [])

  if (!props.items.length) return null

  return (
    <Fragment>
      <span className="ml-4 text-14 font-medium uppercase leading-4 tracking-wide text-191c20">
        On this page
      </span>

      <nav className="grid">
        <Items items={props.items} activeItem={activeItem} />
      </nav>
    </Fragment>
  )
})
