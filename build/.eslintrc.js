module.exports = {
  'extends': [
    '../.eslintrc.js'
  ],
  'env': {
    'node': true
  },
  'rules': {
    "import/no-extraneous-dependencies": ["error", {
      "dependencies": false,
      "devDependencies": true, 
      "optionalDependencies": false, 
      "peerDependencies": false,
    }],
  }
};