import cn from 'classnames'
import { Icon } from 'common/Icon'
import { NavItems } from 'Layout/helpers/navigation'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchBar, SearchButton } from 'common/Search'
import { ThemeSelector } from './ThemeSelector'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

export const Header = memo(function Header(props: {
  navItems?: NavItems
  disableNav?: boolean
  disableSearch?: boolean
  disableThemeSelector?: boolean
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
        'sticky top-0 z-50 flex flex-wrap items-center justify-between border-b px-4 py-5 transition duration-500 sm:px-6 lg:px-8',
        {
          'border-b-transparent backdrop-blur-none': !isScrolled,
          'bg-ffffff/15 border-b border-2c393e/5 backdrop-blur-md dark:border-b-ffffff/5 dark:bg-191c20/20':
            isScrolled,
        }
      )}
    >
      {!props.disableNav && props.navItems && (
        <div className="flex mr-6 lg:hidden">
          <MobileMenu navItems={props.navItems} />
        </div>
      )}

      <div className="relative flex items-center flex-grow basis-0">
        <Link href="/" aria-label="Home page">
          <Logo className={cn({ 'hidden lg:block': !props.disableNav })} />
        </Link>
      </div>

      {!props.disableSearch && (
        <div className="mr-6 -my-5 sm:mr-8 md:mr-0">
          <div className="hidden md:block">
            <SearchBar
              className={cn(
                'before:transition-colorss relative before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
                {
                  'lg:before:bg-transparent': !isScrolled,
                  'lg:before:bg-ffffff lg:before:dark:bg-191c20': isScrolled,
                }
              )}
            />
          </div>

          <div className="md:hidden">
            <SearchButton />
          </div>
        </div>
      )}

      <div className="relative flex justify-end gap-6 basis-0 sm:gap-8 md:flex-grow">
        {!props.disableThemeSelector && (
          <ThemeSelector className="relative z-10" />
        )}

        <Link
          href="https://github.com/worldcoin/world-id-docs"
          className="group"
          target="_blank"
          aria-label="GitHub"
        >
          <Icon
            name="github"
            className="w-6 h-6 text-181b1f dark:text-94a2b8"
          />
        </Link>
      </div>
    </header>
  )
})