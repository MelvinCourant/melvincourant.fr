<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  display: {
    type: Boolean,
    default: true
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
    class="cursor"
    :style="cursorStyle"
    v-show="showCursor"
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

  @media screen and (max-width: 991px) {
    display: none;
  }
}
</style>