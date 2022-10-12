import shiki from 'shiki'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { codeToHast } from 'shiki-renderer-hast'

const plugin = () => async (tree) => {
  const highlighter = await shiki.getHighlighter({ theme: 'material-default' })

  visit(tree, 'element', (node, _, parent) => {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') return

    const code = codeToHast(highlighter, toString(node), getLanguage(node))

    parent.children = code.children
    parent.properties = code.properties
  })
}

const getLanguage = (node) => {
  const dataLanguage = node.properties.dataLanguage

  if (dataLanguage != null) {
    return dataLanguage
  }

  const className = node.properties.className || []

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase()
    }
  }

  return null
}

export default plugin
