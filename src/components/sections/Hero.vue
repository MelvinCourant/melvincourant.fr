<script setup>
import {ref, watch} from "vue";
import Title from "@/components/reusables/Title.vue";
import Input from "@/components/specifics/hero/Input.vue";
import Links from "@/components/reusables/Links.vue";
import Img from "@/components/specifics/hero/Img.vue";

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

const imgName = ref("logo");
const imgs = [
  {
    name: "scratch",
    src: "scratch.jpg"
  },
  {
    name: "melvin",
    src: "moi.jpg"
  }
];

function updateImg(value) {
  imgName.value = value;
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
        <Input
          :value="'Développeur front-end'"
          @updateValue="updateImg"
        />
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
      <div
        class="hero__right_img"
        :style="translateLogo"
      >
        <Img
          :imgs="imgs"
          :imgToDisplay="imgName"
        />
      </div>
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
        .input {
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

      @media screen and (max-width: 991px) {
        overflow: initial;
      }

      h1 {
        transition: transform 0.7s ease;
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
  }
}
</style>
