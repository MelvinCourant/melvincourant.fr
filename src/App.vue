<script setup>
import "./assets/css/main.scss";
import "./components/sections/hero/Hero.vue";
import Hero from "./components/sections/hero/Hero.vue";
import Navbar from "./components/layouts/Navbar.vue";
import About from "./components/sections/about/About.vue";
import Skills from "./components/sections/skills/Skills.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
  </main>
</template>
