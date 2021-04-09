<template>
  <div class="max-w-screen-lg mx-auto">
    <Nuxt />
    <vercel-footer />
  </div>
</template>

<script>
import VercelFooter from '@/components/vercel-footer'

export default {
  head () {
    return {
      bodyAttrs: {
        class: 'dark:bg-black dark:text-white bg-white text-black transition duration-150 ease-in-out'
      }
    }
  },
  components: {
    VercelFooter,
  },
}
</script>
