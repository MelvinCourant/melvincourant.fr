<script setup>
import "../../../assets/css/sections/skills/_skill.scss";

defineProps({
  skill: {
    type: Object,
    required: true
  }
})

function getSrc(nameFile) {
  return new URL(`../../../assets/imgs/icons/${nameFile}.svg`, import.meta.url).href;
}
</script>

<template>
  <li
    class="skill"
    :data-category="skill.category"
    :style="{ backgroundColor: skill.color }"
  >
    <img
      class="skill__icon"
      :src="getSrc(skill.icon)"
      :alt="skill.name"
    />
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