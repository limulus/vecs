"use strict"

var SVGElement = require("./SVGElement.js")
var inherits = require("util").inherits

var SVGContainerElement = module.exports = function (name) {
  SVGElement.call(this, name)
}
inherits(SVGContainerElement, SVGElement)

SVGContainerElement.prototype.add = function (svgObj) {
  this.rawSVGElement().appendChild(svgObj.rawSVGElement())
}

SVGContainerElement.prototype.addAt = function (svgObj, x, y) {
  svgObj.setCoords(x, y)
  this.add(svgObj)
}

SVGContainerElement.prototype.setClipPathId = function (id) {
  this.rawSVGElement().setAttribute("clip-path", "url(#"+ id +")")
}
