"use strict"

var SVGContainerElement = require("./SVGContainerElement.js")
  , SVGEvent = require("./SVGEvent.js")
  , SVGGroup = require("./SVGGroup.js")
  , SVGClipPath = require("./SVGClipPath.js")
  , SVGRect = require("./SVGRect.js")
  , inherits = require("util").inherits

var SVGRoot = module.exports = function (width, height) {
  SVGContainerElement.call(this, "svg")

  this._isObservingTouchGesture = false
  this._defsElement = null
  this._clippedDrawingGroup = null

  this.rawSVGElement().setAttribute("version", "1.1")
  this.rawSVGElement().setAttribute("width", width + "px")
  this.rawSVGElement().setAttribute("height", height + "px")
}
inherits(SVGRoot, SVGContainerElement)

SVGRoot.instanceFromRawElement = function (elem) {
  var root = new SVGRoot(1, 1)
  root._svgElement = elem
  return root
}

SVGRoot.prototype.addToDocumentBodyWithId = function (id) {
  this.rawSVGElement().setAttribute("id", id)
  document.body.appendChild(this.rawSVGElement())
}

SVGRoot.prototype.addDefinition = function (svgObj, id) {
  if (this._defsElement === null) {
    this._defsElement = new SVGContainerElement("defs")
    this.add(this._defsElement)
  }

  if (id) {
    svgObj.setId(id)
  }

  this._defsElement.add(svgObj)
}

SVGRoot.prototype.setViewBox = function (val) {
  this.rawSVGElement().setAttribute("viewBox", val)
}

SVGRoot.prototype.setPreserveAspectRatio = function (val) {
  this.rawSVGElement().setAttribute("preserveAspectRatio", val)
}

SVGRoot.prototype.clippedDrawingGroup = function () {
  if (this._clippedDrawingGroup === null) {
    var uniq = (new Date()).getTime()
    var clipPathId = "__vecs_clipped_drawing_group_path_" + uniq

    this._clippedDrawingGroup = new SVGGroup()
    this._clippedDrawingGroup.setClipPathId(clipPathId)
    this.add(this._clippedDrawingGroup)

    var clipPath = new SVGClipPath()
    var viewBox = this.viewportDimensions()
    clipPath.addAt(new SVGRect(viewBox.width, viewBox.height), 0, 0)
    this.addDefinition(clipPath, clipPathId)
  }

  return this._clippedDrawingGroup
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
