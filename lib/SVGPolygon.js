"use strict"

var SVGShape = require("./SVGShape.js")
  , inherits = require("util").inherits

var SVGPolygon = module.exports = function () {
  SVGShape.call(this, "polygon")
}
inherits(SVGPolygon, SVGShape)

SVGPolygon.prototype.addPoint = function (x, y) {
  this.rawSVGElement().points.appendItem(this.createPoint(x, y))
}
