import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
//import tailwind from 'eslint-plugin-tailwindcss'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  //...tailwind.configs['flat/recommended'],
  prettier,
  {
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
]
