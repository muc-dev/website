module.exports = {
  darkMode: 'class',
  purge: {
    enabled: false,
    content: [
      './*.html',
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './content/**/*.md',
    ]
  },
}
