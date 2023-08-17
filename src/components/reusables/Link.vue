<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a :href="href">
    {{ text }}
  </a>
</template>

<style scoped lang="scss">
a {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: var(--border);
  border-radius: 50px;
  width: 280px;
  height: 60px;
  font-family: Heebo, sans-serif;
  font-weight: 600;
  font-size: 1.5rem; // 24px

  @media screen and (max-width: 991px) {
    margin: 0 auto;
    width: 250px;
    height: 53.5px;
    font-size: 1rem; // 16px
  }
}
</style>