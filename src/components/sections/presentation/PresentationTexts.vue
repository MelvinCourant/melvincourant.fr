<script setup>
import "../../../assets/css/sections/presentation/_presentation-texts.scss";
import { gsap } from "gsap";

defineProps({
  presentationTexts: {
    type: Array,
    required: true
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
          y: -10,
          ease: "power1.out"
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
</script>

<template>
  <p class="presentation-texts">
    <span
      v-for="text in presentationTexts"
      :key="text.id"
      :class="['presentation-texts__content', { 'presentation-texts__content--highlight': text.woodenBoardRotation }]"
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