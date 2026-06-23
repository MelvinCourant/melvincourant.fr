<script setup lang="ts">
import "~/assets/css/pages/home/skills/_skills.scss";
import SkillsList from "./partials/SkillsList.vue";
import Filters from "./partials/Filters.vue";
import {computed, reactive, ref} from "vue";
import type { Filter } from "~/models/types.ts"

const props = withDefaults(defineProps<{
  anchor?: string,
  title?: string,
  filters?: Filter[],
  skills?: string[],
}>(), {
  anchor: 'skills',
  title: 'Mes talents',
  filters: () => [],
  skills: () => [],
})

const { data: technologiesData } = await useAsyncData('technologies', () =>
  queryCollection('technologies').first()
)

const skills = computed(() => {
  const technologies = technologiesData.value?.technologies ?? []

  return props.skills
    .map(name => technologies.find(technology => technology.name === name))
    .filter(technology => technology !== undefined)
})

const filters = reactive(
  props.filters.map((filter, index) => ({
    ...filter,
    selected: filter.selected ?? index === 0,
  }))
)

const categoryToShow = ref(
  filters.find(filter => filter.selected)?.value ?? 'all'
)

function updateFilters(filterValue: string) {
  filters.forEach(filter => {
    filter.selected = filter.value === filterValue;
  });

  categoryToShow.value = filterValue;
}
</script>

<template>
  <section class="skills" :id="anchor">
    <h2 class="hidden-title">{{ title }}</h2>
    <Filters :filters="filters" @filterSelected="updateFilters($event)"/>
    <SkillsList :skills="skills" :categoryToShow="categoryToShow" />
  </section>
</template>