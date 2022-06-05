
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  if (false) {
    throw new Error(`NODE_ENV (${process.env.NODE_ENV}) does not match value for compiled assets: development`);
  } else {
    console.warn('Overriding NODE_ENV: ' + process.env.NODE_ENV + ' to development in order to match value for compiled assets');
    process.env.NODE_ENV = 'development';
  }
} else {
  process.env.NODE_ENV = 'development';
}
  
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fusion-cli/build/modern-browser-versions.js":
/***/ ((module) => {

/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */
module.exports = {
  chrome: 61,
  safari: 12,
  firefox: 60,
  android: 61,
  ios: 12
};

/***/ }),

/***/ "./node_modules/fusion-cli/build/server-error.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */
const path = __webpack_require__("path");

const {
  readFileSync
} = __webpack_require__("fs");

const {
  codeFrameColumns
} = __webpack_require__("@babel/code-frame");

const AnsiToHtml = __webpack_require__("ansi-to-html");

const chalk = __webpack_require__("chalk");

function parseCodeFrame(error
/*: Error */
) {
  const stackLines = (error.stack || '').split('\n');
  const secondLine = stackLines.length > 1 ? stackLines[1] : '';
  const match = secondLine.match(/at (.+) \((.+):(\d+):(\d+)\)/);
  const [, functionName, file, line, column] = match || [];

  if (!(line && column && file)) {
    return {};
  }

  let fileContents;

  try {
    fileContents = readFileSync(file, 'utf-8');
  } catch (e) {
    // Errors could originate in node internals that do not exist in filesystem
    return {};
  }

  const srcLines = fileContents.split('\n');
  const errorLineNumber = parseInt(line) - 1;

  if (srcLines.length <= errorLineNumber) {
    // This may happen if sourcemaps reference the wrong file
    return {};
  }

  const whitespace = (srcLines[errorLineNumber] || '').search(/\S/);
  const padding = whitespace === -1 ? 0 : whitespace;
  const codeFrame = codeFrameColumns(fileContents, {
    start: {
      line: parseInt(line),
      column: parseInt(column) + padding
    }
  }, {
    highlightCode: true,
    linesAbove: 2,
    linesBelow: 2,
    message: error.message
  });
  return {
    codeFrame,
    file,
    line,
    column,
    functionName
  };
}

function renderTerminalError(error
/*: Error */
) {
  const {
    codeFrame,
    file,
    line,
    column
  } = parseCodeFrame(error);

  if (!file) {
    return chalk.red(error.stack);
  }

  const location = chalk.blue(`${path.relative(process.cwd(), file)} ${line}:${column}`);
  return [location, codeFrame, '', chalk.red(error.stack)].join('\n');
}

module.exports.renderTerminalError = renderTerminalError;

function renderHtmlError(error
/*: any */
= {}) {
  let displayError;
  let {
    link
  } = error;

  if (error instanceof Error) {
    displayError = error;
  } else if (typeof error === 'string') {
    displayError = new Error(error);
  } else {
    displayError = new Error(error.message);
    displayError.stack = error.stack;
    displayError.name = error.name;
  }

  const {
    codeFrame,
    file,
    line,
    column,
    functionName
  } = parseCodeFrame(error);
  let displayCodeFrame;

  if (file) {
    const ansi = new AnsiToHtml({
      fg: '#ccc'
    });
    const htmlCodeFrame = ansi.toHtml(codeFrame);
    const relativeFile = path.relative(process.cwd(), file);
    displayCodeFrame = `
      <p>
        <b>${escapeHtml(functionName)}</b>
        <br>
        <span style="color:rgb(100, 149, 237);">${relativeFile} ${line}:${column}</span>
      </p>
      <pre style="background-color: #111;padding: 0 5px;white-space:break-spaces;">${htmlCodeFrame}</pre>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server error</title>
        <style>
          html {
            background-color: #222;
            color: white;
            line-height: 2;
            font-family: monospace;
          }
          a { color: white; }
          @media (prefers-color-scheme: light) {
            html {
              background-color: rgb(240, 233, 231);
              color: rgb(47, 79, 79);
            }
            a { color: rgb(47, 79, 79); }
          }
        </style>
      </head>
      <body>
        <div style="width:1200px;margin:20px auto;">
          <h1 style="color:rgb(232,59,70);font-size:large;">${displayError.message}</h1>
          ${displayCodeFrame ? displayCodeFrame : ''}
          <pre style="white-space:break-spaces;">${escapeHtml(displayError.stack)}</pre>
          <p>
          ${link ? `<br>For help with this error, visit <a target="_blank" href="${link}">this troubleshooting document</a>` : ''}
          </p>
        <div>
      </body>
    </html>
  `;
}

module.exports.renderHtmlError = renderHtmlError;

function escapeHtml(str = '') {
  return (str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/***/ }),

/***/ "./node_modules/fusion-cli/get-compilation-metadata.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*
This is where webpack-related things should be defined
*/
// custom loaders: see build/compiler.js
// $FlowFixMe
const chunkUrlMap = __webpack_require__("./node_modules/fusion-cli/build/loaders/chunk-url-map-loader.js!"); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies
// $FlowFixMe


const syncChunks = __webpack_require__("./node_modules/fusion-cli/build/loaders/sync-chunk-ids-loader.js!"); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies


module.exports = () => {
  return {
    syncChunks,
    chunkUrlMap
  };
};

/***/ }),

/***/ "./node_modules/fusion-cli/lib/strip-prefix.js":
/***/ ((module) => {

/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */
module.exports = function stripPrefix(req
/*: any */
, prefix
/*: string */
) {
  if (req.url.indexOf(prefix) === 0) {
    req.url = req.url.slice(prefix.length);

    if (req.url === '' || req.url.indexOf('?') === 0) {
      req.url = `/${req.url}`;
    }
  }
};

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/assets-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-cli/build/loaders/chunk-manifest-loader.js!");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_mount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("koa-mount");
/* harmony import */ var koa_mount__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_mount__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("koa-static");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("vary");
/* harmony import */ var vary__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vary__WEBPACK_IMPORTED_MODULE_5__);
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*::
import type {AssetsDepsType, AssetsType} from './types.js';
*/
 // $FlowFixMe

 // eslint-disable-line





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(dir
/*: string */
) {
  /* eslint-disable-next-line */
  return /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.createPlugin)
  /*:: <AssetsDepsType, AssetsType> */
  ({
    deps: {
      RouteTags: fusion_core__WEBPACK_IMPORTED_MODULE_0__.RouteTagsToken
    },
    middleware: ({
      RouteTags
    }) => {
      const {
        baseAssetPath,
        env,
        dangerouslyExposeSourceMaps
      } = (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.getEnv)();
      const denyList = new Set();

      for (let chunk of _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.chunks.values()) {
        if (false) {}
      }

      const assetMiddleware = koa_static__WEBPACK_IMPORTED_MODULE_4___default()(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(dir, `.fusion/dist/${env}/client`), {
        // setting defer here tells the `serve` middleware to `await next` first before
        // setting the response. This allows composition with user middleware
        defer: true,
        setHeaders: res => {
          if (false) {}

          res.setHeader('Timing-Allow-Origin', '*');
          vary__WEBPACK_IMPORTED_MODULE_5___default()(res, 'Accept-Encoding');
        }
      });
      return koa_mount__WEBPACK_IMPORTED_MODULE_3___default()(baseAssetPath, (ctx, next) => {
        RouteTags.from(ctx).name = 'static_asset';

        if (denyList.has(ctx.url)) {
          return next();
        }

        return assetMiddleware(ctx, next);
      });
    }
  });
}

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/context-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*
This is where new ctx properties should be initialized
*/

/*::
import type {ContextDepsType, ContextType} from './types';
*/
const getCompilationMetaData = __webpack_require__("./node_modules/fusion-cli/get-compilation-metadata.js");

const {
  createPlugin
} = __webpack_require__("fusion-core");
/* eslint-disable-next-line */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPlugin
/*:: <ContextDepsType, ContextType> */
({
  middleware: () => {
    const compilationMetaData = getCompilationMetaData();
    return function middleware(ctx, next) {
      // webpack-related things
      ctx.syncChunks = compilationMetaData.syncChunks;
      ctx.chunkUrlMap = compilationMetaData.chunkUrlMap;
      return next();
    };
  }
}));

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/critical-chunk-ids-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-cli/build/loaders/chunk-manifest-loader.js!");
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*::
import type {CriticalChunkIdsDepsType, CriticalChunkIdsType} from './types.js';
*/
 // $FlowFixMe

 // eslint-disable-line

/* eslint-disable-next-line */

var _default = /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.createPlugin)
/*:: <CriticalChunkIdsDepsType, CriticalChunkIdsType> */
({
  provides: () => {
    return {
      from: (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.memoize)(() => {
        const chunkIds = new Set();

        for (const chunkId of _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.initialChunkIds) {
          chunkIds.add(chunkId);
        }

        return chunkIds;
      })
    };
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/server-error-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _build_server_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/fusion-cli/build/server-error.js");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_1__);
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*::
import type {ServerErrorDepsType, ServerErrorType} from './types.js';
*/


/* eslint-disable-next-line */

var _default = /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_1__.createPlugin)
/*:: <ServerErrorDepsType, ServerErrorType> */
({
  middleware: () => async function middleware(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = _build_server_error__WEBPACK_IMPORTED_MODULE_0__.renderHtmlError(err);
    }
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/ssr-module-scripts-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SSRModuleScriptsBodyTemplate": () => (/* binding */ SSRModuleScriptsBodyTemplate)
/* harmony export */ });
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-cli/build/loaders/chunk-manifest-loader.js!");
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/* global __webpack_public_path__ */

 // eslint-disable-line

/*::
import type {SSRBodyTemplateDepsType, SSRBodyTemplateType} from './types.js';
declare var __webpack_public_path__: string;
*/

/* eslint-disable-next-line */

const SSRModuleScriptsBodyTemplate = /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.createPlugin)
/*:: <SSRBodyTemplateDepsType,SSRBodyTemplateType> */
({
  deps: {
    criticalChunkIds: fusion_core__WEBPACK_IMPORTED_MODULE_0__.CriticalChunkIdsToken.optional,
    routePrefix: fusion_core__WEBPACK_IMPORTED_MODULE_0__.RoutePrefixToken.optional
  },
  provides: ({
    criticalChunkIds,
    routePrefix
  }) => {
    const {
      dangerouslyExposeSourceMaps
    } = (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.getEnv)();
    return ctx => {
      const {
        htmlAttrs,
        bodyAttrs,
        title,
        head,
        body
      } = ctx.template;
      const safeAttrs = Object.keys(htmlAttrs).map(attrKey => {
        return ` ${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(attrKey)}="${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(htmlAttrs[attrKey])}"`;
      }).join('');
      const safeBodyAttrs = Object.keys(bodyAttrs).map(attrKey => {
        return ` ${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(attrKey)}="${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(bodyAttrs[attrKey])}"`;
      }).join('');
      const safeTitle = (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(title); // $FlowFixMe

      const safeHead = head.map(fusion_core__WEBPACK_IMPORTED_MODULE_0__.consumeSanitizedHTML).join(''); // $FlowFixMe

      const safeBody = body.map(fusion_core__WEBPACK_IMPORTED_MODULE_0__.consumeSanitizedHTML).join('');
      const coreGlobals = [`<script nonce="${ctx.nonce}">`, `window.performance && window.performance.mark && window.performance.mark('firstRenderStart');`, routePrefix && `__ROUTE_PREFIX__ = ${JSON.stringify(routePrefix)};`, `__FUSION_ASSET_PATH__ = ${JSON.stringify(__webpack_require__.p)};`, // consumed in src/entries/client-public-path.js
      `__NONCE__ = ${JSON.stringify(ctx.nonce)}`, // consumed in src/entries/client-public-path.js
      `</script>`].filter(Boolean).join('');
      const tokenCriticalChunkIds = criticalChunkIds ? criticalChunkIds.from(ctx) : new Set();
      const allCriticalChunkIds = new Set([..._SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.initialChunkIds, // For now, take union of both ctx and token
      ...ctx.preloadChunks, ...tokenCriticalChunkIds, // runtime chunk must be last script
      ..._SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.runtimeChunkIds]);
      const legacyUrls = [];
      const modernUrls = [];

      for (let chunkId of allCriticalChunkIds) {
        const url = _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.chunks.get(chunkId);

        if (url.includes('client-legacy')) {
          legacyUrls.push(url);
        } else {
          modernUrls.push(url);
        }
      }

      const devNoModuleLegacyBrowserWarningScript =  true && legacyUrls.length === 0 ? `
              <script nomodule defer nonce="${ctx.nonce}">
              document.body.innerHTML='<div style="padding:20vmin;font-family:sans-serif;font-size:16px;background:papayawhip">
<p>You are using a legacy browser but only the modern bundle has been built (legacy bundles are skipped by default when using <code style="display:inline">fusion dev</code>)
 or when using using <code style="display:inline">fusion build</code> with the --modernBuildOnly flag.</p>
<p>Please use a modern browser, <pre><code style="display:inline">fusion dev --forceLegacyBuild</code></pre> or
<pre><code style="display:inline">fusion build</code></pre> with no --modernBuildOnly flag to build the legacy bundle.</p>
<p>For more information, see the docs on <a href="https://github.com/fusionjs/fusion-cli/blob/master/docs/progressively-enhanced-bundles.md">progressively enhanced bundles</a>.</p>
</div>';
              </script>
              ` : '';
      const criticalChunkScripts = [];
      const preloadHints = [];
      const crossoriginAttr = process.env.CDN_URL ? ' crossorigin="anonymous"' : '';

      for (let url of modernUrls) {
        if (false) {}

        preloadHints.push(`<link rel="modulepreload" href="${url}" nonce="${ctx.nonce}"${crossoriginAttr} as="script"/>`);
        criticalChunkScripts.push(`<script type="module" src="${url}" nonce="${ctx.nonce}"${crossoriginAttr}></script>`);
      }

      for (let url of legacyUrls) {
        if (false) {}

        criticalChunkScripts.push(`<script defer nomodule src="${url}" nonce="${ctx.nonce}"${crossoriginAttr}></script>`);
      }

      return ['<!doctype html>', `<html${safeAttrs}>`, `<head>`, `<meta charset="utf-8" />`, `<title>${safeTitle}</title>`, `${getSafariNoModuleSupportScript({
        nonce: ctx.nonce
      })}`, `${devNoModuleLegacyBrowserWarningScript}`, `${preloadHints.join('')}${coreGlobals}${criticalChunkScripts.join('')}${safeHead}`, `</head>`, `<body${safeBodyAttrs}>${ctx.rendered}${safeBody}</body>`, '</html>'].join('');
    };
  }
});

function addWithMap(url) {
  if (url.endsWith('-with-map.js')) {
    return url;
  } else {
    return url.replace(/\.js$/, '-with-map.js');
  }
}

function getSafariNoModuleSupportScript({
  nonce
}
/*: { nonce: string } */
) {
  return [`<script nomodule nonce="${nonce}">`, `(function() {`, `var check = document.createElement('script');`, `if (!('noModule' in check) && 'onbeforeload' in check) {`, `var support = false;`, `document.addEventListener('beforeload', function(e) {`, `if (e.target === check) {`, `support = true;`, `} else if (!e.target.hasAttribute('nomodule') || !support) {`, `return;`, `}`, `e.preventDefault();`, `}, true);`, `check.type = 'module';`, `check.src = '.';`, `document.head.appendChild(check);`, `check.remove();`, `}`, `}());`, `</script>`].join('');
}

/***/ }),

/***/ "./node_modules/fusion-cli/plugins/ssr-plugin.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SSRBodyTemplate": () => (/* binding */ SSRBodyTemplate)
/* harmony export */ });
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-cli/build/loaders/chunk-manifest-loader.js!");
/* harmony import */ var _build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/fusion-cli/build/modern-browser-versions.js");
/* harmony import */ var _build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2__);
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/* global __webpack_public_path__ */

 // eslint-disable-line


/*::
import type {SSRBodyTemplateDepsType, SSRBodyTemplateType} from './types.js';
declare var __webpack_public_path__: string;
*/

/* eslint-disable-next-line */

const SSRBodyTemplate = /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.createPlugin)
/*:: <SSRBodyTemplateDepsType,SSRBodyTemplateType> */
({
  deps: {
    criticalChunkIds: fusion_core__WEBPACK_IMPORTED_MODULE_0__.CriticalChunkIdsToken.optional,
    routePrefix: fusion_core__WEBPACK_IMPORTED_MODULE_0__.RoutePrefixToken.optional
  },
  provides: ({
    criticalChunkIds,
    routePrefix
  }) => {
    const {
      dangerouslyExposeSourceMaps
    } = (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.getEnv)();
    return ctx => {
      const {
        htmlAttrs,
        bodyAttrs,
        title,
        head,
        body
      } = ctx.template;
      const safeAttrs = Object.keys(htmlAttrs).map(attrKey => {
        return ` ${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(attrKey)}="${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(htmlAttrs[attrKey])}"`;
      }).join('');
      const safeBodyAttrs = Object.keys(bodyAttrs).map(attrKey => {
        return ` ${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(attrKey)}="${(0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(bodyAttrs[attrKey])}"`;
      }).join('');
      const safeTitle = (0,fusion_core__WEBPACK_IMPORTED_MODULE_0__.escape)(title); // $FlowFixMe

      const safeHead = head.map(fusion_core__WEBPACK_IMPORTED_MODULE_0__.consumeSanitizedHTML).join(''); // $FlowFixMe

      const safeBody = body.map(fusion_core__WEBPACK_IMPORTED_MODULE_0__.consumeSanitizedHTML).join('');
      const coreGlobals = [`<script nonce="${ctx.nonce}">`, `window.performance && window.performance.mark && window.performance.mark('firstRenderStart');`, routePrefix && `__ROUTE_PREFIX__ = ${JSON.stringify(routePrefix)};`, `__FUSION_ASSET_PATH__ = ${JSON.stringify(__webpack_require__.p)};`, // consumed in src/entries/client-public-path.js
      `__NONCE__ = ${JSON.stringify(ctx.nonce)}`, // consumed in src/entries/client-public-path.js
      `</script>`].filter(Boolean).join('');
      const tokenCriticalChunkIds = criticalChunkIds ? criticalChunkIds.from(ctx) : new Set();
      const allCriticalChunkIds = new Set([..._SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.initialChunkIds, // For now, take union of both ctx and token
      ...ctx.preloadChunks, ...tokenCriticalChunkIds, // runtime chunk must be last script
      ..._SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.runtimeChunkIds]);
      const legacyUrls = [];
      const modernUrls = [];

      for (let chunkId of allCriticalChunkIds) {
        const url = _SECRET_CHUNK_MANIFEST_LOADER___WEBPACK_IMPORTED_MODULE_1__.chunks.get(chunkId);

        if (url.includes('client-legacy')) {
          legacyUrls.push(url);
        } else {
          modernUrls.push(url);
        }
      }

      const isModernBrowser = checkModuleSupport(ctx.useragent.browser);

      if (true) {
        if (!isModernBrowser && legacyUrls.length === 0) {
          return `<!DOCTYPE html>
<html>
<head>
</head>
<body style="padding:20vmin;font-family:sans-serif;font-size:16px;background:papayawhip">
<p>You are using a legacy browser but only the modern bundle has been built (legacy bundles are skipped by default when using <code style="display:inline">fusion dev</code>)
 or when using using <code style="display:inline">fusion build</code> with the --modernBuildOnly flag.</p>
<p>Please use a modern browser, <pre><code style="display:inline">fusion dev --forceLegacyBuild</code></pre> or
<pre><code style="display:inline">fusion build</code></pre> with no --modernBuildOnly flag to build the legacy bundle.</p>
<p>For more information, see the docs on <a href="https://github.com/fusionjs/fusion-cli/blob/master/docs/progressively-enhanced-bundles.md">progressively enhanced bundles</a>.</p>
</body>
</html>`;
        }
      }

      const criticalChunkUrls = isModernBrowser || legacyUrls.length === 0 ? modernUrls : legacyUrls;
      let criticalChunkScripts = [];
      let preloadHints = [];

      for (let url of criticalChunkUrls) {
        if (false) {}

        const crossoriginAttr = process.env.CDN_URL ? ' crossorigin="anonymous"' : '';
        preloadHints.push(`<link rel="preload" href="${url}" nonce="${ctx.nonce}"${crossoriginAttr} as="script"/>`);
        criticalChunkScripts.push(`<script defer src="${url}" nonce="${ctx.nonce}"${crossoriginAttr}></script>`);
      }

      return ['<!doctype html>', `<html${safeAttrs}>`, `<head>`, `<meta charset="utf-8" />`, `<title>${safeTitle}</title>`, `${preloadHints.join('')}${coreGlobals}${criticalChunkScripts.join('')}${safeHead}`, `</head>`, `<body${safeBodyAttrs}>${ctx.rendered}${safeBody}</body>`, '</html>'].join('');
    };
  }
});

const embeddedBrowserVersions = {
  ios_webkit: 605 // mobile safari v13

};
/*
Edge must get transpiled classes due to:
- https://github.com/Microsoft/ChakraCore/issues/5030
- https://github.com/Microsoft/ChakraCore/issues/4663
- https://github.com/babel/babel/issues/8019
Rather than transpile classes in the modern bundles, Edge should be forced on the slow path

Safari 10.1 and 11 have some ES6 bugs:
- https://github.com/mishoo/UglifyJS2/issues/1753
- https://github.com/mishoo/UglifyJS2/issues/2344
- https://github.com/terser-js/terser/issues/117
Rather than enable terser workarounds that reduces minification for compliant browsers,
Safari 10.1 and 11 should be treated as legacy.
*/

function checkModuleSupport({
  name,
  version
}) {
  if (typeof version !== 'string') {
    return false;
  }

  if (name === 'Chrome' || name === 'Chrome Headless' || name === 'Chromium') {
    if (majorVersion(version) >= (_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default().chrome)) return true;
  } else if (name === 'Chrome WebView') {
    if (majorVersion(version) >= (_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default().android)) return true;
  } else if (name === 'WebKit') {
    if (majorVersion(version) >= embeddedBrowserVersions.ios_webkit) return true;
  } else if (name === 'Safari') {
    if (majorVersion(version) >= (_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default().safari)) return true;
  } else if (name === 'Mobile Safari') {
    if (majorVersion(version) >= (_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default().ios)) return true;
  } else if (name === 'Firefox') {
    if (majorVersion(version) >= (_build_modern_browser_versions_js__WEBPACK_IMPORTED_MODULE_2___default().firefox)) return true;
  }

  return false;
}

function majorVersion(version) {
  return parseInt(version.split('.')[0], 10);
}

function addWithMap(url) {
  if (url.endsWith('-with-map.js')) {
    return url;
  } else {
    return url.replace(/\.js$/, '-with-map.js');
  }
}

/***/ }),

/***/ "./src/components/root.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/user/Desktop/fusion-tutorial/src/components/root.js";




const Root = () => {
  const [todos, setTodos] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  function keyDownHandler(e) {
    if (e.key === 'Enter') {
      setInput('');
      setTodos(prev => [...prev, input]);
    }
  }

  function changeHandler(e) {
    setInput(e.currentTarget.value);
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("style", {
      children: `
            body{
                background-color: #f5f5f5;
                front: 24x 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            h1{
                color: rgba(175, 47, 47, 0.15);
                font-size: 100px;
                font-weight: 100;
                text-align:center;
            }
            .container {
                background:#ffffff;
                border: 1px solid #ededed;
                margin: 0 auto;
                width: 550px;
            }
            input {
                border:none;
                font-size:24px;
                font-weight: 300;
                padding:15px;
                width: 520px;
            }
            input::placeholder {
                color: #e6e6e6;
                font-style:italic;
                font-weight:100;
            }
            .todo{
                border-top:1px solid #ededed;
                padding: 15px;
            }
            .todo-text {
                font-weight: 300;
            }
            `
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h1", {
      children: "todos"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 13
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "container",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
        onChange: changeHandler,
        onKeyDown: keyDownHandler,
        placeholder: "What needs to be done?",
        value: input,
        type: "text"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 17
      }, undefined), todos.map(item => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "todo",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: "todo-text",
            children: item
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 29
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 32
        }, undefined);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(Root, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 82,
  columnNumber: 16
}, undefined));

/***/ }),

/***/ "./src/main.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var fusion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fusion-react");
/* harmony import */ var fusion_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fusion_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/root.js");
/* harmony import */ var fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fusion-plugin-react-helmet-async");
/* harmony import */ var fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2__);



async function start() {
  // const root = <div>Hello World</div>
  const app = new (fusion_react__WEBPACK_IMPORTED_MODULE_0___default())(_components_root__WEBPACK_IMPORTED_MODULE_1__["default"]);
  app.register((fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2___default()));
  return app;
}

/***/ }),

/***/ "./node_modules/fusion-cli/build/loaders/chunk-manifest-loader.js!":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chunks": () => (/* binding */ chunks),
/* harmony export */   "initialChunkIds": () => (/* binding */ initialChunkIds),
/* harmony export */   "runtimeChunkIds": () => (/* binding */ runtimeChunkIds)
/* harmony export */ });
const chunks = new Map([["main", __webpack_require__.p + "client-main.js"], ["runtime", __webpack_require__.p + "client-runtime.js"], ["vendor", __webpack_require__.p + "client-vendor.js"]]);
const runtimeChunkIds = new Set(["runtime"]);
const initialChunkIds = new Set(["main","vendor"]);

/***/ }),

/***/ "./node_modules/fusion-cli/build/loaders/chunk-url-map-loader.js!":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = new Map(
    [["main",[["es5","client-main.js"]]],["runtime",[["es5","client-runtime.js"]]],["vendor",[["es5","client-vendor.js"]]]].map(entry => { //[number, Map<string,string>]
      entry[1] = new Map(
        entry[1].map(group => {
          group[1] = __webpack_require__.p + group[1];
          return group;
        })
      );
      return entry;
    })
  );

/***/ }),

/***/ "./node_modules/fusion-cli/build/loaders/i18n-manifest-loader.js!":
/***/ (() => {



/***/ }),

/***/ "./node_modules/fusion-cli/build/loaders/sync-chunk-ids-loader.js!":
/***/ ((module) => {

module.exports = ["runtime","vendor","main"];

/***/ }),

/***/ "@babel/code-frame":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/@babel/code-frame/lib/index.js");

/***/ }),

/***/ "ansi-to-html":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/ansi-to-html/lib/ansi_to_html.js");

/***/ }),

/***/ "chalk":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/fusion-cli/node_modules/chalk/source/index.js");

/***/ }),

/***/ "fusion-core":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/fusion-core/dist-node-cjs/index.js");

/***/ }),

/***/ "fusion-plugin-react-helmet-async":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/fusion-plugin-react-helmet-async/dist-node-cjs/index.js");

/***/ }),

/***/ "fusion-react":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/fusion-react/dist-node-cjs/index.js");

/***/ }),

/***/ "koa-mount":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/koa-mount/index.js");

/***/ }),

/***/ "koa-static":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/koa-static/index.js");

/***/ }),

/***/ "react":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/react/index.js");

/***/ }),

/***/ "react/jsx-dev-runtime":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/react/jsx-dev-runtime.js");

/***/ }),

/***/ "source-map-support":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/source-map-support/source-map-support.js");

/***/ }),

/***/ "vary":
/***/ ((module) => {

"use strict";
module.exports = require("/Users/user/Desktop/fusion-tutorial/node_modules/vary/index.js");

/***/ }),

/***/ "assert":
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "fs":
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "url":
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("assert");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_2__);
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/*::
declare var __webpack_public_path__: string;
*/



const {
  prefix,
  cdnUrl,
  dangerouslyExposeSourceMaps
} = (0,fusion_core__WEBPACK_IMPORTED_MODULE_2__.getEnv)();

if (typeof prefix === 'string' && prefix !== '') {
  assert__WEBPACK_IMPORTED_MODULE_0___default()(prefix.startsWith('/'), 'ROUTE_PREFIX must start with /');
}

if (typeof cdnUrl === 'string' && cdnUrl !== '') {
  assert__WEBPACK_IMPORTED_MODULE_0___default()(new url__WEBPACK_IMPORTED_MODULE_1__.URL(cdnUrl), 'CDN_URL must be valid absolute URL');
}

let assetBasePath = '/_static/';

if (prefix) {
  assetBasePath = prefix + assetBasePath;
} // eslint-disable-next-line


__webpack_require__.p = cdnUrl && !dangerouslyExposeSourceMaps ? cdnUrl + '/' : assetBasePath;
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "start": () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("source-map-support");
/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SECRET_I18N_MANIFEST_INSTRUMENTATION_LOADER___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-cli/build/loaders/i18n-manifest-loader.js!");
/* harmony import */ var _SECRET_I18N_MANIFEST_INSTRUMENTATION_LOADER___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SECRET_I18N_MANIFEST_INSTRUMENTATION_LOADER___WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fusion-core");
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fusion_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _plugins_critical_chunk_ids_plugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/fusion-cli/plugins/critical-chunk-ids-plugin.js");
/* harmony import */ var _plugins_assets_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/fusion-cli/plugins/assets-plugin.js");
/* harmony import */ var _plugins_context_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/fusion-cli/plugins/context-plugin.js");
/* harmony import */ var _plugins_server_error_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/fusion-cli/plugins/server-error-plugin.js");
/* harmony import */ var _plugins_ssr_plugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/fusion-cli/plugins/ssr-plugin.js");
/* harmony import */ var _plugins_ssr_module_scripts_plugin__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/fusion-cli/plugins/ssr-module-scripts-plugin.js");
/* harmony import */ var _lib_strip_prefix_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/fusion-cli/lib/strip-prefix.js");
/* harmony import */ var _lib_strip_prefix_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lib_strip_prefix_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _FUSION_ENTRY_PATH___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/main.js");
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/* eslint-env node */

/* global __webpack_hash__ */

/* eslint-disable import/first */

source_map_support__WEBPACK_IMPORTED_MODULE_0___default().install(); // $FlowFixMe[cannot-resolve-module]

 // eslint-disable-line









 // $FlowFixMe[cannot-resolve-module]

 // eslint-disable-line import/no-unresolved

let prefix = process.env.ROUTE_PREFIX;
let AssetsPlugin;
let server = null;
const state = {
  serve: null
};

function getInitialize() {
  return typeof _FUSION_ENTRY_PATH___WEBPACK_IMPORTED_MODULE_11__["default"] === 'function' ? _FUSION_ENTRY_PATH___WEBPACK_IMPORTED_MODULE_11__["default"] : () => {
    throw new Error('App should export a function');
  };
}

let initialReloadOptions;
async function start({
  port,
  dir = '.',
  useModuleScripts = false
}
/*: any */
) {
  AssetsPlugin = (0,_plugins_assets_plugin__WEBPACK_IMPORTED_MODULE_5__["default"])(dir); // TODO(#21): support https.createServer(credentials, listener);

  server = http__WEBPACK_IMPORTED_MODULE_2___default().createServer();
  initialReloadOptions = {
    useModuleScripts
  };
  await reload(initialReloadOptions);
  server.on('request', (req, res) => {
    if (prefix) _lib_strip_prefix_js__WEBPACK_IMPORTED_MODULE_10___default()(req, prefix); // $FlowFixMe[not-a-function]

    state.serve(req, res).catch(e => {
      // $FlowFixMe[prop-missing]
      state.app.onerror(e);
    });
  });
  return new Promise(resolve => {
    server && server.listen(port, () => {
      resolve(server);
    });
  });
}
let prevApp = null;

async function reload({
  useModuleScripts
}
/* : { useModuleScripts?: boolean } */
) {
  if (prevApp) {
    await prevApp.cleanup();
    prevApp = null;
  }

  const initialize = getInitialize();
  const app = await initialize();

  if (!(app instanceof (fusion_core__WEBPACK_IMPORTED_MODULE_3___default()))) {
    throw new Error('Application entry point did not return an App');
  }

  reverseRegister(app, _plugins_context_plugin__WEBPACK_IMPORTED_MODULE_6__["default"]);
  app.register(AssetsPlugin);
  app.register(fusion_core__WEBPACK_IMPORTED_MODULE_3__.SSRBodyTemplateToken, useModuleScripts ? _plugins_ssr_module_scripts_plugin__WEBPACK_IMPORTED_MODULE_9__.SSRModuleScriptsBodyTemplate : _plugins_ssr_plugin__WEBPACK_IMPORTED_MODULE_8__.SSRBodyTemplate);
  app.register(fusion_core__WEBPACK_IMPORTED_MODULE_3__.CriticalChunkIdsToken, _plugins_critical_chunk_ids_plugin_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

  if (prefix) {
    app.register(fusion_core__WEBPACK_IMPORTED_MODULE_3__.RoutePrefixToken, prefix);
  }

  if (server) {
    app.register(fusion_core__WEBPACK_IMPORTED_MODULE_3__.HttpServerToken, /*#__PURE__*/(0,fusion_core__WEBPACK_IMPORTED_MODULE_3__.createPlugin)({
      provides: () => server
    }));
  }

  if (true) {
    reverseRegister(app, _plugins_server_error_plugin__WEBPACK_IMPORTED_MODULE_7__["default"]);
  }

  state.serve = app.callback(); // $FlowFixMe[prop-missing]

  state.app = prevApp = app;
}

function reverseRegister(app, token, plugin) {
  app.register(token, plugin);
  const entries = Array.from(app.taskMap.entries());
  entries.unshift(entries.pop());
  app.taskMap = new Map(entries);
}

if (false) {}
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=server-main.js.map