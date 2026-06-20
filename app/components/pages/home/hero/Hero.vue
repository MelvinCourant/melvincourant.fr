<script setup>
import "~/assets/css/pages/home/hero/_hero.scss";
import HeroLeft from "./partials/HeroLeft.vue";
import HeroRight from "./partials/HeroRight.vue";
import {provide} from "vue";

const cta = {
  content: "Découvre moi !",
  url: "#about",
}
const hideText = "J’ai caché des petits trucs";

provide('cta', cta)
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero__container">
      <HeroLeft />
      <HeroRight :hideText="hideText" />
    </div>
  </section>
</template>