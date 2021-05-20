module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/new-meetup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/next-connect/dist/index.cjs":
/*!**************************************************!*\
  !*** ./node_modules/next-connect/dist/index.cjs ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Trouter = __webpack_require__(/*! trouter */ \"trouter\");\n\nconst onerror = (err, req, res) =>\n  (res.statusCode = err.status || 500) && res.end(err.message);\nconst isResSent = (res) => res.finished || res.headersSent || res.writableEnded;\nconst mount = (fn) => (fn.routes ? fn.handle.bind(fn) : fn);\n\nmodule.exports = function factory({\n  onError = onerror,\n  onNoMatch = onerror.bind(null, { status: 404, message: \"not found\" }),\n  attachParams = false,\n} = {}) {\n  function nc(req, res) {\n    return nc.run(req, res).then(\n      () => !isResSent(res) && onNoMatch(req, res),\n      (err) => onError(err, req, res)\n    );\n  }\n  nc.routes = [];\n  const _use = Trouter.prototype.use.bind(nc);\n  const _find = Trouter.prototype.find.bind(nc);\n  const _add = Trouter.prototype.add.bind(nc);\n  function add(method, base, ...fns) {\n    if (typeof base !== \"string\") return add(method, \"*\", base, ...fns);\n    _add(method, base, ...fns);\n    return nc;\n  }\n  nc.use = function use(base, ...fns) {\n    if (typeof base !== \"string\") return this.use(\"/\", base, ...fns);\n    if (base !== \"/\") {\n      let slashAdded = false;\n      fns.unshift((req, _, next) => {\n        req.url = req.url.substring(base.length);\n        if ((slashAdded = req.url[0] !== \"/\")) req.url = \"/\" + req.url;\n        next();\n      });\n      fns.push(\n        (req, _, next) =>\n          (req.url = base + (slashAdded ? req.url.substring(1) : req.url)) &&\n          next()\n      );\n    }\n    _use(base, ...fns.map(mount));\n    return nc;\n  };\n  nc.all = add.bind(nc, \"\");\n  nc.get = add.bind(nc, \"GET\");\n  nc.head = add.bind(nc, \"HEAD\");\n  nc.post = add.bind(nc, \"POST\");\n  nc.put = add.bind(nc, \"PUT\");\n  nc.delete = add.bind(nc, \"DELETE\");\n  nc.options = add.bind(nc, \"OPTIONS\");\n  nc.trace = add.bind(nc, \"TRACE\");\n  nc.patch = add.bind(nc, \"PATCH\");\n  nc.run = function run(req, res) {\n    return new Promise((resolve, reject) => {\n      this.handle(req, res, (err) => (err ? reject(err) : resolve()));\n    });\n  };\n  nc.handle = function handle(req, res, done) {\n    const idx = req.url.indexOf(\"?\");\n    const { handlers, params } = _find(\n      req.method,\n      idx !== -1 ? req.url.substring(0, idx) : req.url\n    );\n    if (attachParams) req.params = params;\n    let i = 0;\n    const len = handlers.length;\n    const loop = async (next) => handlers[i++](req, res, next);\n    const next = (err) => {\n      i < len\n        ? err\n          ? onError(err, req, res, next)\n          : loop(next).catch(next)\n        : done && done(err);\n    };\n    next();\n  };\n  return nc;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC1jb25uZWN0L2Rpc3QvaW5kZXguY2pzPzAwMmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0Msb0NBQW9DO0FBQ3RFO0FBQ0EsQ0FBQyxLQUFLO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL25leHQtY29ubmVjdC9kaXN0L2luZGV4LmNqcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRyb3V0ZXIgPSByZXF1aXJlKCd0cm91dGVyJyk7XG5cbmNvbnN0IG9uZXJyb3IgPSAoZXJyLCByZXEsIHJlcykgPT5cbiAgKHJlcy5zdGF0dXNDb2RlID0gZXJyLnN0YXR1cyB8fCA1MDApICYmIHJlcy5lbmQoZXJyLm1lc3NhZ2UpO1xuY29uc3QgaXNSZXNTZW50ID0gKHJlcykgPT4gcmVzLmZpbmlzaGVkIHx8IHJlcy5oZWFkZXJzU2VudCB8fCByZXMud3JpdGFibGVFbmRlZDtcbmNvbnN0IG1vdW50ID0gKGZuKSA9PiAoZm4ucm91dGVzID8gZm4uaGFuZGxlLmJpbmQoZm4pIDogZm4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhY3Rvcnkoe1xuICBvbkVycm9yID0gb25lcnJvcixcbiAgb25Ob01hdGNoID0gb25lcnJvci5iaW5kKG51bGwsIHsgc3RhdHVzOiA0MDQsIG1lc3NhZ2U6IFwibm90IGZvdW5kXCIgfSksXG4gIGF0dGFjaFBhcmFtcyA9IGZhbHNlLFxufSA9IHt9KSB7XG4gIGZ1bmN0aW9uIG5jKHJlcSwgcmVzKSB7XG4gICAgcmV0dXJuIG5jLnJ1bihyZXEsIHJlcykudGhlbihcbiAgICAgICgpID0+ICFpc1Jlc1NlbnQocmVzKSAmJiBvbk5vTWF0Y2gocmVxLCByZXMpLFxuICAgICAgKGVycikgPT4gb25FcnJvcihlcnIsIHJlcSwgcmVzKVxuICAgICk7XG4gIH1cbiAgbmMucm91dGVzID0gW107XG4gIGNvbnN0IF91c2UgPSBUcm91dGVyLnByb3RvdHlwZS51c2UuYmluZChuYyk7XG4gIGNvbnN0IF9maW5kID0gVHJvdXRlci5wcm90b3R5cGUuZmluZC5iaW5kKG5jKTtcbiAgY29uc3QgX2FkZCA9IFRyb3V0ZXIucHJvdG90eXBlLmFkZC5iaW5kKG5jKTtcbiAgZnVuY3Rpb24gYWRkKG1ldGhvZCwgYmFzZSwgLi4uZm5zKSB7XG4gICAgaWYgKHR5cGVvZiBiYXNlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gYWRkKG1ldGhvZCwgXCIqXCIsIGJhc2UsIC4uLmZucyk7XG4gICAgX2FkZChtZXRob2QsIGJhc2UsIC4uLmZucyk7XG4gICAgcmV0dXJuIG5jO1xuICB9XG4gIG5jLnVzZSA9IGZ1bmN0aW9uIHVzZShiYXNlLCAuLi5mbnMpIHtcbiAgICBpZiAodHlwZW9mIGJhc2UgIT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLnVzZShcIi9cIiwgYmFzZSwgLi4uZm5zKTtcbiAgICBpZiAoYmFzZSAhPT0gXCIvXCIpIHtcbiAgICAgIGxldCBzbGFzaEFkZGVkID0gZmFsc2U7XG4gICAgICBmbnMudW5zaGlmdCgocmVxLCBfLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcS51cmwgPSByZXEudXJsLnN1YnN0cmluZyhiYXNlLmxlbmd0aCk7XG4gICAgICAgIGlmICgoc2xhc2hBZGRlZCA9IHJlcS51cmxbMF0gIT09IFwiL1wiKSkgcmVxLnVybCA9IFwiL1wiICsgcmVxLnVybDtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgICBmbnMucHVzaChcbiAgICAgICAgKHJlcSwgXywgbmV4dCkgPT5cbiAgICAgICAgICAocmVxLnVybCA9IGJhc2UgKyAoc2xhc2hBZGRlZCA/IHJlcS51cmwuc3Vic3RyaW5nKDEpIDogcmVxLnVybCkpICYmXG4gICAgICAgICAgbmV4dCgpXG4gICAgICApO1xuICAgIH1cbiAgICBfdXNlKGJhc2UsIC4uLmZucy5tYXAobW91bnQpKTtcbiAgICByZXR1cm4gbmM7XG4gIH07XG4gIG5jLmFsbCA9IGFkZC5iaW5kKG5jLCBcIlwiKTtcbiAgbmMuZ2V0ID0gYWRkLmJpbmQobmMsIFwiR0VUXCIpO1xuICBuYy5oZWFkID0gYWRkLmJpbmQobmMsIFwiSEVBRFwiKTtcbiAgbmMucG9zdCA9IGFkZC5iaW5kKG5jLCBcIlBPU1RcIik7XG4gIG5jLnB1dCA9IGFkZC5iaW5kKG5jLCBcIlBVVFwiKTtcbiAgbmMuZGVsZXRlID0gYWRkLmJpbmQobmMsIFwiREVMRVRFXCIpO1xuICBuYy5vcHRpb25zID0gYWRkLmJpbmQobmMsIFwiT1BUSU9OU1wiKTtcbiAgbmMudHJhY2UgPSBhZGQuYmluZChuYywgXCJUUkFDRVwiKTtcbiAgbmMucGF0Y2ggPSBhZGQuYmluZChuYywgXCJQQVRDSFwiKTtcbiAgbmMucnVuID0gZnVuY3Rpb24gcnVuKHJlcSwgcmVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlKHJlcSwgcmVzLCAoZXJyKSA9PiAoZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKCkpKTtcbiAgICB9KTtcbiAgfTtcbiAgbmMuaGFuZGxlID0gZnVuY3Rpb24gaGFuZGxlKHJlcSwgcmVzLCBkb25lKSB7XG4gICAgY29uc3QgaWR4ID0gcmVxLnVybC5pbmRleE9mKFwiP1wiKTtcbiAgICBjb25zdCB7IGhhbmRsZXJzLCBwYXJhbXMgfSA9IF9maW5kKFxuICAgICAgcmVxLm1ldGhvZCxcbiAgICAgIGlkeCAhPT0gLTEgPyByZXEudXJsLnN1YnN0cmluZygwLCBpZHgpIDogcmVxLnVybFxuICAgICk7XG4gICAgaWYgKGF0dGFjaFBhcmFtcykgcmVxLnBhcmFtcyA9IHBhcmFtcztcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbGVuID0gaGFuZGxlcnMubGVuZ3RoO1xuICAgIGNvbnN0IGxvb3AgPSBhc3luYyAobmV4dCkgPT4gaGFuZGxlcnNbaSsrXShyZXEsIHJlcywgbmV4dCk7XG4gICAgY29uc3QgbmV4dCA9IChlcnIpID0+IHtcbiAgICAgIGkgPCBsZW5cbiAgICAgICAgPyBlcnJcbiAgICAgICAgICA/IG9uRXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dClcbiAgICAgICAgICA6IGxvb3AobmV4dCkuY2F0Y2gobmV4dClcbiAgICAgICAgOiBkb25lICYmIGRvbmUoZXJyKTtcbiAgICB9O1xuICAgIG5leHQoKTtcbiAgfTtcbiAgcmV0dXJuIG5jO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next-connect/dist/index.cjs\n");

/***/ }),

/***/ "./pages/api/new-meetup.ts":
/*!*********************************!*\
  !*** ./pages/api/new-meetup.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/database */ \"./util/database.js\");\n // /api/new-meetup\n// POST /api/new-meetup\n\nasync function handler(req, res) {\n  if (req.method === 'POST') {\n    const data = req.body;\n    const {\n      db\n    } = await Object(_util_database__WEBPACK_IMPORTED_MODULE_0__[\"ConnectToDatabase\"])();\n    const meetupsCollection = db.collection('meetups');\n    const result = await meetupsCollection.insertOne(data);\n    console.log(result);\n    res.status(201).json({\n      message: 'Meetup inserted!'\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbmV3LW1lZXR1cC50cz85YjExIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJkYXRhIiwiYm9keSIsImRiIiwiQ29ubmVjdFRvRGF0YWJhc2UiLCJtZWV0dXBzQ29sbGVjdGlvbiIsImNvbGxlY3Rpb24iLCJyZXN1bHQiLCJpbnNlcnRPbmUiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiJBQUVBO0FBQUE7Q0FFQTtBQUNBOztBQUVBLGVBQWVBLE9BQWYsQ0FBdUJDLEdBQXZCLEVBQTJDQyxHQUEzQyxFQUFpRTtBQUMvRCxNQUFJRCxHQUFHLENBQUNFLE1BQUosS0FBZSxNQUFuQixFQUEyQjtBQUN6QixVQUFNQyxJQUFJLEdBQUdILEdBQUcsQ0FBQ0ksSUFBakI7QUFFQSxVQUFNO0FBQUNDO0FBQUQsUUFBTyxNQUFNQyx3RUFBaUIsRUFBcEM7QUFFQSxVQUFNQyxpQkFBaUIsR0FBR0YsRUFBRSxDQUFDRyxVQUFILENBQWMsU0FBZCxDQUExQjtBQUVBLFVBQU1DLE1BQU0sR0FBRyxNQUFNRixpQkFBaUIsQ0FBQ0csU0FBbEIsQ0FBNEJQLElBQTVCLENBQXJCO0FBRUFRLFdBQU8sQ0FBQ0MsR0FBUixDQUFZSCxNQUFaO0FBR0FSLE9BQUcsQ0FBQ1ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGFBQU8sRUFBRTtBQUFYLEtBQXJCO0FBQ0Q7QUFDRjs7QUFFY2hCLHNFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL25ldy1tZWV0dXAudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnXG5pbXBvcnQge0Nvbm5lY3RUb0RhdGFiYXNlfSBmcm9tICcuLi8uLi91dGlsL2RhdGFiYXNlJztcblxuLy8gL2FwaS9uZXctbWVldHVwXG4vLyBQT1NUIC9hcGkvbmV3LW1lZXR1cFxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTpOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcblxuICAgIGNvbnN0IHtkYn0gPSBhd2FpdCBDb25uZWN0VG9EYXRhYmFzZSgpO1xuXG4gICAgY29uc3QgbWVldHVwc0NvbGxlY3Rpb24gPSBkYi5jb2xsZWN0aW9uKCdtZWV0dXBzJyk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtZWV0dXBzQ29sbGVjdGlvbi5pbnNlcnRPbmUoZGF0YSk7XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG5cbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IG1lc3NhZ2U6ICdNZWV0dXAgaW5zZXJ0ZWQhJyB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/new-meetup.ts\n");

/***/ }),

/***/ "./util/database.js":
/*!**************************!*\
  !*** ./util/database.js ***!
  \**************************/
/*! exports provided: ConnectToDatabase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConnectToDatabase\", function() { return ConnectToDatabase; });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-connect */ \"./node_modules/next-connect/dist/index.cjs\");\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_connect__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst {\n  MONGODB_URI,\n  MONGODB_DB\n} = process.env;\n\nif (!MONGODB_URI) {\n  throw new Error('Please enter mongodb uri');\n}\n\nif (!MONGODB_DB) {\n  throw new Error('Please enter mongodb uri');\n}\n\nlet cached = global.mongo;\nif (!cached) cached = global.mongo = {};\nasync function ConnectToDatabase() {\n  if (cached.conn) return cached.conn;\n\n  if (!cached.promise) {\n    const conn = {};\n    const opts = {\n      useNewUrlParser: true,\n      useUnifiedTopology: true\n    };\n    cached.promise = mongodb__WEBPACK_IMPORTED_MODULE_0__[\"MongoClient\"].connect(MONGODB_URI, opts).then(client => {\n      conn.client = client;\n      return client.db(MONGODB_DB);\n    }).then(db => {\n      conn.db = db;\n      cached.conn = conn;\n    });\n  }\n\n  await cached.promise;\n  return cached.conn;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlsL2RhdGFiYXNlLmpzPzc2MTMiXSwibmFtZXMiOlsiTU9OR09EQl9VUkkiLCJNT05HT0RCX0RCIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwibW9uZ28iLCJDb25uZWN0VG9EYXRhYmFzZSIsImNvbm4iLCJwcm9taXNlIiwib3B0cyIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsIk1vbmdvQ2xpZW50IiwiY29ubmVjdCIsInRoZW4iLCJjbGllbnQiLCJkYiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLE1BQU07QUFBQ0EsYUFBRDtBQUFjQztBQUFkLElBQTRCQyxPQUFPLENBQUNDLEdBQTFDOztBQUVBLElBQUcsQ0FBQ0gsV0FBSixFQUFnQjtBQUNkLFFBQU0sSUFBSUksS0FBSixDQUNKLDBCQURJLENBQU47QUFHRDs7QUFDRCxJQUFHLENBQUNILFVBQUosRUFBZTtBQUNiLFFBQU0sSUFBSUcsS0FBSixDQUNKLDBCQURJLENBQU47QUFHRDs7QUFFRCxJQUFJQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsS0FBcEI7QUFDQSxJQUFJLENBQUNGLE1BQUwsRUFBYUEsTUFBTSxHQUFHQyxNQUFNLENBQUNDLEtBQVAsR0FBYyxFQUF2QjtBQUVOLGVBQWVDLGlCQUFmLEdBQWtDO0FBQ3ZDLE1BQUdILE1BQU0sQ0FBQ0ksSUFBVixFQUFnQixPQUFPSixNQUFNLENBQUNJLElBQWQ7O0FBQ2hCLE1BQUcsQ0FBQ0osTUFBTSxDQUFDSyxPQUFYLEVBQW1CO0FBQ2pCLFVBQU1ELElBQUksR0FBRSxFQUFaO0FBQ0EsVUFBTUUsSUFBSSxHQUFFO0FBQ1ZDLHFCQUFlLEVBQUUsSUFEUDtBQUVWQyx3QkFBa0IsRUFBQztBQUZULEtBQVo7QUFJRlIsVUFBTSxDQUFDSyxPQUFQLEdBQWlCSSxtREFBVyxDQUFDQyxPQUFaLENBQW9CZixXQUFwQixFQUFnQ1csSUFBaEMsRUFDaEJLLElBRGdCLENBQ1ZDLE1BQUQsSUFBVTtBQUNkUixVQUFJLENBQUNRLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQU9BLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVakIsVUFBVixDQUFQO0FBQ0QsS0FKZ0IsRUFLaEJlLElBTGdCLENBS1ZFLEVBQUQsSUFBUTtBQUNaVCxVQUFJLENBQUNTLEVBQUwsR0FBU0EsRUFBVDtBQUNBYixZQUFNLENBQUNJLElBQVAsR0FBYUEsSUFBYjtBQUNELEtBUmdCLENBQWpCO0FBU0M7O0FBQ0QsUUFBTUosTUFBTSxDQUFDSyxPQUFiO0FBQ0EsU0FBT0wsTUFBTSxDQUFDSSxJQUFkO0FBQ0QiLCJmaWxlIjoiLi91dGlsL2RhdGFiYXNlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcbmltcG9ydCBuZXh0Q29ubmVjdCBmcm9tICduZXh0LWNvbm5lY3QnO1xuXG5jb25zdCB7TU9OR09EQl9VUkksIE1PTkdPREJfREJ9ID0gcHJvY2Vzcy5lbnZcblxuaWYoIU1PTkdPREJfVVJJKXtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdQbGVhc2UgZW50ZXIgbW9uZ29kYiB1cmknXG4gIClcbn1cbmlmKCFNT05HT0RCX0RCKXtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdQbGVhc2UgZW50ZXIgbW9uZ29kYiB1cmknXG4gIClcbn1cblxubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb1xuaWYgKCFjYWNoZWQpIGNhY2hlZCA9IGdsb2JhbC5tb25nbyA9e31cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENvbm5lY3RUb0RhdGFiYXNlKCl7XG4gIGlmKGNhY2hlZC5jb25uKSByZXR1cm4gY2FjaGVkLmNvbm5cbiAgaWYoIWNhY2hlZC5wcm9taXNlKXtcbiAgICBjb25zdCBjb25uID17fVxuICAgIGNvbnN0IG9wdHMgPXtcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICAgIHVzZVVuaWZpZWRUb3BvbG9neTp0cnVlXG4gICAgfVxuICBjYWNoZWQucHJvbWlzZSA9IE1vbmdvQ2xpZW50LmNvbm5lY3QoTU9OR09EQl9VUkksb3B0cylcbiAgLnRoZW4oKGNsaWVudCk9PntcbiAgICBjb25uLmNsaWVudCA9IGNsaWVudFxuICAgIHJldHVybiBjbGllbnQuZGIoTU9OR09EQl9EQilcbiAgfSlcbiAgLnRoZW4oKGRiKSA9PiB7IFxuICAgIGNvbm4uZGIgPWRiXG4gICAgY2FjaGVkLmNvbm4gPWNvbm5cbiAgfSlcbiAgfVxuICBhd2FpdCBjYWNoZWQucHJvbWlzZVxuICByZXR1cm4gY2FjaGVkLmNvbm5cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./util/database.js\n");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCI/ZGVmZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJtb25nb2RiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongodb\n");

/***/ }),

/***/ "trouter":
/*!**************************!*\
  !*** external "trouter" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"trouter\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cm91dGVyXCI/Y2FlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ0cm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHJvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///trouter\n");

/***/ })

/******/ });