<script setup>
import '@css/reusables/links.scss';

defineProps({
  type: {
    type: String,
    default: "button"
  },
  data: {
    type: Array,
    required: true
  }
});

defineEmits(["toggleCursor"]);

function getIconUrl(icon) {
  return new URL(`../../assets/imgs/icons/${icon}`, import.meta.url).href;
}

function hoverBoxes(e) {
  const boxes = document.querySelectorAll(".boxes__box");

  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    box.style.setProperty("--mouse-x", `${x}px`);
    box.style.setProperty("--mouse-y", `${y}px`);
  });
}
</script>

<template>
  <div
    class="button"
    v-if="type === 'button'"
    @mouseenter="$emit('toggleCursor')"
    @mouseleave="$emit('toggleCursor')"
  >
    <a
      :href="data[0].href"
      class="link link__button"
      :title="data[0].title"
    >
      {{ data[0].text }}
    </a>
  </div>
  <ul
    class="boxes"
    v-if="type === 'boxes'"
    @mousemove="hoverBoxes"
    @mouseenter="$emit('toggleCursor')"
    @mouseleave="$emit('toggleCursor')"
  >
    <li
      v-for="link in data"
      :key="link.text"
      class="boxes__box"
    >
      <a
        :href="link.href"
        target="_blank"
        class="link link__box"
        :title="link.title"
      >
        <img
          v-if="link.icon"
          :src="getIconUrl(link.icon)"
          :alt="link.icon"
          class="link__box__icon"
        >
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>