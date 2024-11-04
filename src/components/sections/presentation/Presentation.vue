<script setup>
import "../../../assets/css/sections/presentation/_presentation.scss";
import {provide} from "vue";
import PresentationTexts from "./PresentationTexts.vue";
import CTA from "../../utils/CTA.vue";

const cta = {
  content: "Tout faire sauter !",
}
const presentationTexts = [
  {
    id: 1,
    content: "Passionné par le développement "
  },
  {
    id: 2,
    content: "front",
    woodenBoardRotation: "-11"
  },
  {
    id: 3,
    content: " depuis quelques années, j’adore me lancer des "
  },
  {
    id: 4,
    content: "challenges",
    woodenBoardRotation: "1.8"
  },
  {
    id: 5,
    content: " en concevant des projets de A à Z. Développeur "
  },
  {
    id: 6,
    content: "Wordpress",
    woodenBoardRotation: "0"
  },
  {
    id: 7,
    content: " le jour et "
  },
  {
    id: 8,
    content: "Vue.js",
    woodenBoardRotation: "9"
  },
  {
    id: 9,
    content: " la nuit."
  }
];

provide('cta', cta)
</script>

<template>
  <section class="presentation" id="about">
    <PresentationTexts :presentationTexts="presentationTexts" />
    <CTA />
  </section>
</template>