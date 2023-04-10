import { UseCasesListItem } from '@/components/UseCasesListItem'

export const UseCasesList = (props: {

}) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        <UseCasesListItem
          color="#9D50FF"
          icon={(
            <>
              <path fillRule="evenodd" clipRule="evenodd" d="M24.9676 10.353H23.1672C21.9266 10.353 20.9209 11.3587 20.9209 12.5992V14.3996C20.9209 14.7692 21.0102 15.1179 21.1683 15.4253L15.8255 20.7681C15.5179 20.61 15.1692 20.5207 14.7996 20.5207H12.9992C11.7586 20.5207 10.7529 21.5264 10.7529 22.7669V24.5673C10.7529 25.8079 11.7586 26.8135 12.9992 26.8135H14.7996C15.1825 26.8135 15.543 26.7177 15.8585 26.5488L21.2238 31.914C21.0548 32.2295 20.959 32.59 20.959 32.9729V34.7733C20.959 36.0139 21.9647 37.0195 23.2053 37.0195H25.0057C26.2462 37.0195 27.2519 36.0139 27.2519 34.7733V32.9729C27.2519 32.5925 27.1573 32.2342 26.9904 31.9201L32.3203 26.5903C32.6343 26.7573 32.9927 26.8519 33.3732 26.8519H35.1736C36.4142 26.8519 37.4199 25.8463 37.4199 24.6057V22.8053C37.4199 21.5647 36.4142 20.5591 35.1736 20.5591H33.3732C32.9934 20.5591 32.6356 20.6533 32.322 20.8198L26.9531 15.4509C27.1195 15.1373 27.2138 14.7795 27.2138 14.3996V12.5992C27.2138 11.3587 26.2081 10.353 24.9676 10.353ZM22.1017 16.3776C22.4187 16.5487 22.7816 16.6459 23.1672 16.6459H24.9676C25.3429 16.6459 25.6967 16.5538 26.0077 16.3911L31.3818 21.7652C31.219 22.0762 31.127 22.43 31.127 22.8053V24.6057C31.127 24.9803 31.2187 25.3335 31.3809 25.6441L26.0442 30.9807C25.7336 30.8184 25.3804 30.7267 25.0057 30.7267H23.2053C22.833 30.7267 22.4819 30.8172 22.1728 30.9775L16.795 25.5997C16.9553 25.2906 17.0458 24.9395 17.0458 24.5673V22.7669C17.0458 22.3814 16.9487 22.0186 16.7776 21.7016L22.1017 16.3776Z" fill="white"/>
            </>
          )}
          title="DeFi and Fintech"
          description="Particularly relying on global proof of personhood, can be used to build a truly democratic, one person one vote, system as well as novel voting systems centered around unique humans."
          items={[
            "Undercollateralized lending & credit",
            "Credit card chargeback protection",
            "Zero-knowledge compliance with nationality, age and sanctions",
            "Private transaction mixer with daily amount limits and ZK compliance for MLP",
            "Private decentralized credit score",
          ]}
        />

        <UseCasesListItem
          color="#4940E0"
          icon={(
            <>
              <path d="M15.0329 20.75L32.9671 20.75C33.9872 20.75 34.3878 19.3986 33.539 18.8206L25.1438 13.1038C24.4512 12.6321 23.5488 12.6321 22.8562 13.1038L14.461 18.8206C13.6122 19.3986 14.0128 20.75 15.0329 20.75Z" fill="white"/>
              <path d="M17.5 22.25H20.5V27.25H17.5V22.25Z" fill="white"/>
              <path d="M30.5 22.25H27.5V27.25H30.5V22.25Z" fill="white"/>
              <path d="M22.5 22.25H25.5V27.25H22.5V22.25Z" fill="white"/>
              <path d="M32.2764 29.3028C32.107 28.964 31.7607 28.75 31.382 28.75L16.618 28.75C16.2393 28.75 15.893 28.964 15.7236 29.3028L14.7236 31.3028C14.3912 31.9677 14.8747 32.75 15.618 32.75H32.382C33.1253 32.75 33.6088 31.9677 33.2764 31.3028L32.2764 29.3028Z" fill="white"/>
            </>
          )}
          title="Voting platforms"
          description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
          items={[
            "Deduplication in government elections",
            "Novel DAO governance including quadratic, and conviction voting",
            "Anonymous online polls platform",
            "Snapshot integration",
            "Change.org integration",
          ]}
        />

        <UseCasesListItem
          color="#487CA5"
          icon={(
            <>
              <path fillRule="evenodd" clipRule="evenodd" d="M27.0936 22.9556H28.3379C31.4323 22.9556 33.9403 25.4636 33.9403 28.5579V31.6705C33.9403 33.0457 32.8256 34.1603 31.4505 34.1603H27.0936C23.9992 34.1603 21.4912 31.6523 21.4912 28.5579C21.4912 25.4636 23.9992 22.9556 27.0936 22.9556ZM26.3382 26.8351C26.3382 27.5959 26.9549 28.2126 27.7157 28.2126C28.4766 28.2126 29.0933 27.5959 29.0933 26.8351C29.0933 26.0742 28.4766 25.4575 27.7157 25.4575C26.9549 25.4575 26.3382 26.0742 26.3382 26.8351ZM25.3047 30.2796C25.3047 31.0405 26.3842 31.6572 27.7157 31.6572C29.0473 31.6572 30.1268 31.0405 30.1268 30.2796C30.1268 29.5187 29.0473 28.902 27.7157 28.902C26.3842 28.902 25.3047 29.5187 25.3047 30.2796Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M26.1545 21.2157C26.3132 20.6887 26.3956 20.1277 26.3895 19.5474C26.3592 16.4578 23.7701 14.002 20.6805 14.002H19.5428C16.4484 14.002 13.9404 16.5099 13.9404 19.6043V22.7169C13.9404 24.092 15.0551 25.2067 16.4302 25.2067H20.2674C20.4467 25.2067 20.6102 25.0989 20.6805 24.9341C21.9599 21.9185 24.8023 21.5683 25.7401 21.5368C25.9315 21.5307 26.0987 21.4011 26.1545 21.2169V21.2157ZM20.1656 19.259C20.176 19.259 20.1864 19.2589 20.1968 19.2587C20.9432 19.2422 21.5432 18.6319 21.5432 17.8814C21.5432 17.1206 20.9265 16.5039 20.1657 16.5039C20.1553 16.5039 20.1449 16.504 20.1345 16.5042C19.388 16.5207 18.788 17.131 18.788 17.8815C18.788 18.6423 19.4047 19.259 20.1656 19.259ZM22.5461 21.5471C22.5664 21.4751 22.577 21.4012 22.577 21.326C22.577 20.5652 21.4975 19.9484 20.1659 19.9484C18.9679 19.9484 17.974 20.4476 17.7866 21.1019C17.7655 21.1752 17.7545 21.2505 17.7545 21.3272C17.7545 22.0881 18.834 22.7048 20.1656 22.7048C21.3662 22.7048 22.3619 22.2034 22.5461 21.5471Z" fill="white"/>
            </>
          )}
          title="Social Media"
          description="Using World ID’s proof of personhood, a system could be built to ensure aid from NGOs, non-profits, government programs, etc. is distributed equitably to recipients."
          items={[
            "Undercollateralized lending & credit",
            "Credit card chargeback protection",
            "Zero-knowledge compliance with nationality, age and sanctions",
            "Private transaction mixer with daily amount limits and ZK compliance for MLP",
            "Private decentralized credit score",
          ]}
        />

      </div>
    </div>
  )
}
