import { Item } from 'common/types/navigation'

export type NavItems = Array<Item>

export const navItems: NavItems = [
  {
    icon: 'hand',
    title: 'Introduction',
    items: [
      { title: 'Getting Started', href: '/' },
      { title: 'Quick Start', href: '/quick-start' },
    ],
  },
  {
    icon: 'cpu',
    title: 'Examples',
    items: [
      { title: 'All Examples', href: '/examples' },
      { title: 'Human-only POAP dispenser', href: 'https://poap.worldcoin.org/', external: true },
      { title: 'Worldcoin Meets Lens', href: 'https://human.withlens.app/', external: true },
      { title: 'World ID Discord Bot', href: 'https://github.com/worldcoin/world-id-discord-bot', external: true },
      { title: 'Hyperdrop', href: 'https://github.com/worldcoin/hyperdrop-contracts', external: true },
      { title: 'Pet Orbz', href: 'https://petorbz.com/', external: true },
      { title: 'Mesha', href: 'https://example.id.worldcoin.org/', external: true },
    ],
  },
  {
    icon: 'logo',
    title: 'About World ID',
    items: [
      { title: 'Protocol Overview', href: '/about/protocol' },
      { title: 'Glossary', href: '/about/glossary' },
      { title: 'Privacy', href: '/about/privacy' },
      { title: 'Testing', href: '/about/testing' },
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
      { title: 'Advanced Signals', href: '/advanced/advanced-signals' },
      { title: 'Verified Actions', href: '/advanced/verified-actions' },
      { title: 'Custom Integrations', href: '/advanced/custom-integrations' },
      { title: 'Roadmap', href: '/advanced/roadmap' },
      { title: 'Protocol Internals', href: '/advanced/protocol-internals' },
    ],
  },
  {
    icon: 'code',
    title: 'API',
    items: [
      { title: 'Introduction', href: '/api-docs' },
      { title: 'Authentication', href: '/api-docs/authentication' },
      { title: 'API Reference', href: '/api-docs/reference' },
      { title: 'Error Handling', href: '/api-docs/error-handling' },
      { title: 'Internal Endpoints', href: '/api-docs/internal-endpoints' },
    ],
  },
  {
    icon: 'coin',
    title: 'Hackathons & Workshops',
    href: '/hackathons',
  },
]
