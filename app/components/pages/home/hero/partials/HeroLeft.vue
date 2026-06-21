<script setup lang="ts">
import "~/assets/css/pages/home/hero/_hero-left.scss";
import CTA from "~/components/utils/CTA.vue";
import type { Name } from "~/models/types.ts"

defineProps<{
  name: Name,
  description?: string,
}>()
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