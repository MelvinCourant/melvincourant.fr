<script setup>
import "../../../assets/css/sections/realisations/_realisations.scss";
import realisationsJson from "../../../data/realisations.json";
import RealisationsList from "./RealisationsList.vue";
import RealisationsActions from "./RealisationsActions.vue";
</script>

<template>
  <section class="realisations" id="realisations">
    <RealisationsList :realisations="realisationsJson" />
    <RealisationsActions />
  </section>
</template>