<template>
  <div class="max-w-screen-lg mx-auto">
    <page-header size="small" />
    <Nuxt />
    <vercel-footer />
  </div>
</template>

<script>
import VercelFooter from '@/components/vercel-footer'
import PageHeader from '@/components/page-header'

export default {
  head () {
    return {
      bodyAttrs: {
        class: 'dark:bg-black dark:text-white bg-white text-black transition duration-150 ease-in-out'
      }
    }
  },
  components: {
    PageHeader,
    VercelFooter,
  }
}
</script>
