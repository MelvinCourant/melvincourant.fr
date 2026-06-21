import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const CATEGORIES = ['frontend', 'backend', 'fullstack', 'tools'] as const
const FILTER_VALUES = ['all', ...CATEGORIES] as const

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    contact: defineCollection({
      type: 'data',
      source: 'contact.yml',
      schema: z.object({
        anchor: z.string(),
        title: z.string(),
        contacts: z.array(z.object({
          title: z.string(),
          icon: z.string().editor({ input: 'media' }),
          description: z.string(),
          url: z.string(),
          color: z.string(),
        })),
      }),
    }),
    about: defineCollection({
      type: 'data',
      source: 'about.yml',
      schema: z.object({
        anchor: z.string(),
        title: z.string(),
        cta: z.object({
          content: z.string(),
          url: z.string().optional(),
        }),
        aboutTexts: z.array(z.object({
          content: z.string(),
          woodenBoardRotation: z.string().optional(),
        })),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects.yml',
      schema: z.object({
        anchor: z.string(),
        title: z.string(),
        projects: z.array(z.object({
          title: z.string(),
          image: z.string().editor({ input: 'media' }),
          url: z.string(),
          description: z.string(),
          technologies: z.array(z.string()),
        })),
      }),
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