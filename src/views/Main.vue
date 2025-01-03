<script setup>
import About from "../components/sections/about/About.vue";
import Hero from "../components/sections/hero/Hero.vue";
import Cursor from "../components/utils/Cursor.vue";
import Skills from "../components/sections/skills/Skills.vue";
import Navbar from "../components/layouts/Navbar.vue";
import Contact from "../components/sections/contact/Contact.vue";
import Realisations from "../components/sections/realisations/Realisations.vue";
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