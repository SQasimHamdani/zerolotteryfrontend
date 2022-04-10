"use strict";
self["webpackHotUpdateResidenceMozart"]("index",{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _threadizer_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @threadizer/core */ "./node_modules/@threadizer/core/build/index.js");
/* harmony import */ var _threadizer_core__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_threadizer_core__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_launcher_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/launcher.vue */ "./source/components/launcher.vue");
/* harmony import */ var _components_highlighted_content_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/highlighted-content.vue */ "./source/components/highlighted-content.vue");
/* harmony import */ var _components_animated_text_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/animated-text.vue */ "./source/components/animated-text.vue");
/* harmony import */ var _components_url_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/components/url.js */ "./source/components/url.js");
/* harmony import */ var _components_dater_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/components/dater.js */ "./source/components/dater.js");














/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Launcher: _components_launcher_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    HighlightedContent: _components_highlighted_content_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    AnimatedText: _components_animated_text_vue__WEBPACK_IMPORTED_MODULE_11__["default"]
  },
  data: function data() {
    return {
      drawStarted: false,
      replayStarted: false,
      drawingStep: 0,
      launchedLottery: null,
      showDrawResults: false
    };
  },
  setup: function setup() {
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
      var _yield$fetch$then, data, lotteries, daily, weekly, monthly;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });

            case 2:
              _context.next = 4;
              return fetch("https://zeroproject.io/zerolottery/api/lotteries").then(function (response) {
                return response.json();
              });

            case 4:
              _yield$fetch$then = _context.sent;
              data = _yield$fetch$then.data;
              lotteries = data.lotteries;
              lotteries.map(function (lottery) {
                lottery.fields.starting_date = new Date(lottery.fields.starting_date);
                lottery.fields.ending_date = new Date(lottery.fields.ending_date);
              });
              daily = lotteries.filter(function (lottery) {
                return lottery.fields.lottery_type === "Daily";
              });
              weekly = lotteries.filter(function (lottery) {
                return lottery.fields.lottery_type === "Weekly";
              });
              monthly = lotteries.filter(function (lottery) {
                return lottery.fields.lottery_type === "Monthly";
              });
              return _context.abrupt("return", {
                lotteries: {
                  daily: daily,
                  weekly: weekly,
                  monthly: monthly
                }
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mounted: function mounted() {
    var _this = this;

    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
      var supported, canvas, resize;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.allowStart = true;
              supported = _this.$refs.canvas.transferControlToOffscreen instanceof Function;
              _context2.next = 4;
              return new (_threadizer_core__WEBPACK_IMPORTED_MODULE_8___default())((0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/webgl.js"), null, !supported);

            case 4:
              _this.thread = _context2.sent;
              canvas = supported ? _this.$refs.canvas.transferControlToOffscreen() : _this.$refs.canvas;
              _context2.next = 8;
              return _this.thread.transfer("setup", canvas);

            case 8:
              resize = function resize() {
                _this.thread.transfer("resize", {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  pixelRatio: window.devicePixelRatio
                });
              };

              _context2.next = 11;
              return _this.thread.transfer("load", {
                prizeSelector: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/models/price-selector.glb"),
                prize1: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/images/test-1.png"),
                prize2: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/images/test-2.png"),
                prize3: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/images/test-3.png"),
                lottery: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/models/lottery-untextured.glb"),
                ground: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/models/ground.glb"),
                environment: (0,_components_url_js__WEBPACK_IMPORTED_MODULE_12__.prependHost)("/environments/viewpoint.hdr")
              });

            case 11:
              _this.thread.on("winner-draw", function () {
                _this.drawingStep = 1;
              });

              _this.thread.on("winner", function () {
                _this.drawingStep = 2;
                _this.showDrawResults = true;
              });

              window.addEventListener("resize", resize, false);
              resize();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  methods: {
    onStart: function onStart(lottery, isReplay) {
      var _this2 = this;

      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3() {
        var haveBeenPaid;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                haveBeenPaid = new Date() < (0,_components_dater_js__WEBPACK_IMPORTED_MODULE_13__.dater)("05/09/2022");

                if (!(_this2.allowStart && haveBeenPaid)) {
                  _context3.next = 14;
                  break;
                }

                _this2.allowStart = false;
                _this2.launchedLottery = lottery;

                if (!isReplay) {
                  _context3.next = 9;
                  break;
                }

                _this2.replayStarted = true;
                _this2.showDrawResults = true;
                _context3.next = 14;
                break;

              case 9:
                _this2.drawingStep = 0;
                _this2.showDrawResults = false;
                _context3.next = 13;
                return _this2.thread.transfer("launch", lottery.fields);

              case 13:
                _this2.drawStarted = true;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    onBack: function onBack() {
      var _this3 = this;

      return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this3.drawStarted = false;
                _this3.replayStarted = false;
                _this3.showDrawResults = false;
                _this3.launchedLottery = null;
                _context4.next = 6;
                return _this3.thread.transfer("reset");

              case 6:
                _this3.allowStart = true;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=template&id=600d6cb6":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=template&id=600d6cb6 ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

var _hoisted_1 = {
  ref: "canvas"
};
var _hoisted_2 = {
  key: 0,
  "class": "main-nav"
};
var _hoisted_3 = {
  key: 0,
  "class": "launched-nav"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Back");

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "The owner of the wallet", -1
/* HOISTED */
);

var _hoisted_6 = {
  "class": "value"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "won", -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "value"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Come request your prize!", -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_launcher = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("launcher");

  var _component_highlighted_content = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("highlighted-content");

  var _component_animated_text = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("animated-text");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_1, null, 512
  /* NEED_PATCH */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [!$data.launchedLottery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_launcher, {
        title: "Daily",
        lotteries: $setup.lotteries.daily,
        onStart: $options.onStart
      }, null, 8
      /* PROPS */
      , ["lotteries", "onStart"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_launcher, {
        title: "Weekly",
        lotteries: $setup.lotteries.weekly,
        onStart: $options.onStart
      }, null, 8
      /* PROPS */
      , ["lotteries", "onStart"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_launcher, {
        title: "Monthly",
        lotteries: $setup.lotteries.monthly,
        onStart: $options.onStart
      }, null, 8
      /* PROPS */
      , ["lotteries", "onStart"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.launchedLottery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_highlighted_content, {
        "class": "back",
        onClick: $options.onBack
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_4];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["onClick"]), $data.drawStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        key: 0,
        name: "fade"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [$data.drawingStep === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_animated_text, {
            key: 0,
            "class": "winning-prize",
            text: $data.launchedLottery.fields.drew ? 'Winning prize' : 'Prizes to be won'
          }, null, 8
          /* PROPS */
          , ["text"])) : $data.drawingStep === 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_animated_text, {
            key: 1,
            "class": "winning-number",
            text: "Winning number"
          })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_animated_text, {
            key: 2,
            "class": "winner",
            text: "Winner"
          }))];
        }),
        _: 1
        /* STABLE */

      })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        name: "fade"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [$data.showDrawResults ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_highlighted_content, {
            key: 0,
            "class": "draw-results",
            active: ""
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.launchedLottery.fields.winner_address), 1
              /* TEXT */
              ), _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.launchedLottery.fields.prizes[0].winning_prize_name) + ".", 1
              /* TEXT */
              ), _hoisted_9];
            }),
            _: 1
            /* STABLE */

          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1
        /* STABLE */

      })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  })]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=style&index=0&id=600d6cb6&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./source/views/home.vue?vue&type=style&index=0&id=600d6cb6&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1649614486396
      var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("60a046ccfdac789d13b6")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.97c72f99eb8f5a9df11a.hot-update.js.map