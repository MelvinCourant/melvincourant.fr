<script setup>
import "../../../assets/css/sections/hero/_hero-right.scss";

defineProps({
  hideText: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="hero__right">
    <div class="hero__images">
      <div class="hero__bubble">
        <div class="hero__bubble-container">
          <p class="hero__bubble-text">Bien le bonjour&nbsp;!</p>
          <img src="../../../assets/imgs/bubble.png"/>
        </div>
      </div>
      <img class="hero__coffee" src="../../../assets/imgs/coffee.png"/>
      <div class="hero__hide">
        <div class="hero__hide-container">
          <p class="hero__hide-text">{{ hideText }}</p>
          <img src="../../../assets/imgs/hide.png"/>
        </div>
      </div>
      <div class="hero__me">
        <div class="hero__mask-container">
          <img class="me" src="../../../assets/imgs/me.png"/>
          <img class="scratch" src="../../../assets/imgs/scratch.png"/>
          <svg width="0" height="0" viewBox="0 0 400 550" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="hero-mask" clipPathUnits="objectBoundingBox">
                <path d="M0 0.0545C0 0.0244 0.0244 0 0.0545 0H0.9455C0.9756 0 1 0.0244 1 0.0545V0.6133C1 0.6261 0.9921 0.639 0.978 0.6511L0.5537 0.9768C0.5244 1 0.4756 1 0.4463 0.9768L0.0219 0.6511C0.0079 0.639 0 0.6261 0 0.6133V0.0545Z" fill="#FF7A5C"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <img class="hero__shape" src="../../../assets/imgs/hero-shape.png"/>
      </div>
    </div>
  </div>
</template>