import cn from 'classnames'
import { Header } from 'common/Header'
import Image from 'next/image'
import notFoundImage from 'public/images/404.svg'
import { styles } from 'common/helpers/styles'
import { SearchBar } from 'common/Search'

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-191c20" data-theme="dark">
      <Header disableThemeSelector disableSearch />

      <div className="absolute top-[calc(100vh/12)] max-w-full px-10 opacity-50 md:top-auto md:-right-8 md:bottom-20 md:opacity-100">
        <Image src={notFoundImage} alt="Not found" />
      </div>

      <div
        className={cn(
          'relative grid justify-items-center gap-5 pt-44 md:justify-items-start md:gap-10',
          styles.screenPadding
        )}
      >
        <div className="space-y-4 text-center md:w-min md:space-y-6 md:text-left">
          <h1 className="block bg-[url(/images/iridescent.jpg)] bg-clip-text font-sora text-24 font-semibold text-transparent md:whitespace-nowrap md:text-44">
            Sorry, this page can’t be found
          </h1>

          <div className="text-18 space-y-2 md:space-y-4 md:text-26">
            <p>
              We are here to infinity and beyond exploring the outer space but
              still can’t find your page.
            </p>

            <p>Try searching our site: </p>
          </div>
        </div>

        <SearchBar />
      </div>
    </div>
  )
}
