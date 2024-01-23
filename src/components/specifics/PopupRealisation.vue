<script setup>
import '@css/specifics/popup-realisation.scss';
import {watch} from "vue";

const props = defineProps({
  realisation: {
    type: Object,
    default: null
  },
  active: {
    type: Boolean,
    required: true
  }
})

function getSrcTechnologies(nameFile) {
  return new URL(`../../assets/imgs/icons/${nameFile}`, import.meta.url).href;
}

function getSrcVisual(nameFile) {
  return new URL(`../../assets/imgs/realisations/${nameFile}`, import.meta.url).href;
}
</script>

<template>
  <div class="popup" v-if="active">
    <div class="popup__content">
      <h3 class="popup__content__title">{{ realisation.title }}</h3>
      <p class="popup__content__description">{{ realisation.description }}</p>
      <ul class="popup__content__technologies">
        <li v-for="technology in realisation.details.technologies">
          <img :src="getSrcTechnologies(technology)" :alt="technology" />
        </li>
      </ul>
    </div>
    <div class="popup__visual">
      <a
        class="popup__visual__link"
        :href="realisation.url"
        target="_blank"
        :title="`Redirige sur ${realisation.title}`"
      >
        <img
          :src="getSrcVisual(realisation.nameFile)"
          :alt="realisation.title"
        />
      </a>
    </div>
  </div>
</template>