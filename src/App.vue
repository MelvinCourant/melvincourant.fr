<script setup>
import "./assets/css/main.scss";
import Hero from "./components/sections/hero/Hero.vue";
import Navbar from "./components/layouts/Navbar.vue";
import About from "./components/sections/about/About.vue";
import Skills from "./components/sections/skills/Skills.vue";
import Realisations from "./components/sections/realisations/Realisations.vue";
import Contact from "./components/sections/contact/Contact.vue";
import Cursor from "./components/utils/Cursor.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Realisations />
    <Contact />
  </main>
  <Cursor />
</template>
