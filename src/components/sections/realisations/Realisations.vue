<script setup>
import "../../../assets/css/sections/realisations/_realisations.scss";
import realisationsJson from "../../../data/realisations.json";
import RealisationsList from "./RealisationsList.vue";
</script>

<template>
  <section class="realisations" id="realisations">
    <RealisationsList :realisations="realisationsJson" />
  </section>
</template>