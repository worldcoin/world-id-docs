import cn from 'classnames'
import { Icon } from 'common/Icon'
import { NavItems } from 'Layout/helpers/navigation'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchBar, SearchButton } from 'common/Search'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

export const Header = memo(function Header(props: {
  navItems?: NavItems
  disableNav?: boolean
  disableSearch?: boolean
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between px-4 py-5 sm:px-6 lg:px-8',
        'border-b border-161718/10 bg-ffffff/25 backdrop-blur-md'
      )}
    >
      <div className="flex items-center">
        {!props.disableNav && props.navItems && (
          <div className="mr-2 flex lg:hidden">
            <MobileMenu navItems={props.navItems} />
          </div>
        )}
        {!props.disableSearch && (
          <div className="md:hidden">
            <SearchButton />
          </div>
        )}
      </div>

      <div className="relative hidden flex-grow basis-0 items-center md:flex">
        <Link href="/" aria-label="Home page">
          <Logo className={cn({ 'hidden lg:block': !props.disableNav })} />
        </Link>
      </div>

      {!props.disableSearch && (
        <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
      )}

      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <a
          className="flex items-center gap-x-1 whitespace-nowrap text-14 leading-[1px] text-191c20"
          href="https://developer.worldcoin.org/"
        >
          Developer Portal
          <Icon name="maximize-rounded" className="h-4 w-4" />
        </a>

        <Link
          href="https://github.com/worldcoin/world-id-docs"
          className="group"
          target="_blank"
          aria-label="GitHub"
        >
          <Icon name="github" className="h-6 w-6 text-181b1f" />
        </Link>
      </div>
    </header>
  )
})
