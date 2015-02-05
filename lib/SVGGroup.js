"use strict"

var SVGElement = require("./SVGElement.js")
var inherits = require("util").inherits

var SVGGroup = module.exports = function () {
  SVGElement.call(this, "g")
}
inherits(SVGGroup, SVGElement)

SVGGroup.prototype.add = function (svgObj) {
  this.rawSVGElement().appendChild(svgObj.rawSVGElement())
}

SVGGroup.prototype.addAt = function (svgObj, x, y) {
  svgObj.setCoords(x, y)
  this.add(svgObj)
}
