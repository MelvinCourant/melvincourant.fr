<script setup>
import Title from '@/components/reusables/Title.vue';
import '@css/sections/presentation.scss';
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
      Je suis un développeur <span class="presentation__text__highlights">front-end</span>
      en master <span class="presentation__text__highlights">Ingénierie du Web</span>.
      Mon parcours m'a conduit à rejoindre <span class="presentation__text__highlights">La&nbsp;Suite&nbsp;and&nbsp;Co</span> pour mon alternance.
    </p>
  </section>
</template>