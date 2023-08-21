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
})

function getIconUrl(icon) {
  return new URL(`../../assets/imgs/${icon}`, import.meta.url).href;
}
</script>

<template>
  <a
    :href="data[0].href"
    class="link link__button"
    :title="data[0].title"
    v-if="type === 'button'"
  >
    {{ data[0].text }}
  </a>
  <ul
    class="boxes"
    v-if="type === 'boxes'"
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
.link {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--links);

  &__button {
    display: flex;
    border: var(--border);
    border-radius: 50px;
    width: 280px;
    height: 60px;
    font-family: Heebo, sans-serif;
    font-weight: 600;
    font-size: 1.5rem; // 24px

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
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: var(--border-transparent);
    border-radius: 10px;
    font-family: 'Anton', sans-serif;
    font-size: 2.5rem; // 40px
    line-height: 1.5;

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

  &__box{
    position: relative;
    aspect-ratio: 1 / 1;
  }
}
</style>