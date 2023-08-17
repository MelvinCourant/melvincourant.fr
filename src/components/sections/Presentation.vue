<script setup>
import Title from '@/components/reusables/Title.vue'
</script>

<template>
  <section class="presentation">
    <Title id="presentation" :value="'Qui suis-je ?'" :level="2" :hidden="true" />
    <p class="presentation__text">
      Bien le bonjour&nbsp;!
      Je suis un jeune <span class="presentation__text__hightlights">développeur front-end</span> de 23&nbsp;ans,
      actuellement en train de poursuivre mon <span class="presentation__text__hightlights">master Ingénierie du Web</span>.
      Mon parcours m'a conduit à rejoindre <span class="presentation__text__hightlights">La&nbsp;Suite&nbsp;and&nbsp;Co</span> pour mon alternance.
    </p>
  </section>
</template>

<style scoped lang="scss">
.presentation {
  &__text {
    font-family: 'Anton', sans-serif;
    font-size: 8.89vh;
    line-height: 1.10;

    @media screen and (max-width: 991px) {
      font-size: 5.89vh;
    }

    @media screen and (max-width: 767px) {
      font-size: 2.188rem; // 35px
    }

    &__hightlights {
      color: var(--primary);
    }
  }
}
</style>