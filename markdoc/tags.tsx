import { Callout } from 'common/Callout'
import { QuickLink, QuickLinks } from 'common/QuickLinks'
import { ReactNode } from 'react';

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: (props: {children: ReactNode, title: string, }) => <Callout title={props.title}>{props.children}</Callout>,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: (props: { src: string; alt?: string; caption: string }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.src} alt={props.alt || ''} />
        <figcaption>{props.caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
