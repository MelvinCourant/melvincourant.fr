<script setup lang="ts">
import "~/assets/css/pages/projects/tech-stack/_tech-stack.scss";
import Technology from "~/components/pages/projects/tech-stack/partials/Technology.vue";

const props = withDefaults(defineProps<{
  stack?: string[]
}>(), {
  stack: () => [],
})

const { data: store } = await useAsyncData('technologies', () =>
  queryCollection('technologies').first()
)

const technologies = computed(() =>
  props.stack
    .map(name => store.value?.technologies.find(technology => technology.name === name))
    .filter(technology => technology !== undefined)
)
</script>

<template>
  <ul class="tech-stack">
    <Technology
      v-for="technology in technologies"
      :key="technology.name"
      :technology="technology"
    />
  </ul>
</template>