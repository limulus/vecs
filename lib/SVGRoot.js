"use strict"

var SVGElement = require("./SVGElement.js")
  , SVGEvent = require("./SVGEvent.js")
  , inherits = require("util").inherits

var SVGRoot = module.exports = function (width, height) {
  SVGElement.call(this, "svg")

  this._isObservingTouchGesture = false

  this.rawSVGElement().setAttribute("version", "1.1")
  this.rawSVGElement().setAttribute("width", width + "px")
  this.rawSVGElement().setAttribute("height", height + "px")
}
inherits(SVGRoot, SVGElement)

SVGRoot.instanceFromRawElement = function (elem) {
  var root = new SVGRoot(1, 1)
  root._svgElement = elem
  return root
}

SVGRoot.prototype.addToDocumentBodyWithId = function (id) {
  this.rawSVGElement().setAttribute("id", id)
  document.body.appendChild(this.rawSVGElement())
}

SVGRoot.prototype.addAt = function (svgObj, x, y) {
  svgObj.setCoords(x, y)
  this.rawSVGElement().appendChild(svgObj.rawSVGElement())
}

SVGRoot.prototype.setViewBox = function (val) {
  this.rawSVGElement().setAttribute("viewBox", val)
}

SVGRoot.prototype.viewportDimensions = function () {
  return this.rawSVGElement().viewBox.baseVal
}

SVGRoot.prototype.setPreserveAspectRatio = function (val) {
  this.rawSVGElement().setAttribute("preserveAspectRatio", val)
}

SVGRoot.prototype.observeTouchGesture = function (eventHandler) {
  var beginGestureHandler = function (e) {
    e.preventDefault()
    eventHandler(new SVGEvent(e))
  }

  var continueGestureHandler = function (e) {
    e.preventDefault()
    eventHandler(new SVGEvent(e))
  }

  var endGestureHandler = function (e) {
    e.preventDefault()
    eventHandler(new SVGEvent(e))
  }

  if (document.ontouchstart === undefined) {
    this.rawSVGElement().addEventListener("mousedown", beginGestureHandler, false)
    this.rawSVGElement().addEventListener("mousemove", continueGestureHandler, false)
    this.rawSVGElement().addEventListener("mouseup", endGestureHandler, false)
  }
  else {
    this.rawSVGElement().addEventListener("touchstart", beginGestureHandler, true)
    this.rawSVGElement().addEventListener("touchmove", continueGestureHandler, true)
    this.rawSVGElement().addEventListener("touchend", endGestureHandler, true)
  }
}
