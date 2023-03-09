import { memo, useCallback, useContext, useState } from 'react'
import { Card } from './Card'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import slugify from '@sindresorhus/slugify'
import { SystemThemes, ThemeContext } from 'common/contexts/ThemeContext'

// @FIXME add proper links
const examples = [
  // {
  //   href: '/',
  //   image: '/images/examples/quantum.svg',
  //   title: 'Quantum Vote',
  //   description:
  //     'Human-only voting. Anonymously prove you are a unique human voting only once on a poll. Completely protected from bots.',
  //   tags: ['cloud', 'api', 'custom user interface'],
  // },

  {
    href: 'https://poap.worldcoin.org',
    image: '/images/examples/poap.png',
    title: 'Human-only POAP dispenser',
    description:
      'Make sure POAPs are truly unique and can only be claimed once by each person.',
    tags: ['smart contract', 'on-chain', 'web3'],
  },

  {
    href: 'https://human.withlens.app',
    image: '/images/examples/lens.svg',
    title: 'Worldcoin Meets Lens',
    description:
      'Verify your Lens profile belongs to a unique human. No bots, reduce spam. Enables apps built on Lens to quickly identify who is a real person.',
    tags: ['custom user interface', 'smart contract'],
  },

  {
    href: 'https://github.com/worldcoin/world-id-discord-bot',
    image: '/images/examples/bot.svg',
    title: 'World ID Discord Bot',
    description:
      "The Discord bot lets you quickly improve your community's quality by identifying accounts which belong to real humans. Weed out spam accounts, and increase the engagement quality.",
    tags: ['cloud', 'api', 'custom user interface'],
  },

  {
    href: 'https://github.com/worldcoin/hyperdrop-contracts',
    image: '/images/examples/hyperdrop.svg',
    title: 'Hyperdrop',
    description:
      'Share tokens equitably with any verified human on the planet. With Hyperdrop you can airdrop ERC-20 tokens to all humans who have verified with World ID.',
    tags: ['custom user interface', 'smart contract'],
  },

  {
    href: 'https://petorbz.com',
    image: '/images/examples/petorbz.png',
    title: '#petorbz',
    description:
      'They love to cuddle, and will protect you from sybil attacks. Adopt yours at the next Worldcoin event and receive a certificate of adoption (only one per person of course)',
    tags: ['cloud', 'api', 'custom user interface'],
  },

  // {
  //   href: '/',
  //   image: '/images/examples/gitcoin.png',
  //   title: 'Gitcoin Passport',
  //   description:
  //     'Grow a decentralized identity record with various credentials about you. Through the network of sources about your personhood...',
  //   tags: ['custom user interface', 'smart contract'],
  // },

  {
    href: 'https://example.id.worldcoin.org',
    image: '/images/examples/mesha.svg',
    title: 'Mesha',
    description:
      'Mesha is a mock client app that lets you airdrop tokens where a single person can only claim them once.',
    tags: ['cloud', 'api', 'custom user interface'],
  },
]

const tags = examples.reduce((accumulator: Array<string>, example) => {
  if (accumulator.length === 0) {
    return example.tags.sort()
  }

  const tagsToAdd = example.tags.filter(
    (tag) => !accumulator.some((existingTag) => existingTag === tag)
  )

  return accumulator.concat(tagsToAdd).sort()
}, [])

const ButtonText = memo(function ButtonText(props: {
  condition: boolean
  currentTheme: SystemThemes | null
  children: string
}) {
  return (
    <span
      className={cn(
        'text-14 font-medium leading-none',
        { 'text-f4f4f4 dark:text-211c29': props.condition },
        {
          [styles.textGradient]:
            !props.condition && props.currentTheme === 'dark',
        },
        { 'text-211c29/50': !props.condition && props.currentTheme === 'light' }
      )}
    >
      {props.children}
    </span>
  )
})

export const Examples = memo(function Examples() {
  const [filter, setFilter] = useState<Array<string>>([])
  const { currentTheme } = useContext(ThemeContext)

  const isTagSelected = useCallback(
    (tag: string) => {
      if (filter.length === 0) {
        return false
      }

      if (filter.some((filterTag) => filterTag === tag)) {
        return true
      }

      return false
    },
    [filter]
  )

  const toggleFilter = useCallback(
    (tag: string) => {
      if (filter.length === 0) {
        return setFilter([tag])
      }

      if (isTagSelected(tag)) {
        return setFilter(filter.filter((filterTag) => filterTag !== tag))
      }

      setFilter([...filter, tag])
    },
    [filter, isTagSelected]
  )

  const getButtonClassName = useCallback(
    (condition: boolean) => {
      return cn(
        'rounded-2xl border px-6 py-3 leading-none',
        {
          [`${styles.gradient} border-transparent`]:
            condition && currentTheme === 'dark',
        },
        {
          'bg-211c29 border-transparent': condition && currentTheme === 'light',
        },

        {
          'border-ffffff/10 bg-gradient-to-br  shadow-[0px_0px_16px] shadow-d2e7f7/10':
            !condition,
        },
        {
          'from-e6cfcf/10 to-cde0ec/10': !condition && currentTheme === 'dark',
        },
        {
          'from-e6cfcf/30 to-cde0ec/30': !condition && currentTheme === 'light',
        }
      )
    },
    [currentTheme]
  )

  return (
    <div className="grid gap-y-16">
      <div className="text-center text-34 font-semibold text-6f7a85">
        <span
          className={cn('text-181b1f', {
            [styles.textGradient]: currentTheme === 'dark',
          })}
        >
          Explore the potential of World ID
        </span>{' '}
        and inspire with app examples
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={getButtonClassName(filter.length === 0)}
          onClick={() => setFilter([])}
        >
          <ButtonText
            currentTheme={currentTheme}
            condition={filter.length === 0}
          >
            All Apps
          </ButtonText>
        </button>

        {tags.map((tag, id) => (
          <button
            onClick={() => toggleFilter(tag)}
            className={getButtonClassName(isTagSelected(tag))}
            key={`${slugify(tag)}-${id}`}
          >
            <ButtonText
              currentTheme={currentTheme}
              condition={isTagSelected(tag)}
            >
              {tag}
            </ButtonText>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {examples.map((example, id) => {
          if (
            filter.length === 0 ||
            example.tags.some((tag) => isTagSelected(tag))
          ) {
            return (
              <Card
                key={`${slugify(example.title)}-${id}`}
                image={example.image}
                title={example.title}
                description={example.description}
                tags={example.tags}
                href={example.href}
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
})
