<script setup lang="ts">
import "~/assets/css/pages/home/hero/_hero-left.scss";
import CTA from "~/components/utils/CTA.vue";
import type { Name } from "~/models/types.ts"

withDefaults(
  defineProps<{
    name?: Name,
    description?: string,
  }>(),
  {
    name: () => ({ firstname: 'Melvin', lastname: 'Courant' }),
    description: 'Développeur front-end',
  }
)
</script>

<template>
  <div class="hero__left">
    <div class="hero__texts">
      <h1 class="hero__name">
        <span class="hero__firstname">{{ name.firstname }}</span><br>
        {{ name.lastname }}
      </h1>
      <h2 class="hero__description">{{ description }}</h2>
    </div>
    <CTA/>
  </div>
</template>