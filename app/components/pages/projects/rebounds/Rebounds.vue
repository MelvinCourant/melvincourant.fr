<script setup lang="ts">
import "~/assets/css/pages/projects/rebounds/_rebounds.scss";
import Rebound from "~/components/pages/projects/rebounds/partials/Rebound.vue";
import { computed } from "vue";
import type { Rebound as ReboundType } from "~/models/types.ts"

const route = useRoute()

const currentPath = computed(() => route.path.replace(/\/$/, '') || '/')

const { data: projectsData } = await useAsyncData('projects', () =>
  queryCollection('projects').first()
)

const { data: pages } = await useAsyncData('project-pages', () =>
  queryCollection('content').where('path', 'LIKE', '/projects/%').all()
)

const rebounds = computed<ReboundType[]>(() =>
  (projectsData.value?.projects ?? [])
    .filter(project => project.url !== currentPath.value)
    .map(project => {
      const page = pages.value?.find(page => page.path === project.url)

      return {
        title: page?.title ?? project.title,
        description: page?.description ?? '',
        color: project.color,
        image: project.image,
        url: project.url,
      }
    })
)
</script>

<template>
  <section class="rebounds__container">
    <h2>Les autres projets</h2>
    <ul class="rebounds">
      <Rebound
        v-for="rebound in rebounds"
        :key="rebound.url"
        :title="rebound.title"
        :description="rebound.description"
        :color="rebound.color"
        :image="rebound.image"
        :url="rebound.url"
      />
    </ul>
  </section>
</template>
