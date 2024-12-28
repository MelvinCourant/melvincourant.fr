<script setup>
import "../../../assets/css/sections/realisations/_realisations.scss";
import realisationsJson from "../../../data/realisations.json";
import RealisationsList from "./RealisationsList.vue";
import RealisationsActions from "./RealisationsActions.vue";
import {ref} from "vue";

const actionSelected = ref(null);
</script>

<template>
  <section class="realisations" id="realisations">
    <RealisationsList :realisations="realisationsJson" :actionSelected="actionSelected" />
    <RealisationsActions @pass="actionSelected = 'pass'" @rollback="actionSelected = 'rollback'" @smash="actionSelected = 'smash'" />
  </section>
</template>