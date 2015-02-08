# vecs

A thin JavaScript library for SVG element creation and manipulation.

## Philosophy

  - Works with CommonJS bundlers
  - Provides a class hierarchy to SVG DOM elements
  - Functionality is added on an as-needed basis

## Installation

```shell
npm install vecs
```

## Usage

```javascript
var vecs = require("vecs");
var svg = new vecs.SVGRoot(100, 100);
var circle = new vecs.SVGCircle(25);
svg.addAt(circle, 50, 50);
```

## API

### vecs.SVGElement

The base class for all vecs SVG classes. You shouldn't need to instantiate this class directly.

#### .rawSVGElement()

Returns the raw SVG DOM element.

#### .name()

Returns the tag name of the SVG element. It is guaranteed to be all lowercase.

#### .setId(id)

Set the `id` attribute on the element to the given `id` parameter.

#### .setCoords(x, y)

Set the coordinates of the element. This is just like setting the `x` and `y` attributes for most SVG elements, but handles special cases like `<circle>` and `<path>`.

#### .removeFromDocument()

Removes the element from its parent.

#### .viewportDimensions()

Returns an object containing the dimensions of the `<svg>` element's viewport. If the object is not an `<svg>` element, the viewport dimensions to which the element belongs to will be returned. The properties of the returned index are numbers named `x`, `y`, `width`, `height`.

### new vecs.SVGRoot(width, height)

The class for `<svg>` elements. The values for `width` and `height` parameters should be integers. Their units are pixels.

#### vecs.SVGRoot.instanceFromRawElement(element)

Create a new `SVGRoot` instance using the supplied `<svg>` element.

#### .addToDocumentBodyWithId(id)

Add to the `document.body` element and use the given string as the `id` attribute.

#### .setViewBox(val)

Sets the `viewBox` attribute.

#### .setPreserveAspectRatio(val)

Sets the `perserveAspectRatio` attribute.

#### .add(svgObj)

Add the given `svgObj` (which should inherit from `SVGElement`) to the root element. Use `addAt()` to add an object and position it at the same time.

#### .addAt(svgObj, x, y)

Add the given `svgObj` (which should inherit from `SVGElement`) to the root element at the given coordinates.

#### .addDefinition(svgObj, [id])

Add the given `svgObj` (which should inherit from `SVGElement`) to the root element's definition list (`<defs>`). If `id` is supplied, it will set the `id` attribute on the `svgObj`.

#### .clippedDrawingGroup()

Returns an `SVGGroup` object that is clipped to the bounds of the `viewBox`, creating it if it doesn't exist. This is useful for creating images that should not draw outside of their `viewBox`. Just add shapes to this group object instead of the root object.

### vecs.SVGShape

Base class for all the elements that could be considered "shapes" (`SVGRect`, `SVGPolygon`, `SVGPath`, etc). Inherits from `SVGElement`. You should not need to directly call this class's constructor.

#### .setStrokeColor(color)

Sets the stroke color of the element to the given CSS color string.

#### .setStrokeOpacity(decimal)

Set the opacity of the stroke as a decimal where 0 is invisible and 1 is opaque.

#### .setStrokeWidth(width)

Sets the stroke width to the given number.

#### .setLinecap(type)

Set thes the `stroke-linecap` attribute of the element. Valid type strings are `butt`, `round`, `square`, and `inherit`.

#### .setFillColor(color)

Sets the fill color of the element to the given CSS color string.

#### .setFillOpacity(decimal)

Set the opacity of the fill as a decimal where 0 is invisible and 1 is opaque.

### new vecs.SVGCircle(radius)

Create a new `<circle>` element with the given radius.

### new vecs.SVGRect(width, height)

Create a new `<rect>` element with the given width and height.

### new vecs.SVGPolygon()

Creates a new `<polygon>` element.

#### .addPoint(x, y)

Add a point to the polygon. Points are relative to the parent element.

### new vecs.SVGPath()

Creates a new `<path>` element.

#### .setPathOrigin(x, y)

Set the beginning point in the path relative to the parent element.

#### .addLineSegment(x, y)

Add a straight line from the previous point in the path, relative to that point.

#### .addQuadraticBezierCurve(controlPointX, controlPointY, endPointX, endPointY)

Add a quadratic Bezier curve to the path. The control point and the end points are relative to the previous point in the path.

#### .addRawCommandString(commandString)

Add a raw SVG path command string to the path. Useful for ad-hoc data or pre-computed data like raw text paths.

#### .preventClose()

Prevent the path from closing (and being filled with a fill color).

### new vecs.SVGGroup()

Create a new `<g>` element for grouping SVG elements. Inherits from `SVGContainerElement`.

### new vecs.SVGClipPath()

Create a new `<clipPath>` element for defining a clipping path. Inherits from `SVGContainerElement`.

### vecs.SVGContainerElement

Base class for all elements that essentially act as containers for other SVG elements, such as `SVGRoot`, `SVGGroup`, `SVGClipPath`. It inherits from `SVGElement`. You should not need to directly call this class's constructor.

#### .add(svgObj)

Add the given `svgObj` (which should inherit from `SVGElement`) to the group.

#### .addAt(svgObj, x, y)

Add the given `svgObj` (which should inherit from `SVGElement`) to the group at the given coordinates.

#### .setClipPathId(id)

Set the `clip-path` attribute of the element to the given `id`. This should be the `id` you've given an `SVGClipPath` element, which has been added as a definition to the `SVGRoot` element.
