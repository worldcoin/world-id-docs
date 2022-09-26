export type TOCSubheading = {
  id: string
  title: string
}

export type TOCHeading = {
  id: string
  title: string
  children?: Array<TOCSubheading>
}

export type TOC = Array<TOCHeading>
