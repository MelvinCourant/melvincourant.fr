<script setup>
import Title from "@/components/reusables/Title.vue"
import Slider from "@/components/specifics/Realisations/Slider.vue";

const realisations = [
  {
    title: "Projet JS",
    nameFile: "projet-js.jpg",
    url: "https://projet-js.melvincourant.fr/"
  },
  {
    title: "Projet JS",
    nameFile: "projet-js.jpg",
    url: "https://projet-js.melvincourant.fr/"
  },
  {
    title: "Projet JS",
    nameFile: "projet-js.jpg"
  },
];

defineEmits(["toggleCursor"]);
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
    />
  </section>
</template>

<style scoped lang="scss">

</style>