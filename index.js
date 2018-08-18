'use strict';

const defaultsDeep = require('lodash.defaultsdeep');

module.exports = {
  name: '@choiceform/ui-lottie',

  included(parent) {
    this.options = defaultsDeep(parent.options, this.options);

    this._super.included.apply(this, arguments);
  },
};
