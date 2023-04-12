import { Link } from '@/components/Link'
import Image from 'next/image'
import clsx from 'clsx'
import ArrowIcon from "@/components/icons/ArrowIcon";

export const UseCasePaginationItem = (props: {
  variant: 'prev' | 'next'
  color: string
  image: string
  title: string
  url: string
}) => {

  return (
    <Link
      className={clsx('flex items-center gap-x-4 no-underline', {
        'flex-row-reverse': props.variant === 'next'
      })}
      href={props.url}
    >
      <ArrowIcon
        className={clsx('w-6 h-6 text-gray-500', {
          '-mr-3 transform rotate-180': props.variant === 'prev',
          '-ml-3': props.variant === 'next',
        })}
      />
      <div className="relative">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_324_10369)">
            <rect width="48" height="48" rx="16" fill="#9BA3AE"/>
            <rect opacity="0.5" width="48" height="48" rx="16" fill="url(#paint0_radial_324_10369)"/>
          </g>
          <defs>
            <radialGradient id="paint0_radial_324_10369" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.74834 -9.52632) rotate(55.0103) scale(70.2178 69.915)">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <clipPath id="clip0_324_10369">
              <rect width="48" height="48" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image width={32} height={32} src={props.image} alt={props.title}/>
        </div>
      </div>
      <div className="text-gray-500">
        {props.title}
      </div>
    </Link>
  )
}
