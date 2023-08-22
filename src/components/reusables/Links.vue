<script setup>
defineProps({
  type: {
    type: String,
    default: "button"
  },
  data: {
    type: Array,
    required: true
  }
});

defineEmits(["toggleCursor"]);

function getIconUrl(icon) {
  return new URL(`../../assets/imgs/${icon}`, import.meta.url).href;
}

function hoverBoxes(e) {
  const boxes = document.querySelectorAll(".boxes__box");

  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    box.style.setProperty("--mouse-x", `${x}px`);
    box.style.setProperty("--mouse-y", `${y}px`);
  });
}
</script>

<template>
  <div
    class="button"
    v-if="type === 'button'"
    @mouseenter="$emit('toggleCursor')"
    @mouseleave="$emit('toggleCursor')"
  >
    <a
      :href="data[0].href"
      class="link link__button"
      :title="data[0].title"
    >
      {{ data[0].text }}
    </a>
  </div>
  <ul
    class="boxes"
    v-if="type === 'boxes'"
    @mousemove="hoverBoxes"
    @mouseenter="$emit('toggleCursor')"
    @mouseleave="$emit('toggleCursor')"
  >
    <li
      v-for="link in data"
      :key="link.text"
      class="boxes__box"
    >
      <a
        :href="link.href"
        target="_blank"
        class="link link__box"
        :title="link.title"
      >
        <img
          v-if="link.icon"
          :src="getIconUrl(link.icon)"
          :alt="link.icon"
          class="link__box__icon"
        >
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.button {
  position: relative;
  border-radius: 50px;
  border: var(--border);
  overflow: hidden;
  width: fit-content;
  transition: transform .3s ease-out;

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    clip-path: circle(0% at 50% 50%);
    transition: all .4s ease-in-out;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: var(--primary-darkened) 0 0 20px 0px;
    transition: all .4s ease-in-out;

    &:after {
      clip-path: circle(150% at 50% 50%);
      transition: clip-path .4s ease-in-out;
    }
  }
}

.link {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &__button {
    display: flex;
    width: 280px;
    height: 60px;
    font-family: Heebo, sans-serif;
    font-weight: 600;
    font-size: 1.5rem; // 24px
    position: relative;
    z-index: 2;

    @media screen and (max-width: 991px) {
      margin: 0 auto;
      width: 250px;
      height: 53.5px;
      font-size: 1rem; // 16px
    }
  }

  &__box {
    flex-direction: column;
    justify-content: initial;
    gap: 6.3vh;
    padding-top: 6.02vh;
    position: absolute;
    z-index: 2;
    flex: 1;
    font-family: 'Anton', sans-serif;
    font-size: 2.5rem; // 40px
    line-height: 1.5;
    inset: 2px;
    border-radius: inherit;
    background-color: var(--background);

    @media screen and (max-width: 1199px) {
      font-size: 2rem; // 24px
      gap: 3.5vh;
      padding-top: 4vh;
    }

    @media screen and (max-width: 991px) {
      gap: 2.5vh;
    }

    @media screen and (max-width: 767px) {
      justify-content: center;
      padding-top: initial;
    }

    &__icon {
      height: 18.52vh;

      @media screen and (max-width: 1199px) {
        height: 14vh;
      }

      @media screen and (max-width: 991px) {
        height: 10vh;
      }

      @media screen and (max-width: 767px) {
        height: 14vh;
      }
    }
  }
}

.boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem; // 20px

  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  &:hover {
    & > .boxes__box {
      &:after {
        opacity: 1;
      }
    }
  }

  &__box {
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: rgba(3, 146, 250, 0.5);

    &:hover {
      &:before {
        opacity: 1;
      }
    }

    &:before,
    &:after {
      border-radius: inherit;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity .5s;
      pointer-events: none;
    }

    &:before {
      background: radial-gradient(
          800px circle at var(--mouse-x) var(--mouse-y),
          rgba(3, 146, 250, 0.06),
          transparent 40%
      );
      z-index: 3;
    }

    &:after {
      background: radial-gradient(
          600px circle at var(--mouse-x) var(--mouse-y),
          rgba(3, 146, 250, 0.4),
          transparent 40%
      );
      z-index: 2;
    }
  }
}
</style>