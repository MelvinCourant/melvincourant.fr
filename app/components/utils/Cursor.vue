<script setup>
import "../../assets/css/utils/_cursor.scss"
import {onMounted, ref} from "vue";
import {DotLottie} from "@lottiefiles/dotlottie-web";
import eyesLottie from "../../assets/lottie/eyes.lottie?url";

const showEyes = ref(false);
const position = ref({top: 0, left: 0});

onMounted(() => {
  new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('.cursor'),
    src: eyesLottie,
  });

  function displayEyes() {
    if(
        position.value.top === 0 &&
        position.value.left === 0
    ) {
      return;
    }

    document.body.style.cursor = "none";
    showEyes.value = true;
    clearInterval(eyesInterval);
  }

  let eyesInterval = null;

  function startTimer() {
    eyesInterval = setInterval(displayEyes, 10000);
  }

  startTimer();

  window.addEventListener("mousemove", (e) => {
    showEyes.value = false;

    if(document.body.style.cursor === "none") {
      document.body.style.cursor = "default";
    }

    position.value = {
      top: e.clientY,
      left: e.clientX,
    };

    clearInterval(eyesInterval);
    startTimer();
  });
})
</script>

<template>
  <canvas
    v-show="showEyes"
    :style="{top: position.top + 'px', left: position.left + 'px'}"
    class="cursor"
  ></canvas>
</template>