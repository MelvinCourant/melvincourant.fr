<script setup>
import { ref } from "vue";
import Title from "@/components/reusables/Title.vue";
import Links from "@/components/reusables/Links.vue";

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
    class="hero"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
  >
    <div class="hero__left">
      <Title
        :value="'Melvin Courant'"
        :level="1"
      />
      <p>Développeur front-end</p>
      <Links
        :type="type"
        :data="data"
        @toggleCursor="$emit('toggleCursor')"
      />
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
  height: 100vh;
  position: relative;

  &__left {
    width: 575px;

    @media screen and (max-width: 991px) {
      width: 100%;
      text-align: center;
    }

    p {
      font-family: Anton, sans-serif;
      font-size: 5.93vh;
      font-weight: 400;
      line-height: 1.34;
      margin-bottom: 6.5rem; // 104px

      @media screen and (max-width: 991px) {
        font-size: 3.93vh;
        margin-bottom: 3.5rem; // 56px
      }
    }
  }

  &__right {
    margin: -100px;
    padding: 100px;

    @media screen and (max-width: 991px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 30%;
    }

    svg {
      height: 60.19vh;

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
