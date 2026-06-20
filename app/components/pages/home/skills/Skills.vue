<script setup>
import "~/assets/css/pages/home/skills/_skills.scss";
import skillsJson from "~/data/skills.json";
import SkillsList from "./partials/SkillsList.vue";
import Filters from "./partials/Filters.vue";
import {reactive, ref} from "vue";

const filters = reactive([
  {
    value: "all",
    label: "Tout voir !",
    color: "red",
    selected: true
  },
  {
    value: "frontend",
    label: "Front-end",
    color: "green",
    selected: false
  },
  {
    value: "backend",
    label: "Back-end",
    color: "yellow",
    selected: false
  },
  {
    value: "design",
    label: "Design",
    color: "purple",
    selected: false
  },
  {
    value: "tools",
    label: "Outils",
    color: "blue",
    selected: false
  },
]);

const categoryToShow = ref("all");

function updateFilters(filterValue) {
  filters.forEach(filter => {
    filter.selected = filter.value === filterValue;
  });

  categoryToShow.value = filterValue;
}
</script>

<template>
  <section class="skills" id="skills">
    <h2 class="hidden-title">Mes talents</h2>
    <Filters :filters="filters" @filterSelected="updateFilters($event)"/>
    <SkillsList :skills="skillsJson" :categoryToShow="categoryToShow" />
  </section>
</template>