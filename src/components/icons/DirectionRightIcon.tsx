import { FC, SVGAttributes } from 'react'

const DirectionRightIcon: FC<SVGAttributes<SVGElement>> = props => {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.35369 4.27609C6.13806 4.44859 6.10309 4.76324 6.2756 4.97887L8.69239 7.99986L6.2756 11.0208C6.10309 11.2365 6.13806 11.5511 6.35369 11.7236C6.56932 11.8961 6.88396 11.8612 7.05647 11.6455L9.72313 8.3122C9.86922 8.12959 9.86922 7.87012 9.72313 7.68751L7.05647 4.35417C6.88396 4.13854 6.56932 4.10358 6.35369 4.27609Z" fill="currentColor"/>
    </svg>
  )
}

export default DirectionRightIcon
