<script setup lang="ts">
import "~/assets/css/utils/_cta.scss"
import {inject, ref, type Ref} from "vue";
import type { CTA } from "~/models/types.ts"

const cta = inject<Ref<CTA>>('cta', ref({ content: 'Je suis un CTA', url: '' }))

defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="cta">
    <NuxtLink
      v-if="cta.url"
      :to="cta.url"
      class="cta__buttons cta--link"
    >
      {{ cta.content }}
    </NuxtLink>
    <button
      v-else
      class="cta__buttons cta--button"
      @click="$emit('click')"
    >
      {{ cta.content }}
    </button>
  </div>
</template>