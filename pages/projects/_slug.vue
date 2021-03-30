<template>
  <main>
    <h1 class="text-4xl font-medium mb-6">
      {{ project.title }}
      <span class="font-gray-800 font-light text-sm ml-2">{{ project.startDate }}</span>
    </h1>
    <nuxt-content :document="project" />
  </main>
</template>

<script>

export default {
  async asyncData ({ $content, params }) {
    const project = await $content('projects/', params.slug).fetch()

    return { project }
  }
}
</script>

<style>
.nuxt-content-container img {
  max-width: 400px;
  @apply mt-8;
}

.nuxt-content-container strong {
  @apply mb-4;
}

.nuxt-content-container a {
  @apply underline;
}
</style>
