import { Item } from 'common/types/navigation'

export type NavItems = Array<Item>

export const navItems: NavItems = [
  {
    title: 'Introduction',
    items: [
      { title: 'Home', href: '/' },
      { title: 'Quick Start', href: '/quick-start' },
      { title: 'Try It Out', href: '/try' },
    ],
  },
  {
    title: 'World ID',
    items: [
      { title: 'Overview', href: '/id' },
      { title: 'Sign In', href: '/id/sign-in' },
      { title: 'Anonymous Actions', href: '/id/anonymous-actions' },
      // TODO: { title: 'The Protocol', href: '/id/protocol' },
      { title: 'Testing', href: '/id/testing' },
    ],
  },
  {
    title: 'IDKit',
    items: [
      { title: 'Introduction', href: '/idkit' },
      { title: 'Reference', href: '/idkit/reference' },
      // TODO { title: 'Error Handling', href: '/idkit/errors' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'On-Chain', href: '/advanced/on-chain' },
      {
        title: 'Privacy',
        href: '/advanced/privacy',
      },
      {
        title: 'Zero-Knowledge Proofs',
        href: '/advanced/zero-knowledge-proofs',
      },
      { title: 'Protocol Internals', href: '/advanced/protocol-internals' },
    ],
  },
  {
    icon: 'code',
    title: 'API',
    items: [
      { title: 'Introduction', href: '/api' },
      { title: 'API Reference', href: '/api/reference' },
      // TODO { title: 'Error Handling', href: '/api/errors' },
      { title: 'Internal Endpoints', href: '/api/internal-endpoints' },
    ],
  },
]
