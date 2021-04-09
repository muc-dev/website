export default {
  data() {
    return {
      content: '',
      rating: null
    }
  },
  methods: {
    saveFile() {
      localStorage.setItem(
        `${this.formatDate('y')}/${this.today}`,
        JSON.stringify({
          "content": this.content,
          "rating": this.rating
        })
      )
    },
    loadFile() {
      const data = JSON.parse(
        localStorage.getItem(`${this.formatDate('y')}/${this.today}`)
      )

      if (data) {
        this.content = data.content
        this.rating = data.rating
      }
    },
    debounce(func, wait) {
      let timeout;

      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      }
    }
  },
  mounted() {
    this.loadFile()
  }
}
