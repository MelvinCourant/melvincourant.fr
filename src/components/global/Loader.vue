<script setup>
import {ref, onMounted, watch} from "vue";
import {gsap} from "gsap";
import '@css/global/loader.scss';

const props = defineProps({
  loaded: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(["loaderDisappeared"]);

const showLoader = ref(true);

watch(() => props.loaded, (newValue) => {
  if(newValue === true) {
    const loaderElements = [
      ".loader",
      ".loader__content"
    ];

    gsap.to(loaderElements, {
      duration: 1,
      clipPath: "circle(0% at 50% 50%)",
      ease: "power4",
      delay: 1.5,
      onComplete: () => {
        showLoader.value = false;
        emit("loaderDisappeared");
      }
    });
  }
})
</script>

<template>
  <div
    class="loader"
    v-show="showLoader"
  >
    <div
      class="loader__content"
    >
      <img class="loader__content__gif" src="../../assets/imgs/gifs/eyes.gif" alt="Eyes">
    </div>
  </div>
</template>