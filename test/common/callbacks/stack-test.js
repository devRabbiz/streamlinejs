/*** Generated by streamline 0.10.15 (callbacks) --standalone - DO NOT EDIT ***/ var __rt=(function(){var __modules={},mod;function require(p){var m=__modules[p.substring(3)]; return m && m.exports};__modules['globals']=(mod={exports:{}});(function(module, exports){var glob = typeof global === "object" ? global : window;var secret = "_20c7abceb95c4eb88b7ca1895b1170d1";module.exports = (glob[secret] || (glob[secret] = { context: {} }));var g = glob[secret];g.runtime || Object.defineProperty(g, 'runtime', {get: function() { return g.__runtime__; },set: function(value) {if (g.__runtime__ !== value) {if (g.__runtime__) {if (/-fast$/.test(g.__runtime__) ||/-fast$/.test(value)) throw new Error("cannot mix streamline runtimes: " + g.__runtime__ + " and " + value);console.log("warning: mixing streamline runtimes: " + g.__runtime__ + " and " + value);}g.__runtime__ = value;}}});g.withContext = function(fn, cx) {return function() {var oldContext = g.context;g.context = cx || {};try {fn.apply(this, arguments)} finally {g.context = oldContext;}};};g.setPromise = function(name) {if (g.Promise) return; var req = require; if (name === true) g.Promise = typeof Promise === "function" ? Promise : req('es6-promise');else g.Promise = require(name);};})(mod, mod.exports);__modules['util/future']=(mod={exports:{}});(function(module, exports){(function(exports) {var globals = require("../globals");exports.future = function(fn, args, i) {var err, result, done, q = [], self = this;args = Array.prototype.slice.call(args);args[i] = function(e, r) {err = e, result = r, done = true;q && q.forEach(function(f) {f.call(self, e, r);});q = null;};args[i].__futurecb = true;fn.apply(this, args);var ret = function F(cb) {if (typeof cb !== 'function') {var globals = require('../globals');if (cb == null && globals.Promise) return exports.promise.call(this, F, [], 0);if (cb !== false && !globals.oldStyleFutures) throw new Error("callback missing (argument #0). See https://github.com/Sage/streamlinejs/blob/master/FAQ.md#no-callback-given-error");return F;}if (done) cb.call(self, err, result);else q.push(cb);};ret.__future = true;return ret;};exports.streamlinify = function(fn, idx) {return function() {if (!arguments[idx]) return exports.future.call(this, fn, arguments, idx);else return fn.apply(this, arguments);};};exports.promise = function(fn, args, i) {if (args[i] === false) return exports.future.call(this, fn, args, i);if (args[i] != null) throw new Error("invalid callback: " + typeof(args[i]));if (globals.oldStyleFutures) return exports.future.call(this, fn, args, i);if (!globals.Promise) throw new Error("callback missing (argument #" + i + "). See https://github.com/Sage/streamlinejs/blob/master/FAQ.md#no-callback-given-error");var self = this;args = Array.prototype.slice.call(args);return new globals.Promise(function(resolve, reject) {args[i] = function(e, r) {if (e) reject(e);else resolve(r);};fn.apply(self, args);});};exports.then = function(promise, method, cb) {promise[method](function(r) {cb && cb(null, r);cb = null;}, function(e) {cb && cb(e);cb = null;});};})(typeof exports !== 'undefined' ? exports : (Streamline.future = Streamline.future || {}));})(mod, mod.exports);__modules['callbacks/runtime']=(mod={exports:{}});(function(module, exports){(function(exports) {var __g = require("../globals");__g.runtime = 'callbacks';var __fut = require("../util/future");__g.context = __g.context || {};__g.depth = __g.depth || 0;__g.async = __g.async || false;__g.trampoline = (function() {var q = [];return {queue: function(fn) {q.push(fn);},flush: function() {__g.depth++;try {var fn;while (fn = q.shift()) fn();} finally {__g.depth--;}}}})();exports.runtime = function(filename, oldStyleFutures) {__g.oldStyleFutures = oldStyleFutures;function __func(_, __this, __arguments, fn, index, frame, body) {if (typeof _ !== 'function') return __fut.promise.call(__this, fn, __arguments, index);frame.file = filename;frame.prev = __g.frame;frame.calls = 0;if (frame.prev) frame.prev.calls++;var emitter = __g.emitter;__g.frame = frame;__g.depth++;if (emitter) emitter.emit("enter", frame, _); try {frame.active = true;body();} catch (e) {__setEF(e, frame.prev);__propagate(_, e);} finally {frame.active = false;if (emitter) {emitter.emit("exit", frame);}__g.frame = frame.prev;if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();}}return {__g: __g,__func: __func,__cb: __cb,__future: __fut.future,__propagate: __propagate,__trap: __trap,__tryCatch: __tryCatch,__catch: __catch,__forIn: __forIn,__apply: __apply,__construct: __construct,__setEF: __setEF,streamlinify: __fut.streamlinify,__pthen: __fut.then,};};function __cb(_, frame, offset, col, fn, trampo, returnArray) {frame.offset = offset;frame.col = col;var ctx = __g.context;var calls = frame.calls;var emitter = __g.emitter;var ret = function ___(err, result) {if (returnArray) result = Array.prototype.slice.call(arguments, 1);returnArray = false; var oldFrame = __g.frame;__g.frame = frame;var oldContext = __g.context;__g.context = ctx;if (emitter && __g.depth === 0) emitter.emit('resume', frame);if (emitter) emitter.emit('enter', frame);__g.depth++;try {if (trampo && frame.active && __g.trampoline) {__g.trampoline.queue(function() {return ___(err, result);});} else {___.dispatched = true;if (err) {__setEF(err, frame);return _(err);}frame.active = true;return fn(null, result);}} catch (ex) {if (___.dispatched && _.name !== '___' && _.name !== '__trap' && calls !== frame.calls) throw ex;__setEF(ex, frame);return __propagate(_, ex);} finally {frame.active = false;if (emitter) emitter.emit("exit", frame);__g.frame = oldFrame;if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();__g.context = oldContext;}};if (emitter && !ret.dispatched) emitter.emit('yield', frame);ret.__streamlined = true;return ret;}function __propagate(_, err) {try {_(err);} catch (ex) {__trap(ex);}}function __trap(err) {if (err) {if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);else process.nextTick(function() {throw err;});}}function __tryCatch(_, fn) {try {fn();} catch (e) {try {_(e);} catch (ex) {__trap(ex);}}}function __catch(fn, _) {var frame = __g.frame,context = __g.context;__g.trampoline.queue(function() {var oldFrame = __g.frame,oldContext = __g.context;__g.frame = frame;__g.context = context;try {fn();} catch (ex) {_(ex);} finally {__g.frame = oldFrame;__g.context = oldContext;}});}function __forIn(object) {var array = [];for (var obj in object) {array.push(obj);}return array;}function __apply(cb, fn, thisObj, args, index) {if (cb == null) return __fut.future(__apply, arguments, 0);args = Array.prototype.slice.call(args, 0);args[index != null ? index : args.length] = cb;return fn.apply(thisObj, args);}function __construct(constructor, i) {var key = '__async' + i,f;return constructor[key] || (constructor[key] = function() {var args = arguments;function F() {var self = this;var cb = args[i];args[i] = function(e, r) {cb(e, self);};args[i].__streamlined = cb.__streamlined;args[i].__futurecb = cb.__futurecb;return constructor.apply(self, args);}F.prototype = constructor.prototype;return new F();});}function __setEF(e, f) {function formatStack(e, raw) {var ff = typeof navigator === 'object' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;if (ff) raw = "Error: " + e.message + '\n' + raw;var s = raw,f, skip;var cut = (e.message || '').split('\n').length;var lines = s.split('\n');s = lines.slice(cut).map(function(l) {var m = /([^@]*)\@(.*?)\:(\d+)(?:\:(\d+))?$/.exec(l);l = m ? "  at " + m[1] + " (" + m[2] + ":" + parseInt(m[3]) + ":" + (m[4] || "0") + ")" : l;var i = l.indexOf('__$');if (i >= 0 && !skip) {skip = true;return l.substring(0, i) + l.substring(i + 3);}return skip ? '' : l;}).filter(function(l) {return l;}).join('\n');s = lines.slice(0, cut).join('\n') + '\n  <<< async stack >>>' + (skip ? '\n' + s : '');for (var f = e.__frame; f; f = f.prev) {if (f.offset >= 0) s += "\n  at " + f.name + " (" + f.file + ":" + (f.line + f.offset) + ":" + (f.col+1) + ")"}s += '\n  <<< raw stack >>>' + '\n' + lines.slice(cut).join('\n');return s;};e.__frame = e.__frame || f;if (exports.stackTraceEnabled && e.__lookupGetter__ && e.__lookupGetter__("rawStack") == null) {var getter = e.__lookupGetter__("stack");if (!getter) { var raw = e.stack || "raw stack unavailable";getter = function() {return raw;}}e.__defineGetter__("rawStack", getter);e.__defineGetter__("stack", function() {return formatStack(e, getter());});}}exports.stackTraceEnabled = true;})(typeof exports !== 'undefined' ? exports : (Streamline.runtime = Streamline.runtime || {}));require && require("../callbacks/builtins");})(mod, mod.exports);return __modules['callbacks/runtime'].exports.runtime('test/common/stack-test._js', false);})(),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; QUnit.module(module.id);




var nextTick = __rt.streamlinify(function(cb) {
  setTimeout(function() {
    cb();
  }, 0);
}, 0);



function failAsync(_, code) { var __frame = { name: "failAsync", line: 14 }; return __func(_, this, arguments, failAsync, 0, __frame, function __$failAsync() {
    return _(new Error(code)); });};


function failSync(_, code) { var __frame = { name: "failSync", line: 18 }; return __func(_, this, arguments, failSync, 0, __frame, function __$failSync() {
    (function fail(dummy) {
      throw new Error(code);
    })(0); _(); });};


var fail;

function A(_, code) { var i; var __frame = { name: "A", line: 26 }; return __func(_, this, arguments, A, 0, __frame, function __$A() { return (function __$A(__then) {
      if ((code == 1)) {
        return fail(__cb(_, __frame, 2, 2, __then, true), code); } else { __then(); } ; })(function __$A() { return (function __$A(__then) {
        if ((code == 2)) {
          return fail(__cb(_, __frame, 4, 2, __then, true), code); } else { __then(); } ; })(function __$A() {
        return nextTick(__cb(_, __frame, 5, 1, function __$A() { return (function __$A(__then) {
            if ((code == 3)) {
              return fail(__cb(_, __frame, 7, 2, __then, true), code); } else { __then(); } ; })(function __$A() {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$A() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < 6); if (__5) { return (function __$A(__then) {
                    if ((code == i)) {
                      return fail(__cb(_, __frame, 10, 3, __then, true), code); } else { __then(); } ; })(function __$A() {
                    return nextTick(__cb(_, __frame, 11, 2, function __$A() { while (__more) { __loop(); }; __more = true; }, true)); }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$A() { return (function __$A(__then) {

                if ((code == 6)) {
                  return fail(__cb(_, __frame, 14, 2, __then, true), code); } else { __then(); } ; })(function __$A() {
                return nextTick(__cb(_, __frame, 15, 1, function __$A() {
                  return B(__cb(_, __frame, 16, 1, function __$A() {
                    return nextTick(__cb(_, __frame, 17, 1, function __$A() {
                      return _(null, "END"); }, true)); }, true), code); }, true)); }); }); }); }, true)); }); }); });};


function B(_, code) { var __frame = { name: "B", line: 47 }; return __func(_, this, arguments, B, 0, __frame, function __$B() { return (function __$B(__then) {
      if ((code == 7)) {
        return fail(__cb(_, __frame, 2, 2, __then, true), code); } else { __then(); } ; })(function __$B() {
      return C(__cb(_, __frame, 3, 1, function __$B() {
        return nextTick(__cb(_, __frame, 4, 1, function __$B() {
          return C(__cb(_, __frame, 5, 1, function __$B() {
            return D(__cb(_, __frame, 6, 1, function __$B() { _(); }, true), code); }, true), code); }, true)); }, true), code); }); });};


function C(_, code) { var __frame = { name: "C", line: 56 }; return __func(_, this, arguments, C, 0, __frame, function __$C() { return (function __$C(__then) {
      if ((code == 8)) {
        return fail(__cb(_, __frame, 2, 2, __then, true), code); } else { __then(); } ; })(_); });};


function D(_, code) { var __frame = { name: "D", line: 61 }; return __func(_, this, arguments, D, 0, __frame, function __$D() { return (function __$D(__then) {
      if ((code == 9)) {
        return fail(__cb(_, __frame, 2, 2, __then, true), code); } else { __then(); } ; })(_); });};


function E(_, code) { var __frame = { name: "E", line: 66 }; return __func(_, this, arguments, E, 0, __frame, function __$E() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$E() {

          return fail(__cb(_, __frame, 2, 2, __then, true), code); }); })(function ___(ex, __result) { __catch(function __$E() { if (ex) { return (function __$E(__then) {


              if (((code % 3) == 1)) {
                return fail(__cb(_, __frame, 6, 3, __then, true), code); } else { return (function __$E(__then) {
                  if (((code % 3) == 2)) {
                    return A(__cb(_, __frame, 8, 3, __then, true), code); } else {

                    return _(null, ("OK " + code)); } ; })(__then); } ; })(__then); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$E() { _(); }); }); });};



function F(_, code) { var f1, f2; var __frame = { name: "F", line: 80 }; return __func(_, this, arguments, F, 0, __frame, function __$F() {
    f1 = A(false, code);
    f2 = A(false, (code + 1));
    return f1(__cb(_, __frame, 3, 8, function ___(__0, __2) { return f2(__cb(_, __frame, 3, 24, function ___(__0, __3) { var __1 = ((__2 + " & ") + __3); return _(null, __1); }, true)); }, true)); });};


function G(_, code) { var __frame = { name: "G", line: 86 }; return __func(_, this, arguments, G, 0, __frame, function __$G() { return (function __$G(__then) {
      if ((code == 5)) {
        return fail(__cb(_, __frame, 2, 2, __then, true), code); } else { __then(); } ; })(function __$G() {
      return _(null, ("" + code)); }); });};


function H(_, code) { var __frame = { name: "H", line: 92 }; return __func(_, this, arguments, H, 0, __frame, function __$H() { return (function __$H(__then) {
      if (((code % 2) == 0)) {
        return nextTick(__cb(_, __frame, 2, 2, __then, true)); } else { __then(); } ; })(function __$H() {
      return G(__cb(_, __frame, 3, 8, _, true), code); }); });};


function I(_, code) { var s, i; var __frame = { name: "I", line: 98 }; return __func(_, this, arguments, I, 0, __frame, function __$I() {
    s = "";
    i = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$I() { __more = false; if (__3) { i++; } else { __3 = true; } ; var __2 = (i < code); if (__2) {
          return H(__cb(_, __frame, 3, 7, function ___(__0, __1) { s += __1; while (__more) { __loop(); }; __more = true; }, true), i); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$I() {
      return _(null, s); }); });};


function issue233(_, code) {
  function customThrow() {
    throw new Error("foo"); }; var __frame = { name: "issue233", line: 105 }; return __func(_, this, arguments, issue233, 0, __frame, function __$issue233() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$issue233() {


          return _(new Error("bar")); }); })(function ___(e, __result) { __catch(function __$issue233() { if (e) {

            customThrow(); __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$issue233() { _(); }); }); });};





function T(_, fn, code, failFn) { var s, end; var __frame = { name: "T", line: 118 }; return __func(_, this, arguments, T, 0, __frame, function __$T() {
    fail = failFn;
    s = "{"; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$T() {

          return fn(__cb(_, __frame, 4, 9, _, true), code); }); })(function ___(ex, __result) { __catch(function __$T() { if (ex) {


            s = ex.stack;
            s = s.split("\n").filter(function(l) { return (l.indexOf("<<<") < 0); }).map(function(l) {
              var m = /^\s+at (\w+).*:(\d+)\:[^:]+$/.exec(l);
              if (m) {
                return ((m[1] + ":") + m[2]) };
              return l;
            }).join("/");
            end = s.indexOf("/T:");
            return _(null, ((end < 0) ? (s + "-- end frame missing") : s.substring(0, end))); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$T() { _(); }); }); });};



function stackEqual(got, expect) {
  if (((typeof T_ === "function") && T_.gstreamlineFunction)) { got = got.substring(0, 25); expect = expect.substring(0, 25); } ;
  strictEqual(got, expect, expect);};


var rawStack = (new Error().stack ? function(raw) {
  return raw;
} : function() {
  return "raw stack unavailable";});


asyncTest("stacks", 20, function __1(_) { var __frame = { name: "__1", line: 148 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
    return T(__cb(_, __frame, 1, 12, function ___(__0, __1) { stackEqual(__1, (rawStack("Error: 1/failAsync:15") + "/A:28"));
      return T(__cb(_, __frame, 2, 12, function ___(__0, __2) { stackEqual(__2, (rawStack("Error: 1/fail:20/failSync:21") + "/A:28"));
        return T(__cb(_, __frame, 3, 12, function ___(__0, __3) { stackEqual(__3, (rawStack("Error: 2/failAsync:15") + "/A:30"));
          return T(__cb(_, __frame, 4, 12, function ___(__0, __4) { stackEqual(__4, (rawStack("Error: 2/fail:20/failSync:21") + "/A:30"));
            return T(__cb(_, __frame, 5, 12, function ___(__0, __5) { stackEqual(__5, (rawStack("Error: 3/failAsync:15") + "/A:33"));
              return T(__cb(_, __frame, 6, 12, function ___(__0, __6) { stackEqual(__6, (rawStack("Error: 3/fail:20/failSync:21") + "/A:33"));
                return T(__cb(_, __frame, 7, 12, function ___(__0, __7) { stackEqual(__7, (rawStack("Error: 4/failAsync:15") + "/A:36"));
                  return T(__cb(_, __frame, 8, 12, function ___(__0, __8) { stackEqual(__8, (rawStack("Error: 4/fail:20/failSync:21") + "/A:36"));
                    return T(__cb(_, __frame, 9, 12, function ___(__0, __9) { stackEqual(__9, (rawStack("Error: 5/failAsync:15") + "/A:36"));
                      return T(__cb(_, __frame, 10, 12, function ___(__0, __10) { stackEqual(__10, (rawStack("Error: 5/fail:20/failSync:21") + "/A:36"));
                        return T(__cb(_, __frame, 11, 12, function ___(__0, __11) { stackEqual(__11, (rawStack("Error: 6/failAsync:15") + "/A:40"));
                          return T(__cb(_, __frame, 12, 12, function ___(__0, __12) { stackEqual(__12, (rawStack("Error: 6/fail:20/failSync:21") + "/A:40"));
                            return T(__cb(_, __frame, 13, 12, function ___(__0, __13) { stackEqual(__13, (rawStack("Error: 7/failAsync:15") + "/B:49/A:42"));
                              return T(__cb(_, __frame, 14, 12, function ___(__0, __14) { stackEqual(__14, (rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42"));
                                return T(__cb(_, __frame, 15, 12, function ___(__0, __15) { stackEqual(__15, (rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42"));
                                  return T(__cb(_, __frame, 16, 12, function ___(__0, __16) { stackEqual(__16, (rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42"));
                                    return T(__cb(_, __frame, 17, 12, function ___(__0, __17) { stackEqual(__17, (rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42"));
                                      return T(__cb(_, __frame, 18, 12, function ___(__0, __18) { stackEqual(__18, (rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42"));
                                        return T(__cb(_, __frame, 19, 12, function ___(__0, __19) { stackEqual(__19, "END");
                                          return T(__cb(_, __frame, 20, 12, function ___(__0, __20) { stackEqual(__20, "END");
                                            start(); _(); }, true), A, 10, failSync); }, true), A, 10, failAsync); }, true), A, 9, failSync); }, true), A, 9, failAsync); }, true), A, 8, failSync); }, true), A, 8, failAsync); }, true), A, 7, failSync); }, true), A, 7, failAsync); }, true), A, 6, failSync); }, true), A, 6, failAsync); }, true), A, 5, failSync); }, true), A, 5, failAsync); }, true), A, 4, failSync); }, true), A, 4, failAsync); }, true), A, 3, failSync); }, true), A, 3, failAsync); }, true), A, 2, failSync); }, true), A, 2, failAsync); }, true), A, 1, failSync); }, true), A, 1, failAsync); });});


asyncTest("catch", 20, function __2(_) { var __frame = { name: "__2", line: 172 }; return __func(_, this, arguments, __2, 0, __frame, function __$__2() {
    return T(__cb(_, __frame, 1, 12, function ___(__0, __1) { stackEqual(__1, (rawStack("Error: 1/failAsync:15") + "/E:72"));
      return T(__cb(_, __frame, 2, 12, function ___(__0, __2) { stackEqual(__2, (rawStack("Error: 1/fail:20/failSync:21") + "/E:72"));
        return T(__cb(_, __frame, 3, 12, function ___(__0, __3) { stackEqual(__3, (rawStack("Error: 2/failAsync:15") + "/A:30/E:74"));
          return T(__cb(_, __frame, 4, 12, function ___(__0, __4) { stackEqual(__4, (rawStack("Error: 2/fail:20/failSync:21") + "/A:30/E:74"));
            return T(__cb(_, __frame, 5, 12, function ___(__0, __5) { stackEqual(__5, "OK 3");
              return T(__cb(_, __frame, 6, 12, function ___(__0, __6) { stackEqual(__6, "OK 3");
                return T(__cb(_, __frame, 7, 12, function ___(__0, __7) { stackEqual(__7, (rawStack("Error: 4/failAsync:15") + "/E:72"));
                  return T(__cb(_, __frame, 8, 12, function ___(__0, __8) { stackEqual(__8, (rawStack("Error: 4/fail:20/failSync:21") + "/E:72"));
                    return T(__cb(_, __frame, 9, 12, function ___(__0, __9) { stackEqual(__9, (rawStack("Error: 5/failAsync:15") + "/A:36/E:74"));
                      return T(__cb(_, __frame, 10, 12, function ___(__0, __10) { stackEqual(__10, (rawStack("Error: 5/fail:20/failSync:21") + "/A:36/E:74"));
                        return T(__cb(_, __frame, 11, 12, function ___(__0, __11) { stackEqual(__11, "OK 6");
                          return T(__cb(_, __frame, 12, 12, function ___(__0, __12) { stackEqual(__12, "OK 6");
                            return T(__cb(_, __frame, 13, 12, function ___(__0, __13) { stackEqual(__13, (rawStack("Error: 7/failAsync:15") + "/E:72"));
                              return T(__cb(_, __frame, 14, 12, function ___(__0, __14) { stackEqual(__14, (rawStack("Error: 7/fail:20/failSync:21") + "/E:72"));
                                return T(__cb(_, __frame, 15, 12, function ___(__0, __15) { stackEqual(__15, (rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/E:74"));
                                  return T(__cb(_, __frame, 16, 12, function ___(__0, __16) { stackEqual(__16, (rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/E:74"));
                                    return T(__cb(_, __frame, 17, 12, function ___(__0, __17) { stackEqual(__17, "OK 9");
                                      return T(__cb(_, __frame, 18, 12, function ___(__0, __18) { stackEqual(__18, "OK 9");
                                        return T(__cb(_, __frame, 19, 12, function ___(__0, __19) { stackEqual(__19, (rawStack("Error: 10/failAsync:15") + "/E:72"));
                                          return T(__cb(_, __frame, 20, 12, function ___(__0, __20) { stackEqual(__20, (rawStack("Error: 10/fail:20/failSync:21") + "/E:72"));
                                            start(); _(); }, true), E, 10, failSync); }, true), E, 10, failAsync); }, true), E, 9, failSync); }, true), E, 9, failAsync); }, true), E, 8, failSync); }, true), E, 8, failAsync); }, true), E, 7, failSync); }, true), E, 7, failAsync); }, true), E, 6, failSync); }, true), E, 6, failAsync); }, true), E, 5, failSync); }, true), E, 5, failAsync); }, true), E, 4, failSync); }, true), E, 4, failAsync); }, true), E, 3, failSync); }, true), E, 3, failAsync); }, true), E, 2, failSync); }, true), E, 2, failAsync); }, true), E, 1, failSync); }, true), E, 1, failAsync); });});


asyncTest("futures", 20, function __3(_) { var __frame = { name: "__3", line: 196 }; return __func(_, this, arguments, __3, 0, __frame, function __$__3() {
    return T(__cb(_, __frame, 1, 12, function ___(__0, __1) { stackEqual(__1, (rawStack("Error: 1/failAsync:15") + "/A:28/F:83"));
      return T(__cb(_, __frame, 2, 12, function ___(__0, __2) { stackEqual(__2, (rawStack("Error: 1/fail:20/failSync:21") + "/A:28/F:83"));
        return T(__cb(_, __frame, 3, 12, function ___(__0, __3) { stackEqual(__3, (rawStack("Error: 2/failAsync:15") + "/A:30/F:83"));
          return T(__cb(_, __frame, 4, 12, function ___(__0, __4) { stackEqual(__4, (rawStack("Error: 2/fail:20/failSync:21") + "/A:30/F:83"));
            return T(__cb(_, __frame, 5, 12, function ___(__0, __5) { stackEqual(__5, (rawStack("Error: 3/failAsync:15") + "/A:33/F:83"));
              return T(__cb(_, __frame, 6, 12, function ___(__0, __6) { stackEqual(__6, (rawStack("Error: 3/fail:20/failSync:21") + "/A:33/F:83"));
                return T(__cb(_, __frame, 7, 12, function ___(__0, __7) { stackEqual(__7, (rawStack("Error: 4/failAsync:15") + "/A:36/F:83"));
                  return T(__cb(_, __frame, 8, 12, function ___(__0, __8) { stackEqual(__8, (rawStack("Error: 4/fail:20/failSync:21") + "/A:36/F:83"));
                    return T(__cb(_, __frame, 9, 12, function ___(__0, __9) { stackEqual(__9, (rawStack("Error: 5/failAsync:15") + "/A:36/F:83"));
                      return T(__cb(_, __frame, 10, 12, function ___(__0, __10) { stackEqual(__10, (rawStack("Error: 5/fail:20/failSync:21") + "/A:36/F:83"));
                        return T(__cb(_, __frame, 11, 12, function ___(__0, __11) { stackEqual(__11, (rawStack("Error: 6/failAsync:15") + "/A:40/F:83"));
                          return T(__cb(_, __frame, 12, 12, function ___(__0, __12) { stackEqual(__12, (rawStack("Error: 6/fail:20/failSync:21") + "/A:40/F:83"));
                            return T(__cb(_, __frame, 13, 12, function ___(__0, __13) { stackEqual(__13, (rawStack("Error: 7/failAsync:15") + "/B:49/A:42/F:83"));
                              return T(__cb(_, __frame, 14, 12, function ___(__0, __14) { stackEqual(__14, (rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42/F:83"));
                                return T(__cb(_, __frame, 15, 12, function ___(__0, __15) { stackEqual(__15, (rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/F:83"));
                                  return T(__cb(_, __frame, 16, 12, function ___(__0, __16) { stackEqual(__16, (rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/F:83"));
                                    return T(__cb(_, __frame, 17, 12, function ___(__0, __17) { stackEqual(__17, (rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42/F:83"));
                                      return T(__cb(_, __frame, 18, 12, function ___(__0, __18) { stackEqual(__18, (rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42/F:83"));
                                        return T(__cb(_, __frame, 19, 12, function ___(__0, __19) { stackEqual(__19, "END & END");
                                          return T(__cb(_, __frame, 20, 12, function ___(__0, __20) { stackEqual(__20, "END & END");
                                            start(); _(); }, true), F, 10, failSync); }, true), F, 10, failAsync); }, true), F, 9, failSync); }, true), F, 9, failAsync); }, true), F, 8, failSync); }, true), F, 8, failAsync); }, true), F, 7, failSync); }, true), F, 7, failAsync); }, true), F, 6, failSync); }, true), F, 6, failAsync); }, true), F, 5, failSync); }, true), F, 5, failAsync); }, true), F, 4, failSync); }, true), F, 4, failAsync); }, true), F, 3, failSync); }, true), F, 3, failAsync); }, true), F, 2, failSync); }, true), F, 2, failAsync); }, true), F, 1, failSync); }, true), F, 1, failAsync); });});


asyncTest("loop", 8, function __4(_) { var __frame = { name: "__4", line: 220 }; return __func(_, this, arguments, __4, 0, __frame, function __$__4() {
    return T(__cb(_, __frame, 1, 12, function ___(__0, __1) { stackEqual(__1, "0123");
      return T(__cb(_, __frame, 2, 12, function ___(__0, __2) { stackEqual(__2, "0123");
        return T(__cb(_, __frame, 3, 12, function ___(__0, __3) { stackEqual(__3, "01234");
          return T(__cb(_, __frame, 4, 12, function ___(__0, __4) { stackEqual(__4, "01234");
            return T(__cb(_, __frame, 5, 12, function ___(__0, __5) { stackEqual(__5, (rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101"));
              return T(__cb(_, __frame, 6, 12, function ___(__0, __6) { stackEqual(__6, (rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101"));
                return T(__cb(_, __frame, 7, 12, function ___(__0, __7) { stackEqual(__7, (rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101"));
                  return T(__cb(_, __frame, 8, 12, function ___(__0, __8) { stackEqual(__8, (rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101"));
                    start(); _(); }, true), I, 7, failSync); }, true), I, 7, failAsync); }, true), I, 6, failSync); }, true), I, 6, failAsync); }, true), I, 5, failSync); }, true), I, 5, failAsync); }, true), I, 4, failSync); }, true), I, 4, failAsync); });});


asyncTest("issue233", 1, function __5(_) { var __frame = { name: "__5", line: 232 }; return __func(_, this, arguments, __5, 0, __frame, function __$__5() {
    return T(__cb(_, __frame, 1, 12, function ___(__0, __1) { stackEqual(__1, "Error: foo/customThrow:107/issue233:112");
      start(); _(); }, true), issue233, 0, failSync); });});
