// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4UKJc":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "043affa210fd5d10be6d99797cacc1f4";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3rfh7":[function(require,module,exports) {
var _demosBloom = require("./demos/Bloom");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _demosBloomDefault = _parcelHelpers.interopDefault(_demosBloom);
var _demosGJKVisualizer = require("./demos/GJKVisualizer");
var _demosGJKVisualizerDefault = _parcelHelpers.interopDefault(_demosGJKVisualizer);
var _geodeLibIGame = require("geode/lib/IGame");
var _demosGJKRaycastVisualizer = require("./demos/GJKRaycastVisualizer");
var _demosGJKRaycastVisualizerDefault = _parcelHelpers.interopDefault(_demosGJKRaycastVisualizer);
var _demosCollisionInfo = require("./demos/CollisionInfo");
var _demosCollisionInfoDefault = _parcelHelpers.interopDefault(_demosCollisionInfo);
let search = window.location.search.slice(1);
let game = ({
  Bloom: _demosBloomDefault.default,
  GJKVisualizer: _demosGJKVisualizerDefault.default,
  GJKRaycastVisualizer: _demosGJKRaycastVisualizerDefault.default,
  CollisionInfo: _demosCollisionInfoDefault.default
})[search];
if (game) _geodeLibIGame.startGameLoop(game);

},{"./demos/Bloom":"L1KCr","./demos/GJKVisualizer":"71PeT","geode/lib/IGame":"6KpQu","./demos/GJKRaycastVisualizer":"7ymZe","./demos/CollisionInfo":"4OjFc","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"L1KCr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _geodeLibGraphicsCanvas = require("geode/lib/graphics/Canvas");
var _geodeLibGraphicsCanvasDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsCanvas);
var _geodeLibGraphicsColor = require("geode/lib/graphics/Color");
var _geodeLibGraphicsColorDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsColor);
var _geodeLibAssets = require("geode/lib/assets");
class Bloom {
  constructor() {
    Bloom.instance = this;
    this.canvas = new _geodeLibGraphicsCanvasDefault.default("canvas");
    addEventListener("keyup", e => this.keyup(e));
  }
  keyup(e) {}
  update() {
    this.render();
  }
  /*---- Rendering ----*/
  background(forground) {
    let innerCanvas = new OffscreenCanvas(0, 0);
    let canvas = new _geodeLibGraphicsCanvasDefault.default(innerCanvas);
    canvas.fitWindow().smooth(false);
    canvas.background("#262838");
    canvas.circle(100, 100, 50).fillStyle(_geodeLibGraphicsColorDefault.default.white).fill();
    canvas.composition("destination-out").image(forground);
    return innerCanvas.transferToImageBitmap();
  }
  foreground() {
    let innerCanvas = new OffscreenCanvas(0, 0);
    let canvas = new _geodeLibGraphicsCanvasDefault.default(innerCanvas);
    canvas.fitWindow().smooth(false);
    let height = canvas.dimensions.y;
    let width = canvas.dimensions.x;
    let grassHeight = height / 3;
    canvas.rect(0, height - grassHeight, width, grassHeight).fillStyle("#0e260b").fill();
    canvas.translate(width / 2, height - grassHeight).scale(10, 10);
    for (let i = -5; i <= 5; i++) {
      canvas.push().translate(1 - i * 20, Math.sin(i) * 2 - 10).filter({
        brightness: 0.25 + Math.sin(i) / 16,
        hueRotate: (1 + Math.sin(i)) / 16
      }).image(_geodeLibAssets.getImage("AutumnTree"), 0, 0, 0, 0, true).pop();
    }
    return innerCanvas.transferToImageBitmap();
  }
  render() {
    let {canvas} = this;
    canvas.fitWindow(1 / 5).smooth(false);
    let foreground = this.foreground();
    let background = this.background(foreground);
    canvas.push();
    // canvas.image( foreground ).shadow( 6, "#ecf279" ).image( background )
    canvas.image(foreground).shadow(6, _geodeLibGraphicsColor.rgba(255, 255, 255, 0.25)).image(background);
    canvas.pop();
  }
}
exports.default = Bloom;

},{"geode/lib/graphics/Canvas":"3tMQ6","geode/lib/graphics/Color":"3Vz5E","geode/lib/assets":"2xPL5","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3tMQ6":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../math/Vector2"));
const Color_1 = __importDefault(require("./Color"));
const util_1 = require("../util");
function coerceFillStyle(style) {
    return (style instanceof Color_1.default) ? style.toString() : style;
}
class Canvas {
    canvas;
    context;
    width;
    height;
    pixelDensity = 1;
    _imageSource = {
        x: 0, y: 0,
        w: 0, h: 0
    };
    constructor(canvas) {
        if (typeof canvas == "string") {
            let _canvas = document.getElementById(canvas);
            if (_canvas instanceof HTMLCanvasElement)
                canvas = _canvas;
            else
                throw new Error("No canvas with id: " + canvas + " found.");
        }
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
    }
    get dimensions() {
        return new Vector2_1.default(this.width, this.height);
    }
    get center() {
        return this.dimensions.half();
    }
    resize(w, h, pixelDensity = 1) {
        this.width = w;
        this.height = h;
        if (this.canvas instanceof HTMLCanvasElement) {
            this.canvas.style.width = w + "px";
            this.canvas.style.height = h + "px";
        }
        this.canvas.width = w * pixelDensity;
        this.canvas.height = h * pixelDensity;
        this.pixelDensity = pixelDensity;
        this.scale(pixelDensity, pixelDensity);
        return this;
    }
    fitWindow(pixelDensity = 1) {
        this.resize(innerWidth, innerHeight, pixelDensity);
        return this;
    }
    background(style) {
        let { canvas, context: c, width, height } = this;
        c.fillStyle = coerceFillStyle(style);
        c.fillRect(0, 0, width, height);
        return this;
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        return this;
    }
    reset() {
        this.context.resetTransform();
        this.scale(this.pixelDensity, this.pixelDensity);
        this.clear();
    }
    vline(a, b) { this.line(a.x, a.y, b.x, b.y); return this; }
    line(x1, y1, x2, y2) {
        let { context: c } = this;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.closePath();
        return this;
    }
    vrect(p, dimensions, center = false) { this.rect(p.x, p.y, dimensions.x, dimensions.y, center); return this; }
    rect(x, y, w, h, centerX = false, centerY = centerX) {
        let { context: c } = this;
        if (centerX)
            x -= w / 2;
        if (centerY)
            y -= h / 2;
        c.beginPath();
        c.rect(x, y, w, h);
        c.closePath();
        return this;
    }
    vcircle(p, r) { this.circle(p.x, p.y, r); return this; }
    circle(x, y, r) {
        let { context: c } = this;
        c.beginPath();
        c.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
        c.closePath();
        return this;
    }
    stroke() {
        this.context.stroke();
        return this;
    }
    fill() {
        this.context.fill();
        return this;
    }
    strokeStyle(style) {
        this.context.strokeStyle = style.toString();
        return this;
    }
    fillStyle(style) {
        this.context.fillStyle = coerceFillStyle(style);
        return this;
    }
    lineWidth(width) {
        this.context.lineWidth = width;
        return this;
    }
    alpha(alpha) {
        this.context.globalAlpha = alpha;
        return this;
    }
    composition(operation) {
        this.context.globalCompositeOperation = operation;
        return this;
    }
    shadow(blur, color = "black") {
        this.context.shadowBlur = blur;
        this.context.shadowColor = color.toString();
        return this;
    }
    smooth(enable) {
        this.context.imageSmoothingEnabled = enable;
        return this;
    }
    filter(options) {
        if (typeof options == "string") {
            this.context.filter = options;
        }
        else if (options == null) {
            this.context.filter = "none";
        }
        else {
            let stringified = Object.entries(options).map(([key, value]) => {
                if (typeof value == "object")
                    value = Object.values(Object).map(x => x.toString()).join(", ");
                let suffix = key == "hueRotate" ? "turn" : "";
                return util_1.camelToDashes(key) + "(" + value + suffix + ")";
            }).join(" ");
            this.context.filter = stringified;
        }
        return this;
    }
    vimage(image, p, dimensions = Vector2_1.default.ZERO, center = false) { this.image(image, p.x, p.y, dimensions.x, dimensions.y, center); return this; }
    image(image, dx = 0, dy = 0, w = 0, h = 0, center = false) {
        if (image.width == 0)
            return this;
        if (center) {
            w = image.width;
            h = image.height;
            dx -= w / 2;
            dy -= h / 2;
        }
        else {
            w = w || image.width;
            h = h || image.height;
        }
        this.context.drawImage(image, dx, dy, w, h);
        return this;
    }
    vpartialImage(image, p, dimensions) { this.partialImage(image, p.x, p.y, dimensions.x, dimensions.y); return this; }
    partialImage(image, x = 0, y = 0, w = 0, h = 0) {
        let { _imageSource: imageSource } = this;
        w = w || imageSource.w;
        h = h || imageSource.h;
        this.context.drawImage(image, imageSource.x, imageSource.y, imageSource.w, imageSource.h, x, y, w, h);
    }
    vimageSource(p, dimensions) { this.imageSource(p.x, p.y, dimensions.x, dimensions.y); return this; }
    imageSource(x, y, w, h) {
        this._imageSource = { x, y, w, h };
        return this;
    }
    vtranslate(p) { this.translate(p.x, p.y); return this; }
    translate(x, y) {
        // this.context.translate( Math.round( x ), Math.round( y ) )
        this.context.translate(x, y);
        return this;
    }
    translateToCenter() {
        this.vtranslate(this.dimensions.half());
        return this;
    }
    rotate(angle) {
        this.context.rotate(angle);
        return this;
    }
    vscale(v) { this.scale(v.x, v.y); return this; }
    scale(x, y) {
        this.context.scale(x, y);
        return this;
    }
    transform(t) {
        let { x, y } = t.position;
        let { x: sx, y: sy } = t.scale;
        let { x: cx, y: cy } = t.center;
        if (t.parent)
            this.transform(t.parent);
        this.translate(x, y)
            .rotate(t.rotation)
            .scale(sx, sy)
            .translate(-cx, -cy);
        return this;
    }
    inverseTransform(t) {
        let { x, y } = t.position;
        let { x: sx, y: sy } = t.scale;
        let { x: cx, y: cy } = t.center;
        this.translate(cx, cy)
            .scale(1 / sx, 1 / sy)
            .rotate(-t.rotation)
            .translate(-x, -y);
        if (t.parent)
            this.inverseTransform(t.parent);
        return this;
    }
    applyMatrix(mat) {
        let { m11, m12, m13, m21, m22, m23 } = mat;
        this.context.transform(m11, m21, m12, m22, m13, m23);
        return this;
    }
    vtext(text, p, width, font = "50px pixel") { this.text(text, p.x, p.y, width, font); return this; }
    text(text, x, y, width, font = "50px pixel") {
        let c = this.context;
        c.font = font;
        c.fillText(text, x, y, width);
        return this;
    }
    push() {
        this.context.save();
        return this;
    }
    pop() {
        this.context.restore();
        return this;
    }
    path(coords) {
        this.context.beginPath();
        for (let i = 0; i < coords.length; i += 2) {
            let x = coords[i];
            let y = coords[i + 1];
            if (i == 0)
                this.context.moveTo(x, y);
            else
                this.context.lineTo(x, y);
        }
        return this;
    }
    vpath(points) {
        this.context.beginPath();
        let i = 0;
        for (let p of points) {
            if (i++ == 0)
                this.context.moveTo(p.x, p.y);
            else
                this.context.lineTo(p.x, p.y);
        }
        return this;
    }
    clip() {
        this.context.clip();
        return this;
    }
    gradient(from, to, colors) {
        let grad = this.context.createLinearGradient(from.x, from.y, to.x, to.y);
        for (let [percent, color] of colors)
            grad.addColorStop(percent, color.toString());
        return grad;
    }
}
exports.default = Canvas;

},{"../math/Vector2":"1YKlZ","./Color":"3Vz5E","../util":"4Wa80"}],"1YKlZ":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector = void 0;
const GMath_1 = __importDefault(require("./GMath"));
function vector(x, y) { return new Vector2(x, y); }
exports.vector = vector;
class Vector2 {
    x;
    y;
    static ZERO = new Vector2(0, 0);
    static ONE = new Vector2(1, 1);
    static RIGHT = new Vector2(1, 0);
    static LEFT = new Vector2(-1, 0);
    static DOWN = new Vector2(0, 1);
    static UP = new Vector2(0, -1);
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    get lengthSquared() { return this.x * this.x + this.y * this.y; }
    get angle() { return Math.atan2(this.y, this.x); }
    unit() { return this.multiply(1 / this.length); }
    leftNormal() { return new Vector2(-this.y, this.x); }
    rightNormal() { return new Vector2(this.y, -this.x); }
    negate() { return new Vector2(-this.x, -this.y); }
    half() { return new Vector2(this.x * 0.5, this.y * 0.5); }
    copy() { return new Vector2(this.x, this.y); }
    floor(scale = 1) { return new Vector2(Math.floor(this.x / scale) * scale, Math.floor(this.y / scale) * scale); }
    add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
    addXY(x, y) { return new Vector2(this.x + x, this.y + y); }
    addX(x) { return new Vector2(this.x + x, this.y); }
    addY(y) { return new Vector2(this.x, this.y + y); }
    subtract(other) { return new Vector2(this.x - other.x, this.y - other.y); }
    dot(other) { return this.x * other.x + this.y * other.y; }
    cross(other) { return this.x * other.y - this.y * other.x; }
    multiply(scale) { return new Vector2(this.x * scale, this.y * scale); }
    stretch(x, y) { return new Vector2(this.x * x, this.y * y); }
    divide(divisor) { return new Vector2(this.x / divisor, this.y / divisor); }
    lerp(other, t) { return this.multiply(1 - t).add(other.multiply(t)); }
    rotated(angle) {
        return this.complexProduct(Vector2.polar(angle, 1));
    }
    isRightOf(other) {
        return this.cross(other) > 0;
    }
    normalOnSide(side) {
        if (side.isRightOf(this))
            return this.rightNormal();
        return this.leftNormal();
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    complexProduct(other) {
        let x = this.x * other.x - this.y * other.y;
        let y = this.x * other.y + this.y * other.x;
        return new Vector2(x, y);
    }
    complexQuotient(other) {
        let lengthSquared = other.lengthSquared;
        let x = this.x * other.x + this.y * other.y;
        let y = this.y * other.x - this.x * other.y;
        return new Vector2(x / lengthSquared, y / lengthSquared);
    }
    complexExponential() {
        let magnitude = Math.exp(this.x);
        return new Vector2(magnitude * Math.cos(this.y), magnitude * Math.sin(this.y));
    }
    projection(other) {
        return other.multiply(other.dot(this) / other.lengthSquared);
    }
    equivalent(other, epsilon = 0.000001) {
        return GMath_1.default.equalivalent(this.x, other.x, epsilon) &&
            GMath_1.default.equalivalent(this.y, other.y, epsilon);
    }
    static polar(angle, length) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    static lissajous(t, xPeriod, yPeriod, xAmplitude = 1, yAmplitude = xAmplitude, xPhase = 0, yPhase = 0) {
        return vector(Math.cos(GMath_1.default.TAU * (t + xPhase) / xPeriod) * xAmplitude, Math.sin(GMath_1.default.TAU * (t + yPhase) / yPeriod) * yAmplitude);
    }
    static random(length) {
        let angle = Math.random() * 2 * Math.PI;
        return Vector2.polar(angle, length);
    }
}
exports.default = Vector2;

},{"./GMath":"360F0"}],"360F0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GMath {
    static TAU = Math.PI * 2;
    static degreesToRadians = GMath.TAU / 360;
    static modulus(n, m) {
        return ((n % m) + m) % m;
    }
    static lerp(a, b, amount) {
        return a * (1 - amount) + b * amount;
    }
    static clamp(x, min, max) {
        if (x < min)
            return min;
        if (x > max)
            return max;
        return x;
    }
    static shortestRotation(from, to) {
        let diff = GMath.modulus(to - from, GMath.TAU);
        if (diff > Math.PI)
            diff -= GMath.TAU;
        return diff;
    }
    static angleLerp(from, to, amount) {
        return from + GMath.shortestRotation(from, to) * amount;
    }
    static sigmoid(x) {
        let exp = Math.exp(x);
        return exp / (exp + 1);
    }
    static soften(x, softness = 1) {
        function f(x) {
            return x > 1 ?
                x - 0.5 :
                x * x / 2;
        }
        return f(Math.abs(x) / softness) * softness * Math.sign(x);
    }
    static equalivalent(a, b, epsilon = 0.000001) {
        return Math.abs(a - b) <= epsilon;
    }
}
exports.default = GMath;

},{}],"3Vz5E":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgba = exports.rgb = void 0;
function rgb(r, g, b) {
    return new Color(r, g, b);
}
exports.rgb = rgb;
function rgba(r, g, b, a = 1) {
    return new Color(r, g, b, a);
}
exports.rgba = rgba;
class Color {
    r;
    g;
    b;
    a;
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static parse(str) {
        if (str[0] == "#") {
            // Parse Hex
            let parts = str.match(/[0-9a-f]{2,2}/ig).map(x => parseInt(x, 16));
            return new Color(parts[0], parts[1], parts[2], (parts[3] || 255) / 255);
        }
        if (str.indexOf("(") == -1) {
            let color = Color[str];
            if (!color)
                throw new Error("unrecognized color " + str);
            return color;
        }
        let type = str.match(/\w+/)[0];
        let args = str.match(/\d+/g).map(x => parseFloat(x));
        switch (type) {
            case "rgb":
                return new Color(args[0], args[1], args[2]);
            case "rgba":
                return new Color(args[0], args[1], args[2], args[3]);
        }
    }
    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    static aliceblue = Color.parse("#f0f8ff");
    static antiquewhite = Color.parse("#faebd7");
    static aqua = Color.parse("#00ffff");
    static aquamarine = Color.parse("#7fffd4");
    static azure = Color.parse("#f0ffff");
    static beige = Color.parse("#f5f5dc");
    static bisque = Color.parse("#ffe4c4");
    static black = Color.parse("#000000");
    static blanchedalmond = Color.parse("#ffebcd");
    static blue = Color.parse("#0000ff");
    static blueviolet = Color.parse("#8a2be2");
    static brown = Color.parse("#a52a2a");
    static burlywood = Color.parse("#deb887");
    static cadetblue = Color.parse("#5f9ea0");
    static chartreuse = Color.parse("#7fff00");
    static chocolate = Color.parse("#d2691e");
    static coral = Color.parse("#ff7f50");
    static cornflowerblue = Color.parse("#6495ed");
    static cornsilk = Color.parse("#fff8dc");
    static crimson = Color.parse("#dc143c");
    static cyan = Color.parse("#00ffff");
    static darkblue = Color.parse("#00008b");
    static darkcyan = Color.parse("#008b8b");
    static darkgoldenrod = Color.parse("#b8860b");
    static darkgray = Color.parse("#a9a9a9");
    static darkgreen = Color.parse("#006400");
    static darkgrey = Color.parse("#a9a9a9");
    static darkkhaki = Color.parse("#bdb76b");
    static darkmagenta = Color.parse("#8b008b");
    static darkolivegreen = Color.parse("#556b2f");
    static darkorange = Color.parse("#ff8c00");
    static darkorchid = Color.parse("#9932cc");
    static darkred = Color.parse("#8b0000");
    static darksalmon = Color.parse("#e9967a");
    static darkseagreen = Color.parse("#8fbc8f");
    static darkslateblue = Color.parse("#483d8b");
    static darkslategray = Color.parse("#2f4f4f");
    static darkslategrey = Color.parse("#2f4f4f");
    static darkturquoise = Color.parse("#00ced1");
    static darkviolet = Color.parse("#9400d3");
    static deeppink = Color.parse("#ff1493");
    static deepskyblue = Color.parse("#00bfff");
    static dimgray = Color.parse("#696969");
    static dimgrey = Color.parse("#696969");
    static dodgerblue = Color.parse("#1e90ff");
    static firebrick = Color.parse("#b22222");
    static floralwhite = Color.parse("#fffaf0");
    static forestgreen = Color.parse("#228b22");
    static fuchsia = Color.parse("#ff00ff");
    static gainsboro = Color.parse("#dcdcdc");
    static ghostwhite = Color.parse("#f8f8ff");
    static goldenrod = Color.parse("#daa520");
    static gold = Color.parse("#ffd700");
    static gray = Color.parse("#808080");
    static green = Color.parse("#008000");
    static greenyellow = Color.parse("#adff2f");
    static grey = Color.parse("#808080");
    static honeydew = Color.parse("#f0fff0");
    static hotpink = Color.parse("#ff69b4");
    static indianred = Color.parse("#cd5c5c");
    static indigo = Color.parse("#4b0082");
    static ivory = Color.parse("#fffff0");
    static khaki = Color.parse("#f0e68c");
    static lavenderblush = Color.parse("#fff0f5");
    static lavender = Color.parse("#e6e6fa");
    static lawngreen = Color.parse("#7cfc00");
    static lemonchiffon = Color.parse("#fffacd");
    static lightblue = Color.parse("#add8e6");
    static lightcoral = Color.parse("#f08080");
    static lightcyan = Color.parse("#e0ffff");
    static lightgoldenrodyellow = Color.parse("#fafad2");
    static lightgray = Color.parse("#d3d3d3");
    static lightgreen = Color.parse("#90ee90");
    static lightgrey = Color.parse("#d3d3d3");
    static lightpink = Color.parse("#ffb6c1");
    static lightsalmon = Color.parse("#ffa07a");
    static lightseagreen = Color.parse("#20b2aa");
    static lightskyblue = Color.parse("#87cefa");
    static lightslategray = Color.parse("#778899");
    static lightslategrey = Color.parse("#778899");
    static lightsteelblue = Color.parse("#b0c4de");
    static lightyellow = Color.parse("#ffffe0");
    static lime = Color.parse("#00ff00");
    static limegreen = Color.parse("#32cd32");
    static linen = Color.parse("#faf0e6");
    static magenta = Color.parse("#ff00ff");
    static maroon = Color.parse("#800000");
    static mediumaquamarine = Color.parse("#66cdaa");
    static mediumblue = Color.parse("#0000cd");
    static mediumorchid = Color.parse("#ba55d3");
    static mediumpurple = Color.parse("#9370db");
    static mediumseagreen = Color.parse("#3cb371");
    static mediumslateblue = Color.parse("#7b68ee");
    static mediumspringgreen = Color.parse("#00fa9a");
    static mediumturquoise = Color.parse("#48d1cc");
    static mediumvioletred = Color.parse("#c71585");
    static midnightblue = Color.parse("#191970");
    static mintcream = Color.parse("#f5fffa");
    static mistyrose = Color.parse("#ffe4e1");
    static moccasin = Color.parse("#ffe4b5");
    static navajowhite = Color.parse("#ffdead");
    static navy = Color.parse("#000080");
    static oldlace = Color.parse("#fdf5e6");
    static olive = Color.parse("#808000");
    static olivedrab = Color.parse("#6b8e23");
    static orange = Color.parse("#ffa500");
    static orangered = Color.parse("#ff4500");
    static orchid = Color.parse("#da70d6");
    static palegoldenrod = Color.parse("#eee8aa");
    static palegreen = Color.parse("#98fb98");
    static paleturquoise = Color.parse("#afeeee");
    static palevioletred = Color.parse("#db7093");
    static papayawhip = Color.parse("#ffefd5");
    static peachpuff = Color.parse("#ffdab9");
    static peru = Color.parse("#cd853f");
    static pink = Color.parse("#ffc0cb");
    static plum = Color.parse("#dda0dd");
    static powderblue = Color.parse("#b0e0e6");
    static purple = Color.parse("#800080");
    static rebeccapurple = Color.parse("#663399");
    static red = Color.parse("#ff0000");
    static rosybrown = Color.parse("#bc8f8f");
    static royalblue = Color.parse("#4169e1");
    static saddlebrown = Color.parse("#8b4513");
    static salmon = Color.parse("#fa8072");
    static sandybrown = Color.parse("#f4a460");
    static seagreen = Color.parse("#2e8b57");
    static seashell = Color.parse("#fff5ee");
    static sienna = Color.parse("#a0522d");
    static silver = Color.parse("#c0c0c0");
    static skyblue = Color.parse("#87ceeb");
    static slateblue = Color.parse("#6a5acd");
    static slategray = Color.parse("#708090");
    static slategrey = Color.parse("#708090");
    static snow = Color.parse("#fffafa");
    static springgreen = Color.parse("#00ff7f");
    static steelblue = Color.parse("#4682b4");
    static tan = Color.parse("#d2b48c");
    static teal = Color.parse("#008080");
    static thistle = Color.parse("#d8bfd8");
    static tomato = Color.parse("#ff6347");
    static turquoise = Color.parse("#40e0d0");
    static violet = Color.parse("#ee82ee");
    static wheat = Color.parse("#f5deb3");
    static white = Color.parse("#ffffff");
    static whitesmoke = Color.parse("#f5f5f5");
    static yellow = Color.parse("#ffff00");
    static yellowgreen = Color.parse("#9acd32");
    static transparent = rgba(0, 0, 0, 0);
}
exports.default = Color;

},{}],"4Wa80":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argmax = exports.fitBox = exports.memoize = exports.camelToDashes = exports.splitCamel = exports.renameField = exports.frozen = void 0;
const BoundingBox_1 = __importDefault(require("./math/geometry/BoundingBox"));
function frozen(obj) {
    return Object.freeze(obj);
}
exports.frozen = frozen;
function renameField(obj, name, newName) {
    if (obj.hasOwnProperty(name)) {
        obj[newName] = obj[name];
        delete obj[name];
    }
}
exports.renameField = renameField;
function splitCamel(str) {
    return str.match(/[A-Za-z_][a-z0-9_]+/g);
}
exports.splitCamel = splitCamel;
function camelToDashes(str) {
    return (splitCamel(str) || []).join("-").toLowerCase();
}
exports.camelToDashes = camelToDashes;
function memoize(func) {
    let cache = {};
    return (arg) => {
        let cached = cache[arg];
        if (cached !== undefined)
            return cached;
        let value = func(arg);
        cache[arg] = value;
        return value;
    };
}
exports.memoize = memoize;
function fitBox(inner, outer) {
    let xRatio = outer.dimensions.x / inner.dimensions.x;
    let yRatio = outer.dimensions.y / inner.dimensions.y;
    let minRatio = Math.min(xRatio, yRatio);
    let dimensions = inner.dimensions.multiply(minRatio);
    let room = outer.dimensions.subtract(dimensions);
    let offset = room.half();
    return new BoundingBox_1.default(dimensions, outer.position.add(offset));
}
exports.fitBox = fitBox;
function argmax(values, func) {
    let best = func(values[0]);
    let bestIndex = 0;
    for (let i = 0; i < values.length; i++) {
        let score = func(values[i]);
        if (score > best) {
            best = score;
            bestIndex = i;
        }
    }
    return { best, bestIndex, bestArg: values[bestIndex] };
}
exports.argmax = argmax;

},{"./math/geometry/BoundingBox":"4zGHx"}],"4zGHx":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../Vector2"));
class BoundingBox {
    dimensions;
    position;
    constructor(dimensions, position = Vector2_1.default.ZERO) {
        this.dimensions = dimensions;
        this.position = position;
    }
}
exports.default = BoundingBox;

},{"../Vector2":"1YKlZ"}],"2xPL5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSON = exports.isFontLoaded = exports.getAudio = exports.getImage = exports.getAsset = void 0;
const cache = {};
function getAsset(path, fromPath) {
    if (cache[path])
        return cache[path];
    let asset = fromPath(path);
    cache[path] = asset;
    return asset;
}
exports.getAsset = getAsset;
function assetPath(path, defaultExtension) {
    if (path.indexOf(".") == -1)
        path = path + "." + defaultExtension;
    return "/assets/" + path;
}
function getImage(path) {
    return getAsset(assetPath("images/" + path, "png"), path => {
        let img = new Image();
        img.src = path;
        return img;
    });
}
exports.getImage = getImage;
function getAudio(path) {
    return getAsset(assetPath("audio/" + path, "mp3"), path => new Audio(path));
}
exports.getAudio = getAudio;
function isFontLoaded(font) {
    return document.fonts.check("0px " + font);
}
exports.isFontLoaded = isFontLoaded;
function getJSON(path) {
    path = assetPath(path, "json");
    let req = new XMLHttpRequest();
    return new Promise(resolve => {
        req.onload = () => resolve(JSON.parse(req.response));
        req.open("GET", path);
        req.send();
    });
}
exports.getJSON = getJSON;

},{}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"71PeT":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _geodeLibGraphicsCanvas = require("geode/lib/graphics/Canvas");
var _geodeLibGraphicsCanvasDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsCanvas);
var _geodeLibGraphicsColor = require("geode/lib/graphics/Color");
var _geodeLibGraphicsColorDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsColor);
var _geodeLibMathVector = require("geode/lib/math/Vector2");
var _geodeLibMathVectorDefault = _parcelHelpers.interopDefault(_geodeLibMathVector);
var _geodeLibMathCollisionGJK = require("geode/lib/math/collision/GJK");
var _geodeLibMathCollisionGJKDefault = _parcelHelpers.interopDefault(_geodeLibMathCollisionGJK);
var _geodeLibInput = require("geode/lib/Input");
var _geodeLibInputDefault = _parcelHelpers.interopDefault(_geodeLibInput);
var _geodeLibUtil = require("geode/lib/util");
class GJKVisualizer {
  constructor() {
    this.canvas = new _geodeLibGraphicsCanvasDefault.default("canvas");
  }
  update() {
    this.render();
  }
  /*---- Rendering ----*/
  supportPath(canvas, support, steps = 100) {
    let points = [];
    for (let i = 0; i < steps; i++) {
      let theta = Math.PI * 2 * i / steps;
      let heading = _geodeLibMathVectorDefault.default.polar(theta, 1);
      points.push(support(heading));
    }
    canvas.vpath(points);
    canvas.context.closePath();
  }
  ellipseSupport(a, b, d) {
    let a2 = a * d.x;
    let b2 = b * d.y;
    let p = Math.atan2(b2, a2);
    return _geodeLibMathVectorDefault.default.polar(p, 1).stretch(a, b);
  }
  regularPolygon(sides = 3, radius = 100) {
    let vertices = [];
    for (let i = 0; i < sides; i++) vertices.push(_geodeLibMathVectorDefault.default.polar(Math.PI * 2 / sides * i, 1).multiply(radius));
    return vertices;
  }
  polygonSupport(vertices, d) {
    return _geodeLibUtil.argmax(vertices, v => v.dot(d)).bestArg;
  }
  render() {
    let {canvas} = this;
    canvas.fitWindow(2).translateToCenter().strokeStyle(_geodeLibGraphicsColorDefault.default.white).lineWidth(1);
    let vertices = this.regularPolygon(6, 100);
    let support = d => {
      let squareSupport = this.polygonSupport(vertices, d);
      let circleSupport = this.ellipseSupport(50, 50, d);
      return squareSupport.add(circleSupport).add(_geodeLibInputDefault.default.mouse).subtract(canvas.dimensions.half());
    };
    let simplices = [];
    let c = _geodeLibMathCollisionGJKDefault.default(support, simplices);
    let i = 0;
    for (let simplex of simplices) {
      if (simplex.length != 3) continue;
      let brightness = i++ % 2 == 0 ? 1 : 0.5;
      let g = 255 * brightness;
      let b = 255 * brightness;
      canvas.fillStyle(_geodeLibGraphicsColor.rgba(0, g, b, 0.5));
      canvas.vpath(simplex);
      canvas.context.closePath();
      canvas.fill();
    }
    this.supportPath(canvas, support);
    canvas.stroke();
    if (c) canvas.circle(0, 0, 2).fillStyle(_geodeLibGraphicsColorDefault.default.cyan).fill(); else canvas.circle(0, 0, 2).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
  }
}
exports.default = GJKVisualizer;

},{"geode/lib/graphics/Canvas":"3tMQ6","geode/lib/graphics/Color":"3Vz5E","geode/lib/math/Vector2":"1YKlZ","geode/lib/math/collision/GJK":"jhTPo","geode/lib/Input":"5XDOa","geode/lib/util":"4Wa80","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"jhTPo":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../Vector2"));
function GJK(support, simplices, maxIterations = 100, initialHeading = Vector2_1.default.RIGHT) {
    let initialPoint = support(initialHeading);
    let heading = initialPoint.negate();
    let simplex = [initialPoint];
    function checkAndUpdateSimplex() {
        if (simplices)
            simplices.push(simplex.slice());
        switch (simplex.length) {
            case 1: {
                heading = simplex[0].negate();
                return false;
            }
            case 2: {
                let [b, a] = simplex;
                let ab = b.subtract(a);
                let ao = a.negate();
                if (ab.dot(ao) < 0) {
                    heading = ao;
                    simplex = [a];
                    return false;
                }
                heading = ab.normalOnSide(ao);
                return false;
            }
            case 3: {
                let [c, b, a] = simplex;
                let ab = b.subtract(a);
                let ac = c.subtract(a);
                let ao = a.negate();
                let inAB = ab.dot(ao) > 0;
                let inAC = ac.dot(ao) > 0;
                if (!inAB && !inAC) {
                    heading = ao;
                    simplex = [a];
                    return false;
                }
                let abNormal = ab.normalOnSide(ac).negate();
                let acNormal = ac.normalOnSide(ab).negate();
                let belowAB = abNormal.dot(ao) < 0;
                let belowAC = acNormal.dot(ao) < 0;
                if (belowAB && belowAC)
                    return true;
                if (inAB && !belowAB) {
                    heading = abNormal;
                    simplex = [b, a];
                    return false;
                }
                heading = acNormal;
                simplex = [c, a];
                return false;
            }
        }
    }
    let i = 0;
    while (true) {
        if (++i > maxIterations)
            return false;
        let nextVertex = support(heading);
        if (nextVertex.dot(heading) < 0)
            return false;
        simplex.push(nextVertex);
        let intersected = checkAndUpdateSimplex();
        if (intersected)
            return true;
    }
}
exports.default = GJK;

},{"../Vector2":"1YKlZ"}],"5XDOa":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importStar(require("./math/Vector2"));
const Canvas_1 = __importDefault(require("./graphics/Canvas"));
window.addEventListener("mousemove", e => { Input.mouse = Vector2_1.vector(e.x, e.y); });
window.addEventListener("keydown", e => Input.buttons[e.key] = true);
window.addEventListener("keyup", e => Input.buttons[e.key] = false);
window.addEventListener("mousedown", e => Input.buttons["Mouse" + e.button] = true);
window.addEventListener("mouseup", e => Input.buttons["Mouse" + e.button] = false);
class Input {
    static mouse = Vector2_1.default.ZERO;
    static buttons = {};
    static mouseScreenPosition(canvas) {
        if (canvas instanceof Canvas_1.default)
            canvas = canvas.canvas;
        let b = canvas.getBoundingClientRect();
        return Input.mouse.addXY(-b.left, -b.top);
    }
}
exports.default = Input;

},{"./math/Vector2":"1YKlZ","./graphics/Canvas":"3tMQ6"}],"6KpQu":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGameLoop = void 0;
const Clock_1 = require("./Clock");
function startGameLoop(gameClass) {
    window.onload = () => {
        let game = new gameClass();
        function loop() {
            Clock_1.GameClock.tick();
            game.update();
            requestAnimationFrame(loop);
        }
        loop();
    };
}
exports.startGameLoop = startGameLoop;

},{"./Clock":"4TlVb"}],"4TlVb":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClock = void 0;
const maxDt = 50;
class Clock {
    lastTick = performance.now();
    paused = false;
    _time = 0;
    _dt = 0;
    get time() { return this._time; }
    get dt() { return this._dt; }
    tick() {
        let now = performance.now();
        let actualDt = now - this.lastTick;
        let dt = Math.min(actualDt, maxDt);
        this.lastTick = now;
        if (this.paused)
            return;
        this._dt = dt;
        this._time += dt;
    }
    pause() {
        this.paused = true;
    }
    unpause() {
        this.paused = false;
    }
}
exports.default = Clock;
exports.GameClock = new Clock();
window.GameClock = exports.GameClock;

},{}],"7ymZe":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _geodeLibGraphicsCanvas = require("geode/lib/graphics/Canvas");
var _geodeLibGraphicsCanvasDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsCanvas);
var _geodeLibGraphicsColor = require("geode/lib/graphics/Color");
var _geodeLibGraphicsColorDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsColor);
var _geodeLibMathVector = require("geode/lib/math/Vector2");
var _geodeLibMathVectorDefault = _parcelHelpers.interopDefault(_geodeLibMathVector);
var _geodeLibInput = require("geode/lib/Input");
var _geodeLibInputDefault = _parcelHelpers.interopDefault(_geodeLibInput);
var _geodeLibMathGeometryPolygon = require("geode/lib/math/geometry/Polygon");
var _geodeLibMathGeometryPolygonDefault = _parcelHelpers.interopDefault(_geodeLibMathGeometryPolygon);
var _geodeLibMathGeometryRay = require("geode/lib/math/geometry/Ray");
var _geodeLibMathGeometryRayDefault = _parcelHelpers.interopDefault(_geodeLibMathGeometryRay);
var _geodeLibMathCollisionGJKRaycast = require("geode/lib/math/collision/GJKRaycast");
var _geodeLibMathCollisionGJKRaycastDefault = _parcelHelpers.interopDefault(_geodeLibMathCollisionGJKRaycast);
var _geodeLibMathGMath = require("geode/lib/math/GMath");
var _geodeLibMathGMathDefault = _parcelHelpers.interopDefault(_geodeLibMathGMath);
class GJKRaycastVisualizer {
  constructor() {
    this.canvas = new _geodeLibGraphicsCanvasDefault.default("canvas");
  }
  update() {
    this.render();
  }
  supportPath(canvas, support, steps = 100) {
    let points = [];
    for (let i = 0; i < steps; i++) {
      let theta = Math.PI * 2 * i / steps;
      let heading = _geodeLibMathVectorDefault.default.polar(theta, 1);
      points.push(support(heading));
    }
    canvas.vpath(points);
    canvas.context.closePath();
  }
  polyPos = _geodeLibMathVector.vector(400, 0);
  render() {
    let {canvas} = this;
    canvas.fitWindow(2);
    // let fps = 1000 / GameClock.dt
    // console.log( fps )
    // canvas.fillStyle( Color.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )
    canvas.translateToCenter();
    let mouse = _geodeLibInputDefault.default.mouse.subtract(canvas.dimensions.half());
    if (_geodeLibInputDefault.default.buttons.Mouse0) this.polyPos = mouse;
    let polygon = _geodeLibMathGeometryPolygonDefault.default.regular(6, 100);
    polygon.position = this.polyPos;
    let support = v => polygon.support(v).add(v.unit.multiply(100));
    this.supportPath(canvas, support);
    canvas.strokeStyle(_geodeLibGraphicsColorDefault.default.white).stroke();
    let angle = Math.sin(performance.now() / 2000) + _geodeLibMathGMathDefault.default.TAU / 8;
    let ray = new _geodeLibMathGeometryRayDefault.default(_geodeLibMathVectorDefault.default.ZERO, _geodeLibMathVectorDefault.default.polar(angle, 1));
    let rayLength = 2000;
    let line = _geodeLibMathCollisionGJKRaycastDefault.default(support, ray.heading, 10);
    if (line) {
      let time = line.rayCast(ray);
      if (time > 0) {
        rayLength = time;
        let hitPoint = ray.pointAt(time);
        // canvas.vline( line.a, line.b ).strokeStyle( Color.green ).stroke()
        let normal = line.leftNormal.unit();
        canvas.vline(hitPoint, hitPoint.add(normal.multiply(40))).strokeStyle(_geodeLibGraphicsColorDefault.default.green).stroke();
      }
    }
    canvas.vline(ray.point, ray.pointAt(rayLength)).strokeStyle(_geodeLibGraphicsColorDefault.default.red).stroke();
    canvas.vcircle(ray.pointAt(rayLength), 2).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
    canvas.circle(0, 0, 2).fillStyle(_geodeLibGraphicsColorDefault.default.white).fill();
    canvas.vcircle(this.polyPos, 2).fillStyle(_geodeLibGraphicsColorDefault.default.white).fill();
  }
}
exports.default = GJKRaycastVisualizer;

},{"geode/lib/graphics/Canvas":"3tMQ6","geode/lib/graphics/Color":"3Vz5E","geode/lib/math/Vector2":"1YKlZ","geode/lib/Input":"5XDOa","geode/lib/math/geometry/Polygon":"7cxQu","geode/lib/math/geometry/Ray":"1B96d","geode/lib/math/collision/GJKRaycast":"4hLYt","geode/lib/math/GMath":"360F0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7cxQu":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../Vector2"));
const util_1 = require("../../util");
const GMath_1 = __importDefault(require("../GMath"));
class Polygon {
    vertices;
    position;
    constructor(vertices, position = Vector2_1.default.ZERO) {
        this.vertices = vertices;
        this.position = position;
    }
    support(d) {
        return util_1.argmax(this.vertices, v => v.add(this.position).dot(d)).bestArg.add(this.position);
    }
    static regular(sides, radius) {
        let result = new Polygon([]);
        for (let i = 0; i < sides; i++) {
            let angle = GMath_1.default.TAU * i / sides + Math.PI / sides;
            result.vertices.push(Vector2_1.default.polar(angle, radius));
        }
        return result;
    }
}
exports.default = Polygon;

},{"../Vector2":"1YKlZ","../../util":"4Wa80","../GMath":"360F0"}],"1B96d":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ray {
    point;
    heading;
    pointAt(time) {
        return this.point.add(this.heading.multiply(time));
    }
    constructor(point, heading) {
        this.point = point;
        this.heading = heading;
    }
}
exports.default = Ray;

},{}],"4hLYt":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __importDefault(require("../geometry/Line"));
function GJKRaycast(support, ray, maxIterations = 100) {
    let a = support(ray.rightNormal());
    let b = support(ray.leftNormal());
    if (a.dot(ray.rightNormal()) < 0)
        return null;
    if (b.dot(ray.leftNormal()) < 0)
        return null;
    let i = 0;
    while (true) {
        let ab = b.subtract(a);
        let ao = a.negate();
        let abNormal = ab.normalOnSide(ao);
        let c = support(abNormal);
        if ((++i == maxIterations) || c.equivalent(a) || c.equivalent(b))
            return new Line_1.default(a, b);
        if (c.dot(ray.rightNormal()) > 0)
            a = c;
        else
            b = c;
    }
}
exports.default = GJKRaycast;

},{"../geometry/Line":"3w70h"}],"3w70h":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Line {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    get heading() {
        return this.b.subtract(this.a);
    }
    get leftNormal() {
        return this.heading.leftNormal();
    }
    rayCast(ray) {
        let { a, b } = this;
        let rayToA = a.subtract(ray.point);
        let n = b.subtract(a).leftNormal();
        let distance = rayToA.dot(n);
        let speed = ray.heading.dot(n);
        let time = distance / speed;
        return time;
    }
}
exports.default = Line;

},{}],"4OjFc":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _geodeLibGraphicsCanvas = require("geode/lib/graphics/Canvas");
var _geodeLibGraphicsCanvasDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsCanvas);
var _geodeLibGraphicsColor = require("geode/lib/graphics/Color");
var _geodeLibGraphicsColorDefault = _parcelHelpers.interopDefault(_geodeLibGraphicsColor);
var _geodeLibMathVector = require("geode/lib/math/Vector2");
var _geodeLibMathVectorDefault = _parcelHelpers.interopDefault(_geodeLibMathVector);
var _geodeLibInput = require("geode/lib/Input");
var _geodeLibInputDefault = _parcelHelpers.interopDefault(_geodeLibInput);
var _geodeLibMathGeometryPolygon = require("geode/lib/math/geometry/Polygon");
var _geodeLibMathGeometryPolygonDefault = _parcelHelpers.interopDefault(_geodeLibMathGeometryPolygon);
var _geodeLibMathCollisionCollision = require("geode/lib/math/collision/collision");
function supportPath(canvas, support, steps = 100) {
  let points = [];
  for (let i = 0; i < steps; i++) {
    let theta = Math.PI * 2 * i / steps;
    let heading = _geodeLibMathVectorDefault.default.polar(theta, 1);
    points.push(support(heading));
  }
  canvas.vpath(points);
  canvas.context.closePath();
}
class CollisionInfo {
  constructor() {
    this.canvas = new _geodeLibGraphicsCanvasDefault.default("canvas");
    this.a = new Body(6, 100, _geodeLibMathVector.vector(-300, 0), _geodeLibMathVector.vector(20, 0));
    this.b = new Body(8, 100, _geodeLibMathVector.vector(300, 0), _geodeLibMathVector.vector(-20, 0));
  }
  update() {
    this.render();
  }
  polyPos = _geodeLibMathVector.vector(400, 0);
  render() {
    let {canvas, a, b} = this;
    canvas.fitWindow(2);
    // let fps = 1000 / GameClock.dt
    // console.log( fps )
    // canvas.fillStyle( Color.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )
    canvas.translateToCenter();
    let mouse = _geodeLibInputDefault.default.mouse.subtract(canvas.dimensions.half());
    if (_geodeLibInputDefault.default.buttons.Mouse0) b.position = mouse;
    // let mdSupport = (p: Vector2) => a.support(p).subtract(b.support(p.negate))
    // supportPath(canvas, mdSupport)
    // canvas.strokeStyle(Color.gray).stroke()
    // a.velocity = Vector2.polar(Math.sin(performance.now() / 2000), 20)
    {
      b.position.y = 180 * Math.sin(performance.now() / 1000);
    }
    a.draw(canvas);
    b.draw(canvas);
    let info = _geodeLibMathCollisionCollision.collisionInfo(a, b);
    if (info) {
      let pos = info.contact.a.high.add(info.contact.a.low).multiply(0.5).add(a.velocity.multiply(info.time));
      canvas.vline(pos, pos.add(info.normal.multiply(20))).strokeStyle(_geodeLibGraphicsColorDefault.default.blue).stroke();
      // let ca = info.contact.a
      // let cb = info.contact.b
      // let pts = [ca.high, ca.low, cb.high, cb.low]
      // for (let pt of pts)
      // canvas.vcircle(pt, 3).fillStyle(Color.red).fill()
      canvas.vcircle(info.contact.a.high.add(a.velocity.multiply(info.time)), 3).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
      canvas.vcircle(info.contact.a.low.add(a.velocity.multiply(info.time)), 3).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
      canvas.vcircle(info.contact.b.high.add(b.velocity.multiply(info.time)), 3).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
      canvas.vcircle(info.contact.b.low.add(b.velocity.multiply(info.time)), 3).fillStyle(_geodeLibGraphicsColorDefault.default.red).fill();
      canvas.strokeStyle(_geodeLibGraphicsColorDefault.default.gray);
      a.drawOutline(canvas, info.time);
      b.drawOutline(canvas, info.time);
    }
  }
}
exports.default = CollisionInfo;
class Body {
  constructor(sides, radius, position, velocity) {
    this.shape = _geodeLibMathGeometryPolygonDefault.default.regular(sides, radius);
    this.position = position;
    this.velocity = velocity;
  }
  support(position) {
    return this.shape.support(position).add(this.position);
  }
  draw(canvas) {
    canvas.strokeStyle(_geodeLibGraphicsColorDefault.default.white);
    this.drawOutline(canvas, 0);
    canvas.vline(this.position, this.position.add(this.velocity)).strokeStyle(_geodeLibGraphicsColorDefault.default.green).stroke();
    canvas.vcircle(this.position, 3).fillStyle(_geodeLibGraphicsColorDefault.default.white).fill();
  }
  drawOutline(canvas, dt = 0) {
    supportPath(canvas, p => this.support(p).add(this.velocity.multiply(dt)));
    canvas.stroke();
  }
}

},{"geode/lib/graphics/Canvas":"3tMQ6","geode/lib/graphics/Color":"3Vz5E","geode/lib/math/Vector2":"1YKlZ","geode/lib/Input":"5XDOa","geode/lib/math/geometry/Polygon":"7cxQu","geode/lib/math/collision/collision":"4IjLl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4IjLl":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collisionInfo = exports.overlaps = exports.contains = exports.boxOverlaps = exports.boxContains = void 0;
const Vector2_1 = __importDefault(require("../Vector2"));
const GJKRaycast_1 = __importDefault(require("./GJKRaycast"));
const Ray_1 = __importDefault(require("../geometry/Ray"));
const left = (b) => b.position.x;
const right = (b) => b.position.x + b.dimensions.x;
const top = (b) => b.position.y;
const bottom = (b) => b.position.y + b.dimensions.y;
function boxContains(b, p) {
    let xContains = contains(left(b), right(b), p.x);
    let yContains = contains(top(b), bottom(b), p.y);
    return xContains && yContains;
}
exports.boxContains = boxContains;
function boxOverlaps(b0, b1) {
    let xOverlaps = overlaps(left(b0), right(b0), left(b1), right(b1));
    let yOverlaps = overlaps(top(b0), bottom(b0), top(b1), bottom(b1));
    return xOverlaps && yOverlaps;
}
exports.boxOverlaps = boxOverlaps;
function contains(a, b, x) {
    return x > Math.min(a, b) && x < Math.max(a, b);
}
exports.contains = contains;
function overlaps(a0, a1, b0, b1) {
    return contains(a0, a1, b0) || contains(a0, a1, b1);
}
exports.overlaps = overlaps;
function collisionInfo(a, b) {
    let minkowskiDiffSupport = (p) => a.support(p).subtract(b.support(p.negate()));
    let relativeVelocity = b.velocity.subtract(a.velocity);
    let ray = new Ray_1.default(Vector2_1.default.ZERO, relativeVelocity);
    let line = GJKRaycast_1.default(minkowskiDiffSupport, relativeVelocity);
    if (line == null)
        return null;
    let time = line.rayCast(ray);
    if (time <= 0)
        return null;
    let normal = line.leftNormal.unit();
    let epsilon = 0.1;
    let rotator = Vector2_1.default.polar(epsilon, 1);
    let normalHigh = normal.complexProduct(rotator);
    let normalLow = normal.complexQuotient(rotator);
    return {
        time,
        normal,
        contact: {
            a: {
                high: a.support(normalHigh),
                low: a.support(normalLow),
            },
            b: {
                high: b.support(normalHigh.negate()),
                low: b.support(normalLow.negate()),
            }
        }
    };
}
exports.collisionInfo = collisionInfo;

},{"../Vector2":"1YKlZ","./GJKRaycast":"4hLYt","../geometry/Ray":"1B96d"}]},["4UKJc","3rfh7"], "3rfh7", "parcelRequire94cb")

//# sourceMappingURL=index.7cacc1f4.js.map
