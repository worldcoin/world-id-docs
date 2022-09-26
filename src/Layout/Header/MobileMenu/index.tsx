import { Fragment, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Navigation } from 'Layout/Header/MobileMenu/Navigation'
import { NavItems } from 'Layout/helpers/navigation'
import { Icon } from 'common/Icon'

export const MobileMenu = memo(function MobileMenu(props: {
  navItems: NavItems
}) {
  let router = useRouter()
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    function onRouteChange() {
      setIsOpen(false)
    }

    router.events.on('routeChangeComplete', onRouteChange)
    router.events.on('routeChangeError', onRouteChange)

    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
      router.events.off('routeChangeError', onRouteChange)
    }
  }, [router, isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <Icon name="menu" className="w-6 h-6 text-181b1f dark:text-94a2b8" />
      </button>

      <Transition
        show={isOpen}
        enter="transition-all duration-[150ms]"
        enterFrom="-left-full"
        enterTo="left-0"
        leave="transition-opacity duration-[150ms]"
        leaveFrom="left-0"
        leaveTo="-left-full"
        as={Fragment}
      >
        <Dialog
          open={isOpen}
          as="div"
          onClose={setIsOpen}
          className="fixed inset-0 z-50 flex items-start pr-10 overflow-y-auto bg-slate-900/50 backdrop-blur lg:hidden"
          aria-label="Navigation"
        >
          <Dialog.Panel className="w-full max-w-xs min-h-full px-4 pt-5 pb-12 bg-white dark:bg-slate-900 sm:px-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <Icon
                  name="close"
                  className="w-6 h-6 text-181b1f dark:text-94a2b8"
                />
              </button>
            </div>

            <Navigation items={props.navItems} className="px-1 mt-5" />
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  )
})
