<script setup>
import "../../assets/css/utils/_cursor.scss"
import {ref} from "vue";

const showEyes = ref(false);
const position = ref({top: 0, left: 0});

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
  document.body.style.cursor = "default";
  position.value = {
    top: e.clientY,
    left: e.clientX,
  };

  clearInterval(eyesInterval);
  startTimer();
});
</script>

<template>
  <img
    v-show="showEyes"
    :style="{top: position.top + 'px', left: position.left + 'px'}"
    src="../../assets/imgs/eyes.gif" alt="cursor" class="cursor"
  >
</template>