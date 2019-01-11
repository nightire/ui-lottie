'use strict';

const merge = require('ember-cli-lodash-subset').merge;

module.exports = {
  name: require('./package.json').name,

  included(parent) {
    this.options = merge({}, this.options, parent.options);
    this._super.included.apply(this, arguments);

    this.import('node_modules/lottie-web/build/player/lottie.js', {
      using: [{ transformation: 'amd', as: 'lottie-web' }],
    });
  },
};
