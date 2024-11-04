<script setup>
import "./assets/css/main.scss";
import "./components/sections/hero/Hero.vue";
import Hero from "./components/sections/hero/Hero.vue";
import Navbar from "./components/layouts/Navbar.vue";
import Presentation from "./components/sections/presentation/Presentation.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <Presentation />
  </main>
</template>
