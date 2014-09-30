"use strict"

var SVGEvent = module.exports = function (e) {
  this.type = e.type
  this._eventObj = e
}

SVGEvent.prototype.rawEventObj = function () {
  return this._eventObj
}

SVGEvent.prototype.positionRelativeToViewport = function () {
  var svgViewportElement = this.viewportElementForTarget()
    , point = svgViewportElement.createSVGPoint()
    , svgCTM = svgViewportElement.getScreenCTM()

  if (window.MouseEvent && this.rawEventObj() instanceof MouseEvent) {
    point.x = this.rawEventObj().clientX
    point.y = this.rawEventObj().clientY
  }
  else if (window.TouchEvent && this.rawEventObj() instanceof TouchEvent) {
    var touches = this.rawEventObj().touches
    point.x = touches[touches.length - 1].clientX
    point.y = touches[touches.length - 1].clientY
  }

  return point.matrixTransform(svgCTM.inverse())
}

SVGEvent.prototype.viewportElementForTarget = function () {
  var parentViewportElement = this.rawEventObj().target.viewportElement

  if (parentViewportElement) {
    return parentViewportElement
  }
  else {
    // If there was no parent viewport element, it must be the target.
    return this.rawEventObj().target
  }
}
