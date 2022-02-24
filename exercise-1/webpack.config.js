const path = require('path');

module.exports = {
  entry: './exercise-1/scripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'exercise-1/dist'),
  },
  resolve: {
      fallback: {
          "fs": false
      }
  }
};