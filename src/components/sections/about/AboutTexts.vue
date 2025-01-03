<script setup>
import "../../../assets/css/sections/about/_about-texts.scss";
import { gsap } from "gsap";
import {watch} from "vue";

const props = defineProps({
  aboutTexts: {
    type: Array,
    required: true
  },
  activePickUpAllWoodenBoards: {
    type: Boolean,
    default: false
  }
})

function pickUpWoodenBoard(id) {
  const woodenBoard = document.querySelector(`.wooden-board[data-index="${id}"]`);
  if (woodenBoard) {
    const actualRotation = Number(woodenBoard.dataset.rotation);
    const rotationValue = actualRotation > 0 ? (actualRotation + 40) : (actualRotation - 40);

    gsap.timeline()
      .to(
        woodenBoard,
        {
          duration: 0.1,
          scale: 1.1,
          y: -10
        }
      )
      .to(
        woodenBoard,
        {
          duration: 0.4,
          rotation: rotationValue,
          y: window.innerHeight,
          ease: "power1.in",
          onComplete: () => woodenBoard.style.display = 'none'
        }
      );
  }
}

function pickUpAllWoodenBoards() {
  const woodenBoards = document.querySelectorAll('.wooden-board');

  woodenBoards.forEach(woodenBoard => {
    const index = woodenBoard.dataset.index;

    pickUpWoodenBoard(index);
  });
}

watch(() => props.activePickUpAllWoodenBoards, (newValue) => {
  if(newValue) {
    pickUpAllWoodenBoards();
  }
})
</script>

<template>
  <p class="about-texts">
    <span
      v-for="text in aboutTexts"
      :key="text.id"
      :class="['about-texts__content', { 'about-texts__content--highlight': text.woodenBoardRotation }]"
    >
      {{ text.content }}
      <div
        class="wooden-board"
        v-if="text.woodenBoardRotation"
        :style="{ transform: `translateY(-50%) rotate(${text.woodenBoardRotation}deg)` }"
        :data-index="text.id"
        :data-rotation="text.woodenBoardRotation"
        @click.once="pickUpWoodenBoard(text.id)"
      >
        <div class="dots">
          <div class="dots__dot"></div>
          <div class="dots__dot"></div>
        </div>
        <div class="lines">
          <div class="lines__line"></div>
          <div class="lines__line"></div>
        </div>
        <div class="dots">
          <div class="dots__dot"></div>
          <div class="dots__dot"></div>
        </div>
      </div>
    </span>
  </p>
</template>