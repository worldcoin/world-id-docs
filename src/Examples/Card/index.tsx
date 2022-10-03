import slugify from '@sindresorhus/slugify'
import cn from 'classnames'
import { GradientBorderContainer } from 'common/GradientBorderContainer'
import { styles } from 'common/helpers/styles'
import { Link } from 'common/Link'
import Image from 'next/image'
import { memo } from 'react'
import scrollbarStyles from './scrollbar-styles.module.css'

export const Card = memo(function Card(props: {
  image: string
  title: string
  description: string
  tags: Array<string>
  href: string
}) {
  return (
    <Link href={props.href} className="">
      <GradientBorderContainer className="grid grid-cols-1 gap-x-4 gap-y-3 self-stretch bg-181b1f p-1.5 sm:grid-cols-fr/auto lg:grid-cols-1">
        <div className="relative min-h-[180px] sm:min-w-[324px] lg:h-[180px] lg:min-w-[unset]">
          <Image src={props.image} alt="#" layout="fill" objectFit="cover" />
        </div>

        <div className="grid gap-y-4 px-1.5 sm:py-6 lg:py-0 ">
          <div className="grid gap-y-1">
            <h2 className={cn('m-0', styles.textGradient)}>{props.title}</h2>
            <span className="text-6f7a85">{props.description}</span>
          </div>

          <div
            className={cn(
              'flex items-center gap-x-1 overflow-x-scroll pb-1.5 sm:pb-0 lg:pb-1.5',
              scrollbarStyles.tags
            )}
          >
            {props.tags.map((tag, id) => (
              <span
                className={cn(
                  'whitespace-nowrap rounded-full border border-ffffff/10 bg-161b22 py-2 px-3 text-center font-medium',
                  styles.textGradient
                )}
                key={`${slugify(tag)}-${id}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GradientBorderContainer>
    </Link>
  )
})
