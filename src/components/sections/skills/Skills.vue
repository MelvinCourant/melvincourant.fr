<script setup>
import "../../../assets/css/sections/skills/_skills.scss";
import skillsJson from "../../../data/skills.json";
import SkillsList from "./SkillsList.vue";
</script>

<template>
  <section class="skills" id="skills">
    <SkillsList :skills="skillsJson" />
  </section>
</template>