"use strict"

var SVGElement = require("./SVGElement.js")
  , inherits = require("util").inherits

var SVGShape = module.exports = function (elementName) {
  SVGElement.call(this, elementName)
}
inherits(SVGShape, SVGElement)

SVGShape.prototype.setStrokeColor = function (color) {
  this.rawSVGElement().style.stroke = color
}

SVGShape.prototype.setStrokeWidth = function (width) {
  this.rawSVGElement().style.strokeWidth = width
}

SVGShape.prototype.setStrokeLinecap = function (type) {
  this.rawSVGElement().setAttribute("stroke-linecap", type)
}

SVGShape.prototype.setFillColor = function (color) {
  this.rawSVGElement().setAttribute("fill", color)
}
