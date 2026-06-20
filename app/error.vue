<script setup lang="ts">
import '~/assets/css/views/_not-found.scss';
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const year = new Date().getFullYear();

const statusText = computed(() =>
  props.error?.status === 404
    ? "Oups, tu n'es pas censé être là 👀"
    : props.error?.statusText
);
</script>

<template>
  <section class="not-found">
    <div class="not-found__text">
      <h1 class="not-found__title">{{ error?.status }}</h1>
      <p class="not-found__chapo">{{ statusText }}</p>
    </div>
    <iframe
      class="not-found__video"
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=LdyT8eLGhOz1nDBa?&autoplay=1"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    >
    </iframe>
    <p class="not-found__brackets">(Oui je t'ai rickroll en {{ year }})</p>
  </section>
</template>