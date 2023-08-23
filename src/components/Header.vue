<script setup>
import {ref, computed} from "vue"

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

<style scoped lang="scss">
.header {
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    position: fixed;
    top: 70px;
    left: 70px;
    height: 56px;
    width: 56px;
    background-color: var(--secondary);
    border-radius: 100px;
    border: none;
    cursor: pointer;

    @media screen and (max-width: 991px) {
      top: 30px;
      left: 30px;
    }

    &__icon {
      display: flex;
      position: relative;
      width: 32px;
    }

    &.burger {
      .header__button__icon {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;

        span,
        &:before,
        &:after {
          width: 32px;
          height: 4px;
          background-color: var(--text);
        }

        &:before,
        &:after {
          content: "";
        }

        &[data-animation="activated"] {
          span {
            animation: burgerSpan .3s ease-in-out;
          }

          @keyframes burgerSpan {
            0% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              opacity: 0;
            }
            49% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              opacity: 0;
            }
            50% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              opacity: 1;
            }
          }

          &:before {
            animation: burgerBefore .3s ease-in-out;
          }

          @keyframes burgerBefore {
            0% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%) rotate(-45deg);
            }
            50% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
            100% {
              position: absolute;
              top: calc(-100% - 4px);
              transform: initial;
            }
          }

          &:after {
            animation: burgerAfter .3s ease-in-out;
          }

          @keyframes burgerAfter {
            0% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%) rotate(45deg);
            }
            50% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
            100% {
              position: absolute;
              top: calc(100% + 4px);
              transform: initial;
            }
          }
        }
      }
    }

    &.cross {
      .header__button__icon {
        span,
        &:before,
        &:after {
          width: 32px;
          height: 4px;
          background-color: var(--text);
        }

        &:before,
        &:after {
          position: absolute;
          content: "";
        }

        &:before {
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
        }

        span {
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
        }

        &[data-animation="activated"] {
          span {
            animation: crossSpan .3s ease-in-out;
          }

          @keyframes crossSpan {
            0% {
              top: 50%;
              transform: translateY(-50%);
              opacity: 1;
            }
            49% {
              top: 50%;
              transform: translateY(-50%);
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }

          &:before {
            animation: crossBefore .3s ease-in-out;
          }

          @keyframes crossBefore {
            0% {
              top: calc(-100% - 4px);
              transform: initial;
            }
            50% {
              top: 50%;
              transform: translateY(-50%);
            }
            100% {
              top: 50%;
              transform: translateY(-50%) rotate(-45deg);
            }
          }

          &:after {
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            animation: crossAfter .3s ease-in-out;
          }

          @keyframes crossAfter {
            0% {
              top: calc(100% + 4px);
              transform: initial;
            }
            50% {
              top: 50%;
              transform: translateY(-50%);
            }
            100% {
              top: 50%;
              transform: translateY(-50%) rotate(45deg);
            }
          }
        }
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--secondary);

    &__links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Anton', sans-serif;
      gap: 1.85vh;
      font-size: 8.89vh;

      @media screen and (max-width: 991px) {
        font-size: 5.89vh;
      }

      @media screen and (max-width: 767px) {
        font-size: 2.188rem; // 35px
      }

      &__link {
        position: relative;

        a {
          transition: color .2s ease;
        }

        &:after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 0;
          height: 10px;
          width: 100%;
          background: var(--primary);
          transform: scalex(0);
          transform-origin: right;
          transition: transform .5s ease-in-out;
        }

        &:hover {
          a {
            color: var(--primary);
            transition: color .2s ease;
          }

          &:after {
            transform: scalex(1);
            transform-origin: left;
          }
        }
      }
    }
  }
}
</style>