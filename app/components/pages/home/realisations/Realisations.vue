<script setup lang="ts">
import "~/assets/css/pages/home/realisations/_realisations.scss";
import realisationsJson from "~/data/realisations.json";
import RealisationsList from "./partials/RealisationsList.vue";
import RealisationsActions from "./partials/RealisationsActions.vue";
import {ref} from "vue";

const actionSelected = ref(null);
</script>

<template>
  <section class="realisations" id="realisations">
    <h2 class="hidden-title">Mes fiertés</h2>
    <RealisationsList :realisations="realisationsJson" :actionSelected="actionSelected" @resetAction="actionSelected = null" />
    <RealisationsActions @pass="actionSelected = 'pass'" @rollback="actionSelected = 'rollback'" @smash="actionSelected = 'smash'" />
  </section>
</template>