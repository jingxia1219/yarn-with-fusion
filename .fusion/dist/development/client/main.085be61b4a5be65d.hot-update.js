"use strict";
self["webpackHotUpdateFusion"]("main",{

/***/ "./src/main.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var fusion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/fusion-react/dist-browser-esm/index.js");
/* harmony import */ var _components_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/root.js");
/* harmony import */ var fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/fusion-plugin-react-helmet-async/dist-browser-esm/index.js");



async function start() {
  // const root = <div>Hello World</div>
  const app = new fusion_react__WEBPACK_IMPORTED_MODULE_1__["default"](_components_root__WEBPACK_IMPORTED_MODULE_0__["default"]);
  app.register(fusion_plugin_react_helmet_async__WEBPACK_IMPORTED_MODULE_2__["default"]);
  return app;
}

/***/ })

});
//# sourceMappingURL=main.085be61b4a5be65d.hot-update.js.map