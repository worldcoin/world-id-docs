import { Icon } from 'common/Icon'
import { Link } from 'common/Link'
import { SearchBar } from 'common/Search'

export default function PageNotFound() {
  return (
    <div className="grid gap-y-8">
      <div className="grid gap-y-3">
        <h1 className="mb-0 text-[28px]">Sorry, this page can’t be found</h1>
        <p className="my-0 max-w-md leading-tight !text-neutral-900">
          We are here to infinity and beyond exploring the outer space but still
          can’t find your page.
        </p>
      </div>

      <div className="grid justify-items-start gap-y-2">
        {/* <span>Try searching our site: </span> */}
        {/* FIXME -- useRouter causes error when rendering SearchBar */}
        {/* <SearchBar /> */}
        <Link
          href="/"
          className="mt-2 grid grid-cols-fr/auto gap-x-2 rounded-lg border border-neutral-100 bg-fbfbfc px-4 py-3.5"
        >
          <span className="text-14 font-medium uppercase text-neutral-900">
            Home
          </span>

          <Icon name="arrow-right" className="h-4 w-4 text-neutral-900" />
        </Link>
      </div>
    </div>
  )
}
