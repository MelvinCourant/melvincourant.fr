<script setup lang="ts">
import "~/assets/css/pages/projects/tech-stack/_technology.scss";
import type { Technology } from "~/models/types.ts"

defineProps<{
  technology: Technology,
}>()
</script>

<template>
  <li
    class="technology"
    :style="{ backgroundColor: technology.color }"
  >
    <div class="technology__icon-container">
      <img
        class="technology__icon"
        :src="technology.src"
        :alt="technology.name"
      />
    </div>
    <h3 class="technology__name">
      {{ technology.name }}
    </h3>
  </li>
</template>