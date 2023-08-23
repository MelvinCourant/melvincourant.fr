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
    href: "#realisations.json"
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
});

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
  />
  <Header
    :links="headerLinks"
    @toggleCursor="toggleCursor"
  />
  <main>
    <Hero
      :type="'button'"
      :data="discover"
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

<style lang="scss">
@font-face {
  font-family: 'Anton';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/anton.woff2') format('woff2'),
       url('./assets/fonts/anton.woff') format('woff');
}

@font-face {
  font-family: "Heebo";
  src: url("./assets/fonts/heebo.woff2") format("woff2-variations");
  font-weight: 125 950;
  font-stretch: 75% 125%;
  font-style: normal;
}

:root {
  // Blue colors
  --primary: #0392FA;
  --primary-darkened: #0267B0;

  // Black colors
  --background: #1D1D1B;
  --secondary: #141413;

  // Text colors
  --text: #D9D9D9;
  --text-grey: #696961;

  // Borders
  --border: 2px solid var(--primary);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  color: var(--text);
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  &::selection {
    background: none;
    color: var(--primary);
  }
}

html {
  min-height: 100%;

  body {
    min-height: 100%;
    background-color: var(--background);

    video,
    img,
    svg,
    object {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
    }

    li {
      list-style: none;
      text-decoration: none;
    }

    a {
      text-decoration: none;
    }

    section {
      width: 1440px;
      margin: auto;

      &:not(.hero) {
        padding: 17.188rem 0 5.625rem; // 275px 0 90px

        @media screen and (max-width: 991px) {
          padding: 10.938rem 0 3.438rem; // 175px 0 55px
        }

        @media screen and (max-width: 767px) {
          padding: 5.625rem 0 1.875rem; // 90px 0 30px
        }
      }

      @media screen and (max-width: 1699px) {
        width: 1280px;
      }

      @media screen and (max-width: 1399px) {
        width: 1170px;
      }

      @media screen and (max-width: 1199px) {
        width: 960px;
      }

      @media screen and (max-width: 991px) {
        width: 80%;
      }

      h1 {
        font-family: 'Anton', sans-serif;
        font-size: 15.74vh;
        font-weight: 400;
        line-height: 0.97;
        text-transform: uppercase;
        margin-bottom: 1.85vh;

        @media screen and (max-width: 991px) {
          font-size: 10.74vh;
        }
      }

      h2 {
        font-family: Heebo, sans-serif;
        font-size: 4.44vh;
        text-transform: uppercase;
        letter-spacing: 0.44vh;
        margin-bottom: 9.26vh;

        @media screen and (max-width: 991px) {
          font-size: 3.44vh;
        }
      }
    }
  }
}
</style>
