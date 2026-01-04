<script setup lang="ts">
import { VPImage } from 'vitepress/theme'
</script>

<template>
  <div class="VPHero">
    <div class="container">
      <div class="image">
        <div class="image-container">
<!--          <img src="/assets/img/avatar.jpg">-->
<!--          asda-->
<!--          <VPImage-->
<!--              class="image-src"-->
<!--              image="/assets/img/avatar.jpg"-->
<!--          />-->
        </div>
      </div>
      <div class="main">
        <h1 class="name">
          <span class="clip">Simon Pangan</span>
        </h1>
        <p class="description">Developing engaging and performant web apps with Laravel & PHP</p>
        <p class="location">Manila, Philippines</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .VPHero {
    background: blue;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    background: red;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.container {
  background: pink;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

.main {
  text-align: center;
  //position: relative;
  //z-index: 10;
  //order: 2;
  //flex-grow: 1;
  //flex-shrink: 0;
}

@media (min-width: 960px) {
  .main {
    //order: 1;
    //width: calc((100% / 3) * 2);
    //background: orange;
    //max-width: 592px;
  }
}

.image {
  //order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    //flex-grow: 1;
    //order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.name {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

@media (min-width: 640px) {
  .name {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name {
    line-height: 64px;
    font-size: 56px;
  }
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

.location {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHero.has-image .location {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .location {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .location {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image .location {
    margin: 0;
  }
}
</style>

<!--<style scoped>-->
<!--.image-container {-->
<!--  position: relative;-->
<!--  margin: 0 auto;-->
<!--  width: 320px;-->
<!--  height: 320px;-->
<!--}-->

<!--@media (min-width: 640px) {-->
<!--  .image-container {-->
<!--    width: 392px;-->
<!--    height: 392px;-->
<!--  }-->
<!--}-->

<!--@media (min-width: 960px) {-->
<!--  .image-container {-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--    //width: 100%;-->
<!--    //height: 100%;-->
<!--    /*rtl:ignore*/-->
<!--    transform: translate(-32px, -32px);-->
<!--  }-->
<!--}-->

<!--:deep(.image-src) {-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  /*rtl:ignore*/-->
<!--  left: 50%;-->
<!--  max-width: 192px;-->
<!--  max-height: 192px;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: contain;-->
<!--  /*rtl:ignore*/-->
<!--  transform: translate(-50%, -50%);-->
<!--}-->

<!--@media (min-width: 640px) {-->
<!--  :deep(.image-src) {-->
<!--    max-width: 256px;-->
<!--    max-height: 256px;-->
<!--  }-->
<!--}-->

<!--@media (min-width: 960px) {-->
<!--  :deep(.image-src) {-->
<!--    max-width: 320px;-->
<!--    max-height: 320px;-->
<!--  }-->
<!--}-->
<!--</style>-->
