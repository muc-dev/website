<template>
  <main>
    <section class="flex space-x-24">
      <div class="w-1/4">
        <h2 class="text-2xl border-4 border-black inline px-5 py-2 font-bold">
          about.
        </h2>
        <div class="mt-12">
          <p>muc.dev is a discord community for (web) developers around bavaria. feel free to contact <strong>lost#0001</strong> for an invite.</p>
        </div>
      </div>
      <div class="w-1/2">
        <h2 class="text-2xl border-4 border-black inline px-5 py-2 font-bold">
          projects.
        </h2>
        <div class="mt-12">
          <h3 class="italic  text-xl">linked</h3>
          <p>your app to link thoughts to days, distraction free.</p>
          <nuxt-link to="/projects/linked" class="text-blue-500">about</nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {}
</script>

<style>

</style>
