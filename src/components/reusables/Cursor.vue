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
const displayCursor = ref("scale(1)");
const cursorStyle = ref("");

watch(() => props.display, (newValue) => {
  displayCursor.value = newValue ? "scale(1)" : "scale(0)";
})

window.addEventListener("mousemove", (e) => {
  if(!showCursor.value) {
    showCursor.value = true;
  }

  cursorStyle.value = `transform: translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) ${displayCursor.value};`;
});
</script>

<template>
  <div
    :class="['cursor', {'cursor__hovering': text}]"
    :style="cursorStyle"
    v-show="showCursor"
  >
    <span
      class="cursor__hovering__text"
      v-show="text"
    >
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.cursor {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 6;
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  text-align: center;
  top: 0;
  left: 0;
  transform: translate(calc(-50% + 15px), -50%);
  transition: all 0.2s ease-out;
  background-color: var(--primary);
  border-radius: 50%;
  pointer-events: none;

  @media screen and (max-width: 991px) {
    display: none;
  }

  &__hovering {
    width: auto;
    height: auto;

    &__text {
      font-family: 'Heebo', sans-serif;
      font-size: 1.5rem; // 24px
      padding: 1.25rem; // 20px
    }
  }
}
</style>