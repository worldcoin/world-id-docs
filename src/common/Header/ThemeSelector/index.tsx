import {Fragment, memo, useContext} from 'react'
import { Listbox } from '@headlessui/react'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { DarkIcon, LightIcon, ThemeContext } from 'common/contexts/ThemeContext'

export const ThemeSelector = memo(function ThemeSelector(props: {
  className?: string
}) {
  const { themes, preferedTheme, changePreferedTheme } =
    useContext(ThemeContext)

  return (
    <Listbox
      as="div"
      value={preferedTheme}
      onChange={changePreferedTheme}
      {...props}
    >
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button className={styles.headerButton}>
        <LightIcon className="block dark:hidden" />
        <DarkIcon className="hidden dark:block" />
      </Listbox.Button>
      <Listbox.Options
        className={cn(
          'absolute top-full left-1/2 mt-3 w-36 -translate-x-1/2 space-y-1 rounded-lg border p-3 text-sm font-medium',
          'border-262f41/10 bg-[#e9ebee] text-94a2b8 dark:border-262f41 dark:bg-1a2436'
        )}
      >
        {themes.map((theme) => (
          <Listbox.Option
            key={theme.value}
            value={theme.value}
            className={({ active, selected }) =>
              cn(
                'flex cursor-pointer select-none items-center rounded-[0.625rem] p-1',
                {
                  'text-8e87ff dark:text-ffffff': selected,
                  'text-slate-900 dark:text-white': active && !selected,
                  'text-slate-700 dark:text-slate-400': !active && !selected,
                  'bg-slate-100 dark:bg-slate-900/40': active,
                }
              )
            }
          >
            {({ selected }) => (
              <Fragment>
                <div className={styles.headerButton}>
                  <theme.icon
                    className={cn(
                      'h-4 w-4',
                      selected
                        ? 'fill-sky-400 dark:fill-sky-400'
                        : 'fill-slate-400'
                    )}
                  />
                </div>
                <div className="ml-3">{theme.name}</div>
              </Fragment>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
})
