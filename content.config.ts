import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const CATEGORIES = ['frontend', 'backend', 'fullstack', 'tools'] as const
const FILTER_VALUES = ['all', ...CATEGORIES] as const

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.yml',
      schema: z.object({
        anchor: z.string(),
        title: z.string(),
        filters: z.array(z.object({
          value: z.enum(FILTER_VALUES),
          label: z.string(),
          color: z.string(),
          selected: z.boolean().optional(),
        })),
        skills: z.array(z.object({
          name: z.string(),
          category: z.enum(CATEGORIES),
          icon: z.string().editor({ input: 'media' }),
          description: z.string(),
          color: z.string(),
        })),
      }),
    }),
  },
})