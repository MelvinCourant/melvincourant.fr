<script setup lang="ts">
import "~/assets/css/pages/projects/rebounds/_rebound.scss";
import type { Rebound } from "~/models/types.ts"

defineProps<Rebound>()
</script>

<template>
  <li
    class="rebound"
  >
    <NuxtLink
      :to="url"
      class="rebound__link"
      :style="{ backgroundColor: `var(--${color})` }"
    >
      <img
        class="rebound__image"
        :src="image"
        :alt="title"
      />
      <div class="rebound__content">
        <h3 class="rebound__title">{{ title }}</h3>
        <p class="rebound__description">{{ description }}</p>
      </div>
    </NuxtLink>
  </li>
</template>
