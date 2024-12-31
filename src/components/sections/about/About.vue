<script setup>
import "../../../assets/css/sections/about/_about.scss";
import {provide, ref} from "vue";
import AboutTexts from "./AboutTexts.vue";
import CTA from "../../utils/CTA.vue";

const cta = {
  content: "Tout faire sauter !",
}
const aboutTexts = [
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
const activePickUpAllWoodenBoards = ref(false)

provide('cta', cta)

function blowItUp() {
  activePickUpAllWoodenBoards.value = true;
}
</script>

<template>
  <section class="about" id="about">
    <h2 class="hidden-title">Qui suis-je ?</h2>
    <AboutTexts :aboutTexts="aboutTexts" :activePickUpAllWoodenBoards="activePickUpAllWoodenBoards"/>
    <CTA @click="blowItUp" />
  </section>
</template>