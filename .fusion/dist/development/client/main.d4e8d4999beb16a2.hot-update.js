"use strict";
self["webpackHotUpdateFusion"]("main",{

/***/ "./src/components/root.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/style.js");
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

  function deleteHandler(e) {
    setTodos(prev => prev.filter(todo => {
      console.log(todo.key, typeof todo.key);
      return todo.key !== +e.target.key;
    }));
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h1", {
      children: "todos"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
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
        lineNumber: 32,
        columnNumber: 17
      }, undefined), todos.map((item, idx) => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
          className: "todo",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
            className: "todo-text",
            children: item
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 29
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
            className: "delete-x",
            onClick: deleteHandler,
            children: " x "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 45,
            columnNumber: 29
          }, undefined)]
        }, idx, true, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 32
        }, undefined);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Root, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 54,
  columnNumber: 16
}, undefined));

/***/ })

});
//# sourceMappingURL=main.d4e8d4999beb16a2.hot-update.js.map