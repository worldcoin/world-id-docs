import { GradientBorderContainer } from 'common/GradientBorderContainer'
import Image from 'next/image'
import { memo } from 'react'

export const Component = memo(function Component(props: {
  darkImage: string
  lightImage: string
  title: string
}) {
  return (
    <GradientBorderContainer
      defaultBackground
      className="not-prose grid w-full gap-y-2.5 p-6"
    >
      <div className="hidden min-w-[206px] justify-self-center">
        <Image
          src={props.darkImage}
          alt="When an existing proof for an action ID and the same identity is found, proof of uniqueness fails"
          layout="responsive"
          width={206}
          height={206}
        />
      </div>
      <div className="block min-w-[206px] justify-self-center">
        <Image
          src={props.lightImage}
          alt="When an existing proof for an action ID and the same identity is found, proof of uniqueness fails"
          layout="responsive"
          width={206}
          height={206}
        />
      </div>

      <span>{props.title}</span>
    </GradientBorderContainer>
  )
})
