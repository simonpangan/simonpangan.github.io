<template>
  <div class="VPHero">
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
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 1152px;
}

.name {
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

@media (min-width: 640px) {
  .name {
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
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  //color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .location {
    padding-top: 12px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .location {
    line-height: 36px;
    font-size: 24px;
  }
}
</style>
