<script setup>
import Header from '@/components/global/Header.vue'
import Hero from '@/components/sections/Hero.vue'
import Skills from '@/components/sections/Skills.vue'
import Presentation from '@/components/sections/Presentation.vue'
import Realisations from '@/components/sections/Realisations.vue'
import Contact from '@/components/sections/Contact.vue'
import Cursor from "@/components/global/Cursor.vue";
import { ref, onMounted } from "vue";
import skillsJson from "@/datas/skills.json";
import realisationsJson from "@/datas/realisations.json";
import contactJson from "@/datas/contact.json";
import Loader from "@/components/global/Loader.vue";
import "@css/main.scss";

const headerLinks = [
  {
    name: "Qui suis-je ?",
    href: "#presentation"
  },
  {
    name: "Compétences",
    href: "#skills"
  },
  {
    name: "Réalisations",
    href: "#realisations"
  },
  {
    name: "Contact",
    href: "#contact"
  }
];

const discover = [
  {
    text: "Me découvrir",
    href: "#presentation",
    title: "Descendre à la section présentation"
  }
];

const load = ref(false);

onMounted(() => {
  load.value = true;

  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > ratio) {
        entry.target.classList.remove('not-revealed');
        observer.unobserve(entry.target);
      }
    })
  }

  const ratio = 0.8;
  const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: ratio
  })
  const titles = document.querySelectorAll('.not-revealed');

  titles.forEach(title => {
    observer.observe(title);
  })
});

const displayHero = ref(false);
function revealHero() {
  displayHero.value = true;
}

const displayCursor = ref(true);

function toggleCursor() {
  displayCursor.value = !displayCursor.value;
}

const cursorText = ref("");

function updateCursorText(text) {
  cursorText.value = text;
}
</script>

<template>
  <Loader
    :loaded="load"
    @loaderDisappeared="revealHero"
  />
  <Header
    :links="headerLinks"
    @toggleCursor="toggleCursor"
  />
  <main>
    <Hero
      :type="'button'"
      :data="discover"
      :display="displayHero"
      @toggleCursor="toggleCursor"
    />
    <Presentation />
    <Skills
      :skills="skillsJson"
    />
    <Realisations
      :realisations="realisationsJson"
      @toggleCursor="toggleCursor"
      @realisationHovered="updateCursorText"
    />
    <Contact
      :type="'boxes'"
      :data="contactJson"
      @toggleCursor="toggleCursor"
    />
  </main>
  <Cursor
    :display="displayCursor"
    :text="cursorText"
  />
</template>
