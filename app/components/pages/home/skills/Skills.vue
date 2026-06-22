<script setup lang="ts">
import "~/assets/css/pages/home/skills/_skills.scss";
import SkillsList from "./partials/SkillsList.vue";
import Filters from "./partials/Filters.vue";
import {computed, reactive, ref} from "vue";

const { data } = await useAsyncData('skills', () =>
  queryCollection('skills').first()
)

const { data: technologiesData } = await useAsyncData('technologies', () =>
  queryCollection('technologies').first()
)

const anchor = computed(() => data.value?.anchor ?? 'skills')
const title = computed(() => data.value?.title ?? 'Mes talents')
const skills = computed(() => {
  const technologies = technologiesData.value?.technologies ?? []

  return (data.value?.skills ?? [])
    .map(name => technologies.find(technology => technology.name === name))
    .filter(technology => technology !== undefined)
})

const filters = reactive(
  (data.value?.filters ?? []).map((filter, index) => ({
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