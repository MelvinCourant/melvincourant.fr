<script setup>
import {Splide, SplideSlide} from "@splidejs/vue-splide";
import '@splidejs/vue-splide/css';
import {onMounted} from "vue";

defineProps({
  realisations: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["toggleCursor"]);

const splideOptions = {
  type: "loop",
  gap: "1.25rem",
  focus: "center",
  keyboard: "global",
  autoWidth: true,
  snap: true,
  wheel: true,
  easing: "ease",
  breakpoints: {
    991: {
      autoWidth: false,
      perPage: 1
    }
  }
};

function getSrc(nameFile) {
  return new URL(`../../../assets/imgs/realisations/${nameFile}`, import.meta.url).href;
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
  >
    <SplideSlide
      v-for="realisation in realisations"
    >
      <a
        class="slider__item__link"
        :href="realisation.url"
        target="_blank"
        :title="`Àller sur le site de ${realisation.title}`"
      >
        <img
          :src="getSrc(realisation.nameFile)"
          :alt="realisation.title"
          :data-splide-lazy="getSrc(realisation.nameFile)"
        />
      </a>
    </SplideSlide>
  </Splide>
</template>

<style lang="scss">
.splide {
  &__arrow {
    background-color: var(--text);

    svg {
      fill: var(--background);
    }
  }

  &__pagination {
    bottom: -1.25rem !important;
    transform: translateY(100%);

    &__page {
      background-color: var(--text);
      width: 12px;
      height: 12px;
      margin: 0 0.5rem; // 5px

      &.is-active {
        background-color: var(--primary);
      }
    }
  }
}
</style>