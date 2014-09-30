"use strict"

var SVGShape = require("./SVGShape.js")
  , inherits = require("util").inherits

var SVGRect = module.exports = function (width, height) {
  SVGShape.call(this, "rect")
  this.rawSVGElement().setAttribute("width", width)
  this.rawSVGElement().setAttribute("height", height)
}
inherits(SVGRect, SVGShape)
