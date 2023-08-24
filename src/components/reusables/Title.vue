<script setup>
defineProps({
  value: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 2
  },
  hidden: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <h1
    v-if="level === 1"
    :class="{hidden: hidden}"
  >
    {{ value }}
  </h1>
  <h2
    v-else
    :class="{hidden: hidden}"
  >
    {{ value }}
  </h2>
</template>

<style scoped lang="scss">
.hidden {
  display: none;
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
</style>