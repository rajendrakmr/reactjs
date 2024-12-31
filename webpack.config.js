// webpack.config.js
const path = require('path');

module.exports = { 
  resolve: {
    extensions: ['.js', '.jsx'] ,
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'), 
      '@': path.resolve(__dirname, 'src/'), 
    },
  },
};
