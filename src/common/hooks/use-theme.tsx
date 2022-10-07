import { useEffect, useState } from 'react'

type SystemSchemes = 'light' | 'dark'
type Schemes = SystemSchemes | 'system'

export const useTheme = () => {
  const [systemScheme, setSystemScheme] = useState<SystemSchemes>()
  const [preferredScheme, setPreferredScheme] = useState<Schemes>('system')

  // @NOTE: listen system scheme
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

  return {}
}
