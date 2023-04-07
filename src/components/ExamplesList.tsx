import {AllHTMLAttributes, FC, PropsWithChildren, useCallback, useState} from "react";
import Image from 'next/image'
import {Button} from "@/components/Button";
import cn from "clsx";

type Props = PropsWithChildren<
  {

  } & AllHTMLAttributes<HTMLElement>
>

export const ExamplesList: FC<Props> = (props) => {
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

  return (
    <div>

      <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 mb-10">
        <Tag
          selected={filter.length === 0}
          onClick={() => setFilter([])}
        >
          All Apps
        </Tag>

        {tags.map((tag, id) => (
          <Tag
            key={id}
            selected={isTagSelected(tag)}
            onClick={() => toggleFilter(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {examples.map((example, id) => {
          if (
            filter.length === 0 ||
            example.tags.some((tag) => isTagSelected(tag))
          ) {
            return (
              <Item
                key={id}
                image={example.image}
                title={example.title}
                subtitle={example.subtitle}
                url={example.url}
                githubUrl={example.githubUrl}
                description={example.description}
                tags={example.tags}
                worldcoin={example.worldcoin}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

const Tag = (props: {
  selected: boolean
  onClick: () => void
  children: string
}) => {
  return (
    <button
      className={cn('px-4 py-2 font-medium text-base leading-5 border rounded-lg', {
        'border-gray-100': !props.selected,
        'text-white bg-gray-900 border-transparent': props.selected,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

const Item = (props: {
  image: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  url: string
  githubUrl: string
  worldcoin?: boolean
}) => {
  return (
    <div className="p-6 border border-gray-100 rounded-lg">
      <div className="flex gap-x-4">
        <div className="relative h-[80px] w-[80px]">
          <Image className="m-0" src={props.image} alt={props.title} layout="fill" objectFit="cover" />
        </div>
        <div className="relative grow flex flex-col">
          {props.worldcoin && (
            <div className="absolute top-0 right-0">
              <svg className="block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0589 9.46189C14.1185 9.53243 14.2016 9.5779 14.2923 9.58943C14.3829 9.60096 14.4746 9.57774 14.5493 9.52429C15.244 9.02507 16.4291 8.19305 17.7164 7.37142C18.6716 8.46561 19.2991 9.81539 19.5247 11.2611C20.5361 9.7843 23.3967 5.97778 20.9345 4.07452C18.83 2.48327 14.4165 7.23622 13.9772 9.12908C13.9629 9.18712 13.9629 9.24785 13.9771 9.3059C13.9914 9.36395 14.0195 9.41753 14.0589 9.46189Z" fill="#4940E0"/>
                <path d="M15.7753 11.9893C15.7091 12.0237 15.6543 12.0773 15.6179 12.1432C15.5814 12.2092 15.5649 12.2846 15.5703 12.3601C15.5758 12.4356 15.603 12.5078 15.6485 12.5676C15.694 12.6274 15.7559 12.6723 15.8263 12.6965C16.6437 12.9461 18.0229 13.3725 19.4531 13.8821C19.2092 15.3282 18.56 16.6718 17.5836 17.751C19.351 17.6262 24.0607 17.5326 23.9994 14.3917C23.9075 11.7292 17.512 11.1676 15.7753 11.9893Z" fill="#4940E0"/>
                <path d="M14.6923 15.2133C14.6397 15.1875 14.5821 15.1741 14.5237 15.1741C14.4654 15.1741 14.4078 15.1875 14.3552 15.2133C14.2738 15.2577 14.2113 15.3309 14.1793 15.419C14.1473 15.5072 14.1481 15.6042 14.1815 15.6917C14.5084 16.4926 15.0397 17.8654 15.5301 19.3214C13.3948 20.4967 11.4027 20.2367 11.4027 20.2367C12.5878 21.5679 15.5914 25.26 17.9718 23.2632C19.9537 21.5263 16.4087 16.0765 14.6923 15.2133Z" fill="#4940E0"/>
                <path d="M11.5457 16.347C11.5334 16.2892 11.5074 16.2353 11.4701 16.19C11.4327 16.1446 11.385 16.1093 11.3312 16.087C11.2466 16.0497 11.1514 16.0462 11.0644 16.077C10.9773 16.1078 10.9049 16.1708 10.8612 16.2534C10.4424 17.0022 9.72722 18.271 8.90991 19.5815C7.58179 19.0137 6.44301 18.0675 5.63047 16.8566C5.34442 18.6351 4.38408 23.3256 7.3979 23.9704C9.97241 24.48 11.9442 18.2606 11.5457 16.347Z" fill="#4940E0"/>
                <path d="M8.71578 14.558C8.75025 14.511 8.77369 14.4566 8.78431 14.3989C8.79494 14.3412 8.79246 14.2818 8.77707 14.2252C8.75511 14.1332 8.69968 14.053 8.62195 14.0009C8.54421 13.9488 8.44997 13.9286 8.3582 13.9444C7.52046 14.0796 6.10039 14.298 4.58838 14.4644C4.20148 13.0536 4.2192 11.5596 4.63946 10.1587C3.09679 11.0323 -1.11234 13.1852 0.277086 15.9933C1.48261 18.3542 7.50003 16.0661 8.71578 14.558Z" fill="#4940E0"/>
                <path d="M8.32754 11.178C8.38581 11.1793 8.4435 11.1658 8.49528 11.1385C8.54705 11.1113 8.59125 11.0712 8.62381 11.022C8.68107 10.9492 8.70875 10.8569 8.70115 10.764C8.69355 10.6712 8.65124 10.5848 8.58295 10.5227C7.94953 9.94031 6.89725 8.94188 5.83475 7.83945C6.67539 6.64993 7.83538 5.73267 9.1755 5.19777C7.54088 4.52175 3.26024 2.50408 1.96277 5.35377C0.900268 7.78745 6.41709 11.1468 8.32754 11.178Z" fill="#4940E0"/>
                <path d="M10.9838 8.91066C11.0772 8.9084 11.1665 8.87102 11.2344 8.80572C11.3023 8.74042 11.344 8.65184 11.3516 8.55705C11.4027 7.70422 11.515 6.23777 11.6989 4.70893C13.1348 4.63577 14.5608 4.98607 15.8059 5.71776C15.3155 3.9913 14.2019 -0.668045 11.2086 0.0807789C8.67491 0.7464 9.51265 7.22581 10.6875 8.77545C10.7217 8.82156 10.7668 8.85812 10.8186 8.88176C10.8704 8.90539 10.9272 8.91533 10.9838 8.91066Z" fill="#4940E0"/>
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-y-1.5">
            <div className="font-bold text-16 leading-4">
              {props.title}
            </div>
            <div className="text-14 text-gray-500 leading-3">
              {props.subtitle}
            </div>
          </div>
          <div className="grow flex items-end gap-x-2">
            <Button
              variant="primary"
              className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
              href={props.githubUrl}
            >
              <svg className="block" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_20268_58446)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.99617 0.400391C6.10882 0.40137 4.28335 1.06979 2.84619 2.28612C1.40903 3.50245 0.45388 5.18739 0.151536 7.03964C-0.150807 8.8919 0.219366 10.7907 1.19587 12.3965C2.17238 14.0023 3.69154 15.2104 5.48171 15.8047C5.87665 15.878 6.02541 15.6333 6.02541 15.4252C6.02541 15.217 6.01751 14.6136 6.01487 13.954C3.80321 14.4317 3.33586 13.0207 3.33586 13.0207C2.97515 12.1045 2.45383 11.8637 2.45383 11.8637C1.7324 11.3741 2.50781 11.3833 2.50781 11.3833C3.3069 11.4396 3.72686 12.1987 3.72686 12.1987C4.43512 13.4068 5.58702 13.0574 6.03989 12.8532C6.11098 12.3414 6.31767 11.9932 6.54541 11.7956C4.77871 11.5967 2.92249 10.9186 2.92249 7.88987C2.91154 7.10437 3.20471 6.34475 3.74134 5.76816C3.65972 5.56921 3.3872 4.76555 3.81901 3.67393C3.81901 3.67393 4.48646 3.46189 6.00567 4.48413C7.30874 4.12984 8.68359 4.12984 9.98666 4.48413C11.5046 3.46189 12.1707 3.67393 12.1707 3.67393C12.6038 4.76293 12.3313 5.56659 12.2497 5.76816C12.788 6.34484 13.0818 7.10579 13.0698 7.89249C13.0698 10.9278 11.2097 11.5967 9.44033 11.7917C9.72468 12.0377 9.97877 12.5181 9.97877 13.2563C9.97877 14.3139 9.96955 15.1647 9.96955 15.4252C9.96955 15.6359 10.113 15.882 10.5159 15.8047C12.3063 15.2103 13.8256 14.002 14.8021 12.3959C15.7785 10.7898 16.1485 8.89078 15.8458 7.03835C15.5432 5.18593 14.5875 3.50098 13.1499 2.28485C11.7123 1.06873 9.88637 0.400749 7.99879 0.400391H7.99617Z" fill="white"/>
                  <path d="M3.05705 11.7477C3.03994 11.787 2.97675 11.7988 2.9254 11.7713C2.87406 11.7438 2.83589 11.6927 2.85432 11.6522C2.87275 11.6116 2.93462 11.6011 2.98596 11.6286C3.03731 11.6561 3.0768 11.7084 3.05705 11.7477Z" fill="white"/>
                  <path d="M3.38344 12.1062C3.35617 12.1199 3.32498 12.1237 3.2952 12.117C3.26543 12.1103 3.23891 12.0935 3.2202 12.0695C3.16885 12.0146 3.15832 11.9387 3.19781 11.9046C3.2373 11.8706 3.3084 11.8863 3.35974 11.9413C3.41108 11.9962 3.42293 12.0722 3.38344 12.1062Z" fill="white"/>
                  <path d="M3.69263 12.5604C3.64392 12.5944 3.56097 12.5604 3.5149 12.4923C3.50216 12.4801 3.49203 12.4655 3.4851 12.4493C3.47818 12.4331 3.47461 12.4157 3.47461 12.3981C3.47461 12.3805 3.47818 12.3631 3.4851 12.3469C3.49203 12.3307 3.50216 12.316 3.5149 12.3038C3.56361 12.2711 3.64655 12.3038 3.69263 12.3706C3.7387 12.4373 3.74002 12.5263 3.69263 12.5604Z" fill="white"/>
                  <path d="M4.11555 12.9982C4.07211 13.0466 3.98391 13.0335 3.9115 12.9681C3.83909 12.9026 3.82198 12.8136 3.86542 12.7665C3.90886 12.7194 3.99707 12.7325 4.0721 12.7966C4.14714 12.8608 4.16163 12.9511 4.11555 12.9982Z" fill="white"/>
                  <path d="M4.71424 13.2614C4.69449 13.3229 4.60497 13.3504 4.51545 13.3242C4.42593 13.298 4.36669 13.2247 4.3838 13.1619C4.40092 13.0991 4.49176 13.0703 4.58259 13.0991C4.67343 13.1279 4.73135 13.1973 4.71424 13.2614Z" fill="white"/>
                  <path d="M5.36538 13.3027C5.36538 13.3668 5.29166 13.4218 5.19687 13.4231C5.10209 13.4244 5.02441 13.3721 5.02441 13.3079C5.02441 13.2438 5.09813 13.1888 5.19292 13.1875C5.2877 13.1862 5.36538 13.2373 5.36538 13.3027Z" fill="white"/>
                  <path d="M5.97053 13.2017C5.98238 13.2658 5.91655 13.3326 5.82177 13.3483C5.72698 13.364 5.64404 13.326 5.63219 13.2632C5.62035 13.2004 5.6888 13.1323 5.78096 13.1153C5.87311 13.0983 5.95868 13.1376 5.97053 13.2017Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_20268_58446">
                    <rect width="16" height="15.9989" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div className="font-medium text-14 leading-[1px]">
                GITHUB
              </div>
            </Button>
            <Button
              variant="neutral"
              className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
              href={props.url}
            >
              <div className="font-medium text-14 leading-[1px]">VISIT</div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.37068 2.57227L9.05067 2.57227C9.37376 2.57227 9.63567 2.83418 9.63567 3.15727L9.63568 7.83726C9.63568 8.16035 9.37377 8.42226 9.05068 8.42226C8.72759 8.42226 8.46568 8.16035 8.46568 7.83726L8.46568 4.56958L2.71295 10.1127C2.48449 10.3412 2.11409 10.3412 1.88564 10.1127C1.65718 9.88429 1.65718 9.51389 1.88564 9.28543L7.63836 3.74227L4.37068 3.74227C4.04759 3.74227 3.78568 3.48035 3.78568 3.15727C3.78568 2.83418 4.04759 2.57227 4.37068 2.57227Z" fill="#191C20"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-14 text-gray-500 leading-5">
        {props.description}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-14 text-primary leading-5 cursor-pointer">
        {props.tags.map((tag, i) => (
          <div key={i}>{tag}</div>
        ))}
      </div>
    </div>
  )
}

const examples = [

  {
    url: 'https://human.withlens.app',
    githubUrl: '#', // FIXME: add github url
    image: '/images/examples/lens.svg',
    title: 'Worldcoin Meets Lens',
    subtitle: 'human.withlens.app',
    description: 'Verify your Lens profile belongs to a unique human. World ID can anonymously prove you...',
    tags: ['On-chain verification', 'Cloud', 'API', 'Community'],
    worldcoin: true,
  },

  {
    url: 'https://moonpay.com',
    githubUrl: '#', // FIXME: add github url
    image: '/images/examples/moonpay.svg',
    title: 'Moon Pay',
    subtitle: 'moonpay.com',
    description: 'Verify your Lens profile belongs to a unique human. World ID can anonymously prove you...',
    tags: ['On-ramp', 'Community'],
  },

  {
    url: 'https://poap.worldcoin.org',
    githubUrl: '#', // FIXME: add github url
    image: '/images/examples/poap.svg',
    title: 'POAP dispenser',
    subtitle: 'poap.worldcoin.org',
    description: 'Verify your Lens profile belongs to a unique human. World ID can anonymously prove you...',
    tags: ['Cloud', 'Community'],
    worldcoin: true,
  },

  {
    url: 'https://petorbz.com',
    githubUrl: '#', // FIXME: add github url
    image: '/images/examples/petorbz.svg',
    title: 'Pet Orbz',
    subtitle: 'petorbz.com',
    description: 'Verify your Lens profile belongs to a unique human. World ID can anonymously prove you...',
    tags: ['On-chain verification', 'Cloud', 'API', 'Community', 'DeFi', 'Smart contract'],
    worldcoin: true,
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
