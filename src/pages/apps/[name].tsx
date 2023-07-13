import { useRouter } from 'next/router'
import Image from 'next/image'
import { AppConfig } from '../../components/Apps'
import { Link } from '@/components/Link'
import GitHubIcon from '@/components/icons/GitHubIcon'
import RedirectIcon from '@/components/icons/RedirectIcon'
import { Button } from '@/components/Button'
import { apps } from './appList.json'


export default function Page() {
    const router = useRouter()
    const app: AppConfig = apps.find((app) => app.slug === router.query.name)!
    if (app) {
        return (
            <div>
                <Button href="/apps" variant="text" arrow="left" className="mb-4">Back to Apps & Integrations</Button>
                {app.image.lg && <Link href={app.url ?? '#'} className="flex relative aspect-card mb-8">
                    <Image className="absolute inset-0 m-0" src={app.image.lg!} alt={app.title} fill />
                </Link>}
                <div className="flex flex-row items-center">
                    {!app.image.lg && <Link href={app.url ?? '#'} className="h-[80px] w-[80px] relative aspect-square mr-4">
                        <Image className="m-0" src={app.image.sm} alt={app.title} fill />
                    </Link>}
                    <div className="grow">
                        <div className="font-bold text-3xl leading-4">{app.title}</div>
                        <Link href={`${app.url}`} className="mt-4 text-xl text-gray-500 leading-4 block">{app.subtitle}</Link>
                    </div>
                    <div className="flex items-center gap-x-2">
                        {app.githubUrl && (
                            <Button
                                variant="neutral"
                                className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg "
                                href={app.githubUrl}
                            >
                                <GitHubIcon className="w-5 h-5" />
                                <div className="font-medium text-18 tracking-[-0.01em]">GITHUB</div>
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
                            href={app.url}
                        >
                            <div className="font-medium text-18 tracking-[-0.01em]">VISIT</div>
                            <RedirectIcon className="text-gray-100 w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex w-full items-top gap-x-6 mt-8">
                    <div className="w-1/2 text-14 text-gray-500 leading-5 line-clamp-2">{app.description}</div>
                    <div className="w-1/2 flex flex-wrap justify-end gap-x-3 gap-y-1 text-14 text-primary leading-5 cursor-pointer">
                        {app.tags.map((tag, i) => (
                            <div key={i}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
                {app.body && <div className="flex flex-col mt-8">
                    <div className="font-bold text-xl mb-2">Description</div>
                    {app.body}
                </div>}
            </div>
        )
    } else {
        return (
            <div className="flex flex-col grow items-center justify-center h-full">
                {/* cSpell: disable */}
                <div className="text-2xl">We couldn&apos;t find that app.</div>
                {/* cSpell: enable */}
                <Button href="/apps" variant="text" arrow="left" className="mb-4">Back to Apps & Integrations</Button>
            </div>
        )
    }
}