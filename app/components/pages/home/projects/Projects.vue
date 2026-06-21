<script setup lang="ts">
import "~/assets/css/pages/home/projects/_projects.scss";
import ProjectsList from "./partials/ProjectsList.vue";
import ProjectsActions from "./partials/ProjectsActions.vue";
import {computed, ref} from "vue";

const { data } = await useAsyncData('projects', () =>
  queryCollection('projects').first()
)

const anchor = computed(() => data.value?.anchor ?? 'projects')
const title = computed(() => data.value?.title ?? 'Mes fiertés')
const projects = computed(() => data.value?.projects ?? [])

const actionSelected = ref(null);
</script>

<template>
  <section class="projects" :id="anchor">
    <h2 class="hidden-title">{{ title }}</h2>
    <ProjectsList :projects="projects" :actionSelected="actionSelected" @resetAction="actionSelected = null" />
    <ProjectsActions @pass="actionSelected = 'pass'" @rollback="actionSelected = 'rollback'" @smash="actionSelected = 'smash'" />
  </section>
</template>
