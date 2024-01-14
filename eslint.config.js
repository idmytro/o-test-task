import antfu from '@antfu/eslint-config'
import noAutofix from 'eslint-plugin-no-autofix'

export default antfu(
  {
    plugins: {
      'no-autofix': noAutofix,
    },
  },
  {
    rules: {
      'style/space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],
      'newline-before-return': 2,

      'ts/prefer-function-type': 2,
      'ts/consistent-type-definitions': [2, 'type'],

      'unused-imports/no-unused-imports': 0, // look below
      'no-autofix/unused-imports/no-unused-imports': 2,

      'vue/prop-name-casing': 0,

      'vue/html-self-closing': [1, {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
    },
  },
)
