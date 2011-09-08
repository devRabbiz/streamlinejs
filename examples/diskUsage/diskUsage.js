/*** Generated by streamline 0.1.40 - DO NOT EDIT ***/
var __g=typeof global!=='undefined'?global:window;__g=(__g.__streamline||(__g.__streamline={}));__g.setEF=__g.setEF||function(e,f){e.__frame = e.__frame||f};var __srcName='streamline/examples/diskUsage/diskUsage_.js';
function __func(_, __this, __arguments, fn, index, frame, body){ if (!_) { return __future.call(__this, fn, __arguments, index); } frame.file = __srcName; frame.prev = __g.frame; __g.frame = frame; try { body(); } catch (e) { __g.setEF(e, frame.prev); __propagate(_, e); } finally { __g.frame = frame.prev; } }
function __cb(_, frame, offset, col, fn){ frame.offset = offset; frame.col = col; var ctx = __g.context; return function ___(err, result){ var oldFrame = __g.frame; __g.frame = frame; __g.context = ctx; try { if (err) { __g.setEF(err, frame); return _(err); } return fn(null, result); } catch (ex) { __g.setEF(ex, frame); return __propagate(_, ex); } finally { __g.frame = oldFrame; } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
function __tryCatch(_, fn){ try { fn(); } catch (e) { try { _(e); } catch (ex) { __trap(ex); } } }
            (function main(_) {
              var fs, p, t0;
/*    13 */   function du(_, path) {
                var total, stat, files, i;
                var __frame = {
                  name: "du",
                  line: 13
                };
                return __func(_, this, arguments, du, 0, __frame, function __$du() {
/*    14 */       total = 0;
/*    15 */       return fs.stat(path, __cb(_, __frame, 2, 12, function ___(__0, __1) {
                    stat = __1;
                    return (function __$du(__then) {
/*    16 */           if (stat.isFile()) {
/*    17 */             return fs.readFile(path, __cb(_, __frame, 4, 11, function ___(__0, __2) {
/*    17 */               total += __2.length;
                          __then();
                        }));
                      }
                       else {
                        return (function __$du(__then) {
/*    19 */               if (stat.isDirectory()) {
/*    20 */                 return fs.readdir(path, __cb(_, __frame, 7, 14, function ___(__0, __3) {
                              files = __3;
/*    21 */                   i = 0;
                              var __9 = false;
                              return (function ___(__break) {
                                var __more;
                                var __loop = __cb(_, __frame, 0, 0, function __$du() {
                                  __more = false;
                                  if (__9) {
/*    21 */                         i++;
                                  }
                                   else {
                                    __9 = true;
                                  }
                                ;
/*    21 */                       var __8 = (i < files.length);
                                  if (__8) {
/*    22 */                         return du(__cb(_, __frame, 9, 12, function ___(__0, __4) {
/*    22 */                           total += __4;
                                      while (__more) {
                                        __loop();
                                      };
                                      __more = true;
/*    22 */                         }), ((path + "/") + files[i]));
                                  }
                                   else {
                                    __break();
                                  }
                                ;
                                });
                                do {
                                  __loop();
                                } while (__more);
                                __more = true;
                              })(function __$du() {
/*    24 */                     console.log(((path + ": ") + total));
                                __then();
                              });
                            }));
                          }
                           else {
/*    27 */                 console.log((path + ": odd file"));
                            __then();
                          }
                        ;
                        })(__then);
                      }
                    ;
                    })(function __$du() {
/*    29 */           return _(null, total);
                    });
                  }));
                });
              };
              var __frame = {
                name: "main",
                line: 1
              };
              return __func(_, this, arguments, main, 0, __frame, function __$main() {
/*    11 */     fs = require("fs");
                return (function ___(__then) {
                  (function ___(_) {
                    __tryCatch(_, function __$main() {
/*    33 */           p = ((process.argv.length > 2) ? process.argv[2] : ".");
/*    35 */           t0 = Date.now();
/*    36 */           return du(__cb(_, __frame, 35, 1, function __$main() {
/*    37 */             console.log((("completed in " + ((Date.now() - t0))) + " ms"));
                        __then();
/*    36 */           }), p);
                    });
                  })(function ___(ex, __result) {
                    __tryCatch(_, function __$main() {
                      if (ex) {
/*    40 */             console.error(ex.stack);
                        __then();
                      }
                       else {
                        _(null, __result);
                      }
                    ;
                    });
                  });
                })(function ___() {
                  __tryCatch(_, _);
                });
              });
            }).call(this, __trap);
