<script setup>
import "../../../assets/css/sections/skills/_skill.scss";

defineProps({
  skill: {
    type: Object,
    required: true
  }
})

function getSrc(nameFile) {
  return new URL(`../../../assets/images/icons/${nameFile}.svg`, import.meta.url).href;
}
</script>

<template>
  <li
    class="skill"
    :style="{ backgroundColor: skill.color }"
  >
    <div class="skill__icon-container">
      <img
        class="skill__icon"
        :src="getSrc(skill.icon)"
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