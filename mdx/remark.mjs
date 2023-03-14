import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { mdxAnnotations } from 'mdx-annotations'

const keepMeta = () => {
	return tree => {
		visit(tree, 'code', node => {
			try {
				node.properties = JSON.parse(node.data?.hProperties?.annotation ?? '{}')
			} catch {}
		})
	}
}

export const remarkPlugins = [mdxAnnotations.remark, keepMeta, remarkGfm]
