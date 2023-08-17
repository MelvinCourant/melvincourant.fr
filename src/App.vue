<script setup>
</script>

<template>
  Hello World
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

html {
  min-height: 100%;

  body {
    min-height: 100%;

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
  }
}
</style>
