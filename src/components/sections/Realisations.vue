<script setup>
import Title from "@/components/reusables/Title.vue"
import Slider from "@/components/specifics/realisations/Slider.vue";

defineProps({
  realisations: {
    type: Array,
    required: true
  }
})

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