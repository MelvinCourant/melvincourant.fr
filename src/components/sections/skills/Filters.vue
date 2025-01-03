<script setup>
import "../../../assets/css/sections/skills/_filters.scss";

defineProps({
  filters: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(["filterSelected"]);

function selectFilter(filter) {
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