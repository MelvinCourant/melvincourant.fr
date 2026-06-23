<script setup lang="ts">
import "~/assets/css/pages/home/contact/_contact.scss";
import ContactCard from "./partials/ContactCard.vue";
import type { Contact } from "~/models/types.ts"

withDefaults(defineProps<{
  anchor?: string,
  title?: string,
  contacts?: Contact[],
}>(), {
  anchor: 'contact',
  title: 'Contacte moi !',
  contacts: () => [],
})
</script>

<template>
  <section class="contact" :id="anchor">
    <h2 class="hidden-title">{{ title }}</h2>
    <ul class="contact__list">
      <ContactCard
        v-for="(contact, index) in contacts"
        :key="index"
        :contactInfo="contact"
      />
    </ul>
  </section>
</template>
