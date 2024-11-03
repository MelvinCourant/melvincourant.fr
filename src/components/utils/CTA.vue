<script setup>
import "../../assets/css/utils/_cta.scss"
import {inject, ref} from "vue";

const cta = ref(inject('cta'))

defineEmits(['click'])
</script>

<template>
  <div class="cta">
    <a
        v-if="cta.url"
        :href="cta.url"
        class="cta__buttons cta--link"
    >
      {{ cta.content }}
    </a>
    <button
        v-else
        class="cta__buttons cta--button"
        @click="$emit('click')"
    >
      {{ cta.content }}
    </button>
  </div>
</template>