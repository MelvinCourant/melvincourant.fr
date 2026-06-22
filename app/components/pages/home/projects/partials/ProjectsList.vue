<script setup lang="ts">
import "~/assets/css/pages/home/projects/_projects-list.scss";
import { reactive, ref, watch } from "vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  actionSelected: {
    type: String,
    default: null
  }
});

const emit = defineEmits(["resetAction"]);

const initialMouseX = ref(0);
const initialCardX = ref(0);
const currentCard = ref(null);
const currentReveal = ref(null);
const currentCardIndex = ref(null);
const cardStyles = reactive([]);
const followingCards = ref([]);
const scaleDifference = 0.01;
const translateYDifference = 10;
const limit = 15;
const pass = ref(false);
const smash = ref(false);

watch(
    () => props.projects,
    (newProjects) => {
      cardStyles.length = 0;
      newProjects.forEach((project, index) => {
        const zIndex = newProjects.length - index;
        let transform;

        if (index < 4) {
          transform = {
            scale: 1 - index * scaleDifference,
            translateY: -index * translateYDifference
          };
        } else {
          transform = {
            scale: 1 - (3 * scaleDifference),
            translateY: -3 * translateYDifference
          };
        }

        cardStyles.push({
          zIndex,
          ...transform
        });
      });
    },
    { immediate: true }
);

watch(
    () => props.actionSelected,
    (newActionSelected) => {
      if (newActionSelected === "pass") {
        forcePass();
      } else if (newActionSelected === "smash") {
        forceSmash();
      } else if (newActionSelected === "rollback") {
        rollback();
      }
    }
);

function initCurrentCard(cardElement) {
  return new Promise((resolve) => {
    if (cardElement) {
      currentCard.value = cardElement;
      currentReveal.value = cardElement.querySelector(".project__reveal");
      currentCardIndex.value = parseInt(cardElement.dataset.index);
      followingCards.value = Array.from(cardElement.parentElement.children).slice(parseInt(cardElement.dataset.index) + 1, parseInt(cardElement.dataset.index) + 4);
      resolve();
    }
  });
}

function swipe(e) {
  initCurrentCard(e.target.closest(".project")).then(() => {
    if (currentCard.value) {
      currentCard.value.style.transition = "";
      currentCard.value.querySelector(".project__container").scrollTop = 0;
      initialMouseX.value = e.clientX || e.touches[0].clientX;
      initialCardX.value = currentCard.value.getBoundingClientRect().left;
      currentCard.value.style.cursor = "grabbing";
      followingCards.value.forEach((card, index) => {
        card.style.transition = "";
      });
    }
  });
}

function onMouseMove(e) {
  if (currentCard.value) {
    const cardWidth = currentCard.value.offsetWidth;
    const deltaX = (((e.clientX || e.touches[0].clientX) - initialMouseX.value) / cardWidth) * 100;

    if (deltaX >= -limit && deltaX <= limit) {
      if (deltaX > 0) {
        currentReveal.value.querySelector(".project__pass").style.display = "none";
        currentReveal.value.querySelector(".project__smash").style.display = "flex";
      } else {
        currentReveal.value.querySelector(".project__pass").style.display = "flex";
        currentReveal.value.querySelector(".project__smash").style.display = "none";
      }

      currentCard.value.style.transformOrigin = deltaX < 0 ? "bottom left" : "bottom right";
      currentCard.value.style.transform = `translateX(${deltaX}%) rotate(${deltaX / 4}deg)`;
      currentReveal.value.style.opacity = Math.abs(deltaX) / (limit + 1);

      if (followingCards.value.length > 0) {
        followingCards.value.forEach((card, index) => {
          const newScale =
              cardStyles[currentCardIndex.value + (index + 1)].scale +
              (scaleDifference * (Math.abs(deltaX) / limit));
          const newTranslateY =
              cardStyles[currentCardIndex.value + (index + 1)].translateY +
              (translateYDifference * (Math.abs(deltaX) / limit));

          card.style.transform = `scale(${newScale}) translateY(${newTranslateY}px)`;
        });
      }

      if (deltaX <= -limit + 2) {
        pass.value = true;
      } else if (deltaX >= limit - 2) {
        smash.value = true;
      } else {
        pass.value = false;
        smash.value = false;
      }
    }
  }

  window.addEventListener("mouseup", swipeEnd);
  window.addEventListener("touchend", swipeEnd);
}

function swipeEnd() {
  if (currentCard.value) {
    currentCard.value.style.cursor = "";
    currentCard.value.style.transition = "all 0.2s ease-out";

    followingCards.value.forEach((card, index) => {
      card.style.transition = "transform 0.2s ease-out";

      if (pass.value || smash.value) {
        cardStyles[currentCardIndex.value + (index + 1)].scale =
            cardStyles[currentCardIndex.value + (index + 1)].scale + scaleDifference;
        cardStyles[currentCardIndex.value + (index + 1)].translateY =
            cardStyles[currentCardIndex.value + (index + 1)].translateY + translateYDifference;

        card.style.transform = `
          scale(${cardStyles[currentCardIndex.value + (index + 1)].scale + scaleDifference})
          translateY(${cardStyles[currentCardIndex.value + (index + 1)].translateY + translateYDifference}px)
        `;
      } else {
        card.style.transform = `
          scale(${cardStyles[currentCardIndex.value + (index + 1)].scale})
          translateY(${cardStyles[currentCardIndex.value + (index + 1)].translateY}px)
        `;
      }
    });

    if (pass.value) {
      currentCard.value.classList.add("project--passed-smashed", "project--passed");
    } else if (smash.value) {
      currentCard.value.classList.add("project--passed-smashed", "project--smashed");
      setTimeout(() => {
        window.open(props.projects[currentCardIndex.value].url, "_self");
      }, 200);
    } else {
      currentCard.value.style.transform = "";
      currentReveal.value.style.opacity = "";
    }

    currentCard.value = null;
    currentReveal.value = null;
    followingCards.value = [];
    pass.value = false;
    smash.value = false;
  }
}

function forcePass() {
  const activeCard = document.querySelectorAll(".project:not(.project--passed-smashed)")[0];

  initCurrentCard(activeCard).then(() => {
    if (currentCard.value) {
      pass.value = true;
      swipeEnd();
      emit("resetAction");
    }
  });
}

function forceSmash() {
  const activeCard = document.querySelectorAll(".project:not(.project--passed-smashed)")[0];

  initCurrentCard(activeCard).then(() => {
    if (currentCard.value) {
      smash.value = true;
      swipeEnd();
      emit("resetAction");
    }
  });
}

function rollback() {
  const passedOrSmashedCards = document.querySelectorAll(".project--passed-smashed");
  const lastPassedOrSmashedCard = passedOrSmashedCards[passedOrSmashedCards.length - 1];

  if (lastPassedOrSmashedCard) {
    initCurrentCard(lastPassedOrSmashedCard).then(() => {
      if (currentCard.value) {
        currentReveal.value.style.opacity = "";
        currentCard.value.style.transformOrigin = "";
        currentCard.value.classList.remove("project--passed-smashed", "project--passed", "project--smashed");

        followingCards.value.forEach((card, index) => {
          cardStyles[currentCardIndex.value + (index + 1)].scale =
              cardStyles[currentCardIndex.value + (index + 1)].scale - scaleDifference;
          cardStyles[currentCardIndex.value + (index + 1)].translateY =
              cardStyles[currentCardIndex.value + (index + 1)].translateY - translateYDifference;

          card.style.transform = `
            scale(${cardStyles[currentCardIndex.value + (index + 1)].scale - scaleDifference})
            translateY(${cardStyles[currentCardIndex.value + (index + 1)].translateY - translateYDifference}px)
          `;
        });

        currentCard.value = null;
        currentReveal.value = null;
        currentCardIndex.value = null;
        followingCards.value = [];
      }
    });
  }
  emit("resetAction");
}
</script>

<template>
  <ul class="projects-list">
    <template
        v-for="(project, index) in projects"
        :key="index"
    >
      <li
          class="project"
          :style="{
            zIndex: cardStyles[index]?.zIndex,
            transform: `
              scale(${cardStyles[index]?.scale})
              translateY(${cardStyles[index]?.translateY}px)
            `
          }"
          :data-index="index"
          @mousedown="swipe($event, index)"
          @mousemove="onMouseMove"
          @touchstart="swipe($event, index)"
          @touchmove="onMouseMove"
      >
        <div class="project__container">
          <div class="project__reveal">
            <div class="project__pass">
              <p>Pass</p>
            </div>
            <div class="project__smash">
              <p>Smash !</p>
            </div>
          </div>
          <img
              class="project__image"
              :src="project.image"
              :alt="project.title"
              draggable="false"
          />
        </div>
      </li>
    </template>
  </ul>
</template>
