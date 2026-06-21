<script setup lang="ts">
import "~/assets/css/pages/home/skills/_filters.scss";
import type { Filter } from "~/models/types.ts"

defineProps<{
  filters: Filter[],
}>()

const emit = defineEmits<{
  filterSelected: [value: string]
}>()

function selectFilter(filter: Filter) {
  if(filter.selected) return;

  emit("filterSelected", filter.value);
}
</script>

<template>
  <ul class="filters">
    <li
      v-for="filter in filters"
      :key="filter.value"
      :class="[
        'filters__item',
        { 'filters__item--selected': filter.selected }
      ]"
    >
      <button
        class="filters__button"
        :style="{ backgroundColor: `var(--${filter.color})` }"
        @click="selectFilter(filter)"
      >
        {{ filter.label }}
      </button>
    </li>
  </ul>
</template>