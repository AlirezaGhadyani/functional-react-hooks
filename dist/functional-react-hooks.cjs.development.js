'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var cookieStorage = _interopDefault(require('js-cookie'));

var useBool = (function (initialState) {
  if (initialState === void 0) {
    initialState = false;
  }
  var _useState = react.useState(initialState),
    bool = _useState[0],
    setBool = _useState[1];
  // * toggle bool
  var toggleBool = function toggleBool() {
    return setBool(function (prevBool) {
      return !prevBool;
    });
  };
  // * set bool true
  var setBoolTrue = function setBoolTrue() {
    return setBool(true);
  };
  // * set bool false
  var setBoolFalse = function setBoolFalse() {
    return setBool(false);
  };
  return {
    bool: bool,
    setBool: setBool,
    toggleBool: toggleBool,
    setBoolTrue: setBoolTrue,
    setBoolFalse: setBoolFalse
  };
});

var useIsDomReady = (function () {
  var _useState = react.useState(false),
    isDomReady = _useState[0],
    setIsDomReady = _useState[1];
  react.useEffect(function () {
    setIsDomReady(true);
    return function () {
      return setIsDomReady(false);
    };
  }, []);
  return isDomReady;
});

var useViewportSize = (function () {
  // * set undefined values to match values in server and client
  var _useState = react.useState({
      width: undefined,
      height: undefined
    }),
    viewportSize = _useState[0],
    setViewportSize = _useState[1];
  // * a handler func for setting window inner sizes
  var setSizeHandler = react.useCallback(function () {
    return setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);
  react.useEffect(function () {
    window.addEventListener('resize', setSizeHandler, {
      passive: true
    });
    window.addEventListener('orientationchange', setSizeHandler, {
      passive: true
    });
    // ? Call handler right away so state gets updated with initial window size
    setSizeHandler();
    return function () {
      window.removeEventListener('resize', setSizeHandler);
      window.removeEventListener('orientationchange', setSizeHandler);
    };
  }, [setSizeHandler]);
  return viewportSize;
});

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var useAsync = (function (asyncFunction, options) {
  if (options === void 0) {
    options = {
      immediate: true
    };
  }
  var _useState = react.useState(null),
    response = _useState[0],
    setResponse = _useState[1];
  var _useState2 = react.useState('Idle'),
    status = _useState2[0],
    setStatus = _useState2[1];
  var _useState3 = react.useState(null),
    error = _useState3[0],
    setError = _useState3[1];
  // * function to execute asyncFunction
  var executeAsync = react.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
      var resault;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // * Before calling asyncFunction set status to pending
            setStatus('Pending');
            setResponse(null);
            setError(null);
            _context.prev = 3;
            _context.next = 6;
            return asyncFunction(args == null ? void 0 : args.variables);
          case 6:
            resault = _context.sent;
            setStatus('Success');
            setResponse(resault);
            setError(null);
            if (args != null && args.onSuccess) args.onSuccess(resault, status);
            _context.next = 19;
            break;
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            setStatus('Error');
            setError(_context.t0);
            setResponse(null);
            if (args != null && args.onError) args.onError(_context.t0, status);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 13]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [asyncFunction, status]);
  // * by default execute `executeAsync` function on component mount
  react.useEffect(function () {
    if (options.immediate) {
      var _options, _options2, _options3;
      executeAsync({
        onError: (_options = options) == null ? void 0 : _options.onError,
        onSuccess: (_options2 = options) == null ? void 0 : _options2.onSuccess,
        variables: (_options3 = options) == null ? void 0 : _options3.variables
      });
    }
  }, [options, executeAsync]);
  return [executeAsync, {
    response: response,
    status: status,
    error: error
  }];
});

var useEventListener = (function (options) {
  var eventName = options.eventName,
    handler = options.handler,
    _options$element = options.element,
    element = _options$element === void 0 ? window : _options$element;
  // * Create a ref that stores handler
  var savedHandler = react.useRef(handler);
  // * Update ref.current value if handler changes.
  // ? This allows our effect below to always get latest handler
  react.useEffect(function () {
    savedHandler.current = handler;
  }, [handler]);
  react.useEffect(function () {
    // * Make sure element supports addEventListener
    var isSupported = element && element.addEventListener;
    if (!isSupported) return;
    // * Create event listener that calls handler function stored in ref
    var eventListener = function eventListener(event) {
      return savedHandler.current(event);
    };
    // * Add event listener
    element.addEventListener(eventName, eventListener);
    // * Remove event listener on cleanup
    return function () {
      element.removeEventListener(eventName, eventListener);
    };
    // * Re-run if eventName or element changes
  }, [eventName, element]);
  return null;
});

var isBrowser = typeof window !== 'undefined';

var set = function set(key, value) {
  if (isBrowser) return sessionStorage.setItem(key, JSON.stringify(value));
  return;
};
var get = function get(key) {
  if (isBrowser) {
    var storageValue = sessionStorage.getItem(key);
    // * if type of value from session storage is string parse it then return
    // * else return original value
    if (typeof storageValue === 'string') return JSON.parse(storageValue);
    return storageValue;
  }
  return;
};
var remove = function remove(key) {
  if (isBrowser) return sessionStorage.removeItem(key);
  return;
};
var sessionStorage$1 = {
  set: set,
  get: get,
  remove: remove
};

var set$1 = function set(key, value) {
  if (isBrowser) return localStorage.setItem(key, JSON.stringify(value));
  return;
};
var get$1 = function get(key) {
  if (isBrowser) {
    var storageValue = localStorage.getItem(key);
    // * if type of value from local storage is string parse it then return
    // * else return original value
    if (typeof storageValue === 'string') return JSON.parse(storageValue);
    return storageValue;
  }
  return;
};
var remove$1 = function remove(key) {
  if (isBrowser) return localStorage.removeItem(key);
  return;
};
var localStorage$1 = {
  set: set$1,
  get: get$1,
  remove: remove$1
};

var get$2 = localStorage$1.get,
  set$2 = localStorage$1.set,
  remove$2 = localStorage$1.remove;
var useLocalStorage = (function (options) {
  var _useState = react.useState(function () {
      try {
        var storageValue = get$2(options.storageName);
        if (!options.nullValue) {
          if (storageValue === null || typeof storageValue === 'undefined') {
            return options.defaultValues;
          } else return storageValue;
        } else return storageValue;
      } catch (error) {
        console.error(error);
        return options == null ? void 0 : options.defaultValues;
      }
    }),
    storage = _useState[0],
    setStorage = _useState[1];
  // * whenever state value changed set new state to local
  react.useEffect(function () {
    set$2(options.storageName, storage);
  }, [storage, options.storageName]);
  var removeStorage = function removeStorage() {
    return remove$2(options.storageName);
  };
  return [storage, setStorage, removeStorage];
});

var get$3 = sessionStorage$1.get,
  set$3 = sessionStorage$1.set,
  remove$3 = sessionStorage$1.remove;
var useSessionStorage = (function (options) {
  var _useState = react.useState(function () {
      try {
        var storageValue = get$3(options.storageName);
        if (!options.nullValue) {
          if (storageValue === null || typeof storageValue === 'undefined') {
            return options.defaultValues;
          } else return storageValue;
        } else return storageValue;
      } catch (error) {
        console.error(error);
        return options == null ? void 0 : options.defaultValues;
      }
    }),
    storage = _useState[0],
    setStorage = _useState[1];
  // * whenever state value changed set new state to session
  react.useEffect(function () {
    set$3(options.storageName, storage);
  }, [storage, options.storageName]);
  var removeStorage = function removeStorage() {
    return remove$3(options.storageName);
  };
  return [storage, setStorage, removeStorage];
});

var _excluded = ["storageName", "defaultValues", "nullValue"];
var get$4 = cookieStorage.get,
  set$4 = cookieStorage.set,
  remove$4 = cookieStorage.remove;
var useCookies = (function (options) {
  var storageName = options.storageName,
    defaultValues = options.defaultValues,
    nullValue = options.nullValue,
    restOptions = _objectWithoutPropertiesLoose(options, _excluded);
  var _useState = react.useState(function () {
      try {
        // * get cookie storage and parse it to json
        var storageValue = get$4(storageName);
        if (!nullValue) {
          if (storageValue === null || typeof storageValue === 'undefined') {
            return defaultValues;
          } else return JSON.parse(storageValue);
        } else return JSON.parse(storageValue || 'null');
      } catch (error) {
        console.error(error);
        return defaultValues;
      }
    }),
    storage = _useState[0],
    setStorage = _useState[1];
  // * whenever state value changed set new state to local
  react.useEffect(function () {
    set$4(storageName, JSON.stringify(storage), _extends({}, restOptions));
  }, [storage, storageName]);
  var removeStorage = function removeStorage(options) {
    return remove$4(storageName, options);
  };
  return [storage, setStorage, removeStorage];
});

exports.cookieStorage = cookieStorage;
exports.isBrowser = isBrowser;
exports.localStorage = localStorage$1;
exports.sessionStorage = sessionStorage$1;
exports.useAsync = useAsync;
exports.useBool = useBool;
exports.useCookies = useCookies;
exports.useEventListener = useEventListener;
exports.useIsDomReady = useIsDomReady;
exports.useLocalStorage = useLocalStorage;
exports.useSessionStorage = useSessionStorage;
exports.useViewportSize = useViewportSize;
//# sourceMappingURL=functional-react-hooks.cjs.development.js.map
