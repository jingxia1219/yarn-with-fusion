self["webpackHotUpdateFusion"]("vendor",{

/***/ "./node_modules/fusion-plugin-react-helmet-async/dist-browser-esm/browser.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fusion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/fusion-core/dist-browser-esm/create-plugin.js");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-helmet-async/lib/index.module.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




const plugin =  true && (0,fusion_core__WEBPACK_IMPORTED_MODULE_3__.createPlugin)({
  middleware: () => {
    return (ctx, next) => {
      ctx.element = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__.HelmetProvider, {
        context: {},
        children: ctx.element
      });
      return next();
    };
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);

/***/ }),

/***/ "./node_modules/fusion-plugin-react-helmet-async/dist-browser-esm/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helmet": () => (/* reexport safe */ react_helmet_async__WEBPACK_IMPORTED_MODULE_0__.Helmet),
/* harmony export */   "HelmetProvider": () => (/* reexport safe */ react_helmet_async__WEBPACK_IMPORTED_MODULE_0__.HelmetProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react-helmet-async/lib/index.module.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-plugin-react-helmet-async/dist-browser-esm/browser.js");
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ( false ? 0 : _browser__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "./node_modules/react-fast-compare/index.js":
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

      return true;
    } // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.


    var it;

    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

      it = a.entries();

      while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;

      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

      return true;
    } // END: Modifications


    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false; // END: fast-deep-equal
    // START: react-fast-compare
    // custom handling for DOM elements


    if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements
        continue;
      } // all other properties should be traversed as usual


      if (!equal(a[keys[i]], b[keys[i]])) return false;
    } // END: react-fast-compare
    // START: fast-deep-equal


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};

/***/ }),

/***/ "./node_modules/react-helmet-async/lib/index.module.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helmet": () => (/* binding */ W),
/* harmony export */   "HelmetData": () => (/* binding */ N),
/* harmony export */   "HelmetProvider": () => (/* binding */ q)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_3__);






function a() {
  return a = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];

      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }

    return t;
  }, a.apply(this, arguments);
}

function s(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, c(t, e);
}

function c(t, e) {
  return c = Object.setPrototypeOf || function (t, e) {
    return t.__proto__ = e, t;
  }, c(t, e);
}

function u(t, e) {
  if (null == t) return {};
  var r,
      n,
      i = {},
      o = Object.keys(t);

  for (n = 0; n < o.length; n++) e.indexOf(r = o[n]) >= 0 || (i[r] = t[r]);

  return i;
}

var l = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title",
  FRAGMENT: "Symbol(react.fragment)"
},
    p = {
  rel: ["amphtml", "canonical", "alternate"]
},
    f = {
  type: ["application/ld+json"]
},
    d = {
  charset: "",
  name: ["robots", "description"],
  property: ["og:type", "og:title", "og:url", "og:image", "og:image:alt", "og:description", "twitter:url", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt", "twitter:card", "twitter:site"]
},
    h = Object.keys(l).map(function (t) {
  return l[t];
}),
    m = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
},
    y = Object.keys(m).reduce(function (t, e) {
  return t[m[e]] = e, t;
}, {}),
    T = function (t, e) {
  for (var r = t.length - 1; r >= 0; r -= 1) {
    var n = t[r];
    if (Object.prototype.hasOwnProperty.call(n, e)) return n[e];
  }

  return null;
},
    g = function (t) {
  var e = T(t, l.TITLE),
      r = T(t, "titleTemplate");
  if (Array.isArray(e) && (e = e.join("")), r && e) return r.replace(/%s/g, function () {
    return e;
  });
  var n = T(t, "defaultTitle");
  return e || n || void 0;
},
    b = function (t) {
  return T(t, "onChangeClientState") || function () {};
},
    v = function (t, e) {
  return e.filter(function (e) {
    return void 0 !== e[t];
  }).map(function (e) {
    return e[t];
  }).reduce(function (t, e) {
    return a({}, t, e);
  }, {});
},
    A = function (t, e) {
  return e.filter(function (t) {
    return void 0 !== t[l.BASE];
  }).map(function (t) {
    return t[l.BASE];
  }).reverse().reduce(function (e, r) {
    if (!e.length) for (var n = Object.keys(r), i = 0; i < n.length; i += 1) {
      var o = n[i].toLowerCase();
      if (-1 !== t.indexOf(o) && r[o]) return e.concat(r);
    }
    return e;
  }, []);
},
    C = function (t, e, r) {
  var n = {};
  return r.filter(function (e) {
    return !!Array.isArray(e[t]) || (void 0 !== e[t] && console && "function" == typeof console.warn && console.warn("Helmet: " + t + ' should be of type "Array". Instead found type "' + typeof e[t] + '"'), !1);
  }).map(function (e) {
    return e[t];
  }).reverse().reduce(function (t, r) {
    var i = {};
    r.filter(function (t) {
      for (var r, o = Object.keys(t), a = 0; a < o.length; a += 1) {
        var s = o[a],
            c = s.toLowerCase();
        -1 === e.indexOf(c) || "rel" === r && "canonical" === t[r].toLowerCase() || "rel" === c && "stylesheet" === t[c].toLowerCase() || (r = c), -1 === e.indexOf(s) || "innerHTML" !== s && "cssText" !== s && "itemprop" !== s || (r = s);
      }

      if (!r || !t[r]) return !1;
      var u = t[r].toLowerCase();
      return n[r] || (n[r] = {}), i[r] || (i[r] = {}), !n[r][u] && (i[r][u] = !0, !0);
    }).reverse().forEach(function (e) {
      return t.push(e);
    });

    for (var o = Object.keys(i), s = 0; s < o.length; s += 1) {
      var c = o[s],
          u = a({}, n[c], i[c]);
      n[c] = u;
    }

    return t;
  }, []).reverse();
},
    O = function (t, e) {
  if (Array.isArray(t) && t.length) for (var r = 0; r < t.length; r += 1) if (t[r][e]) return !0;
  return !1;
},
    S = function (t) {
  return Array.isArray(t) ? t.join("") : t;
},
    E = function (t, e) {
  return Array.isArray(t) ? t.reduce(function (t, r) {
    return function (t, e) {
      for (var r = Object.keys(t), n = 0; n < r.length; n += 1) if (e[r[n]] && e[r[n]].includes(t[r[n]])) return !0;

      return !1;
    }(r, e) ? t.priority.push(r) : t.default.push(r), t;
  }, {
    priority: [],
    default: []
  }) : {
    default: t
  };
},
    I = function (t, e) {
  var r;
  return a({}, t, ((r = {})[e] = void 0, r));
},
    P = [l.NOSCRIPT, l.SCRIPT, l.STYLE],
    w = function (t, e) {
  return void 0 === e && (e = !0), !1 === e ? String(t) : String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
},
    x = function (t) {
  return Object.keys(t).reduce(function (e, r) {
    var n = void 0 !== t[r] ? r + '="' + t[r] + '"' : "" + r;
    return e ? e + " " + n : n;
  }, "");
},
    L = function (t, e) {
  return void 0 === e && (e = {}), Object.keys(t).reduce(function (e, r) {
    return e[m[r] || r] = t[r], e;
  }, e);
},
    j = function (e, r) {
  return r.map(function (r, n) {
    var i,
        o = ((i = {
      key: n
    })["data-rh"] = !0, i);
    return Object.keys(r).forEach(function (t) {
      var e = m[t] || t;
      "innerHTML" === e || "cssText" === e ? o.dangerouslySetInnerHTML = {
        __html: r.innerHTML || r.cssText
      } : o[e] = r[t];
    }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(e, o);
  });
},
    M = function (e, r, n) {
  switch (e) {
    case l.TITLE:
      return {
        toComponent: function () {
          return n = r.titleAttributes, (i = {
            key: e = r.title
          })["data-rh"] = !0, o = L(n, i), [react__WEBPACK_IMPORTED_MODULE_0___default().createElement(l.TITLE, o, e)];
          var e, n, i, o;
        },
        toString: function () {
          return function (t, e, r, n) {
            var i = x(r),
                o = S(e);
            return i ? "<" + t + ' data-rh="true" ' + i + ">" + w(o, n) + "</" + t + ">" : "<" + t + ' data-rh="true">' + w(o, n) + "</" + t + ">";
          }(e, r.title, r.titleAttributes, n);
        }
      };

    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: function () {
          return L(r);
        },
        toString: function () {
          return x(r);
        }
      };

    default:
      return {
        toComponent: function () {
          return j(e, r);
        },
        toString: function () {
          return function (t, e, r) {
            return e.reduce(function (e, n) {
              var i = Object.keys(n).filter(function (t) {
                return !("innerHTML" === t || "cssText" === t);
              }).reduce(function (t, e) {
                var i = void 0 === n[e] ? e : e + '="' + w(n[e], r) + '"';
                return t ? t + " " + i : i;
              }, ""),
                  o = n.innerHTML || n.cssText || "",
                  a = -1 === P.indexOf(t);
              return e + "<" + t + ' data-rh="true" ' + i + (a ? "/>" : ">" + o + "</" + t + ">");
            }, "");
          }(e, r, n);
        }
      };
  }
},
    k = function (t) {
  var e = t.baseTag,
      r = t.bodyAttributes,
      n = t.encode,
      i = t.htmlAttributes,
      o = t.noscriptTags,
      a = t.styleTags,
      s = t.title,
      c = void 0 === s ? "" : s,
      u = t.titleAttributes,
      h = t.linkTags,
      m = t.metaTags,
      y = t.scriptTags,
      T = {
    toComponent: function () {},
    toString: function () {
      return "";
    }
  };

  if (t.prioritizeSeoTags) {
    var g = function (t) {
      var e = t.linkTags,
          r = t.scriptTags,
          n = t.encode,
          i = E(t.metaTags, d),
          o = E(e, p),
          a = E(r, f);
      return {
        priorityMethods: {
          toComponent: function () {
            return [].concat(j(l.META, i.priority), j(l.LINK, o.priority), j(l.SCRIPT, a.priority));
          },
          toString: function () {
            return M(l.META, i.priority, n) + " " + M(l.LINK, o.priority, n) + " " + M(l.SCRIPT, a.priority, n);
          }
        },
        metaTags: i.default,
        linkTags: o.default,
        scriptTags: a.default
      };
    }(t);

    T = g.priorityMethods, h = g.linkTags, m = g.metaTags, y = g.scriptTags;
  }

  return {
    priority: T,
    base: M(l.BASE, e, n),
    bodyAttributes: M("bodyAttributes", r, n),
    htmlAttributes: M("htmlAttributes", i, n),
    link: M(l.LINK, h, n),
    meta: M(l.META, m, n),
    noscript: M(l.NOSCRIPT, o, n),
    script: M(l.SCRIPT, y, n),
    style: M(l.STYLE, a, n),
    title: M(l.TITLE, {
      title: c,
      titleAttributes: u
    }, n)
  };
},
    H = [],
    N = function (t, e) {
  var r = this;
  void 0 === e && (e = "undefined" != typeof document), this.instances = [], this.value = {
    setHelmet: function (t) {
      r.context.helmet = t;
    },
    helmetInstances: {
      get: function () {
        return r.canUseDOM ? H : r.instances;
      },
      add: function (t) {
        (r.canUseDOM ? H : r.instances).push(t);
      },
      remove: function (t) {
        var e = (r.canUseDOM ? H : r.instances).indexOf(t);
        (r.canUseDOM ? H : r.instances).splice(e, 1);
      }
    }
  }, this.context = t, this.canUseDOM = e, e || (t.helmet = k({
    baseTag: [],
    bodyAttributes: {},
    encodeSpecialCharacters: !0,
    htmlAttributes: {},
    linkTags: [],
    metaTags: [],
    noscriptTags: [],
    scriptTags: [],
    styleTags: [],
    title: "",
    titleAttributes: {}
  }));
},
    R = react__WEBPACK_IMPORTED_MODULE_0___default().createContext({}),
    D = prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape({
  setHelmet: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  helmetInstances: prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape({
    get: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
    add: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
    remove: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func)
  })
}),
    U = "undefined" != typeof document,
    q = /*#__PURE__*/function (e) {
  function r(t) {
    var n;
    return (n = e.call(this, t) || this).helmetData = new N(n.props.context, r.canUseDOM), n;
  }

  return s(r, e), r.prototype.render = function () {
    /*#__PURE__*/
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(R.Provider, {
      value: this.helmetData.value
    }, this.props.children);
  }, r;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

q.canUseDOM = U, q.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape({
    helmet: prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape()
  }),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().node.isRequired)
}, q.defaultProps = {
  context: {}
}, q.displayName = "HelmetProvider";

var Y = function (t, e) {
  var r,
      n = document.head || document.querySelector(l.HEAD),
      i = n.querySelectorAll(t + "[data-rh]"),
      o = [].slice.call(i),
      a = [];
  return e && e.length && e.forEach(function (e) {
    var n = document.createElement(t);

    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && ("innerHTML" === i ? n.innerHTML = e.innerHTML : "cssText" === i ? n.styleSheet ? n.styleSheet.cssText = e.cssText : n.appendChild(document.createTextNode(e.cssText)) : n.setAttribute(i, void 0 === e[i] ? "" : e[i]));

    n.setAttribute("data-rh", "true"), o.some(function (t, e) {
      return r = e, n.isEqualNode(t);
    }) ? o.splice(r, 1) : a.push(n);
  }), o.forEach(function (t) {
    return t.parentNode.removeChild(t);
  }), a.forEach(function (t) {
    return n.appendChild(t);
  }), {
    oldTags: o,
    newTags: a
  };
},
    B = function (t, e) {
  var r = document.getElementsByTagName(t)[0];

  if (r) {
    for (var n = r.getAttribute("data-rh"), i = n ? n.split(",") : [], o = [].concat(i), a = Object.keys(e), s = 0; s < a.length; s += 1) {
      var c = a[s],
          u = e[c] || "";
      r.getAttribute(c) !== u && r.setAttribute(c, u), -1 === i.indexOf(c) && i.push(c);
      var l = o.indexOf(c);
      -1 !== l && o.splice(l, 1);
    }

    for (var p = o.length - 1; p >= 0; p -= 1) r.removeAttribute(o[p]);

    i.length === o.length ? r.removeAttribute("data-rh") : r.getAttribute("data-rh") !== a.join(",") && r.setAttribute("data-rh", a.join(","));
  }
},
    K = function (t, e) {
  var r = t.baseTag,
      n = t.htmlAttributes,
      i = t.linkTags,
      o = t.metaTags,
      a = t.noscriptTags,
      s = t.onChangeClientState,
      c = t.scriptTags,
      u = t.styleTags,
      p = t.title,
      f = t.titleAttributes;
  B(l.BODY, t.bodyAttributes), B(l.HTML, n), function (t, e) {
    void 0 !== t && document.title !== t && (document.title = S(t)), B(l.TITLE, e);
  }(p, f);
  var d = {
    baseTag: Y(l.BASE, r),
    linkTags: Y(l.LINK, i),
    metaTags: Y(l.META, o),
    noscriptTags: Y(l.NOSCRIPT, a),
    scriptTags: Y(l.SCRIPT, c),
    styleTags: Y(l.STYLE, u)
  },
      h = {},
      m = {};
  Object.keys(d).forEach(function (t) {
    var e = d[t],
        r = e.newTags,
        n = e.oldTags;
    r.length && (h[t] = r), n.length && (m[t] = d[t].oldTags);
  }), e && e(), s(t, h, m);
},
    _ = null,
    z = /*#__PURE__*/function (t) {
  function e() {
    for (var e, r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];

    return (e = t.call.apply(t, [this].concat(n)) || this).rendered = !1, e;
  }

  s(e, t);
  var r = e.prototype;
  return r.shouldComponentUpdate = function (t) {
    return !shallowequal__WEBPACK_IMPORTED_MODULE_3___default()(t, this.props);
  }, r.componentDidUpdate = function () {
    this.emitChange();
  }, r.componentWillUnmount = function () {
    this.props.context.helmetInstances.remove(this), this.emitChange();
  }, r.emitChange = function () {
    var t,
        e,
        r = this.props.context,
        n = r.setHelmet,
        i = null,
        o = (t = r.helmetInstances.get().map(function (t) {
      var e = a({}, t.props);
      return delete e.context, e;
    }), {
      baseTag: A(["href"], t),
      bodyAttributes: v("bodyAttributes", t),
      defer: T(t, "defer"),
      encode: T(t, "encodeSpecialCharacters"),
      htmlAttributes: v("htmlAttributes", t),
      linkTags: C(l.LINK, ["rel", "href"], t),
      metaTags: C(l.META, ["name", "charset", "http-equiv", "property", "itemprop"], t),
      noscriptTags: C(l.NOSCRIPT, ["innerHTML"], t),
      onChangeClientState: b(t),
      scriptTags: C(l.SCRIPT, ["src", "innerHTML"], t),
      styleTags: C(l.STYLE, ["cssText"], t),
      title: g(t),
      titleAttributes: v("titleAttributes", t),
      prioritizeSeoTags: O(t, "prioritizeSeoTags")
    });
    q.canUseDOM ? (e = o, _ && cancelAnimationFrame(_), e.defer ? _ = requestAnimationFrame(function () {
      K(e, function () {
        _ = null;
      });
    }) : (K(e), _ = null)) : k && (i = k(o)), n(i);
  }, r.init = function () {
    this.rendered || (this.rendered = !0, this.props.context.helmetInstances.add(this), this.emitChange());
  }, r.render = function () {
    return this.init(), null;
  }, e;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

z.propTypes = {
  context: D.isRequired
}, z.displayName = "HelmetDispatcher";

var F = ["children"],
    G = ["children"],
    W = /*#__PURE__*/function (e) {
  function r() {
    return e.apply(this, arguments) || this;
  }

  s(r, e);
  var o = r.prototype;
  return o.shouldComponentUpdate = function (t) {
    return !react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default()(I(this.props, "helmetData"), I(t, "helmetData"));
  }, o.mapNestedChildrenToProps = function (t, e) {
    if (!e) return null;

    switch (t.type) {
      case l.SCRIPT:
      case l.NOSCRIPT:
        return {
          innerHTML: e
        };

      case l.STYLE:
        return {
          cssText: e
        };

      default:
        throw new Error("<" + t.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    }
  }, o.flattenArrayTypeChildren = function (t) {
    var e,
        r = t.child,
        n = t.arrayTypeChildren;
    return a({}, n, ((e = {})[r.type] = [].concat(n[r.type] || [], [a({}, t.newChildProps, this.mapNestedChildrenToProps(r, t.nestedChildren))]), e));
  }, o.mapObjectTypeChildren = function (t) {
    var e,
        r,
        n = t.child,
        i = t.newProps,
        o = t.newChildProps,
        s = t.nestedChildren;

    switch (n.type) {
      case l.TITLE:
        return a({}, i, ((e = {})[n.type] = s, e.titleAttributes = a({}, o), e));

      case l.BODY:
        return a({}, i, {
          bodyAttributes: a({}, o)
        });

      case l.HTML:
        return a({}, i, {
          htmlAttributes: a({}, o)
        });

      default:
        return a({}, i, ((r = {})[n.type] = a({}, o), r));
    }
  }, o.mapArrayTypeChildrenToProps = function (t, e) {
    var r = a({}, e);
    return Object.keys(t).forEach(function (e) {
      var n;
      r = a({}, r, ((n = {})[e] = t[e], n));
    }), r;
  }, o.warnOnInvalidChildren = function (t, e) {
    return invariant__WEBPACK_IMPORTED_MODULE_2___default()(h.some(function (e) {
      return t.type === e;
    }), "function" == typeof t.type ? "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information." : "Only elements types " + h.join(", ") + " are allowed. Helmet does not support rendering <" + t.type + "> elements. Refer to our API for more information."), invariant__WEBPACK_IMPORTED_MODULE_2___default()(!e || "string" == typeof e || Array.isArray(e) && !e.some(function (t) {
      return "string" != typeof t;
    }), "Helmet expects a string as a child of <" + t.type + ">. Did you forget to wrap your children in braces? ( <" + t.type + ">{``}</" + t.type + "> ) Refer to our API for more information."), !0;
  }, o.mapChildrenToProps = function (e, r) {
    var n = this,
        i = {};
    return react__WEBPACK_IMPORTED_MODULE_0___default().Children.forEach(e, function (t) {
      if (t && t.props) {
        var e = t.props,
            o = e.children,
            a = u(e, F),
            s = Object.keys(a).reduce(function (t, e) {
          return t[y[e] || e] = a[e], t;
        }, {}),
            c = t.type;

        switch ("symbol" == typeof c ? c = c.toString() : n.warnOnInvalidChildren(t, o), c) {
          case l.FRAGMENT:
            r = n.mapChildrenToProps(o, r);
            break;

          case l.LINK:
          case l.META:
          case l.NOSCRIPT:
          case l.SCRIPT:
          case l.STYLE:
            i = n.flattenArrayTypeChildren({
              child: t,
              arrayTypeChildren: i,
              newChildProps: s,
              nestedChildren: o
            });
            break;

          default:
            r = n.mapObjectTypeChildren({
              child: t,
              newProps: r,
              newChildProps: s,
              nestedChildren: o
            });
        }
      }
    }), this.mapArrayTypeChildrenToProps(i, r);
  }, o.render = function () {
    var e = this.props,
        r = e.children,
        n = u(e, G),
        i = a({}, n),
        o = n.helmetData;
    return r && (i = this.mapChildrenToProps(r, i)), !o || o instanceof N || (o = new N(o.context, o.instances)), o ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, a({}, i, {
      context: o.value,
      helmetData: void 0
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(R.Consumer, null, function (e) {
      /*#__PURE__*/
      return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, a({}, i, {
        context: e
      }));
    });
  }, r;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

W.propTypes = {
  base: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  bodyAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().node)), (prop_types__WEBPACK_IMPORTED_MODULE_4___default().node)]),
  defaultTitle: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  defer: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  encodeSpecialCharacters: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  htmlAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  link: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  noscript: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  onChangeClientState: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  script: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  style: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  titleAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  titleTemplate: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  prioritizeSeoTags: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  helmetData: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)
}, W.defaultProps = {
  defer: !0,
  encodeSpecialCharacters: !0,
  prioritizeSeoTags: !1
}, W.displayName = "Helmet";


/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/***/ ((module) => {

//
module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB); // Test for A's keys different from B.

  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];
    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }

  return true;
};

/***/ })

});
//# sourceMappingURL=vendor.085be61b4a5be65d.hot-update.js.map