<script setup>
import { ref } from "vue";
import Title from "@/components/reusables/Title.vue";
import PopupRealisation from "@/components/specifics/PopupRealisation.vue";
import Slider from "@/components/specifics/Slider.vue";

defineProps({
  realisations: {
    type: Array,
    required: true
  }
})

defineEmits(["toggleCursor", "realisationHovered"]);

const popupIsActive = ref(false);
const realisation = ref(null);

function updateRealisation(newRealisation) {
  popupIsActive.value = true;
  realisation.value = newRealisation;
}
</script>

<template>
  <section class="realisations">
    <Title
      id="realisations"
      :value="'Réalisations'"
      :level="2"
    />
    <PopupRealisation
      :active="popupIsActive"
      :realisationDetails="realisation"
    />
    <Slider
      :realisations="realisations"
      @toggleCursor="$emit('toggleCursor')"
      @realisationHovered="$emit('realisationHovered', $event)"
      @realisationClicked="updateRealisation($event)"
    />
  </section>
</template>