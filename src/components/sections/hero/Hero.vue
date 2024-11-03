<script setup>
import "../../../assets/css/sections/hero/_hero.scss";
import HeroLeft from "./HeroLeft.vue";
import HeroRight from "./HeroRight.vue";
import {provide} from "vue";

const cta = {
  content: "Découvre moi !",
  url: "#about",
}
const hideText = "J’ai caché des petits trucs";

provide('cta', cta)
</script>

<template>
  <section class="hero">
    <HeroLeft />
    <HeroRight :hideText="hideText" />
  </section>
</template>