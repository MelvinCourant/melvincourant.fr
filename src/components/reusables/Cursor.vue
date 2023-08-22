<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  display: {
    type: Boolean,
    default: true
  }
})

const displayCursor = ref("scale(1)");

watch(() => props.display, (newValue) => {
  displayCursor.value = newValue ? "scale(1)" : "scale(0)";
})

const cursorStyle = ref("");

window.addEventListener("mousemove", (e) => {
  cursorStyle.value = `transform: translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) ${displayCursor.value};`;
});
</script>

<template>
  <div
    class="cursor"
    :style="cursorStyle"
    v-show="displayCursor"
  ></div>
</template>

<style scoped lang="scss">
.cursor {
  position: fixed;
  z-index: 6;
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
  transform: translate(calc(-50% + 15px), -50%);
  transition: all 0.2s ease-out;
  background-color: var(--primary);
  border-radius: 50%;
  pointer-events: none;
}
</style>