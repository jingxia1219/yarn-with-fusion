"use strict";
self["webpackHotUpdateFusion"]("main",{

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
    } else if (ctx.method === 'POST') {
      // const {value} = ctx.request.body
      console.log('adding');
      todos.push(ctx.request.body.value);
      ctx.response.status = 201;
    }
  }

  await next();
});

/***/ })

});
//# sourceMappingURL=main.910169f1c52db8f1.hot-update.js.map