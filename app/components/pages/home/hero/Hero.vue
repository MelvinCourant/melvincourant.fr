<script setup lang="ts">
import "~/assets/css/pages/home/hero/_hero.scss";
import HeroLeft from "./partials/HeroLeft.vue";
import HeroRight from "./partials/HeroRight.vue";
import {provide, toRef} from "vue";
import type { CTA, Name } from "~/models/types.ts"

const props = defineProps<{
  cta: CTA,
  anchor?: string,
  name: Name,
  description: string,
  hideText: string,
  bubbleText: string,
}>()

provide('cta', toRef(props, 'cta'))
</script>

<template>
  <section class="hero" :id="anchor">
    <div class="hero__container">
      <HeroLeft :name="name" :description="description"/>
      <HeroRight :hideText="hideText" :bubbleText="bubbleText" />
    </div>
  </section>
</template>