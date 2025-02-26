// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
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
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"18QmZ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "34e326a720c5fd1c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
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
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
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
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"bA0sM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Menu", ()=>Menu);
var _gameJs = require("./game.js");
var _uiJs = require("./ui.js");
document.addEventListener("DOMContentLoaded", ()=>{
    const menu = new Menu();
});
class Menu {
    constructor(){
        this.ui = new (0, _uiJs.UI)();
        this.mainTitle = document.querySelector(".main-title");
        this.gameContainer = document.querySelector(".game-container");
        this.options = document.querySelector(".game-options-container");
        this.playNow = document.getElementById("playNowBtn");
        this.passBtn = document.querySelector(".pass-button");
        this.homeBtn = document.querySelector(".menu-home");
        this.surrenderBtn = document.querySelector(".surrender-button");
        this.startGameBtn = document.querySelector(".start-game");
        this.boardSizeInput = document.querySelector(".board-size-option");
        this.timerInput = document.querySelector(".timer-option");
        this.loadingScreen = document.querySelector(".loading-screen");
        this.menuNavbar = document.querySelector(".main-nav");
        this.game;
        this.isGameStarted = false;
        this.selectedBoardSize = 9;
        this.selectedTimer = 5;
        this.playNow.addEventListener("click", (event)=>{
            event.preventDefault();
            if (!this.isGameStarted) {
                this.showOptions();
                this.options.classList.add("active");
                this.updatePlayNowState();
            }
        });
        this.startGameBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            if (!this.isGameStarted && this.hasSelectedOptions()) this.startGame();
        });
        this.passBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            if (this.game) this.game.handlePass();
        });
        this.surrenderBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            if (this.game) this.game.ui.showSurrPass(()=>{
                this.game.endGame();
            });
        });
        this.homeBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            this.showHome();
            this.options.classList.remove("active");
        });
        this.boardSizeInput.addEventListener("click", (event)=>{
            const card = event.target.closest('.sizes-card');
            if (card) {
                this.selectedBoardSize = parseInt(card.textContent.trim(), 10);
                const allCards = document.querySelectorAll('.sizes-card');
                allCards.forEach((item)=>{
                    item.classList.remove('selected');
                });
                card.classList.add('selected');
                this.updatePlayNowState();
            }
        });
        this.menuNavbar.addEventListener("click", (event)=>{
            const card = event.target.closest('.menu-card');
            if (card) {
                const allCards = document.querySelectorAll('.menu-card');
                allCards.forEach((item)=>{
                    item.classList.remove('selected');
                });
                card.classList.add('selected');
            }
        });
        this.timerInput.addEventListener("click", (event)=>{
            const card = event.target.closest('.timer-card');
            if (card) {
                this.selectedTimer = parseInt(card.dataset.size, 10);
                const allCards = document.querySelectorAll('.timer-card');
                allCards.forEach((item)=>{
                    item.classList.remove('selected');
                });
                card.classList.add('selected');
                this.updatePlayNowState();
            }
        });
    }
    hasSelectedOptions() {
        return Boolean(document.querySelector(".board-size-option .selected")) && Boolean(document.querySelector(".timer-option .selected"));
    }
    updatePlayNowState() {
        if (this.hasSelectedOptions()) this.startGameBtn.classList.add('enabled');
        else this.startGameBtn.classList.remove('enabled');
    }
    showGame() {
        this.gameContainer.style.display = 'flex';
        this.mainTitle.style.display = 'none';
        this.options.style.width = '0';
        this.options.style.height = '0';
    }
    showOptions() {
        this.options.style.height = 'auto';
        this.options.style.width = '50%';
        this.gameContainer.style.display = 'none';
        this.mainTitle.style.display = 'none';
        this.isGameStarted = false;
        if (this.game) {
            this.game.destroy();
            this.game = null;
        }
    }
    showHome() {
        if (this.isGameStarted) this.ui.showSureExit(()=>{
            const playAgainButton = this.gameContainer.querySelector('.play-again-button');
            if (playAgainButton) this.gameContainer.removeChild(playAgainButton);
            const timers = document.getElementById("timer");
            if (timers) timers.style.display = 'flex';
            this.gameContainer.style.display = 'none';
            this.mainTitle.style.display = 'flex';
            this.options.style.height = '0';
            this.options.style.width = '0';
            this.isGameStarted = false;
            if (this.game) {
                this.game.destroy();
                this.game = null;
            }
        });
        else {
            const playAgainButton = this.gameContainer.querySelector('.play-again-button');
            if (playAgainButton) this.gameContainer.removeChild(playAgainButton);
            const timers = document.getElementById("timer");
            if (timers) timers.style.display = 'flex';
            this.gameContainer.style.display = 'none';
            this.mainTitle.style.display = 'flex';
            this.options.style.height = '0';
            this.options.style.width = '0';
            this.isGameStarted = false;
            if (this.game) {
                this.game.destroy();
                this.game = null;
            }
        }
    }
    startGame() {
        this.options.style.width = '0';
        setTimeout(()=>{
            this.loadingScreen.style.display = 'flex';
        }, 700);
        if (!this.isGameStarted) fetch("http://localhost:8000/clear-board/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                boardSize: this.selectedBoardSize
            })
        }).then((response)=>response.json()).then((data)=>{
            setTimeout(()=>{
                this.loadingScreen.style.display = 'none';
                this.showGame();
                const canvas = document.getElementById("canvas");
                this.game = new (0, _gameJs.Game)(canvas, this.selectedBoardSize, this.selectedTimer, this);
                this.isGameStarted = true;
            }, 2000);
        }).catch((error)=>console.error("Error clearing board:", error));
    }
}

},{"./game.js":"5JiMD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./ui.js":"jRvde"}],"5JiMD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game);
var _boardJs = require("./board.js");
var _timerJs = require("./timer.js");
var _uiJs = require("./ui.js");
var _stoneJs = require("./stone.js");
var _playerJs = require("./player.js");
class Game {
    constructor(canvas, boardSize, selectedTimer, menu){
        this.board = new (0, _boardJs.Board)(canvas, boardSize);
        this.timer = new (0, _timerJs.Timer)(selectedTimer);
        this.ui = new (0, _uiJs.UI)();
        this.menu = menu;
        this.boardSize = boardSize;
        this.isGameOver = false;
        this.player1 = new (0, _playerJs.Player)("Player 1", "rgb(52, 54, 76)", "human");
        this.player2 = new (0, _playerJs.Player)("Player 2", "rgb(232, 237, 249)", "ai");
        this.currentPlayer = this.player1;
        this.consecutivePasses = 0;
        this.blackCapturedStones = 0;
        this.whiteCapturedStones = 0;
        this.moveInProgress = false;
        this.aiWorker = new Worker(require("fed9228249758184"));
        this.aiWorker.addEventListener("message", (event)=>{
            if (event.data.type === "bestMove") {
                const move = event.data.move;
                if (move === "pass") this.ui.showPassMessage("Hikari passed.", ()=>this.confirmPass());
                else if (move && typeof move === "object" && this.board.isEmpty(move.x, move.y)) this.playAIMove(move);
            }
        });
        this.handleClick = this.handleClick.bind(this);
        canvas.addEventListener("click", this.handleClick);
        window.addEventListener("resize", ()=>this.board.resize());
        this.board.resize();
        this.timer.startTimer(this.currentPlayer, ()=>this.endGame());
    }
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
    destroy() {
        if (this.aiWorker) {
            this.aiWorker.terminate();
            this.aiWorker = null;
        }
        if (this.board && this.board.canvas) {
            this.board.canvas.removeEventListener("click", this.handleClick);
            window.removeEventListener("resize", this.resizeListener);
            if (this.timer) this.timer.pause();
        }
    }
    calculateLiberties(stone) {
        const visited = new Set();
        const liberties = new Set();
        const dfs = (x, y)=>{
            const key = `${x},${y}`;
            if (visited.has(key)) return;
            visited.add(key);
            const neighbors = this.board.getNeighbors(x, y);
            for (const neighbor of neighbors){
                const neighborStone = this.board.getStone(neighbor.x, neighbor.y);
                if (!neighborStone) liberties.add(`${neighbor.x},${neighbor.y}`);
                else if (neighborStone.color === stone.color) dfs(neighbor.x, neighbor.y);
            }
        };
        dfs(stone.x, stone.y);
        return liberties;
    }
    captureStones() {
        const capturedStones = [];
        for (const stone of this.board.stones){
            const liberties = this.calculateLiberties(stone);
            if (liberties.size === 0 && stone.color !== this.currentPlayer.color) {
                capturedStones.push(stone);
                if (stone.color === this.player1.color) this.blackCapturedStones++;
                else this.whiteCapturedStones++;
            }
        }
        this.board.stones = this.board.stones.filter((stone)=>!capturedStones.includes(stone));
        this.board.update();
        return capturedStones;
    }
    calculateTerritory() {
        const territory = {
            black: new Set(),
            white: new Set(),
            neutral: new Set()
        };
        const exploreTerritory = (x, y, visited)=>{
            const queue = [
                {
                    x,
                    y
                }
            ];
            const points = new Set();
            let surroundedByBlack = true;
            let surroundedByWhite = true;
            while(queue.length){
                const { x, y } = queue.shift();
                const key = `${x},${y}`;
                if (visited.has(key) || x < 0 || x >= this.boardSize || y < 0 || y >= this.boardSize) continue;
                const stone = this.board.getStone(x, y);
                if (stone) {
                    if (stone.color === this.player1.color) surroundedByWhite = false;
                    if (stone.color === this.player2.color) surroundedByBlack = false;
                    continue;
                }
                visited.add(key);
                points.add(key);
                const neighbors = this.board.getNeighbors(x, y);
                for (const neighbor of neighbors)queue.push(neighbor);
            }
            if (surroundedByBlack && !surroundedByWhite) points.forEach((point)=>territory.black.add(point));
            else if (surroundedByWhite && !surroundedByBlack) points.forEach((point)=>territory.white.add(point));
            else points.forEach((point)=>territory.neutral.add(point));
        };
        const visited = new Set();
        for(let x = 0; x < this.boardSize; x++)for(let y = 0; y < this.boardSize; y++){
            const key = `${x},${y}`;
            if (!visited.has(key) && !this.board.getStone(x, y)) exploreTerritory(x, y, visited);
        }
        return territory;
    }
    async addStone(x, y) {
        if (!this.isMoveLegal(x, y)) {
            this.moveInProgress = false;
            return;
        }
        const gtpColor = this.convertColorForGTP(this.currentPlayer.color);
        const gtpCoord = this.convertToGTPCoord(x, y);
        try {
            const response = await fetch("http://localhost:8000/play-move/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    color: gtpColor,
                    coordinate: gtpCoord
                })
            });
            const data = await response.json();
            if (data.response && data.response.startsWith('=')) {
                const stone = new (0, _stoneJs.Stone)(x, y, this.currentPlayer.color);
                this.board.stones.push(stone);
                this.lastStone = stone;
                this.board.lastStone = stone;
                this.captureStones();
                this.board.update();
                this.timer.pause();
                this.switchPlayer();
                this.timer.startTimer(this.currentPlayer, ()=>this.endGame());
                if (this.currentPlayer.type === "ai") this.aiWorker.postMessage({
                    type: "getBestMove",
                    boardSize: this.boardSize,
                    gameState: {
                        board: {
                            currentPlayerColor: this.convertColorForGTP(this.currentPlayer.color),
                            stones: this.board.stones.map((stone)=>({
                                    x: stone.x,
                                    y: stone.y,
                                    color: this.convertColorForGTP(stone.color)
                                }))
                        }
                    }
                });
            } else {
                const errorMsg = data.detail || data.response || "Unknown error";
                return;
            }
        } catch (error) {
            return;
        } finally{
            this.moveInProgress = false;
        }
    }
    isMoveLegal(x, y) {
        if (!this.board.isEmpty(x, y)) return false;
        const newStone = new (0, _stoneJs.Stone)(x, y, this.currentPlayer.color);
        let simulatedStones = [
            ...this.board.stones,
            newStone
        ];
        const getStoneAt = (x, y, stones)=>stones.find((stone)=>stone.x === x && stone.y === y);
        const calculateLibertiesSimulated = (stone, stones)=>{
            const visited = new Set();
            const liberties = new Set();
            const dfs = (x, y)=>{
                const key = `${x},${y}`;
                if (visited.has(key)) return;
                visited.add(key);
                const neighbors = this.board.getNeighbors(x, y);
                for (const neighbor of neighbors){
                    const neighborStone = getStoneAt(neighbor.x, neighbor.y, stones);
                    if (!neighborStone) liberties.add(`${neighbor.x},${neighbor.y}`);
                    else if (neighborStone.color === stone.color) dfs(neighbor.x, neighbor.y);
                }
            };
            dfs(stone.x, stone.y);
            return liberties;
        };
        let changed = true;
        while(changed){
            changed = false;
            for (const stone of simulatedStones)if (stone.color !== this.currentPlayer.color) {
                const libs = calculateLibertiesSimulated(stone, simulatedStones);
                if (libs.size === 0) {
                    simulatedStones = simulatedStones.filter((stone)=>stone !== stone);
                    changed = true;
                    break;
                }
            }
        }
        const newLibs = calculateLibertiesSimulated(newStone, simulatedStones);
        return newLibs.size > 0;
    }
    convertToGTPCoord(x, y) {
        const letters = "ABCDEFGHJKLMNOPQRST";
        const gtpY = this.boardSize - y;
        return letters[x] + gtpY;
    }
    convertColorForGTP(color) {
        if (color === "rgb(52, 54, 76)") return "B";
        if (color === "rgb(232, 237, 249)") return "W";
        return null;
    }
    playAIMove(move) {
        if (move === "pass") this.ui.showPassMessage("Hikari passed.", ()=>this.confirmPass());
        else if (move && this.board.isEmpty(move.x, move.y)) {
            const stone = new (0, _stoneJs.Stone)(move.x, move.y, this.currentPlayer.color);
            this.board.stones.push(stone);
            this.lastStone = stone;
            this.board.lastStone = stone;
            this.captureStones();
            this.board.update();
            this.timer.pause();
            this.switchPlayer();
            this.timer.startTimer(this.currentPlayer, ()=>this.endGame());
        }
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
    handlePass() {
        this.ui.showSurePass(()=>this.confirmPass());
    }
    handleSurrender() {
        this.ui.showSurrPass(()=>this.endGame());
    }
    confirmPass() {
        this.timer.pause();
        this.consecutivePasses++;
        if (this.consecutivePasses >= 2) this.endGame();
        else {
            this.switchPlayer();
            this.timer.startTimer(this.currentPlayer, ()=>this.endGame());
            if (this.currentPlayer.type === "ai") this.aiWorker.postMessage({
                type: "getBestMove",
                boardSize: this.boardSize,
                gameState: {
                    board: {
                        currentPlayerColor: this.convertColorForGTP(this.currentPlayer.color),
                        stones: this.board.stones.map((stone)=>({
                                x: stone.x,
                                y: stone.y,
                                color: this.convertColorForGTP(stone.color)
                            }))
                    }
                }
            });
        }
    }
    endGame() {
        this.timer.pause();
        this.consecutivePasses = 0;
        const territories = this.calculateTerritory();
        const blackScore = this.whiteCapturedStones + territories.black.size;
        const whiteScore = this.blackCapturedStones + territories.white.size + this.board.getKomi(this.boardSize);
        this.ui.showGameOver(blackScore, whiteScore, ()=>this.resetGame());
        this.isGameOver = true;
    }
    async resetGame() {
        this.menu.showOptions();
        this.isGameOver = false;
        this.board.stones = [];
        this.blackCapturedStones = 0;
        this.whiteCapturedStones = 0;
        this.currentPlayer = this.player1;
    }
    handleClick(event) {
        if (event.detail > 1) return;
        event.stopPropagation();
        event.preventDefault();
        if (this.isGameOver || this.moveInProgress) return;
        this.moveInProgress = true;
        const rect = this.board.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const boardX = Math.round((clickX - this.board.cellSize) / this.board.cellSize);
        const boardY = Math.round((clickY - this.board.cellSize) / this.board.cellSize);
        if (boardX >= 0 && boardX < this.boardSize && boardY >= 0 && boardY < this.boardSize) {
            if (this.board.isEmpty(boardX, boardY)) {
                this.consecutivePasses = 0;
                this.addStone(boardX, boardY);
            } else this.moveInProgress = false;
        } else this.moveInProgress = false;
    }
}

},{"./board.js":"eTa6n","./timer.js":"7lxnd","./ui.js":"jRvde","./stone.js":"9v1T6","./player.js":"jlGnO","fed9228249758184":"jR1kY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eTa6n":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Board", ()=>Board);
var _stoneJs = require("./stone.js");
class Board {
    constructor(canvas, boardSize){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.boardSize = boardSize;
        this.canvasSize = 0;
        this.cellSize = 0;
        this.stones = [];
    }
    resize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.canvasSize = Math.min(windowWidth, windowHeight) * 0.7;
        this.canvas.height = this.canvasSize;
        this.canvas.width = this.canvasSize;
        this.cellSize = this.canvasSize / (this.boardSize + 1);
        this.drawBackground();
        this.drawBoard();
    }
    drawBackground() {
        this.context.fillStyle = "rgb(183, 192, 216)";
        this.context.fillRect(0, 0, this.canvasSize, this.canvasSize);
    }
    drawBoard() {
        const c = this.context;
        c.strokeStyle = "white";
        c.lineWidth = 3;
        c.fillStyle = "white";
        c.font = '20px "bebas"';
        for(let i = 0; i < this.boardSize; i++){
            c.beginPath();
            c.moveTo(this.cellSize, i * this.cellSize + this.cellSize);
            c.lineTo(this.canvasSize - this.cellSize, i * this.cellSize + this.cellSize);
            c.stroke();
        }
        for(let j = 0; j < this.boardSize; j++){
            c.beginPath();
            c.moveTo(j * this.cellSize + this.cellSize, this.cellSize);
            c.lineTo(j * this.cellSize + this.cellSize, this.canvasSize - this.cellSize);
            c.stroke();
        }
        const letters = "ABCDEFGHJKLMNOPQRST";
        for(let i = 0; i < this.boardSize; i++)c.fillText(letters[i], (i + 1) * this.cellSize, this.cellSize / 2);
        for(let i = 0; i < this.boardSize; i++)c.fillText((this.boardSize - i).toString(), this.cellSize / 4, (i + 1) * this.cellSize + 8);
    }
    clear() {
        this.context.clearRect(0, 0, this.canvasSize, this.canvasSize);
    }
    update() {
        this.clear();
        this.drawBackground();
        this.drawBoard();
        for (let stone of this.stones)stone.draw(this.context, this.cellSize);
        if (this.lastStone) this.drawLastStoneIndicator(this.lastStone);
    }
    drawLastStoneIndicator(stone) {
        const cellCenterX = stone.x * this.cellSize + this.cellSize;
        const cellCenterY = stone.y * this.cellSize + this.cellSize;
        const radius = this.cellSize * 0.03;
        this.context.beginPath();
        this.context.lineWidth = 10;
        this.context.arc(cellCenterX, cellCenterY, radius, 0, 2 * Math.PI);
        if (stone.color === "rgb(52, 54, 76)") this.context.strokeStyle = "rgb(232, 237, 249)";
        else this.context.strokeStyle = "rgb(52, 54, 76)";
        this.context.stroke();
    }
    isEmpty(x, y) {
        return !this.stones.some((stone)=>stone.x === x && stone.y === y);
    }
    addStone(x, y, color) {
        if (this.isEmpty(x, y)) {
            const stone = new (0, _stoneJs.Stone)(x, y, color);
            this.stones.push(stone);
            return stone;
        }
        return null;
    }
    getStone(x, y) {
        return this.stones.find((stone)=>stone.x === x && stone.y === y) || null;
    }
    getNeighbors(x, y) {
        const neighbors = [];
        if (x > 0) neighbors.push({
            x: x - 1,
            y
        });
        if (x < this.boardSize - 1) neighbors.push({
            x: x + 1,
            y
        });
        if (y > 0) neighbors.push({
            x,
            y: y - 1
        });
        if (y < this.boardSize - 1) neighbors.push({
            x,
            y: y + 1
        });
        return neighbors;
    }
    getKomi(boardSize) {
        if (boardSize >= 9) return 6.5;
        else return 0;
    }
}

},{"./stone.js":"9v1T6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9v1T6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Stone", ()=>Stone);
class Stone {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw(context, cellSize) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x * cellSize + cellSize, this.y * cellSize + cellSize, cellSize / 3, 0, 2 * Math.PI);
        context.fill();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7lxnd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Timer", ()=>Timer);
class Timer {
    constructor(selectedTimer){
        this.playerTime = {
            black: selectedTimer,
            white: selectedTimer
        };
        this.activePlayer = null;
        this.gameOverCallback = null;
        this.lastTimestamp = null;
        this.animationFrameId = null;
    }
    startTimer(currentPlayer, gameOverCallback) {
        this.pause();
        this.activePlayer = currentPlayer;
        this.gameOverCallback = gameOverCallback;
        this.lastTimestamp = performance.now();
        this.update();
    }
    update = ()=>{
        if (!this.activePlayer) return;
        const now = performance.now();
        const deltaTime = (now - this.lastTimestamp) / 1000;
        this.lastTimestamp = now;
        const activeKey = this.activePlayer.color === "rgb(52, 54, 76)" ? "black" : "white";
        this.playerTime[activeKey] -= deltaTime;
        if (this.playerTime[activeKey] <= 0) {
            this.playerTime[activeKey] = 0;
            this.updateTimerDisplay();
            this.pause();
            if (this.gameOverCallback) this.gameOverCallback();
            return;
        }
        this.updateTimerDisplay();
        this.animationFrameId = requestAnimationFrame(this.update);
    };
    pause() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.activePlayer = null;
    }
    reset() {
        this.pause();
        this.playerTime = {
            black: 300,
            white: 300
        };
        this.updateTimerDisplay();
    }
    updateTimerDisplay() {
        const blackTimeDisplay = document.getElementById("black-time");
        const whiteTimeDisplay = document.getElementById("white-time");
        if (blackTimeDisplay && whiteTimeDisplay) {
            blackTimeDisplay.textContent = this.formatTime(this.playerTime.black);
            whiteTimeDisplay.textContent = this.formatTime(this.playerTime.white);
        }
    }
    formatTime(seconds) {
        const sec = Math.floor(seconds);
        const minutes = Math.floor(sec / 60);
        const remSecs = sec % 60;
        return `${minutes}:${remSecs < 10 ? "0" : ""}${remSecs}`;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jRvde":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UI", ()=>UI);
class UI {
    constructor(){
        this.gameContainer = document.querySelector(".game-container");
        this.canvas = document.getElementById("canvas");
        this.passButton = document.querySelector(".pass-button");
        this.surrButton = document.querySelector(".surrender-button");
        this.timers = document.getElementById("timer");
        this.canvasContainer = document.querySelector(".canvas-container");
    }
    showSurrPass(confirmCallback) {
        this.canvas.style.filter = "blur(10px)";
        this.timers.style.filter = "blur(10px)";
        canvas.style.pointerEvents = "none";
        this.timers.style.pointerEvents = "none";
        const surrMessage = document.createElement("div");
        surrMessage.classList.add("surr-message");
        surrMessage.textContent = "Are you sure you want to surrender?";
        const buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "20px";
        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.classList.add("yes-button");
        yesButton.addEventListener("click", ()=>{
            surrMessage.style.opacity = "0";
            this.gameContainer.removeChild(surrMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
            confirmCallback();
        });
        const noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.classList.add("no-button");
        noButton.addEventListener("click", ()=>{
            surrMessage.style.opacity = "0";
            this.gameContainer.removeChild(surrMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
        });
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        surrMessage.appendChild(buttonContainer);
        setTimeout(()=>{
            this.gameContainer.appendChild(surrMessage);
            setTimeout(()=>{
                surrMessage.style.opacity = "1";
            }, 100);
        }, 300);
    }
    showSurePass(confirmCallback) {
        this.canvas.style.filter = "blur(10px)";
        this.timers.style.filter = "blur(10px)";
        canvas.style.pointerEvents = "none";
        this.timers.style.pointerEvents = "none";
        const sureMessage = document.createElement("div");
        sureMessage.classList.add("sure-message");
        sureMessage.textContent = "Are you sure you want to pass?";
        const buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "20px";
        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.classList.add("yes-button");
        yesButton.addEventListener("click", ()=>{
            confirmCallback();
            sureMessage.style.opacity = "0";
            this.canvasContainer.removeChild(sureMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
        });
        const noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.classList.add("no-button");
        noButton.addEventListener("click", ()=>{
            sureMessage.style.opacity = "0";
            this.canvasContainer.removeChild(sureMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
        });
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        sureMessage.appendChild(buttonContainer);
        setTimeout(()=>{
            this.canvasContainer.appendChild(sureMessage);
            setTimeout(()=>{
                sureMessage.style.opacity = "1";
            }, 100);
        }, 300);
    }
    showPassMessage(message, callback) {
        const passMessage = document.createElement("div");
        passMessage.classList.add("pass-message");
        passMessage.textContent = message;
        this.gameContainer.appendChild(passMessage);
        this.canvas.style.filter = "blur(10px)";
        this.timers.style.filter = "blur(10px)";
        setTimeout(()=>{
            passMessage.style.opacity = "1";
            passMessage.style.display = "block";
        }, 100);
        setTimeout(()=>{
            passMessage.style.opacity = 0;
            passMessage.style.display = "none";
            callback && callback();
        }, 2000);
        setTimeout(()=>{
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
        }, 2200);
    }
    showGameOver(blackScore, whiteScore, playAgainCallback) {
        const canvas1 = document.getElementById("canvas");
        const context = canvas1.getContext("2d");
        canvas1.style.margin = "auto";
        canvas1.style.pointerEvents = "none";
        context.clearRect(0, 0, canvas1.width, canvas1.height);
        context.fillStyle = "rgb(183, 192, 216)";
        context.fillRect(0, 0, canvas1.width, canvas1.height);
        context.font = "48px 'bebas'";
        context.fillStyle = "rgb(52, 54, 76)";
        context.textAlign = "center";
        const humanScore = blackScore - whiteScore;
        const AIScore = whiteScore - blackScore;
        let resultMessage;
        if (blackScore > whiteScore) resultMessage = `You won by ${humanScore} points!`;
        else resultMessage = `Hikari won by ${AIScore} points!`;
        if (blackScore === whiteScore) resultMessage = "It's a tie!";
        context.fillText("Game Over", canvas1.width / 2, canvas1.height / 2 - 60);
        context.fillText(resultMessage, canvas1.width / 2, canvas1.height / 2);
        const playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play Again";
        playAgainButton.classList.add("play-again-button");
        playAgainButton.style.position = "absolute";
        playAgainButton.style.left = "50%";
        playAgainButton.style.top = "50%";
        this.gameContainer.appendChild(playAgainButton);
        this.timers.style.display = "none";
        playAgainButton.addEventListener("click", ()=>{
            playAgainCallback();
            this.gameContainer.removeChild(playAgainButton);
            this.timers.style.display = "flex";
            canvas1.style.pointerEvents = "auto";
        });
    }
    showSureExit(confirmCallback) {
        this.canvas.style.filter = "blur(10px)";
        this.timers.style.filter = "blur(10px)";
        canvas.style.pointerEvents = "none";
        this.timers.style.pointerEvents = "none";
        const exitMessage = document.createElement("div");
        exitMessage.classList.add("exit-message");
        exitMessage.textContent = "Are you sure you want to quit the game?";
        const buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "20px";
        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.classList.add("yes-button");
        yesButton.addEventListener("click", ()=>{
            confirmCallback();
            exitMessage.style.opacity = "0";
            this.canvasContainer.removeChild(exitMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
        });
        const noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.classList.add("no-button");
        noButton.addEventListener("click", ()=>{
            exitMessage.style.opacity = "0";
            this.canvasContainer.removeChild(exitMessage);
            this.canvas.style.filter = "blur(0px)";
            this.timers.style.filter = "blur(0px)";
            canvas.style.pointerEvents = "auto";
            this.timers.style.pointerEvents = "auto";
        });
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        exitMessage.appendChild(buttonContainer);
        setTimeout(()=>{
            this.canvasContainer.appendChild(exitMessage);
            setTimeout(()=>{
                exitMessage.style.opacity = "1";
            }, 100);
        }, 300);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jlGnO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Player", ()=>Player);
class Player {
    constructor(name, color, type = "human"){
        this.name = name;
        this.color = color;
        this.type = type;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jR1kY":[function(require,module,exports,__globalThis) {
let workerURL = require("f6e6960490799576");
let bundleURL = require("b4b10675b6113494");
let url = bundleURL.getBundleURL('4xw6O') + "aiWorker.a4ccc119.js" + "?" + Date.now();
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"f6e6960490799576":"cn2gM","b4b10675b6113494":"lgJ39"}],"cn2gM":[function(require,module,exports,__globalThis) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: 'application/javascript'
        }));
    }
};

},{}],"lgJ39":[function(require,module,exports,__globalThis) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["18QmZ","bA0sM"], "bA0sM", "parcelRequire94c2")

//# sourceMappingURL=index.20c5fd1c.js.map
