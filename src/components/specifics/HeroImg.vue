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

function generateImgSrc(nameFile, format) {
  if(format === 'webp') {
    return new URL(`../../assets/imgs/hero/${nameFile}.webp`, import.meta.url).href;
  } else {
    return new URL(`../../assets/imgs/hero/${nameFile}.jpg`, import.meta.url).href;
  }
}
</script>

<template>
  <svg
    width="535"
    height="650"
    viewBox="0 0 535 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-show="props.imgToDisplay !== imgs[0].name && props.imgToDisplay !== imgs[1].name && props.imgToDisplay !== imgs[2].name"
  >
    <path d="M471.139 307.001L534.979 243.176H341.672V0L34.9843 306.746H125.254L277.832 154.075V307.256L471.139 307.001Z" fill="var(--text)"/>
    <path d="M129.468 650L129.085 554.9L279.236 404.91H63.84L0 341.084H438.453L129.468 650Z" fill="var(--text)"/>
  </svg>

  <picture
      v-for="img in props.imgs"
    :key="img.name"
  >
    <source
        :srcset="generateImgSrc(img.src, 'webp')"
        type="image/webp"
    />
    <img
        :src="generateImgSrc(img.src)"
        :alt="img.name"
        v-show="props.imgToDisplay === img.name"
     />
  </picture>
</template>