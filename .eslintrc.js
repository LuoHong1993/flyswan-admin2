module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  "globals": {
    "HeyUI": true,
    "Utils": true,
    "Manba": true,
    "Vue": true,
    "R": true,
    "G": true,
    "log": true,
    "Model": true
  },
  rules: {

    "semi": [
      "error",
      "always"
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
