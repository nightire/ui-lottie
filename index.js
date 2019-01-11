"use strict";

module.exports = {
  name: require("./package").name,

  included() {
    this._super.included.apply(this, arguments);

    this.import("node_modules/lottie-web/build/player/lottie.js", {
      using: [{ transformation: "amd", as: "lottie-web" }]
    });
  }
};
