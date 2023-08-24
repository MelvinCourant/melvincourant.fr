<script setup>
import {ref, watch} from "vue";
import Title from "@/components/reusables/Title.vue";
import Links from "@/components/reusables/Links.vue";

const props = defineProps({
  type: {
    type: String,
    default: "button"
  },
  data: {
    type: Array,
    required: true
  },
  display: {
    type: Boolean,
    required: true
  }
});

defineEmits(["toggleCursor"]);

const displayHero = ref(props.display);

watch(() => props.display, (newValue) => {
  if(newValue === true) {
    displayHero.value = true;
  }
});

const translateLogo = ref("transform: translate(0, 0)");

function mouseMove(e) {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  translateLogo.value = `transform: translate(${x * 50}px, ${y * 50}px)`;
}

function mouseLeave() {
  translateLogo.value = "transform: translate(0, 0); transition: transform 0.5s ease-in-out;";
}
</script>

<template>
  <section
    :class="['hero', {'not-loaded': !displayHero}]"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
  >
    <div class="hero__left">
      <div class="hero__left__texts">
        <Title
          :value="'Melvin Courant'"
          :level="1"
        />
        <p>Développeur front-end</p>
      </div>
      <div class="hero__left__button">
        <Links
          :type="type"
          :data="data"
          @toggleCursor="$emit('toggleCursor')"
        />
      </div>
    </div>
    <div
      class="hero__right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 419 509.2"
        xml:space="preserve"
        :style="translateLogo"
      >
        <g>
          <polygon points="369,240.5 419,190.5 267.6,190.5 267.6,0 27.4,240.3 98,240.3 217.6,120.7 217.6,240.7 	"/>
          <polygon points="101.4,509.2 101.1,434.7 218.7,317.2 50,317.2 0,267.2 343.4,267.2 	"/>
        </g>
      </svg>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  transition: opacity 0.7s linear;
  
  @media screen and (max-width: 991px) {
    width: initial;
  }

  &.not-loaded {
    opacity: 0;

    .hero__left {
      &__texts {
        h1,
        p {
          transform: translateX(-100%);
        }
      }

      &__button {
        opacity: 0;
      }
    }

    .hero__right {
      transform: scale(0);
    }
  }

  &__left {
    width: 575px;
    margin-left: calc((100% - 1440px) / 2);

    @media screen and (max-width: 1699px) {
      margin-left: calc((100% - 1280px) / 2);
    }

    @media screen and (max-width: 1399px) {
      margin-left: calc((100% - 1170px) / 2);
    }

    @media screen and (max-width: 1199px) {
      margin-left: calc((100% - 960px) / 2);
    }

    @media screen and (max-width: 991px) {
      width: 100%;
      margin-left: initial;
      text-align: center;
    }

    &__texts {
      overflow: hidden;

      h1,
      p {
        transition: transform 0.7s ease;
      }

      p {
        font-family: Anton, sans-serif;
        font-size: 5.93vh;
        font-weight: 400;
        line-height: 1.34;
        margin-bottom: 6.5rem; // 104px
        transition-delay: 0.1s;

        @media screen and (max-width: 991px) {
          font-size: 3.93vh;
          margin-bottom: 3.5rem; // 56px
        }
      }
    }

    &__button {
      display: inline-block;
      transition: opacity 0.7s ease 0.4s;
    }
  }

  &__right {
    margin-right: calc((100% - 1440px) / 2);
    transition: transform 0.7s ease;

    @media screen and (max-width: 1699px) {
      margin-right: calc((100% - 1280px) / 2);
    }

    @media screen and (max-width: 1399px) {
      margin-right: calc((100% - 1170px) / 2);
    }

    @media screen and (max-width: 1199px) {
      margin-right: calc((100% - 960px) / 2);
    }

    @media screen and (max-width: 991px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 30%;
      margin-right: initial;
    }

    svg {
      height: 60.19vh;
      transition: transform 0.2s ease-out;

      @media screen and (max-width: 991px) {
        height: initial;
        width: 80vw;
        max-width: initial;
      }

      polygon {
        fill: var(--text);
      }
    }
  }
}
</style>
