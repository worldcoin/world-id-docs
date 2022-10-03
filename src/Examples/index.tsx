import { memo, useCallback, useState } from 'react'
import { Card } from './Card'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import slugify from '@sindresorhus/slugify'

// @FIXME add proper links
const examples = [
  {
    href: '/',
    image: '/images/examples/quantum.svg',
    title: 'Quantum Vote',
    description:
      'Human-only voting. Anonymously prove you are a unique human voting only once on a poll. Completely protected from bots.',
    tags: ['cloud', 'api', 'custom user interface'],
  },

  {
    href: '/',
    image: '/images/examples/poap.png',
    title: 'Human-only POAP dispenser',
    description:
      'Human-only voting. Anonymously prove you are a unique human voting only once on a poll. Completely protected from bots.',
    tags: ['smart contract', 'on-chain', 'web3'],
  },

  {
    href: '/',
    image: '/images/examples/lens.svg',
    title: 'Worldcoin Meets Lens',
    description:
      'Verify your Lens profile belongs to a unique human. World ID can anonymously prove you are a unique human doing something only...',
    tags: ['custom user interface', 'smart contract'],
  },

  {
    href: '/',
    image: '/images/examples/bot.svg',
    title: 'World ID Bot',
    description:
      'World ID is a decentralized protocol to verify unique humanness. This is done through completely private iris imaging with a device...',
    tags: ['cloud', 'api', 'custom user interface'],
  },

  {
    href: '/',
    image: '/images/examples/hyperdrop.svg',
    title: 'Hyperdrop',
    description:
      'Share tokens equitably with any verified human on the planet. With Hyperdrop you can airdrop any number of ERC-20 tokens to humans...',
    tags: ['custom user interface', 'smart contract'],
  },

  {
    href: '/',
    image: '/images/examples/pet-orbs.png',
    title: 'Pet Orbz',
    description:
      'They love to cuddle, and will protect you from sybil attacks. Five hundred of them are visiting ETHMexico and need a loving home.',
    tags: ['cloud', 'api', 'custom user interface'],
  },

  {
    href: '/',
    image: '/images/examples/gitcoin.png',
    title: 'Gitcoin Passport',
    description:
      'Grow a decentralized identity record with various credentials about you. Through the network of sources about your personhood...',
    tags: ['custom user interface', 'smart contract'],
  },

  {
    href: '/',
    image: '/images/examples/mesha.svg',
    title: 'Mesha',
    description:
      'Mesha is a mock client app about airdrops to showcase how World ID works.',
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
  children: string
}) {
  return (
    <span
      className={cn(
        'font-rubik text-14 font-medium leading-none',
        props.condition ? 'text-211c29' : styles.textGradient
      )}
    >
      {props.children}
    </span>
  )
})

export const Examples = memo(function Examples() {
  const [filter, setFilter] = useState<Array<string>>([])

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

  const getButtonClassName = useCallback((condition: boolean) => {
    return cn(
      'rounded-2xl border px-6 py-3 leading-none',
      { [`${styles.gradient} border-transparent`]: condition },
      {
        'border-ffffff/10 bg-gradient-to-br from-e6cfcf/10 to-cde0ec/10 shadow-[0px_0px_16px] shadow-d2e7f7/10':
          !condition,
      }
    )
  }, [])

  return (
    <div className="grid gap-y-16">
      <div className="text-center font-sora text-34 font-semibold text-6f7a85">
        <span className={cn(styles.textGradient)}>
          Explore the potential of World ID
        </span>{' '}
        and inspire with app examples
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={getButtonClassName(filter.length === 0)}
          onClick={() => setFilter([])}
        >
          <ButtonText condition={filter.length === 0}>All Apps</ButtonText>
        </button>

        {tags.map((tag, id) => (
          <button
            onClick={() => toggleFilter(tag)}
            className={getButtonClassName(isTagSelected(tag))}
            key={`${slugify(tag)}-${id}`}
          >
            <ButtonText condition={isTagSelected(tag)}>{tag}</ButtonText>
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
