<script setup>
import {ref, onMounted, watch} from "vue";
import {gsap} from "gsap";

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

<style scoped lang="scss">
.loader {
  position: fixed;
  z-index: 7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  clip-path: circle(156% at 50% 50%);

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    clip-path: circle(118% at 50% 50%);
    background-color: var(--background);

    &__gif {
      width: 200px;
      height: 200px;
    }
  }
}
</style>