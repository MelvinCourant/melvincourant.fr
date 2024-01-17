<script setup>
import {ref, computed} from "vue";
import '@css/global/header.scss';

const animation = ref("deactivated");
const burgerClass = ref(true);
const crossClass = ref(false);
const titleButton = ref("Ouvrir le menu");
const transition = ref("");

defineProps({
  links: {
    type: Array,
    required: true
  }
});

defineEmits(["toggleCursor"]);

function toggleIcon() {
  burgerClass.value = !burgerClass.value;
  crossClass.value = !crossClass.value;
  transition.value = "transition: clip-path 0.5s ease-in-out;";

  if (crossClass.value === true) {
    titleButton.value = "Fermer le menu";
    document.documentElement.style.setProperty("overflow", "hidden")
  }
  else {
    titleButton.value = "Ouvrir le menu";
    document.documentElement.style.removeProperty("overflow");
  }

  if (animation.value === "deactivated") {
    animation.value = "activated";
  }
}

const toggleHeader = computed(() => {
  const topLeft = ref(null);

  function getTopLeft() {
    if(window.innerWidth < 991) {
      topLeft.value = 30;
    }
    else {
      topLeft.value = 70;
    }
  }

  getTopLeft();

  const size = 28;
  const circleInit = ref("");
  const circleTaller = ref("");
  const clipPath = ref(circleInit.value);

  function initCircles() {
    const position = ref(topLeft.value + size);
    circleInit.value = `circle(${size}px at ${position.value}px ${position.value}px)`;
    circleTaller.value = `circle(140% at ${position.value}px ${position.value}px)`;
  }

  initCircles();

  if (crossClass.value === true) {
    clipPath.value = circleTaller.value;
  }
  else {
    clipPath.value = circleInit.value;
  }

  window.onresize = () => {
    getTopLeft();
    initCircles();
    transition.value = "";
  };

  return `clip-path: ${clipPath.value}; ${transition.value}`;
});
</script>

<template>
  <header class="header">
    <button
      :class="['header__button', {burger : burgerClass}, {cross : crossClass}]"
      @click.stop="toggleIcon()"
      :title="titleButton"
      @mouseenter="$emit('toggleCursor')"
      @mouseleave="$emit('toggleCursor')"
    >
      <span
        class="header__button__icon"
        :data-animation="animation"
      >
          <span></span>
      </span>
    </button>

    <nav
      class="header__nav"
      :style="toggleHeader"
    >
      <ul
        class="header__nav__links"
        @mouseenter="$emit('toggleCursor')"
        @mouseleave="$emit('toggleCursor')"
      >
        <li
          v-for="(link, index) in links"
          :key="index"
          class="header__nav__links__link"
        >
          <a
            :href="link.href"
            @click="toggleIcon()"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>