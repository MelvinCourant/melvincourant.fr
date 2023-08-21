<script setup>
import { onMounted } from 'vue'
import Title from '@/components/reusables/Title.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps({
  skills: {
    type: Array,
    required: true
  }
})

onMounted(() => {
  const masks = document.querySelectorAll('.skills__mask li');

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
  <section class="skills">
    <Title
      id="skills"
      :value="'Compétences'"
      :level="2"
    />
    <div class="skills__lists">
      <ul
        class="skills__lists__list skills__mask"
      >
        <li v-for="(skillMask, index) in skills" :key="index" aria-hidden="true">
          {{ skillMask }}
        </li>
      </ul>
      <ul class="skills__lists__list">
        <li v-for="(skill, index) in skills" :key="index">
          {{ skill }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills {
  position: relative;

  &__lists {
    position: relative;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1.85vh;
      font-family: 'Anton', sans-serif;
      text-transform: uppercase;

      @media screen and (max-width: 767px) {
        font-size: 7.5vh;
      }

      li {
        width: fit-content;
        height: 11.85vh;
        font-size: 11.85vh;
        color: var(--text-grey);
        line-height: 0.875;

        @media screen and (max-width: 767px) {
          height: 7.5vh;
          font-size: inherit;
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
      clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
      color: var(--text);
    }
  }
}
</style>