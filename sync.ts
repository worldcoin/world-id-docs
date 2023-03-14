/**
 * This script syncs the READMEs of all World ID repositories so all of them have the same contextual information.
 * The content from SHARED-README.md is added to all World ID repositories.
 */
import fs from 'fs'

const matchRegex =
	/<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->(\r\n|\r|\n|.)*<!-- WORLD-ID-SHARED-README-TAG:END -->/
const sharedReadme: string = fs.readFileSync('SHARED-README.md', 'utf8')
const readmeSubstitution = `<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->\n${sharedReadme}\n<!-- WORLD-ID-SHARED-README-TAG:END -->`

const localSync = () => {
	// Local sync
	const localReadme: string = fs.readFileSync('README.md', 'utf8')

	const newReadme = localReadme.replace(matchRegex, readmeSubstitution)

	if (newReadme !== localReadme) {
		fs.writeFileSync('README.md', newReadme, { encoding: 'utf8', flag: 'w' })
		console.log('✅ Updated local README.')
	} else {
		console.log('🟢 Local README is already up-to-date.')
	}
}

interface RepositoryInterface {
	name: string
	repository: string
	sync_readme: boolean
	description: string
}
interface RepositoriesInterface {
	description: string
	list: RepositoryInterface[]
}

const remoteSync = async () => {
	const githubToken = process.env.GITHUB_TOKEN
	if (!githubToken) {
		throw new Error('`GITHUB_TOKEN` must be set to run this script.')
	}

	console.log('Starting remote sync ...')

	const repositories: RepositoriesInterface = require('./repositories.json')

	for (const repository of repositories.list) {
		if (!repository.sync_readme) {
			continue
		}

		console.log(`Starting check for ${repository.repository}`)
		const response = await fetch(`https://api.github.com/repos/${repository.repository}/contents/README.md`)

		if (!response.ok) {
			throw new Error(`Error fetching repository ${repository.repository}.`)
		}

		const readmeMeta = await response.json()
		const currentReadme = Buffer.from(readmeMeta.content, 'base64').toString('utf8')

		if (!currentReadme.includes('WORLD-ID-SHARED-README-TAG:START')) {
			throw new Error(`${repository.name} repository does not have the shared README tag.`)
		}

		const newContents = Buffer.from(currentReadme.replace(matchRegex, readmeSubstitution), 'utf8').toString(
			'base64'
		)

		if (newContents !== readmeMeta.content.replaceAll('\n', '')) {
			console.log(`Updating ${repository.repository}...`)
			const payload = {
				message: 'docs: syncing README for World ID repositories',
				content: newContents,
				sha: readmeMeta.sha,
				committer: {
					name: 'worldcoin[bot]',
					email: 'bot@worldcoin.org',
				},
			}
			const updateResponse = await fetch(
				`https://api.github.com/repos/${repository.repository}/contents/README.md`,
				{
					method: 'PUT',
					body: JSON.stringify(payload),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `token ${githubToken}`,
					},
				}
			)

			if (!updateResponse.ok) {
				throw new Error(`Error updating repository ${repository.repository}. ${await updateResponse.text()}`)
			}
			console.log(`✅ Updated repository ${repository.repository}.`)
		} else {
			console.log(`🟢 ${repository.repository} is already up-to-date.`)
		}
	}
}

/**
 * Syncs the descriptions for all repositories from GitHub.
 */
const descriptionsSync = async () => {
	const repositories: RepositoriesInterface = require('./repositories.json')

	for (let i = 0; i < repositories.list.length; i++) {
		const repository = repositories.list[i]
		const response = await fetch(`https://api.github.com/repos/${repository.repository}`)
		repositories.list[i].description = (await response.json()).description
	}

	fs.writeFileSync('repositories.json', JSON.stringify(repositories, null, 2))
}

if (require.main === module) {
	if (process.argv[2] === 'remote') {
		remoteSync()
	} else if (process.argv[2] === 'local') {
		localSync()
	} else {
		descriptionsSync()
	}
}
