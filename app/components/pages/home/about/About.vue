<script setup lang="ts">
import "~/assets/css/pages/home/about/_about.scss";
import {computed, provide, ref} from "vue";
import AboutTexts from "./partials/AboutTexts.vue";
import CTA from "~/components/utils/CTA.vue";
import type { CTA as CTAType } from "~/models/types.ts"

const { data } = await useAsyncData('about', () =>
  queryCollection('about').first()
)

const anchor = computed(() => data.value?.anchor ?? 'about')
const title = computed(() => data.value?.title ?? 'Qui suis-je ?')
const aboutTexts = computed(() => data.value?.aboutTexts ?? [])
const cta = computed<CTAType>(() => data.value?.cta ?? { content: 'Tout faire sauter !' })

const activePickUpAllWoodenBoards = ref(false)

provide('cta', cta)

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
