<script setup lang="ts">
import '~/assets/css/pages/projects/_iframe-wrapper.scss'

defineProps<{
  src: string
}>()
</script>

<template>
  <iframe
    width="1280"
    height="720"
    :src="src"
    class="iframe--wrapper"
    allowfullscreen
  >
  </iframe>
</template>