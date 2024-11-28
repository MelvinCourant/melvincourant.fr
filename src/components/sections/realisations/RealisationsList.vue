<script setup>
defineProps({
  realisations: {
    type: Array,
    required: true
  }
})

function getSrc(folder, nameFile, format) {
  return new URL(`../../../assets/imgs/${folder}/${nameFile}.${format}`, import.meta.url).href;
}
</script>

<template>
  <ul class="realisations-list">
    <li
      v-for="realisation in realisations"
      :key="realisation.id"
      class="realisation"
    >
      <img
        class="realisation__image"
        :src="getSrc('realisations', realisation.image, 'webp')"
        :alt="realisation.title"
      />
      <div class="realisation__texts">
        <h3 class="realisation__title">
          {{ realisation.title }}
        </h3>
        <p class="realisation__description">
          {{ realisation.description }}
        </p>
        <ul>
          <li
            v-for="technology in realisation.technologies"
            :key="technology"
            class="realisation__technology"
          >
            <img
              class="realisation__technology-icon"
              :src="getSrc('icons', technology, 'svg')"
              :alt="technology"
            />
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>