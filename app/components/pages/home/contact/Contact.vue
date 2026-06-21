<script setup lang="ts">
import "~/assets/css/pages/home/contact/_contact.scss";
import ContactCard from "./partials/ContactCard.vue";
import {computed} from "vue";

const { data } = await useAsyncData('contact', () =>
  queryCollection('contact').first()
)

const anchor = computed(() => data.value?.anchor ?? 'contact')
const title = computed(() => data.value?.title ?? 'Contactes moi !')
const contacts = computed(() => data.value?.contacts ?? [])
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
