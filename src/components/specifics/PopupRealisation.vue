<script setup>
import '@css/specifics/popup-realisation.scss';
import {watch} from "vue";

const props = defineProps({
  realisation: {
    type: Object,
    default: () => {}
  },
  active: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggleCursor', 'popupClosed']);

function getSrcTechnologies(nameFile) {
  return new URL(`../../assets/imgs/icons/${nameFile}.svg`, import.meta.url).href;
}

function getSrcVisual(nameFile, format) {
  if(format === 'webp') {
    return new URL(`../../assets/imgs/realisations/${nameFile}.webp`, import.meta.url).href;
  } else {
    return new URL(`../../assets/imgs/realisations/${nameFile}.jpg`, import.meta.url).href;
  }
}

watch(() => props.active, (newValue) => {
  if (newValue === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<template>
  <div class="popup" v-if="active">
    <div class="popup__content">
      <div class="popup__content__head">
        <h3 class="popup__content__head__title">{{ realisation.title }}</h3>
        <p class="popup__content__head__description">{{ realisation.details.description }}</p>
      </div>
      <ul class="popup__content__technologies">
        <li
            v-for="technology in realisation.details.technologies"
            :key="technology"
            class="popup__content__technologies__technology"
        >
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
        <picture>
          <source
            :srcset="getSrcVisual(realisation.nameFile, 'webp')"
            type="image/webp"
          />
          <img
            :src="getSrcVisual(realisation.nameFile, 'jpg')"
            :alt="realisation.title"
          />
        </picture>
      </a>
    </div>
    <button
      class="popup__close"
      @click="$emit('popupClosed')"
      @mouseenter="$emit('toggleCursor')"
      @mouseleave="$emit('toggleCursor')"
      title="Fermer la popup"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="15.2721" y="37.8995" width="32" height="4" transform="rotate(-45 15.2721 37.8995)" fill="white"/>
        <rect x="18.1005" y="15.2721" width="32" height="4" transform="rotate(45 18.1005 15.2721)" fill="white"/>
      </svg>
    </button>
  </div>
  <div
    class="overlay"
    v-if="active"
    @click="$emit('popupClosed');"
  ></div>
</template>