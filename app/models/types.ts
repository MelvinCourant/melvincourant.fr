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

interface Skill {
  name: string,
  category: string,
  icon: string,
  description: string,
  color: string
}

interface Filter {
  value: string,
  label: string,
  color: string,
  selected?: boolean
}

export type { CTA, Name, AboutText, Skill, Filter }