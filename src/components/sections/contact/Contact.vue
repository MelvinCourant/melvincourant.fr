<script setup>
import "../../../assets/css/sections/contact/_contact.scss";
import contactJson from "../../../data/contact.json";
import ContactCard from "./ContactCard.vue";

const contactList = contactJson;
</script>

<template>
  <section class="contact" id="contact">
    <h2 class="hidden-title">Contactes moi !</h2>
    <ul class="contact__list">
      <ContactCard
        v-for="(contact, index) in contactList"
        :key="index"
        :contactInfo="contact"
      />
    </ul>
  </section>
</template>