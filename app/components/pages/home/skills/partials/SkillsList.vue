<script setup lang="ts">
import "~/assets/css/pages/home/skills/_skills-list.scss";
import SkillComponent from "./Skill.vue";
import type { Skill } from "~/models/types.ts"

withDefaults(
  defineProps<{
    skills: Skill[],
    categoryToShow?: string,
  }>(),
  {
    categoryToShow: 'all',
  }
)
</script>

<template>
  <ul class="skills-list">
    <SkillComponent
      v-for="(skill, index) in skills"
      :key="index"
      :skill="skill"
      v-show="categoryToShow === 'all' || skill.category === categoryToShow"
    />
  </ul>
</template>