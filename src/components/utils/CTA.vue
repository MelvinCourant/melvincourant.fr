<script setup>
import "../../assets/css/utils/_cta.scss"

defineProps({
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
})

defineEmits(['click'])
</script>

<template>
  <div class="cta">
    <a
        v-if="url"
        :href="url"
        class="cta__buttons cta--link"
    >
      {{ content }}
    </a>
    <button
        v-else
        class="cta__buttons cta--button"
        @click="$emit('click')"
    >
      {{ content }}
    </button>
  </div>
</template>