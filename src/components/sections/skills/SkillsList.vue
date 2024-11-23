<script setup>
import "../../../assets/css/sections/skills/_skills-list.scss";
import Skill from "./Skill.vue";

defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="skills-list">
    <Skill
      v-for="(skill, index) in skills"
      :key="index"
      :skill="skill"
    />
  </ul>
</template>