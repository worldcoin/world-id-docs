import { ReactNode } from 'react'
import { Link } from '@/components/Link'
import DirectionRightIcon from '@/components/icons/DirectionRightIcon'

export const UseCasesListItem = (props: {
  color: string
  icon: ReactNode
  title: string
  description: string
  items: string[]
  linkHref: string
}) => {
  return (
    <div className="py-4 pr-4">
      <div className="relative">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="16" fill={props.color}/>
          <rect opacity="0.5" width="48" height="48" rx="16" fill="url(#paint0_radial_20252_65810)"/>
          {props.icon}
          <defs>
            <radialGradient id="paint0_radial_20252_65810" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.74834 -9.52632) rotate(55.0103) scale(70.2178 69.915)">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <h3 className="m-0 mt-4 font-medium text-lg" style={{ color:props.color }}>{props.title}</h3>
      <p className="m-0 mt-2 font-medium text-sm leading-5">{props.description}</p>
      <ul className="flex flex-col gap-y-1 m-0 mt-5 p-0 list-none">
        {props.items.map((item, index) => (
          <li key={index} className="m-0 p-0 text-sm text-gray-500 leading-5">
            {item}
          </li>
        ))}
      </ul>
      <Link
        className="inline-flex items-center gap-x-1 mt-5 text-accents-info-700 no-underline hover:text-accents-info-700/80"
        href={props.linkHref}
      >
        Show me more <DirectionRightIcon className="w-4 h-4"/>
      </Link>
    </div>
  )
}
