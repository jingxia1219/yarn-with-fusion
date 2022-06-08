"use strict";
(self["webpackChunkFusion"] = self["webpackChunkFusion"] || []).push([["main"],{

/***/ "./src/components/root.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/style.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/user/Desktop/fusion-tutorial/src/components/root.js";






const Root = () => {
  const [todos, setTodos] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2___default()('/api/todos').then(res => res.json().then(res => setTodos(res)));
  }, []);

  function keyDownHandler(e) {
    if (e.key === 'Enter') {
      setInput('');
      setTodos(prev => [...prev, input]);
      isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2___default()('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: input
        })
      });
    }
  }

  function changeHandler(e) {
    setInput(e.currentTarget.value);
  }

  function deleteHandler(e) {
    setTodos(prev => prev.filter((todo, idx) => {
      return idx !== +e.target.id;
    }));
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("h1", {
      children: "todos"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 13
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
      className: "container",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("input", {
        onChange: changeHandler,
        onKeyDown: keyDownHandler,
        placeholder: "What needs to be done?",
        value: input,
        type: "text"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 17
      }, undefined), todos.map((item, idx) => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
          className: "todo",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
            className: "todo-text",
            children: item
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 29
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
            id: idx,
            className: "delete-x",
            onClick: deleteHandler,
            children: " x "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 29
          }, undefined)]
        }, idx, true, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 32
        }, undefined);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Root, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 68,
  columnNumber: 16
}, undefined));

/***/ }),

/***/ "./src/components/style.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/user/Desktop/fusion-tutorial/src/components/style.js";

function Style() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("style", {
    children: "\n    body{\n        background-color: #f5f5f5;\n        front: 24x 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    }\n    h1{\n        color: rgba(175, 47, 47, 0.15);\n        font-size: 100px;\n        font-weight: 100;\n        text-align:center;\n    }\n    .container {\n        background:#ffffff;\n        border: 1px solid #ededed;\n        margin: 0 auto;\n        width: 550px;\n    }\n    input {\n        border:none;\n        font-size:24px;\n        font-weight: 300;\n        padding:15px;\n        width: 520px;\n    }\n    input::placeholder {\n        color: #e6e6e6;\n        font-style:italic;\n        font-weight:100;\n    }\n    .todo{\n        border-top:1px solid #ededed;\n        padding: 15px;\n    }\n    .todo-text {\n        font-weight: 300;\n    }\n    .todo{\n        width:520px;\n        display: flex;\n        justify-content: space-between;\n    }\n    .delete-x{\n        cursor: pointer;\n    }\n    "
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

/***/ }),

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
    } else if (ctx.method === 'POST') {
      // const {value} = ctx.request.body
      todos.push(ctx.request.body.value);
      ctx.response.status = 201;
    }
  }

  await next();
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("./node_modules/fusion-cli/entries/client-public-path.js"), __webpack_exec__("./node_modules/webpack-hot-middleware/client.js?name=client"), __webpack_exec__("./node_modules/fusion-cli/entries/client-entry.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=client-main.js.map