<script setup lang="ts">
import "~/assets/css/pages/home/about/_about.scss";
import {provide, ref, toRef} from "vue";
import AboutTexts from "./partials/AboutTexts.vue";
import CTA from "~/components/utils/CTA.vue";
import type { CTA as CTAType, AboutText } from "~/models/types.ts"

const props = withDefaults(defineProps<{
  anchor?: string,
  title?: string,
  cta?: CTAType,
  aboutTexts?: AboutText[],
}>(), {
  anchor: 'about',
  title: 'Qui suis-je ?',
  cta: () => ({ content: 'Tout faire sauter !' }),
  aboutTexts: () => [],
})

const activePickUpAllWoodenBoards = ref(false)

provide('cta', toRef(props, 'cta'))

function blowItUp() {
  activePickUpAllWoodenBoards.value = true;
}
</script>

<template>
  <section class="about" :id="anchor">
    <div class="about__container">
      <h2 class="hidden-title">{{ title }}</h2>
      <AboutTexts :aboutTexts="aboutTexts" :activePickUpAllWoodenBoards="activePickUpAllWoodenBoards"/>
      <CTA @click="blowItUp" />
    </div>
  </section>
</template>
