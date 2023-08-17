<script setup>
import Title from '@/components/reusables/Title.vue'
import Link from '@/components/reusables/Link.vue'

defineProps({
  contact: {
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
    <ul class="contact__links">
      <li
        v-for="link in contact"
        :key="link.text"
        class="contact__links__link"
      >
        <Link
          :text="link.text"
          :href="link.href"
          :title="link.title"
          :type="'box'"
          :icon="link.icon"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.contact {
  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem; // 20px

    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
    }

    &__link {
      position: relative;
      aspect-ratio: 1 / 1;
    }
  }
}
</style>