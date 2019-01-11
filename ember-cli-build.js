'use strict';

const defaultOptions = require('@choiceform/ui-foundation/defaults')({
  // @import 模块导入规则
  import: {},

  // CSS 变量
  variables: {},

  // 自定义 Media Queries
  media: {},
});

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const merge = require('ember-cli-lodash-subset').merge;

module.exports = function(defaults) {
  let options = merge({}, defaultOptions, {
    useDeviceJS: false,

    useNormalizeCSS: false,

    useObjectFitImagesPolyfill: false,
  });

  let app = new EmberAddon(defaults, options);

  return app.toTree();
};
