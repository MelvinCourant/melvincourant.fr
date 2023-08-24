<script setup>
import Title from '@/components/reusables/Title.vue'
</script>

<template>
  <section id="presentation" class="presentation">
    <Title
      :value="'Qui suis-je ?'"
      :level="2"
      :hidden="true"
    />
    <p class="presentation__text">
      Bien le bonjour&nbsp;!
      Je suis un développeur <span class="presentation__text__hightlights">front-end</span>
      en master <span class="presentation__text__hightlights">Ingénierie du Web</span>.
      Mon parcours m'a conduit à rejoindre <span class="presentation__text__hightlights">La&nbsp;Suite&nbsp;and&nbsp;Co</span> pour mon alternance.
    </p>
  </section>
</template>

<style scoped lang="scss">
.presentation {
  &__text {
    font-family: 'Anton', sans-serif;
    font-size: 6.666vw;
    line-height: 1.13;

    @media screen and (max-width: 991px) {
      font-size: 8.476vw;
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