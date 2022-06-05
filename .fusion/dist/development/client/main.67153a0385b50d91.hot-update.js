self["webpackHotUpdateFusion"]("main",{

/***/ "./src/components/Style.js":
/***/ (() => {



/***/ }),

/***/ "./src/components/root.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/Style.js");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
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

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("style", {
      children: "\n            body{\n                background-color: #5f5f5f;\n                front: 24x 'Helvetica Neue', Helvetica, Arial, sans-serif;\n            }\n            h1{\n                color: rgba(175,47,47,0.15);\n                font-size: 100px;\n                font-weight: 100;\n                text-align:center;\n            }\n            .container {\n                background:#ffffff;\n                border: 1px solid #ededed;\n                margin: 0 auto;\n                width: 550px;\n            }\n            input {\n                border:none;\n                font-size:24px;\n                font-weight: 300;\n                padding:15px;\n                width: 520px;\n            }\n            input::placeholder {\n                color: #e6e6e6;\n                font-style:italic;\n                font-weight:100;\n            }\n            .todo{\n                border-top:1px solid #ededed;\n                padding: 15px;\n            }\n            .todo-text {\n                font-weight: 300;\n            }\n            "
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h1", {
      children: "todos"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: "container",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("input", {
        onChange: changeHandler,
        onKeyDown: keyDownHandler,
        placeholder: "What needs to be done?",
        value: input,
        type: "text"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 17
      }, undefined), todos.map(item => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
          className: "todo",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
            className: "todo-text",
            children: item
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 29
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 32
        }, undefined);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 13
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Root, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 83,
  columnNumber: 16
}, undefined));

/***/ })

});
//# sourceMappingURL=main.67153a0385b50d91.hot-update.js.map