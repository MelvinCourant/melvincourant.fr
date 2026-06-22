interface CTA {
  content: string,
  url?: string
}

interface Name {
  firstname: string,
  lastname: string
}

interface AboutText {
  content: string,
  woodenBoardRotation?: string
}

interface Filter {
  value: string,
  label: string,
  color: string,
  selected?: boolean
}

interface Technology {
  name: string,
  category: string,
  src: string,
  description: string,
  color: string
}

export type { CTA, Name, AboutText, Filter, Technology }