"use strict"

var SVGShape = require("./SVGShape.js")
var inherits = require("util").inherits

var SVGCircle = module.exports = function (radius) {
  SVGShape.call(this, "circle")

  this.rawSVGElement().setAttribute("r", radius)
}
inherits(SVGCircle, SVGShape)
