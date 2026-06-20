<script setup lang="ts">
import "~/assets/css/pages/home/skills/_skill.scss";

defineProps({
  skill: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li
    class="skill"
    :style="{ backgroundColor: skill.color }"
  >
    <div class="skill__icon-container">
      <img
        class="skill__icon"
        :src="`/icons/${skill.icon}.svg`"
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