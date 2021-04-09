<template>
  <header class="bg-black text-white dark:bg-white dark:text-black mt-12 relative" :class="getHeaderClasses">
    <nuxt-link to="/" class="font-bold select-none" :class="{ 'text-6xl': size === 'big', 'text-2xl': size === 'small' }">
      muc.dev
      <p class="font-normal" :class="{ 'text-base': size === 'big', 'text-xs': size === 'small' }">
        The local developer group of bavaria.
      </p>
    </nuxt-link>

    <div class="absolute top-0 right-0 m-4 hover:text-gray-500 cursor-pointer" @click="toggleTheme">
      <template v-if="this.$colorMode.preference === 'dark'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="currentColor"/></svg>
      </template>
      <template v-else-if="this.$colorMode.preference === 'light'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 6a8 8 0 0 0 11.955 6.956C21.474 18.03 17.2 22 12 22 6.477 22 2 17.523 2 12c0-5.2 3.97-9.474 9.044-9.955A7.963 7.963 0 0 0 10 6zm-6 6a8 8 0 0 0 8 8 8.006 8.006 0 0 0 6.957-4.045c-.316.03-.636.045-.957.045-5.523 0-10-4.477-10-10 0-.321.015-.64.045-.957A8.006 8.006 0 0 0 4 12zm14.164-9.709L19 2.5v1l-.836.209a2 2 0 0 0-1.455 1.455L16.5 6h-1l-.209-.836a2 2 0 0 0-1.455-1.455L13 3.5v-1l.836-.209A2 2 0 0 0 15.29.836L15.5 0h1l.209.836a2 2 0 0 0 1.455 1.455zm5 5L24 7.5v1l-.836.209a2 2 0 0 0-1.455 1.455L21.5 11h-1l-.209-.836a2 2 0 0 0-1.455-1.455L18 8.5v-1l.836-.209a2 2 0 0 0 1.455-1.455L20.5 5h1l.209.836a2 2 0 0 0 1.455 1.455z" fill="currentColor"/></svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8.67 5.007a7 7 0 0 1 7.55-3.901 4.5 4.5 0 0 0 5.674 5.674c.07.396.106.804.106 1.22a6.969 6.969 0 0 1-.865 3.373A5.5 5.5 0 0 1 17.5 21H9a8 8 0 0 1-.33-15.993zm2.177.207a8.016 8.016 0 0 1 5.61 4.885 5.529 5.529 0 0 1 2.96.245c.226-.425.393-.885.488-1.37a6.502 6.502 0 0 1-5.878-5.88 5.003 5.003 0 0 0-3.18 2.12zM17.5 19a3.5 3.5 0 1 0-2.5-5.95V13a6 6 0 1 0-6 6h8.5z" fill="currentColor"/></svg>
      </template>
    </div>

  </header>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    toggleTheme () {
      const theme = localStorage.getItem('nuxt-color-mode')

      console.log(theme)

      if (theme === 'light') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'light'
      }
    },
    initTheme () {
      this.$colorMode.preference = localStorage.getItem('nuxt-color-mode')
    }
  },
  computed: {
    getHeaderClasses () {
      return {
        'px-24 pb-24 pt-48 mb-24' : this.size === 'big',
        'px-4 py-2 mb-2' : this.size === 'small',
      }
    }
  },
  mounted () {
    this.initTheme()
  }
}
</script>

