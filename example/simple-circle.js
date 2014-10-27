"use strict"

var vecs = require("../index.js");  // In your module: require("vecs")

var svg = new vecs.SVGRoot(100, 100);
var circle = new vecs.SVGCircle(25);
svg.addAt(circle, 50, 50);
svg.addToDocumentBodyWithId("simple-circle");

