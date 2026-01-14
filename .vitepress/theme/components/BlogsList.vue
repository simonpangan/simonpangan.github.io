<template>
  <div class="container">
    <h1 class="heading text-center fw-bold">Blogs</h1>
    <div class="mx-auto">
      <a class="blog">
        <div class="title">Title</div>
        <div class="date">Date</div>
      </a>
      <a class="blog">
        <div class="title">Title</div>
        <div class="date">Date</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1152px;
  margin: 0 auto;
}

.heading {
  font-size: 24px;
}

@media (min-width: 640px) {
  .heading {
    font-size: 28px;
  }
}
</style>
