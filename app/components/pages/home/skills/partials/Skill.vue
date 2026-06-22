<script setup lang="ts">
import "~/assets/css/pages/home/skills/_skill.scss";
import type { Technology } from "~/models/types.ts"

defineProps<{
  skill: Technology,
}>()
</script>

<template>
  <li
    class="skill"
    :style="{ backgroundColor: skill.color }"
  >
    <div class="skill__icon-container">
      <img
        class="skill__icon"
        :src="skill.src"
        :alt="skill.name"
      />
    </div>
    <div class="skill__texts">
      <h3 class="skill__name">
        {{ skill.name }}
      </h3>
      <p class="skill__description">
        {{ skill.description }}
      </p>
    </div>
  </li>
</template>