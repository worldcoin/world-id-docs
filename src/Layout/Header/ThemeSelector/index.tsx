import {
  ComponentType,
  Fragment,
  memo,
  NamedExoticComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Listbox } from '@headlessui/react'
import cn from 'classnames'
import { Icon } from 'common/Icon'
import { styles } from 'common/helpers/styles'

const LightIcon = memo(function LightIcon(props: { className?: string }) {
  return <Icon name="theme-light" className={cn('h-4 w-4', props.className)} />
})
const DarkIcon = memo(function LightIcon(props: { className?: string }) {
  return <Icon name="theme-dark" className={cn('h-4 w-4', props.className)} />
})
const SystemIcon = memo(function LightIcon(props: { className?: string }) {
  return <Icon name="theme-system" className={cn('h-4 w-4', props.className)} />
})

type SystemSchemes = 'light' | 'dark'
type Schemes = SystemSchemes | 'system'

const themes = [
  {
    name: 'Light',
    value: 'light',
    icon: LightIcon,
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: DarkIcon,
  },
  {
    name: 'System',
    value: 'system',
    icon: SystemIcon,
  },
]

export const ThemeSelector = memo(function ThemeSelector(props: { className?: string }) {
  const [systemScheme, setSystemScheme] = useState<SystemSchemes>()
  const [preferredScheme, setPreferredScheme] = useState<Schemes>('system')

  // NOTE: listen system scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemScheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChangeSystemScheme = (event: MediaQueryListEvent) => {
      setSystemScheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChangeSystemScheme)

    return () => {
      mediaQuery.removeEventListener('change', handleChangeSystemScheme)
    }
  }, [])

  // NOTE: listen change from another tab
  useEffect(() => {
    setPreferredScheme((localStorage.getItem('theme') ?? 'system') as Schemes)

    const handleChangeStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') {
        return
      }

      setPreferredScheme(event.newValue as Schemes)
    }

    addEventListener('storage', handleChangeStorage)

    return () => {
      removeEventListener('storage', handleChangeStorage)
    }
  }, [])

  // NOTE: set theme to body
  useEffect(() => {
    document.documentElement.dataset['theme'] =
      preferredScheme === 'system' ? systemScheme : preferredScheme
  }, [systemScheme, preferredScheme])

  const handleChangePreferredScheme = useCallback((value: Schemes) => {
    setPreferredScheme(value)
    localStorage.setItem('theme', value)
  }, [])

  return (
    <Listbox
      as="div"
      value={preferredScheme}
      onChange={handleChangePreferredScheme}
      {...props}
    >
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button className={styles.headerButton}>
        <LightIcon className="hidden [[data-theme=light]_&]:block" />
        <DarkIcon className="hidden [[data-theme=dark]_&]:block" />
      </Listbox.Button>
      <Listbox.Options
        className={cn(
          'absolute top-full left-1/2 mt-3 w-36 -translate-x-1/2 space-y-1 rounded-lg border p-3 text-sm font-medium',
          'bg-[#e9ebee] border-262f41/10 text-94a2b8 dark:border-262f41 dark:bg-1a2436'
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
