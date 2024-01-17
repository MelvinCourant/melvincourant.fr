<script setup>
import '@css/specifics/hero-img.scss';

const props = defineProps({
  imgs: {
    type: Array,
    required: true
  },
  imgToDisplay: {
    type: String,
    required: true
  },
})

function generateImgSrc(src) {
  return new URL(`../../../assets/imgs/hero/${src}`, import.meta.url).href;
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 419 509.2"
    xml:space="preserve"
    v-show="props.imgToDisplay !== imgs[0].name && props.imgToDisplay !== imgs[1].name"
  >
    <g>
      <polygon points="369,240.5 419,190.5 267.6,190.5 267.6,0 27.4,240.3 98,240.3 217.6,120.7 217.6,240.7 	"/>
      <polygon points="101.4,509.2 101.1,434.7 218.7,317.2 50,317.2 0,267.2 343.4,267.2 	"/>
    </g>
  </svg>

  <img
    v-for="img in props.imgs"
    :key="img.name"
    :src="generateImgSrc(img.src)"
    :alt="img.name"
    v-show="props.imgToDisplay === img.name"
  />
</template>