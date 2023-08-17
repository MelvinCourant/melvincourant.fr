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
})
</script>

<template>
  <h1 v-if="level === 1">{{ value }}</h1>
  <h2 v-else>{{ value }}</h2>
</template>

<style scoped lang="scss">

</style>