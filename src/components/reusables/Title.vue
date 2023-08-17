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
</style>