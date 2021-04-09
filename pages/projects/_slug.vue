<template>
  <main>
    <nuxt-content :document="project" />
  </main>
</template>

<script>

export default {
  layout: 'project',
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
