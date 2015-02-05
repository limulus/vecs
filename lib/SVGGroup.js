"use strict"

var SVGContainerElement = require("./SVGContainerElement.js")
var inherits = require("util").inherits

var SVGGroup = module.exports = function () {
  SVGContainerElement.call(this, "g")
}
inherits(SVGGroup, SVGContainerElement)
