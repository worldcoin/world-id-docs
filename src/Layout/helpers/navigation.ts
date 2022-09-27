import { Item } from 'common/types/navigation'

export type NavItems = Array<Item>

export const navItems: NavItems = [
  {
    icon: 'hand',
    title: 'Introduction',
    items: [
      { title: 'Getting started', href: '/' },
      { title: 'Quick start', href: '/quick-start' },
    ],
  },
  {
    icon: 'logo',
    title: 'About World ID',
    items: [
      { title: 'JS Introduction', href: '/about/protocol' },
      { title: 'JS Reference', href: '/about/glossary' },
      { title: 'Error Handling', href: '/about/privacy' },
      { title: 'Telemetry', href: '/about/testing' },
    ],
  },
  {
    icon: 'book',
    title: 'JS Widget',
    items: [
      { title: 'JS Introduction', href: '/js' },
      { title: 'JS Reference', href: '/js/reference' },
      { title: 'Error Handling', href: '/js/error-handling' },
      { title: 'Telemetry', href: '/js/telemetry' },
    ],
  },
  {
    icon: 'code',
    title: 'Advanced',
    items: [
      { title: 'Proof of Personhood', href: '/advanced/proof-of-personhood' },
      {
        title: 'Zero-knowledge proofs',
        href: '/advanced/zero-knowledge-proofs',
      },
      { title: 'Advanced signals', href: '/advanced/advanced-signals' },
      { title: 'Verified actions', href: '/advanced/verified-actions' },
      { title: 'Custom integrations', href: '/advanced/custom-integrations' },
      { title: 'Roadmap', href: '/advanced/roadmap' },
      { title: 'Protocol internals', href: '/advanced/protocol-internals' },
    ],
  },
  {
    icon: 'coin',
    title: 'Hackathons & workshops',
    href: '/hackatons',
  },
]
