<template>
  <div class="bg-black dark:bg-white rounded-t-lg" style="width:450px">
    <main class="flex-col items-stretch h-full h-72 overflow-x-auto rounded-lg mt-6" @click="focusEditor">
      <!-- Header Start -->
      <header class="sticky top-0 text-white bg-black dark:bg-white dark:text-black z-50 select-none">
        <div class="flex justify-between items-center align-center pt-6 px-10 mb-2">
          <span class="text-center text-4xl font-black">{{this.formatDate('dd.LL.yyyy')}}</span>
          <!-- Week switcher -->
          <span class="text-white dark:text-black select-none flex justify-center items-center align-center space-x-1">
            <span class="text-red-400 hover:text-red-800 cursor-pointer" @click="shiftDay(-7)">
              <ArrowLeftIcon />
            </span>
            <span>KW{{this.formatDate('WW')}}</span>
            <span class="text-red-400 hover:text-red-800 cursor-pointer" @click="shiftDay(7)">
              <ArrowRightIcon />
            </span>
          </span>
        </div>
        <!-- Day switcher -->
        <div class="flex dark:bg-white justify-center space-x-4 z-50 border-b border-gray-400 dark:border-gray-800 py-4">
          <template v-for="date in getCurrentWeekDates()">
            <div :key="date.day" class="flex-col justify-center items-center self-center text-center">
              <span
                class="block mb-1 text-xs text-gray-400 dark:text-gray-700"
                :class="{ 'text-red-400 dark:text-red-500': date.isoDate === today }">
                {{date.weekDay}}
              </span>
              <span
                class="flex justify-center items-center self-center text-center w-10 h-10 rounded-full font-black text-xs hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer ring-red-600 dark:ring-red-900"
                :class="{ 'ring-4 text-sm': date.isoDate === today }"
                :key="date.day"
                @click="setDay(date.isoDate)">
                {{date.day}}
              </span>
            </div>
          </template>
        </div>
      </header>
      <!-- Header End -->
      <div v-if="editor">
        <div class="px-10 mt-5 text-gray-400 dark:text-gray-500 relative">
          <bubble-menu class="bubble-menu" :editor="editor" v-if="editor">
            <button @click="editor.chain().focus().toggleHighlight().run()"><PenIcon /></button>
            <button @click="editor.chain().focus().toggleBold().run()"><BoldIcon /></button>
            <button @click="editor.chain().focus().toggleItalic().run()"><ItalicIcon /></button>
            <button @click="editor.chain().focus().toggleStrike().run()"><StrikeThroughIcon /></button>
          </bubble-menu>
          <floating-menu class="floating-menu" :editor="editor" v-if="editor">
            <button @click="editor.chain().focus().toggleTaskList().run()"><CheckboxIcon /></button>
            <button @click="editor.chain().focus().toggleBulletList().run()"><BulletListIcon /></button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()"><CodeIcon /></button>
          </floating-menu>
          <div class="text-white dark:text-black h-72 overflow-x-scroll">
            <editor-content :editor="editor" v-model="content" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//import Layout from './Layout'
import Calendar from '@/mixins/calendar'
import File from '@/mixins/file'
import BulletListIcon from '@/static/icons/bullet-list.svg'
import CheckboxIcon from '@/static/icons/checkbox.svg'
import ArrowLeftIcon from '@/static/icons/arrow-left.svg'
import ArrowRightIcon from '@/static/icons/arrow-right.svg'
import CodeIcon from '@/static/icons/code.svg'
import PenIcon from '@/static/icons/pen.svg'
import BoldIcon from '@/static/icons/bold.svg'
import ItalicIcon from '@/static/icons/italic.svg'
import StrikeThroughIcon from '@/static/icons/strikethrough.svg'

import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Strike from '@tiptap/extension-strike'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'

export default {
  components: {
    //Layout,
    EditorContent,
    FloatingMenu,
    BubbleMenu,
    BulletListIcon,
    CheckboxIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CodeIcon,
    PenIcon,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon
  },
  mixins: [Calendar, File],
  data() {
    return {
      keysPressed: {},
      editor: null,
    }
  },
  methods: {
    focusEditor() {
      this.editor.chain().focus().run()
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        TaskList,
        TaskItem,
        Heading,
        Highlight,
        CodeBlock,
        BulletList,
        ListItem,
        Bold,
        Italic,
        Image,
        HorizontalRule,
        Strike,
        Link,
        History
      ],
      content: this.content,
      autofocus: true,
      onUpdate: ({ editor }) => {
        this.content = editor.getHTML()
        this.debounce(this.saveFile(), 2000)
      }
    })

    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true
      const modifier = this.keysPressed['Shift'] && this.keysPressed['Control']

      if (this.keysPressed['Meta'] && event.code === 'Comma') {
        this.$router.push('settings')
      }

      if (modifier && event.code === 'Enter') {
        this.today = this.getToday()
      }

      if (modifier && event.code === 'ArrowLeft') {
        this.shiftDay(-1)
      }

      if (modifier && event.code === 'ArrowRight') {
        this.shiftDay(1)
      }
    })

    document.addEventListener('keyup', (event) => {
      delete this.keysPressed[event.key]
    })
  },

  watch: {
    content(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.content, false)
    },
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
h1 {
  @apply text-4xl font-bold mb-2;
}

h2 {
  @apply text-2xl font-bold mb-2;
}

h3 {
  @apply text-xl font-bold mb-2;
}

::-webkit-scrollbar {
  display: none;
}

blockquote {
  @apply border-l-4 border-gray-600 text-gray-400 py-4 pl-4 m-2 italic
}
blockquote p {
  display: inline;
}

.editor {
  position: relative;
}
.editor__floating-menu {
  position: absolute;
  z-index: 1;
  margin-top: -0.25rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}
.editor__floating-menu.is-active {
  opacity: 1;
  visibility: visible;
}

ul[data-type="todo_list"] {
	 padding-left: 0;
}
 li[data-type="todo_item"] {
	 display: flex;
	 flex-direction: row;
}
 .todo-checkbox {
	 border: 2px solid black;
	 height: 0.9em;
	 width: 0.9em;
	 box-sizing: border-box;
	 margin-right: 10px;
	 margin-top: 0.3rem;
	 user-select: none;
	 -webkit-user-select: none;
	 cursor: pointer;
	 border-radius: 0.2em;
	 background-color: transparent;
	 transition: 0.4s background;
}
 .todo-content {
	 flex: 1;
}
 .todo-content > p:last-of-type {
	 margin-bottom: 0;
}
 .todo-content > ul[data-type="todo_list"] {
	 margin: 0.5rem 0;
}
 li[data-done="true"] > .todo-content > p {
	 text-decoration: line-through;
}
 li[data-done="true"] > .todo-checkbox {
	 background-color: black;
}
 li[data-done="false"] {
	 text-decoration: none;
}

.menubar__button {
  @apply text-gray-800 py-2 px-3 rounded-sm text-xs font-black;
}

code {
  @apply bg-gray-800 p-2 rounded-lg block box-border text-xs;
}

pre::before {
	 content: attr(data-language);
	 text-transform: uppercase;
	 display: block;
	 text-align: right;
	 font-weight: bold;
	 font-size: 0.6rem;
}
 pre code .hljs-comment, pre code .hljs-quote {
	 color: #999;
}
 pre code .hljs-variable, pre code .hljs-template-variable, pre code .hljs-attribute, pre code .hljs-tag, pre code .hljs-name, pre code .hljs-regexp, pre code .hljs-link, pre code .hljs-name, pre code .hljs-selector-id, pre code .hljs-selector-class {
	 color: #f2777a;
}
 pre code .hljs-number, pre code .hljs-meta, pre code .hljs-built_in, pre code .hljs-builtin-name, pre code .hljs-literal, pre code .hljs-type, pre code .hljs-params {
	 color: #f99157;
}
 pre code .hljs-string, pre code .hljs-symbol, pre code .hljs-bullet {
	 color: #9c9;
}
 pre code .hljs-title, pre code .hljs-section {
	 color: #fc6;
}
 pre code .hljs-keyword, pre code .hljs-selector-tag {
	 color: #69c;
}
 pre code .hljs-emphasis {
	 font-style: italic;
}
 pre code .hljs-strong {
	 font-weight: 700;
}
.ProseMirror:focus {
  outline: none;
}

.ProseMirror > ol, ul {
  list-style-type: disc !important;
  margin: 0rem 0.8rem !important;
  padding: 0.5rem !important;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
}
ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}
ul[data-type="taskList"] li > input {
  flex: 0 0 auto;
  margin-right: 0.5rem;
}
ul[data-type="taskList"] input[type="checkbox"] {
  cursor: pointer;
}
ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
}
ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}
ul[data-type="taskList"] li > input {
  flex: 0 0 auto;
  margin-right: 0.5rem;
}

.floating-menu {
  display: flex;
  background-color: #0d0d0d 10;
  padding: 0.2rem 0;
  border-radius: 0.5rem;
  margin-top: -0.25rem;
  margin-left: 0rem;
  transition: visibility 0.1s ease, opacity 0.1s ease;
}
.floating-menu button {
  @apply px-1 dark:text-gray-600;
}
.floating-menu button:hover, .floating-menu button.is-active {
  @apply text-gray-700 dark:text-gray-400;
}

.bubble-menu {
  @apply flex bg-white dark:bg-black;
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 0.5rem;
  transition: visibility 0.1s ease, opacity 0.1s ease;
  z-index: 60 !important;
}

.bubble-menu button {
  @apply dark:text-gray-600;
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
}

.bubble-menu button:hover, .bubble-menu button.is-active {
  @apply text-gray-700 dark:text-gray-400;
}

</style>
