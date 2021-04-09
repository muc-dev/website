module.exports = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: [
      './*.html',
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './content/**/*.md',
    ]
  },
}
