<script setup>
import Title from "@/components/reusables/Title.vue"
import Slider from "@/components/specifics/realisations/Slider.vue";

const realisations = [
  {
    title: "Projet JS",
    nameFile: "projet-js.jpg",
    url: "https://projet-js.melvincourant.fr/"
  },
  {
    title: "Test 1",
    nameFile: "projet-js.jpg",
    url: "https://projet-js.melvincourant.fr/"
  },
  {
    title: "Test 2",
    nameFile: "projet-js.jpg"
  },
];

defineEmits(["toggleCursor", "realisationHovered"]);
</script>

<template>
  <section class="realisations">
    <Title
      id="realisations"
      :value="'Réalisations'"
      :level="2"
    />
    <Slider
      :realisations="realisations"
      @toggleCursor="$emit('toggleCursor')"
      @realisationHovered="$emit('realisationHovered', $event)"
    />
  </section>
</template>

<style scoped lang="scss">

</style>