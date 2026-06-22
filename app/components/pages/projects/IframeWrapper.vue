<script setup lang="ts">
import '~/assets/css/pages/projects/_iframe-wrapper.scss'

const props = withDefaults(defineProps<{
  src: string,
  variant?: 'default' | 'cover',
  type?: 'default' | 'youtube'
}>(), {
  variant: 'default',
  type: 'default',
})

const iframeSrc = computed(() => {
  if(props.type === 'youtube') {
    return `${props.src}?&autoplay=1&mute=1`
  } else {
    return props.src
  }
})
</script>

<template>
  <iframe
    width="1280"
    height="720"
    :src="iframeSrc"
    :class="[
      'iframe-wrapper',
      {
        'iframe-wrapper--cover': variant === 'cover'
      }
    ]"
    allowfullscreen
  >
  </iframe>
</template>