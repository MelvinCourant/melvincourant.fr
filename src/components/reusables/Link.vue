<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "button"
  },
  icon: {
    type: String,
    default: ""
  }
})

function getIconUrl(icon) {
  return new URL(`../../assets/imgs/${icon}`, import.meta.url).href;
}
</script>

<template>
  <a
    :href="href"
    :target="{'_blank': type === 'box'}"
    :class="['link', `link__${type}`]"
    :title="title"
  >
    <img
      v-if="icon"
      :src="getIconUrl(icon)"
      :alt="icon"
      class="link__box__icon"
    >
    {{ text }}
  </a>
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
</style>