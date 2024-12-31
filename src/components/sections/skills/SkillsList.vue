<script setup>
import "../../../assets/css/sections/skills/_skills-list.scss";
import Skill from "./Skill.vue";

defineProps({
  skills: {
    type: Array,
    required: true
  },
  categoryToShow: {
    type: String,
    default: "all"
  }
})
</script>

<template>
  <ul class="skills-list">
    <Skill
      v-for="(skill, index) in skills"
      :key="index"
      :skill="skill"
      v-show="categoryToShow === 'all' || skill.category === categoryToShow"
    />
  </ul>
</template>