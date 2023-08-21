<script setup>
import Title from '@/components/reusables/Title.vue'
import Links from '@/components/reusables/Links.vue'

defineProps({
  type: {
    type: String,
    default: "button"
  },
  data: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <section class="contact">
    <Title
      id="contact"
      :value="'Contact'"
      :level="2"
    />
    <Links
      :type="type"
      :data="data"
    />
  </section>
</template>

<style scoped lang="scss">

</style>