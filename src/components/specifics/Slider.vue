<script setup>
import '@css/specifics/slider.scss';
import {Splide, SplideSlide} from "@splidejs/vue-splide";
import '@splidejs/vue-splide/css';
import {onMounted} from "vue";

defineProps({
  realisations: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["toggleCursor", "realisationHovered", "realisationClicked"]);

const splideOptions = {
  gap: "1.25rem",
  focus: "center",
  keyboard: "global",
  autoWidth: true,
  snap: true,
  easing: "ease",
  breakpoints: {
    991: {
      autoWidth: false,
      perPage: 1
    }
  }
};

function getSrc(nameFile, format) {
  if(format === 'webp') {
    return new URL(`../../assets/imgs/realisations/${nameFile}.webp`, import.meta.url).href;
  } else {
    return new URL(`../../assets/imgs/realisations/${nameFile}.jpg`, import.meta.url).href;
  }
}

const elementsToHideCursor = [
  ".splide__pagination",
  ".splide__arrow--prev",
  ".splide__arrow--next"
];

onMounted(() => {
  elementsToHideCursor.forEach(element => {
    document.querySelector(element).addEventListener("mouseenter", () => {
      emit("toggleCursor");
    });

    document.querySelector(element).addEventListener("mouseleave", () => {
      emit("toggleCursor");
    });
  });
})
</script>

<template>
  <Splide
    :options="splideOptions"
    @mouseleave="$emit('realisationHovered', '')"
  >
    <SplideSlide
      v-for="realisation in realisations"
      @mouseover="$emit('realisationHovered', realisation.title)"
      @click="$emit('realisationClicked', realisation)"
    >
      <picture>
        <source
            :srcset="getSrc(realisation.nameFile, 'webp')"
            type="image/webp"
        />
        <img
            :src="getSrc(realisation.nameFile, 'jpg')"
            :alt="realisation.title"
        />
      </picture>
    </SplideSlide>
  </Splide>
</template>