<script setup>
import Title from '@/components/reusables/Title.vue'
import SkillsList from "@/components/specifics/SkillsList.vue";

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
    <SkillsList
      :skills="skills"
    />
  </section>
</template>