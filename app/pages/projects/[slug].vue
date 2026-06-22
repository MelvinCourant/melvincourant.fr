<script setup lang="ts">
import "~/assets/css/pages/projects/_project.scss";

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <header>
    <a
      href="/#projects"
      title="Revenir sur la page d'accueil"
      class="project__navbar"
    >
      <img src="~/assets/images/logo.svg" alt="Logo" />
      <span>Melvin Courant</span>
    </a>
  </header>
  <ContentRenderer
    v-if="page"
    :value="page"
    tag="section"
    class="project"
  />
</template>