<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["updateValue"]);

const inputValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("updateValue", value.toLowerCase());
  }
});
</script>

<template>
  <input
    class="input"
    type="text"
    v-model="inputValue"
  />
</template>

<style scoped lang="scss">
.input {
  font-family: Anton, sans-serif;
  font-size: 5.93vh;
  font-weight: 400;
  line-height: 1.34;
  margin-bottom: 6.5rem; // 104px
  transition: transform 0.7s ease 0.1s;
  background: none;
  border: none;

  @media screen and (max-width: 991px) {
    font-size: 3.93vh;
    margin-bottom: 3.5rem; // 56px
    text-align: center;
  }

  &:focus {
    outline: none;
  }
}
</style>