"use strict"

var SVGContainerElement = require("./SVGContainerElement.js")
var inherits = require("util").inherits

var SVGClipPath = module.exports = function () {
  SVGContainerElement.call(this, "clipPath")
}
inherits(SVGClipPath, SVGContainerElement)
