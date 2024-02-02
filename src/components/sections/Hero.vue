<script setup>
import {ref, watch} from "vue";
import Title from "@/components/reusables/Title.vue";
import HeroInput from "@/components/specifics/HeroInput.vue";
import Links from "@/components/reusables/Links.vue";
import HeroImg from "@/components/specifics/HeroImg.vue";
import '@css/sections/hero.scss';

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
  if(window.innerWidth >= 992) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    translateLogo.value = `transform: translate(${x * 50}px, ${y * 50}px)`;
  }
}

function mouseLeave() {
  if(window.innerWidth >= 992) {
    translateLogo.value = "transform: translate(0, 0); transition: transform 0.5s ease-in-out;";
  }
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
  },
  {
    name: "jo 2024",
    src: "jo.jpg"
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
        <HeroInput
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
        <HeroImg
          :imgs="imgs"
          :imgToDisplay="imgName"
        />
      </div>
    </div>
  </section>
</template>