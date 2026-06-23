<script setup lang="ts">
import "~/assets/css/pages/projects/_project-page.scss";

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <header
    class="project-page__header"
  >
    <NuxtLink
      to="/#projects"
      title="Revenir sur la page d'accueil"
      class="project-page__navbar"
    >
      <img src="~/assets/images/logo.svg" alt="Logo" />
      <span>Melvin Courant</span>
    </NuxtLink>
  </header>
  <ContentRenderer
    v-if="page"
    :value="page"
    tag="section"
    class="project-page"
  />
  <ProjectsRebounds />
</template>