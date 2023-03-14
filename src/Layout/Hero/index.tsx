import cn from 'classnames'

export function Hero(props: { className?: string }) {
  return (
    <div className="mb-12 border-b border-b-neutral-100 pb-12">
      <h1
        className={cn(
          'text-5xl font-bold uppercase leading-none tracking-wide'
        )}
      >
        World ID
      </h1>
      <p className="mt-3 text-24 text-neutral-700 lg:max-w-[580px]">
        The protocol to bring global proof of personhood to the internet.
      </p>
    </div>
  )
}
