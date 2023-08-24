<script setup>
import {ref, watch} from "vue";

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

<style scoped lang="scss">
.cursor {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 6;
  width: 150px;
  height: 150px;
  aspect-ratio: 1/1;
  text-align: center;
  top: 0;
  left: 0;
  transform: translate(calc(-50% + 15px), -50%) scale(0.27);
  transition: all 0.2s ease-out;
  background-color: var(--primary);
  border-radius: 50%;
  pointer-events: none;

  @media screen and (max-width: 991px) {
    display: none;
  }

  &__hovering {
    &__text {
      font-family: 'Heebo', sans-serif;
      font-size: 1.5rem; // 24px
      line-height: 1.2;
      padding: 1.25rem; // 20px
    }
  }
}

.eyes {
  position: fixed;
  z-index: 7;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
  transform: translate(calc(-50% + 15px), -50%) scale(0.27);
  transition: all 0.2s ease-out;
  pointer-events: none;
}
</style>