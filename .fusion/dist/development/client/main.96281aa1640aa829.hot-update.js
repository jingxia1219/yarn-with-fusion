"use strict";
self["webpackHotUpdateFusion"]("main",{

/***/ "./src/main.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var fusion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/fusion-react/dist-browser-esm/index.js");
/* harmony import */ var _components_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/root.js");
/* harmony import */ var _plugins_todos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/plugins/todos.js");



async function start() {
  // const root = <div>Hello World</div>
  const app = new fusion_react__WEBPACK_IMPORTED_MODULE_2__["default"](_components_root__WEBPACK_IMPORTED_MODULE_0__["default"]);

  if (false) {}

  return app;
}

/***/ }),

/***/ "./src/plugins/todos.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const todos = ['Buy milk', 'Walk dog'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (ctx, next) => {
  if (ctx.path === '/api/todos') {
    if (ctx.method === 'GET') {
      ctx.response.body = todos;
    }
  }

  await next();
});

/***/ })

});
//# sourceMappingURL=main.96281aa1640aa829.hot-update.js.map