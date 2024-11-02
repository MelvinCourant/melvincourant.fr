<script setup>
import "../../assets/css/sections/_hero.scss";
import CTA from "../utils/CTA.vue";
</script>

<template>
  <section class="hero">
    <div class="hero__left">
      <div class="hero__texts">
        <h1 class="hero__name">
          <span class="hero__firstname">Melvin</span><br>
          Courant
        </h1>
        <p class="hero__description">Développeur front-end</p>
      </div>
      <CTA content="Découvre moi !" url="#about" />
    </div>
  </section>
</template>