import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const CATEGORIES = ['frontend', 'backend', 'fullstack', 'tools'] as const
const COLORS = ['red', 'green', 'blue', 'yellow', 'purple'] as const

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects.yml',
      schema: z.object({
        projects: z.array(z.object({
          title: z.string(),
          image: z.string().editor({ input: 'media' }),
          url: z.string(),
          color: z.enum(COLORS),
        })),
      }),
    }),
    technologies: defineCollection({
      type: 'data',
      source: 'technologies.yml',
      schema: z.object({
        technologies: z.array(z.object({
          name: z.string(),
          category: z.enum(CATEGORIES),
          src: z.string().editor({ input: 'media' }),
          description: z.string(),
          color: z.string(),
        })),
      }),
    }),
  },
})