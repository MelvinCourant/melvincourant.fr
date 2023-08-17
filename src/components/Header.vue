<script setup>
import { ref } from "vue"

const burgerClass = ref(true);
const crossClass = ref(false);
const titleButton = ref("Ouvrir le menu");

defineProps({
  links: {
    type: Array,
    required: true
  }
})

function toggleIcon() {
  burgerClass.value = !burgerClass.value;
  crossClass.value = !crossClass.value;

  if (crossClass.value === true) {
    titleButton.value = "Fermer le menu";
    document.documentElement.style.getPropertyValue("overflow", "hidden")
  }
  else {
    titleButton.value = "Ouvrir le menu";
    document.documentElement.style.removeProperty("overflow");
  }
}
</script>

<template>
  <header class="header">
    <button
      :class="['header__button', {burger : burgerClass}, {cross : crossClass}]"
      @click="toggleIcon()"
      :title="titleButton"
    >
      <span class="header__button__icon">
          <span></span>
      </span>
    </button>

    <nav
      class="header__nav"
      v-show="crossClass"
    >
      <ul class="header__nav__links">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="header__nav__links__link"
        >
          <a
            :href="link.href"
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
    z-index: 2;
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
      }
    }

    &.cross {
      .header__button__icon {
        &:before,
        &:after {
          position: absolute;
          margin-top: -2px;
          width: 32px;
          height: 4px;
          background-color: var(--text);
          content: "";
        }

        &:before {
          transform: rotate(-45deg);
        }

        &:after {
          transform: rotate(45deg);
        }
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
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