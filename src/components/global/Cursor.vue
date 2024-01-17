<script setup>
import {ref, watch} from "vue";
import '@css/global/cursor.scss';

const props = defineProps({
  display: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: ""
  }
})

const showCursor = ref(false);
const scaleMin = "scale(0.25)";
const scaleMax = "scale(1)";
const displayCursor = ref(scaleMin);
const cursorStyle = ref("");

watch(() => props.display, (newValue) => {
  if(props.text !== "") {
    displayCursor.value = newValue ? scaleMax : "scale(0)";
  } else {
    displayCursor.value = newValue ? scaleMin : "scale(0)";
  }
})

watch(() => props.text, (newValue) => {
  if(newValue !== "") {
    displayCursor.value = scaleMax;
  } else {
    displayCursor.value = scaleMin;
  }
})

const showEyesGif = ref(false);

window.addEventListener("mousemove", (e) => {
  if(!showCursor.value) {
    showCursor.value = true;
  }

  cursorStyle.value = `transform: translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) ${displayCursor.value};`;

  clearInterval(showEyes);
  startTimer();

  if(showEyesGif.value) {
    showEyesGif.value = false;
  }
});

function displayEyes() {
  showEyesGif.value = true;
  clearInterval(displayEyes);
}

let showEyes;

function startTimer() {
  showEyes = setInterval(displayEyes, 10000);
}

startTimer();
</script>

<template>
  <div
    :class="['cursor', {'cursor__hovering': text}]"
    :style="cursorStyle"
    v-show="showCursor && !showEyesGif"
  >
    <span
      class="cursor__hovering__text"
    >
      {{ text }}
    </span>
  </div>

  <img
    class="eyes"
    v-show="showEyesGif"
    :style="cursorStyle"
    src="@/assets/imgs/gifs/eyes.gif"
    alt="eyes"
  />
</template>