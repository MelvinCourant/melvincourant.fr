<script setup>
import Title from '@/components/reusables/Title.vue'
import SkillsList from "@/components/specifics/skills/skills-list.vue";

defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="skills">
    <Title
      id="skills"
      :value="'Compétences'"
      :level="2"
    />
    <skills-list
      :skills="skills"
    />
  </section>
</template>

<style scoped lang="scss">

</style>