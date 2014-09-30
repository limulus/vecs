"use strict"

var SVGShape = require("./SVGShape.js")
var inherits = require("util").inherits

var SVGPath = module.exports = function () {
  SVGShape.call(this, "path")

  this._origin = undefined
  this._segments = []
  this._preventFill = false
}
inherits(SVGPath, SVGShape)

SVGPath.prototype.setPathOrigin = function (x, y) {
  this._origin = { "command": "M", "parameters": [x, y] }
}

SVGPath.prototype.addLineSegment = function (x, y) {
  this._segments.push({ "command": "l", "parameters": [x, y] })
}

// c = controlPoint. c1 relaive to start point
// e = endPoint
SVGPath.prototype.addQuadraticBezierCurve = function (c1x, c1y, ex, ey) {
  this._segments.push({ "command": "q", "parameters": [
    c1x+","+c1y, ex+","+ey
  ]})
}

SVGPath.prototype.preventClose = function () {
  this._preventFill = true
}

SVGPath.prototype.rawSVGElement = function () {
  var element = SVGShape.prototype.rawSVGElement.call(this)
  if (! element.getAttribute("d") && this._origin) {
    element.setAttribute("d", this._pathCommandString())
  }
  return element
}

SVGPath.prototype._pathCommandString = function () {
  return [this._origin]
    .concat(this._segments)
    .map(function (item) {
      return item["command"] +" "+ item["parameters"].join(" ")
    })
    .concat( this._preventFill ? []: ["Z"])
    .join(" ")
}
