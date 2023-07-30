module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021, // Specifies the ECMAScript version to use (e.g., ES12/ES2021).
    sourceType: 'module', // Allows the use of import/export statements for modules.
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  // extends: [ 'vue','standard' ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
