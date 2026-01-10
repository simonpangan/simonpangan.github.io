<script setup>
import DefaultTheme from 'vitepress/theme'
import BlogsList from "./BlogsList.vue";

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <BlogsList />
    </template>
  </Layout>
</template>
