<script setup>
import Hero from './components/Hero.vue'
import Skills from './components/Skills.vue'
</script>

<template>
  <main>
    <Hero />
    <Skills />
  </main>
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
  --primary-transparent: rgba(3, 146, 250, 0.4);

  // Black colors
  --background: #1D1D1B;
  --secondary: #141413;

  // Text colors
  --text: #D9D9D9;
  --text-grey: #696961;

  // Borders
  --border: 2px solid var(--primary, #0392FA);
  --border-transparent: 2px solid var(--primary-transparent, rgba(3, 146, 250, 0.40));
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  color: var(--text);

  &::-webkit-scrollbar {
    display: none;
  }
}

html {
  min-height: 100%;

  body {
    min-height: 100%;
    background-color: var(--background);

    section {
      width: 1440px;
      margin: auto;

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
      }

      a {
        text-decoration: none;
      }

      h1 {
        font-family: 'Anton', sans-serif;
        font-size: 10.625rem; // 170px
        font-weight: 400;
        line-height: 0.97;
        text-transform: uppercase;
      }

      h2 {
        font-family: Heebo, sans-serif;
        font-size: 3rem; // 48px
        text-transform: uppercase;
        letter-spacing: 4.8px;
        margin-bottom: 6.25rem; // 100px
      }
    }
  }
}
</style>
