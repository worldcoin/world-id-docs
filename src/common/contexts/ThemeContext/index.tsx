import cn from 'classnames'
import { Icon } from 'common/Icon'
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type SystemThemes = 'light' | 'dark'
export type Themes = SystemThemes | 'system'

type ContextValue = {
  currentTheme: SystemThemes | null
  preferedTheme: Themes | null
  systemTheme: SystemThemes | null
  changePreferedTheme: (value: Themes) => void
  themes: typeof themes
}

export const LightIcon = memo(function LightIcon(props: {
  className?: string
}) {
  return <Icon name="theme-light" className={cn('h-4 w-4', props.className)} />
})

export const DarkIcon = memo(function LightIcon(props: { className?: string }) {
  return <Icon name="theme-dark" className={cn('h-4 w-4', props.className)} />
})

export const SystemIcon = memo(function LightIcon(props: {
  className?: string
}) {
  return <Icon name="theme-system" className={cn('h-4 w-4', props.className)} />
})

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

export const ThemeContext = createContext<ContextValue>({
  currentTheme: null,
  preferedTheme: null,
  systemTheme: null,
  changePreferedTheme: (value: Themes) => {},
  themes,
})

export const ThemeProvider = memo(function ThemeProvider(props: {
  children: ReactNode
}) {
  const [systemTheme, setSystemTheme] = useState<SystemThemes | null>(null)
  const [preferedTheme, setPreferedTheme] = useState<Themes>('system')

  const currentTheme = useMemo(() => {
    if (preferedTheme !== 'system') {
      return preferedTheme
    }

    if (preferedTheme === 'system' && systemTheme) {
      return systemTheme
    }

    return null
  }, [preferedTheme, systemTheme])

  // @NOTE: listen system scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChangeSystemScheme = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChangeSystemScheme)

    return () => {
      mediaQuery.removeEventListener('change', handleChangeSystemScheme)
    }
  }, [])

  // NOTE: listen change from another tab
  useEffect(() => {
    setPreferedTheme((localStorage.getItem('theme') ?? 'system') as Themes)

    const handleChangeStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') {
        return
      }

      setPreferedTheme(event.newValue as Themes)
    }

    addEventListener('storage', handleChangeStorage)

    return () => {
      removeEventListener('storage', handleChangeStorage)
    }
  }, [])

  useEffect(() => {
    if (!systemTheme) {
      return
    }

    const theme = preferedTheme === 'system' ? systemTheme : preferedTheme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [systemTheme, preferedTheme])

  const changePreferedTheme = useCallback((value: Themes) => {
    setPreferedTheme(value)
    localStorage.setItem('theme', value)
  }, [])

  const value = useMemo(
    () => ({
      currentTheme,
      systemTheme,
      preferedTheme,
      changePreferedTheme,
      themes,
    }),
    [currentTheme, systemTheme, preferedTheme, changePreferedTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
})
