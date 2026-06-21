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
const projects = ref([]);
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
        projects.value.push({
          display: false,
          ...project
        })
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
      projects.value.forEach((project) => {
        project.display = false;
      })

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
        window.open(props.projects[currentCardIndex.value].url, "_blank");
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
          <button
              class="project__details-button"
              @click="projects[index].display = true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
              <path d="M12.1072 8.89769C12.0976 8.88615 12.0856 8.87683 12.0721 8.87038C12.0586 8.86393 12.0438 8.86051 12.0288 8.86035C11.6952 8.86657 11.4911 9.02338 11.4215 9.32705C11.3428 9.63729 11.285 9.95244 11.2485 10.2704C11.0009 12.7899 10.9148 15.3227 10.9909 17.8532C11.0033 18.2141 11.0481 18.6298 11.2858 18.9895C11.3586 19.0806 11.452 19.1532 11.5584 19.201C11.6056 19.2272 11.6542 19.2558 11.7015 19.2869C11.7214 19.2994 11.7438 19.3056 11.7674 19.3018C11.7907 19.2988 11.8119 19.2873 11.8272 19.2695C11.867 19.2222 11.9093 19.1799 11.9516 19.1388C12.0463 19.0629 12.1193 18.9633 12.1632 18.8501L12.1756 18.8003C12.2727 18.4493 12.3723 18.0872 12.3748 17.7225C12.3972 15.5198 12.4021 13.2809 12.4071 11.1154L12.4108 9.71409C12.421 9.56134 12.4041 9.40799 12.3611 9.26109C12.3168 9.15656 12.2535 9.06118 12.1744 8.97982C12.151 8.95329 12.1286 8.9259 12.1072 8.89769Z" fill="var(--black)"/>
              <path d="M12.8962 7.01837C13.1912 6.45585 13.1327 5.87092 12.7295 5.32582C12.3013 4.74961 11.7413 4.61272 11.0655 4.92136C11.0442 4.93154 11.0273 4.94927 11.0183 4.97114L10.9137 5.21506C10.7196 5.6606 10.5366 6.08125 10.5914 6.57905C10.6536 7.14282 11.0108 7.55475 11.5223 7.6568C11.6094 7.67423 11.6965 7.68169 11.7836 7.68169C12.0122 7.68419 12.2369 7.62359 12.4332 7.50656C12.6295 7.38952 12.7898 7.22059 12.8962 7.01837ZM11.7538 6.09742L11.7363 6.36997C11.6791 6.32019 11.6393 6.27912 11.638 6.25548C11.638 6.22685 11.6828 6.17085 11.7538 6.09742Z" fill="var(--black)"/>
              <path d="M0.414846 8.28407C-0.621835 12.3661 0.286661 15.9677 3.11545 18.9894L3.33946 19.2209C4.85901 20.7429 6.75192 21.6838 8.25156 22.3371C8.89622 22.6184 12.1992 22.9606 13.0927 22.8275C18.4043 22.0335 21.9002 19.0317 23.1173 14.0113C23.3488 13.0282 23.4658 12.0201 23.462 11.0096C23.467 8.6288 22.4664 5.85976 20.403 3.78764C20.1914 3.61091 19.9799 3.42922 19.7745 3.25249C19.3302 2.87043 18.871 2.47343 18.3906 2.13616C14.723 -0.449941 10.9123 -0.464876 7.06554 0.906581C3.58089 2.14736 1.3445 4.63017 0.414846 8.28407ZM7.08047 2.1287C10.4556 0.723637 13.8432 0.475979 17.1474 2.58046C17.751 2.96626 19.3614 4.26926 19.6152 4.4659L19.6314 4.47834L19.6439 4.49328C20.9332 5.86224 22.4092 8.36497 22.3768 10.9399C22.366 12.0402 22.2171 13.1348 21.9338 14.198C21.095 17.2533 19.0888 19.481 15.8008 21.003C12.458 22.6072 7.66415 20.9856 6.38852 20.1431C4.97842 19.1769 3.74497 17.9754 2.74209 16.5912C1.16902 14.3598 0.815581 11.1514 1.66061 8.21811C2.0564 6.86495 2.74798 5.61666 3.68532 4.56352C4.62266 3.51039 5.78233 2.67873 7.08047 2.1287Z" fill="var(--black)"/>
            </svg>
          </button>
        </div>
        <div
          v-show="project.display"
          class="project__popup"
        >
          <div class="project__popup-content">
            <button @click="projects[index].display = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M9.69921 11.9783C7.93331 13.5602 6.20471 15.0921 4.49412 16.6444C3.50378 17.5422 2.54687 18.4798 1.5591 19.3814C1.29544 19.6271 0.99319 19.8277 0.663933 19.973C0.500591 20.0412 0.149469 19.973 0.0697272 19.8483C-0.0357379 19.6824 -0.00487009 19.3878 0.0530071 19.1718C0.0954504 19.0148 0.265224 18.8837 0.392554 18.7563C2.83191 16.3546 5.27262 13.9541 7.71467 11.5551C7.98862 11.2863 8.27157 11.0252 8.5854 10.7268C7.51788 9.54355 6.45037 8.40273 5.43045 7.21946C3.79959 5.32881 2.20475 3.41243 0.597053 1.50505C0.53789 1.4356 0.487729 1.35971 0.429852 1.29155C0.146897 0.957146 -0.0511722 0.599593 0.269082 0.195739C0.509594 -0.106509 1.08322 -0.0614931 1.48322 0.350078C2.47609 1.37662 3.45157 2.41984 4.40923 3.47931C6.16484 5.40855 7.90759 7.34936 9.65677 9.28375C9.73166 9.35412 9.81115 9.41943 9.89471 9.47925C11.2478 8.18537 12.5854 6.89664 13.9345 5.61948C15.499 4.13841 17.069 2.66317 18.6445 1.1938C19.2361 0.64075 19.7094 0.541716 20.0721 0.864542C20.4477 1.19894 20.4129 1.75585 19.8136 2.35392C18.193 3.97062 16.5339 5.54874 14.8747 7.12814C13.6117 8.33199 12.3281 9.51397 10.9841 10.7718C12.0773 11.9011 13.1217 13.0278 14.2175 14.1017C15.2696 15.1332 16.3795 16.1055 17.4522 17.1152C17.8728 17.4959 18.265 17.9049 18.6277 18.3383C18.921 18.7036 18.9647 19.1563 18.6046 19.5152C18.2496 19.8701 17.838 19.7441 17.4959 19.4766C16.84 18.9891 16.2136 18.4669 15.6156 17.9113C13.7853 16.1197 11.9886 14.2946 10.1777 12.4811C10.0349 12.3371 9.89857 12.1853 9.69921 11.9783Z" fill="var(--black)"/>
              </svg>
            </button>
            <h3 class="project__title">
              {{ project.title }}
            </h3>
            <p class="project__description" v-html="project.description"></p>
            <p class="project__technologies">
              <span
                  v-for="(technology, index) in project.technologies"
                  :key="technology"
                  class="project__technology"
              >
                <template v-if="index > 0"> -</template> {{ technology }}
              </span>
            </p>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>
