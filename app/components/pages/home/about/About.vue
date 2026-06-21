<script setup lang="ts">
import "~/assets/css/pages/home/about/_about.scss";
import {provide, ref, toRef} from "vue";
import AboutTexts from "./partials/AboutTexts.vue";
import CTA from "~/components/utils/CTA.vue";
import type { CTA as CTAType, AboutText } from "~/models/types.ts"

const props = withDefaults(
  defineProps<{
    cta?: CTAType,
    anchor?: string,
    title?: string,
    aboutTexts?: AboutText[],
  }>(),
  {
    cta: () => ({ content: 'Tout faire sauter !' }),
    anchor: 'about',
    title: 'Qui suis-je ?',
    aboutTexts: () => [
      { content: 'Développeur ' },
      { content: 'front', woodenBoardRotation: '-11' },
      { content: ' passionné, j’aime relever des ' },
      { content: 'challenges', woodenBoardRotation: '1.8' },
      { content: ' et concevoir des projets de A à Z.' },
    ],
  }
)

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