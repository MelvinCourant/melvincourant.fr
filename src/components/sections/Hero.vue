<script setup>
import Title from "@/components/reusables/Title.vue";
import Link from "@/components/reusables/Link.vue";
</script>

<template>
  <section class="hero">
    <div class="hero__left">
      <Title
        :value="'Melvin Courant'"
        :level="1"
      />
      <p>Développeur front-end</p>
      <Link
        :text="'Me découvrir'"
        :href="'#presentation'"
        :title="'Descendre à la section présentation'"
      />
    </div>
    <div class="hero__right">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 419 509.2" style="enable-background:new 0 0 419 509.2;" xml:space="preserve">
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
