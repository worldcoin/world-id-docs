import { SectionType } from 'common/types'

export type NavItems = Array<SectionType>

export const navItems: NavItems = [
  {
    icon: 'hand',
    title: 'Introduction',
    articles: [
      { name: 'Getting started', href: '/' },
      { name: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    icon: 'cpu',
    title: 'Core concepts',
    articles: [
      { name: 'Understanding caching', href: '/docs/understanding-caching' },
      {
        name: 'Predicting user behavior',
        href: '/docs/predicting-user-behavior',
      },
      { name: 'Basics of time-travel', href: '/docs/basics-of-time-travel' },
      {
        name: 'Introduction to string theory',
        href: '/docs/introduction-to-string-theory',
      },
      { name: 'The butterfly effect', href: '/docs/the-butterfly-effect' },
    ],
  },
  {
    icon: 'book',
    title: 'Advanced guides',
    articles: [
      { name: 'Writing plugins', href: '/docs/writing-plugins' },
      { name: 'Neuralink integration', href: '/docs/neuralink-integration' },
      { name: 'Temporal paradoxes', href: '/docs/temporal-paradoxes' },
      { name: 'Testing', href: '/docs/testing' },
      { name: 'Compile-time caching', href: '/docs/compile-time-caching' },
      {
        name: 'Predictive data generation',
        href: '/docs/predictive-data-generation',
      },
    ],
  },
  {
    icon: 'code',
    title: 'API reference',
    articles: [
      { name: 'CacheAdvance.predict()', href: '/docs/cacheadvance-predict' },
      { name: 'CacheAdvance.flush()', href: '/docs/cacheadvance-flush' },
      { name: 'CacheAdvance.revert()', href: '/docs/cacheadvance-revert' },
      { name: 'CacheAdvance.regret()', href: '/docs/cacheadvance-regret' },
    ],
  },
  {
    icon: 'coin',
    title: 'Contributing',
    articles: [
      { name: 'How to contribute', href: '/docs/how-to-contribute' },
      { name: 'Architecture guide', href: '/docs/architecture-guide' },
      { name: 'Design principles', href: '/docs/design-principles' },
    ],
  },
]
