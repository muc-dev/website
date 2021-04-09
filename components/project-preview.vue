<template>
  <section class="pt-24 text-white dark:text-black" :class="`bg-${color}-800`">
    <div class="w-full flex justify-between items-stretch px-12">
      <div class="flex flex-col">
        <h1 class="text-6xl">{{ title }}</h1>
        <p>{{ tagline }}</p>
      </div>
      <slot />
    </div>
    <div class="w-full bg-black px-12 py-6 text-center font-black">{{ trial }}</div>
</section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    tagLine: {
      type: String,
    },
    trial: {
      type: String,
    },
    color: {
      type: String
    }
  }
}
</script>
