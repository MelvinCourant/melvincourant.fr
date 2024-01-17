<script setup>
import {onMounted} from "vue";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

defineProps({
  skills: {
    type: Array,
    required: true
  }
})

onMounted(() => {
  const masks = document.querySelectorAll('.skills-lists__mask li p');

  gsap.registerPlugin(ScrollTrigger)

  masks.forEach((mask, index) => {
    gsap.to(mask, {
      scrollTrigger: {
        trigger: mask,
        start: 'bottom bottom',
        end: 'bottom center',
        scrub: true,
        invalidateOnRefresh: true
      },
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1,
      delay: index * 0.1
    })
  })
})
</script>

<template>
  <div class="skills-lists">
    <ul
      class="skills-lists__list skills-lists__mask"
    >
      <li v-for="(skillMask, index) in skills" :key="index" aria-hidden="true">
        <p>{{ skillMask }}</p>
      </li>
    </ul>
    <ul class="skills-lists__list">
      <li v-for="(skill, index) in skills" :key="index">
        <p>{{ skill }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.skills-lists {
  position: relative;

  &__list {
      font-family: 'Anton', sans-serif;
      text-transform: uppercase;

      li {
        width: fit-content;

        p {
          font-size: 11.85vh;
          color: var(--text-grey);
          line-height: 1.2;

          @media screen and (max-width: 767px) {
            font-size: 7.5vh;
          }
        }
      }
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    li {
      p {
        clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
        color: var(--text);
      }
    }
  }
}
</style>