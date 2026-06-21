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

export type { CTA, Name, AboutText }