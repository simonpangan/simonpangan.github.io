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
    <div class="container mx-auto">
      <div class="main text-center">
        <h1 class="name clip">Simon Pangan</h1>
        <div class="description">Developing engaging and performant web apps with Laravel & PHP</div>
        <div class="location">Manila, Philippines</div>
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
