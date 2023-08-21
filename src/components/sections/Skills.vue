<script setup>
import Title from '@/components/reusables/Title.vue'

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
    <ul class="skills__list">
      <li v-for="(skill, index) in skills" :key="index">
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.skills {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.85vh;
    font-size: 11.85vh;
    line-height: 0.875;
    font-family: 'Anton', sans-serif;
    text-transform: uppercase;

    @media screen and (max-width: 767px) {
      font-size: 7.5vh;
    }
  }
}
</style>