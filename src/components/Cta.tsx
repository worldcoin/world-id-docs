import LogoIcon from './icons/LogoIcon'
import { Link } from '@/components/Link'
import DiscordIcon from '@/components/icons/DiscordIcon'

export const Cta = (props: {}) => {
	return (
		<div className="relative flex flex-col items-center gap-y-4 p-8 bg-gray-50 border border-gray-200 rounded-2xl">
			<div className="flex justify-center p-1">
				<LogoIcon className="w-6" />
			</div>
			<h2 className="m-0 font-bold text-xl text-center leading-6">Build your project</h2>
			<p className="lg:w-[630px] m-0 text-sm text-center leading-snug">
				Calling all builders! Some of these projects are ready to be built. You can find some ideas, features,
				integrations and even wireframes below. These are intended as a departure point, just to get ideas
				flowing. Some of these can be a cool side hustle, some your next startup.
			</p>
			<Link
				className="absolute bottom-[16px] right-[16px] flex items-center justify-center w-8 h-8 bg-[#7B53F2] rounded-full"
				href="https://world.org/discord"
				target="_blank"
			>
				<DiscordIcon className="w-5 text-white" />
			</Link>
		</div>
	)
}
