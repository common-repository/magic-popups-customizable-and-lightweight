var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
(function() {
  "use strict";
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function normalizeStyle(value) {
    if (isArray$1(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString$1(value)) {
      return value;
    } else if (isObject$1(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString$1(value)) {
      res = value;
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$1(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const toDisplayString = (val) => {
    return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (val && val.__v_isRef) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
          entries[`${key} =>`] = val2;
          return entries;
        }, {})
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()]
      };
    } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
      return String(val);
    }
    return val;
  };
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend$1 = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray$1 = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isFunction$1 = (val) => typeof val === "function";
  const isString$1 = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    run(fn) {
      if (this.active) {
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = this.parent;
        }
      }
    }
    on() {
      activeEffectScope = this;
    }
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this.active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.active = false;
      }
    }
  }
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  const targetMap = /* @__PURE__ */ new WeakMap();
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  const ITERATE_KEY = Symbol("");
  const MAP_KEY_ITERATE_KEY = Symbol("");
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
      }
    }
    stop() {
      if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep());
      }
      trackEffects(dep);
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray$1(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    if (deps.length === 1) {
      if (deps[0]) {
        {
          triggerEffects(deps[0]);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      {
        triggerEffects(createDep(effects));
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    for (const effect of isArray$1(dep) ? dep : [...dep]) {
      if (effect !== activeEffect || effect.allowRecurse) {
        if (effect.scheduler) {
          effect.scheduler();
        } else {
          effect.run();
        }
      }
    }
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  const get = /* @__PURE__ */ createGetter();
  const shallowGet = /* @__PURE__ */ createGetter(false, true);
  const readonlyGet = /* @__PURE__ */ createGetter(true);
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return shallow;
      } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray$1(target);
      if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject$1(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  const set = /* @__PURE__ */ createSetter();
  const shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key, value, receiver) {
      let oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow && !isReadonly(value)) {
        if (!isShallow(value)) {
          value = toRaw(value);
          oldValue = toRaw(oldValue);
        }
        if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
  };
  const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      return true;
    },
    deleteProperty(target, key) {
      return true;
    }
  };
  const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  const toShallow = (value) => value;
  const getProto = (v2) => Reflect.getPrototypeOf(v2);
  function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly2 && track(rawTarget, "get", key);
    }
    !isReadonly2 && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly2 && track(rawTarget, "has", key);
    }
    !isReadonly2 && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow2) {
    return function forEach2(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$1(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      {
        trackEffects(ref2.dep || (ref2.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    if (ref2.dep) {
      {
        triggerEffects(ref2.dep);
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      newVal = this.__v_isShallow ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = this.__v_isShallow ? newVal : toReactive(newVal);
        triggerRefValue(this);
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction$1(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  Promise.resolve();
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction$1(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = type;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      console.error(err);
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPreFlushCbs = [];
  let activePreFlushCbs = null;
  let preFlushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  let currentPreFlushParentJob = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queueCb(cb, activeQueue, pendingQueue, index2) {
    if (!isArray$1(cb)) {
      if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
        pendingQueue.push(cb);
      }
    } else {
      pendingQueue.push(...cb);
    }
    queueFlush();
  }
  function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
      currentPreFlushParentJob = parentJob;
      activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
      pendingPreFlushCbs.length = 0;
      for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
        activePreFlushCbs[preFlushIndex]();
      }
      activePreFlushCbs = null;
      preFlushIndex = 0;
      currentPreFlushParentJob = null;
      flushPreFlushCbs(seen, parentJob);
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    queue.sort((a, b) => getId(a) - getId(b));
    const check = NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (false)
            ;
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs();
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function emit$1(instance, event, ...rawArgs) {
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim: trim2 } = props[modifiersKey] || EMPTY_OBJ;
      if (trim2) {
        args = rawArgs.map((a) => a.trim());
      } else if (number) {
        args = rawArgs.map(toNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction$1(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend$1(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, null);
      return null;
    }
    if (isArray$1(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend$1(normalized, raw);
    }
    cache.set(comp, normalized);
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function pushScopeId(id) {
    currentScopeId = id;
  }
  function popScopeId() {
    currentScopeId = null;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      const res = fn(...args);
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data: data2, setupState, ctx, inheritAttrs } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data2, ctx));
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (false)
          ;
        result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots,
          emit
        } : { attrs, slots, emit }) : render2(props, null));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment$1);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        }
      }
    }
    if (vnode.dirs) {
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      root.transition = vnode.transition;
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$1(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance)
      ;
    else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
      const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else
        ;
    }
  }
  function watchEffect(effect, options) {
    return doWatch(effect, null, options);
  }
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    const instance = currentInstance;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray$1(source)) {
      isMultiSource = true;
      forceTrigger = source.some(isReactive);
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction$1(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else
          ;
      });
    } else if (isFunction$1(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
      cleanup = effect.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
      };
    };
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      return NOOP;
    }
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect.active) {
        return;
      }
      if (cb) {
        const newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i) => hasChanged(v2, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      scheduler = () => {
        if (!instance || instance.isMounted) {
          queuePreFlushCb(job);
        } else {
          job();
        }
      };
    }
    const effect = new ReactiveEffect(getter, scheduler);
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    } else {
      effect.run();
    }
    return () => {
      effect.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect);
      }
    };
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction$1(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject$1(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v2) => {
        traverse(v2, seen);
      });
    } else if (isPlainObject$1(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevTransitionKey;
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        const child = children[0];
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        let transitionKeyChanged = false;
        const { getTransitionKey } = innerChild.type;
        if (getTransitionKey) {
          const key = getTransitionKey();
          if (prevTransitionKey === void 0) {
            prevTransitionKey = key;
          } else if (key !== prevTransitionKey) {
            prevTransitionKey = key;
            transitionKeyChanged = true;
          }
        }
        if (oldInnerChild && oldInnerChild.type !== Comment$1 && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
          const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in") {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              instance.update();
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment$1) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el._leaveCb = () => {
                earlyRemove();
                el._leaveCb = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance) {
    const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(hook, instance, 9, args);
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el._leaveCb) {
          el._leaveCb(true);
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
          leavingVNode.el._leaveCb();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el._enterCb = (cancelled) => {
          if (called)
            return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el._enterCb = void 0;
        };
        if (hook) {
          hook(el, done);
          if (hook.length <= 1) {
            done();
          }
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el._enterCb) {
          el._enterCb(true);
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el._leaveCb = (cancelled) => {
          if (called)
            return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el._leaveCb = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          onLeave(el, done);
          if (onLeave.length <= 1) {
            done();
          }
        } else {
          done();
        }
      },
      clone(vnode2) {
        return resolveTransitionHooks(vnode2, props, state, instance);
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === Fragment) {
        if (child.patchFlag & 128)
          keyedFragmentCount++;
        ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
      } else if (keepComment || child.type !== Comment$1) {
        ret.push(child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  function defineComponent(options) {
    return isFunction$1(options) ? { setup: options, name: options.name } : options;
  }
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook("bu");
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook("bum");
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook("sp");
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      expose,
      inheritAttrs,
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction$1(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data2 = dataOptions.call(publicThis, publicThis);
      if (!isObject$1(data2))
        ;
      else {
        instance.data = reactive(data2);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v2) => c.value = v2
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$1(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$1(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
    if (isArray$1(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject$1(opt)) {
        if ("default" in opt) {
          injected = inject(opt.from || key, opt.default, true);
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        if (unwrapRef) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v2) => injected.value = v2
          });
        } else {
          ctx[key] = injected;
        }
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString$1(raw)) {
      const handler = ctx[raw];
      if (isFunction$1(handler)) {
        watch(getter, handler);
      }
    } else if (isFunction$1(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject$1(raw)) {
      if (isArray$1(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction$1(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else
      ;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions$1(resolved, base, optionMergeStrategies);
    }
    cache.set(base, resolved);
    return resolved;
  }
  function mergeOptions$1(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions$1(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose")
        ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend$1(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$1(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && isFunction$1(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[0]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction$1(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend$1(normalized, props);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, EMPTY_ARR);
      return EMPTY_ARR;
    }
    if (isArray$1(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : opt;
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[0] = booleanIndex > -1;
            prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    cache.set(comp, res);
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    }
    return false;
  }
  function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray$1(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction$1(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot$1 = (key, rawSlot, ctx) => {
    const normalized = withCtx((...args) => {
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction$1(value)) {
        slots[key] = normalizeSlot$1(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend$1(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (rootProps != null && !isObject$1(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new Set();
      let isMounted = false;
      const app2 = context.app = {
        _uid: uid++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v2) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin))
            ;
          else if (plugin && isFunction$1(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app2, ...options);
          } else if (isFunction$1(plugin)) {
            installedPlugins.add(plugin);
            plugin(app2, ...options);
          } else
            ;
          return app2;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app2;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app2;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app2;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app2._container = rootContainer;
            rootContainer.__vue_app__ = app2;
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app2._container);
            delete app2._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app2;
        }
      };
      return app2;
    };
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$1(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString$1(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction$1(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      const _isString = isString$1(ref2);
      const _isRef = isRef(ref2);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? refs[ref2] : ref2.value;
            if (isUnmount) {
              isArray$1(existing) && remove(existing, refValue);
            } else {
              if (!isArray$1(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                } else {
                  ref2.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref2.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (hasOwn(setupState, ref2)) {
              setupState[ref2] = value;
            }
          } else if (isRef(ref2)) {
            ref2.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else
            ;
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      }
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment$1:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else
            ;
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
      if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          for (const key in props) {
            if (key !== "value" && !isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      const areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
            traverseStaticChildren(n1, n2, true);
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment$1);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.component = n1.component;
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              instance.subTree = renderComponentRoot(instance);
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
            } else {
              hydrateSubTree();
            }
          } else {
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
        }
      };
      const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
      const update = instance.update = effect.run.bind(effect);
      update.id = instance.uid;
      toggleRecurse(instance, true);
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(void 0, instance.update);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove3 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove3();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove3, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        removeFragment(el, anchor);
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function toggleRecurse({ effect, update }, allowed) {
    effect.allowRecurse = update.allowRecurse = allowed;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray$1(ch1) && isArray$1(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v2, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v2 = result.length - 1;
        while (u < v2) {
          c = u + v2 >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v2 = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v2 = result[u - 1];
    while (u-- > 0) {
      result[u] = v2;
      v2 = p2[v2];
    }
    return result;
  }
  const isTeleport = (type) => type.__isTeleport;
  const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
  const resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString$1(targetSelector)) {
      if (!select) {
        return null;
      } else {
        const target = select(targetSelector);
        return target;
      }
    } else {
      return targetSelector;
    }
  };
  const TeleportImpl = {
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
      const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { shapeFlag, children, dynamicChildren } = n2;
      if (n1 == null) {
        const placeholder = n2.el = createText("");
        const mainAnchor = n2.anchor = createText("");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = n2.targetAnchor = createText("");
        if (target) {
          insert(targetAnchor, target);
          isSVG = isSVG || isTargetSVG(target);
        }
        const mount = (container2, anchor2) => {
          if (shapeFlag & 16) {
            mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        };
        if (disabled) {
          mount(container, mainAnchor);
        } else if (target) {
          mount(target, targetAnchor);
        }
      } else {
        n2.el = n1.el;
        const mainAnchor = n2.anchor = n1.anchor;
        const target = n2.target = n1.target;
        const targetAnchor = n2.targetAnchor = n1.targetAnchor;
        const wasDisabled = isTeleportDisabled(n1.props);
        const currentContainer = wasDisabled ? container : target;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        isSVG = isSVG || isTargetSVG(target);
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
          traverseStaticChildren(n1, n2, true);
        } else if (!optimized) {
          patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(n2, container, mainAnchor, internals, 1);
          }
        } else {
          if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
            if (nextTarget) {
              moveTeleport(n2, nextTarget, null, internals, 0);
            }
          } else if (wasDisabled) {
            moveTeleport(n2, target, targetAnchor, internals, 1);
          }
        }
      }
    },
    remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
      const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
      if (target) {
        hostRemove(targetAnchor);
      }
      if (doRemove || !isTeleportDisabled(props)) {
        hostRemove(anchor);
        if (shapeFlag & 16) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
          }
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, parentAnchor, 2);
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  const Teleport = TeleportImpl;
  const COMPONENTS = "components";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  const NULL_DYNAMIC_COMPONENT = Symbol();
  function resolveDynamicComponent(component) {
    if (isString$1(component)) {
      return resolveAsset(COMPONENTS, component, false) || component;
    } else {
      return component || NULL_DYNAMIC_COMPONENT;
    }
  }
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      if (type === COMPONENTS) {
        const selfName = getComponentName(Component);
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
          return Component;
        }
      }
      const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
      if (!res && maybeSelfReference) {
        return Component;
      }
      return res;
    }
  }
  function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
  }
  const Fragment = Symbol(void 0);
  const Text = Symbol(void 0);
  const Comment$1 = Symbol(void 0);
  const Static = Symbol(void 0);
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
    return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString$1(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment$1;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(type, props, true);
      if (children) {
        normalizeChildren(cloned, children);
      }
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString$1(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$1(style)) {
        if (isProxy(style) && !isArray$1(style)) {
          style = extend$1({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref2, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor
    };
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment$1, null, text)) : createVNode(Comment$1, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment$1);
    } else if (isArray$1(child)) {
      return createVNode(Fragment, null, child.slice());
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$1(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction$1(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  function renderList(source, renderItem, cache, index2) {
    let ret;
    const cached = cache && cache[index2];
    if (isArray$1(source) || isString$1(source)) {
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
      }
    } else if (typeof source === "number") {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
      }
    } else if (isObject$1(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else {
      ret = [];
    }
    if (cache) {
      cache[index2] = ret;
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.isCE) {
      return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
    }
    let slot = slots[name];
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child))
        return true;
      if (child.type === Comment$1)
        return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => () => queueJob(i.update),
    $nextTick: (i) => nextTick.bind(i.proxy),
    $watch: (i) => instanceWatch.bind(i)
  });
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data: data2, props, accessCache, type, appContext } = instance;
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data2[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
          accessCache[key] = 2;
          return data2[key];
        } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else
        ;
    },
    set({ _: instance }, key, value) {
      const { data: data2, setupState, ctx } = instance;
      if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
        data2[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({ _: { data: data2, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
      let normalizedProps;
      return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn(data2, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        this.set(target, key, descriptor.get(), null);
      } else if (descriptor.value != null) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  const emptyAppContext = createAppContext();
  let uid$1 = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid$1++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: type.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit$1.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  const setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction$1(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$1(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else
      ;
    finishComponentSetup(instance, isSSR);
  }
  let compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template;
        if (template) {
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend$1(extend$1({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    let attrs;
    {
      return {
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        }
      }));
    }
  }
  function getComponentName(Component) {
    return isFunction$1(Component) ? Component.displayName || Component.name : Component.name;
  }
  function isClassComponent(value) {
    return isFunction$1(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };
  function h$1(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  const version = "3.2.31";
  const svgNS = "http://www.w3.org/2000/svg";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    cloneNode(el) {
      const cloned = el.cloneNode(true);
      if (`_value` in el) {
        cloned._value = el._value;
      }
      return cloned;
    },
    insertStaticContent(content, parent, anchor, isSVG, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
        const template = templateContainer.content;
        if (isSVG) {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        before ? before.nextSibling : parent.firstChild,
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString$1(next);
    if (next && !isCssString) {
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
      if (prev && !isString$1(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    } else {
      const currentDisplay = style.display;
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
      if ("_vod" in el) {
        style.display = currentDisplay;
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$1(val)) {
      val.forEach((v2) => setStyle(style, name, v2));
    } else {
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean = isSpecialBooleanAttr(key);
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue || el.tagName === "OPTION") {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        el[key] = includeBooleanAttr(value);
        return;
      } else if (value == null && type === "string") {
        el[key] = "";
        el.removeAttribute(key);
        return;
      } else if (type === "number") {
        try {
          el[key] = 0;
        } catch (_a2) {
        }
        el.removeAttribute(key);
        return;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
  }
  let _getNow = Date.now;
  let skipTimestampCheck = false;
  if (typeof window !== "undefined") {
    if (_getNow() > document.createEvent("Event").timeStamp) {
      _getNow = () => performance.now();
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  let cachedNow = 0;
  const p = Promise.resolve();
  const reset = () => {
    cachedNow = 0;
  };
  const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      const timeStamp = e.timeStamp || _getNow();
      if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$1(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  const nativeOnRE = /^on[a-z]/;
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString$1(value)) {
      return false;
    }
    return key in el;
  }
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const Transition = (props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots);
  Transition.displayName = "Transition";
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
  const callHook = (hook, args = []) => {
    if (isArray$1(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
    const finishEnter = (el, isAppear, done) => {
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve2 = () => finishEnter(el, isAppear, done);
        callHook(hook, [el, resolve2]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve2);
          }
        });
      };
    };
    return extend$1(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        const resolve2 = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
        nextFrame(() => {
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve2);
          }
        });
        callHook(onLeave, [el, resolve2]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject$1(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    return res;
  }
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
    (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
    const { _vtc } = el;
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el._vtc = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve2();
      }
    };
    if (explicitTimeout) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(TRANSITION + "Delay");
    const transitionDurations = getStyleProperties(TRANSITION + "Duration");
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(ANIMATION + "Delay");
    const animationDurations = getStyleProperties(ANIMATION + "Duration");
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  const rendererOptions = extend$1({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app2 = ensureRenderer().createApp(...args);
    const { mount } = app2;
    app2.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app2._component;
      if (!isFunction$1(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app2;
  };
  function normalizeContainer(container) {
    if (isString$1(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  var App_vue_vue_type_style_index_0_lang = "";
  var App_vue_vue_type_style_index_1_scoped_true_lang = "";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$g = {};
  const _hoisted_1$e = { class: "wrap" };
  const _hoisted_2$b = { id: "poststuff" };
  function _sfc_render$1(_ctx, _cache) {
    const _component_router_view = resolveComponent("router-view");
    return openBlock(), createElementBlock("div", _hoisted_1$e, [
      createBaseVNode("div", _hoisted_2$b, [
        createVNode(_component_router_view, null, {
          default: withCtx(({ Component }) => [
            createVNode(Transition, {
              name: "page-transition",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(Component)))
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        })
      ])
    ]);
  }
  var App = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$1], ["__scopeId", "data-v-ad7b66d8"]]);
  var index = "";
  /*!
    * vue-router v4.0.14
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
  const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
  const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
  const routerKey = /* @__PURE__ */ PolySymbol("r");
  const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
  const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
  const isBrowser = typeof window !== "undefined";
  function isESModule(obj) {
    return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const searchPos = location2.indexOf("?");
    const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (position === 1 || segment === ".")
        continue;
      if (segment === "..")
        position--;
      else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  function normalizeBase(base) {
    if (!base) {
      if (isBrowser) {
        const baseEl = document.querySelector("base");
        base = baseEl && baseEl.getAttribute("href") || "/";
        base = base.replace(/^\w+:\/\/[^\/]+/, "");
      } else {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      behavior: offset.behavior,
      left: elRect.left - docRect.left - (offset.left || 0),
      top: elRect.top - docRect.top - (offset.top || 0)
    };
  }
  const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
  });
  function scrollToPosition(position) {
    let scrollToOptions;
    if ("el" in position) {
      const positionEl = position.el;
      const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
      const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
      if (!el) {
        return;
      }
      scrollToOptions = getElementPosition(el, position);
    } else {
      scrollToOptions = position;
    }
    if ("scrollBehavior" in document.documentElement.style)
      window.scrollTo(scrollToOptions);
    else {
      window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
    }
  }
  function getScrollKey(path, delta) {
    const position = history.state ? history.state.position - delta : -1;
    return position + path;
  }
  const scrollPositions = /* @__PURE__ */ new Map();
  function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
  }
  function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    scrollPositions.delete(key);
    return scroll;
  }
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index2 = listeners.indexOf(callback);
        if (index2 > -1)
          listeners.splice(index2, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data2) {
      const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data2, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data2) {
      const currentState = assign({}, historyState.value, history2.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data2);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#"))
      base += "#";
    return createWebHistory(base);
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  function createRouterError(type, params) {
    {
      return assign(new Error(), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [90];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict)
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (Array.isArray(param) && !repeatable)
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            const text = Array.isArray(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path;
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    return bScore.length - aScore.length;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          }));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher))
            removeRoute(record.name);
        }
        if ("children" in mainNormalizedRecord) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
        insertMatcher(matcher);
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index2 = matchers.indexOf(matcherRef);
        if (index2 > -1) {
          matchers.splice(index2, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      let i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
        i++;
      matchers.splice(i, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve2(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
        path = matcher.stringify(params);
      } else if ("path" in location2) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes.forEach((route) => addRoute(route));
    return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: void 0,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || {} : { default: record.component }
    };
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "boolean" ? props : props[name];
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
  }
  function mergeOptions(defaults2, partialOptions) {
    const options = {};
    for (const key in defaults2) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
    }
    return options;
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some((child) => child === record || isRecordChildOf(record, child));
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?")
      return query;
    const hasLeadingIM = search[0] === "?";
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!Array.isArray(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search += (search.length ? "&" : "") + key;
        }
        continue;
      }
      const values = Array.isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value2 != null)
            search += "=" + value2;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = Array.isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  function useCallbacks() {
    let handlers = [];
    function add2(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset2() {
      handlers = [];
    }
    return {
      add: add2,
      list: () => handlers,
      reset: reset2
    };
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve2, reject) => {
      const next = (valid) => {
        if (valid === false)
          reject(createRouterError(4, {
            from,
            to
          }));
        else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
            enterCallbackArray.push(valid);
          resolve2();
        }
      };
      const guardReturn = guard.call(record && record.instances[name], to, from, next);
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name)();
          }));
        }
      }
    }
    return guards;
  }
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function useLink(props) {
    const router2 = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => router2.resolve(unref(props.to)));
    const activeRecordIndex = computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index2 > -1)
        return index2;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
    });
    const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router2[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      }
      return Promise.resolve();
    }
    return {
      route,
      href: computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ defineComponent({
    name: "RouterLink",
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = reactive(useLink(props));
      const { options } = inject(routerKey);
      const elClass = computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : h$1("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    setup(props, { attrs, slots }) {
      const injectedRoute = inject(routerViewLocationKey);
      const routeToDisplay = computed(() => props.route || injectedRoute.value);
      const depth = inject(viewDepthKey, 0);
      const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth]);
      provide(viewDepthKey, depth + 1);
      provide(matchedRouteKey, matchedRouteRef);
      provide(routerViewLocationKey, routeToDisplay);
      const viewRef = ref();
      watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[props.name];
        const currentName = props.name;
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[props.name];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, { Component: component, route }) || component;
      };
    }
  });
  function normalizeSlot(slot, data2) {
    if (!slot)
      return null;
    const slotContent = slot(data2);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve2(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if ("path" in rawLocation) {
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve2(to);
      const from = currentRoute.value;
      const data2 = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
          state: data2,
          force,
          replace: replace2
        }), redirectedFrom || targetLocation);
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll(from, from, true, false);
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(assign(locationAsObject(failure2.to), {
              state: data2,
              force,
              replace: replace2
            }), redirectedFrom || toLocation);
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data2);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of to.matched) {
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (Array.isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      for (const guard of afterGuards.list())
        guard(to, from, failure);
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data2) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = !isBrowser ? {} : history.state;
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign({
            scroll: isFirstNavigation && state && state.scroll
          }, data2));
        else
          routerHistory.push(toLocation.fullPath, data2);
      }
      currentRoute.value = toLocation;
      handleScroll(toLocation, from, isPush, isFirstNavigation);
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        const toLocation = resolve2(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        if (isBrowser) {
          saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
        }
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(error.to, toLocation).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta)
            routerHistory.go(-info.delta, false);
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(toLocation, from, false);
          if (failure) {
            if (info.delta) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorHandlers.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve3, reject) => {
        readyHandlers.add([resolve3, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      const { scrollBehavior } = options;
      if (!isBrowser || !scrollBehavior)
        return Promise.resolve();
      const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
      return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = /* @__PURE__ */ new Set();
    const router2 = {
      currentRoute,
      addRoute,
      removeRoute,
      hasRoute,
      getRoutes,
      resolve: resolve2,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady,
      install(app2) {
        const router3 = this;
        app2.component("RouterLink", RouterLink);
        app2.component("RouterView", RouterView);
        app2.config.globalProperties.$router = router3;
        Object.defineProperty(app2.config.globalProperties, "$route", {
          enumerable: true,
          get: () => unref(currentRoute)
        });
        if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
          started = true;
          push(routerHistory.location).catch((err) => {
          });
        }
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          reactiveRoute[key] = computed(() => currentRoute.value[key]);
        }
        app2.provide(routerKey, router3);
        app2.provide(routeLocationKey, reactive(reactiveRoute));
        app2.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app2.unmount;
        installedApps.add(app2);
        app2.unmount = function() {
          installedApps.delete(app2);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            currentRoute.value = START_LOCATION_NORMALIZED;
            started = false;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    return router2;
  }
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter() {
    return inject(routerKey);
  }
  function useRoute() {
    return inject(routeLocationKey);
  }
  var axios$2 = { exports: {} };
  var bind$2 = function bind2(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  var bind$1 = bind$2;
  var toString = Object.prototype.toString;
  function isArray(val) {
    return Array.isArray(val);
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
  }
  function isFormData(val) {
    return toString.call(val) === "[object FormData]";
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isFile(val) {
    return toString.call(val) === "[object File]";
  }
  function isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return toString.call(val) === "[object URLSearchParams]";
  }
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  var utils$e = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM
  };
  var utils$d = utils$e;
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  var buildURL$2 = function buildURL2(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$d.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils$d.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils$d.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils$d.forEach(val, function parseValue(v2) {
          if (utils$d.isDate(v2)) {
            v2 = v2.toISOString();
          } else if (utils$d.isObject(v2)) {
            v2 = JSON.stringify(v2);
          }
          parts.push(encode(key) + "=" + encode(v2));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
  var utils$c = utils$e;
  function InterceptorManager$1() {
    this.handlers = [];
  }
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager$1.prototype.forEach = function forEach2(fn) {
    utils$c.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  };
  var InterceptorManager_1 = InterceptorManager$1;
  var utils$b = utils$e;
  var normalizeHeaderName$1 = function normalizeHeaderName2(headers, normalizedName) {
    utils$b.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  var enhanceError$2 = function enhanceError2(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    };
    return error;
  };
  var transitional = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  var enhanceError$1 = enhanceError$2;
  var createError$2 = function createError2(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError$1(error, config, code, request, response);
  };
  var createError$1 = createError$2;
  var settle$1 = function settle2(resolve2, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve2(response);
    } else {
      reject(createError$1("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
  };
  var utils$a = utils$e;
  var cookies$1 = utils$a.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils$a.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils$a.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils$a.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove2(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove2() {
      }
    };
  }();
  var isAbsoluteURL$1 = function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };
  var combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;
  var buildFullPath$1 = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
  var utils$9 = utils$e;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  var parseHeaders$1 = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils$9.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils$9.trim(line.substr(0, i)).toLowerCase();
      val = utils$9.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  var utils$8 = utils$e;
  var isURLSameOrigin$1 = utils$8.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils$8.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  function Cancel$3(message) {
    this.message = message;
  }
  Cancel$3.prototype.toString = function toString2() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel$3.prototype.__CANCEL__ = true;
  var Cancel_1 = Cancel$3;
  var utils$7 = utils$e;
  var settle = settle$1;
  var cookies = cookies$1;
  var buildURL$1 = buildURL$2;
  var buildFullPath = buildFullPath$1;
  var parseHeaders = parseHeaders$1;
  var isURLSameOrigin = isURLSameOrigin$1;
  var createError = createError$2;
  var transitionalDefaults$1 = transitional;
  var Cancel$2 = Cancel_1;
  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve2, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils$7.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve2(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError("Request aborted", config, "ECONNABORTED", request));
        request = null;
      };
      request.onerror = function handleError2() {
        reject(createError("Network Error", config, null, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        var transitional2 = config.transitional || transitionalDefaults$1;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, transitional2.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
        request = null;
      };
      if (utils$7.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request) {
        utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (!utils$7.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function(cancel) {
          if (!request) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new Cancel$2("canceled") : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
  var utils$6 = utils$e;
  var normalizeHeaderName = normalizeHeaderName$1;
  var enhanceError = enhanceError$2;
  var transitionalDefaults = transitional;
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
      headers["Content-Type"] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
      adapter = xhr;
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
      adapter = xhr;
    }
    return adapter;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$6.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$6.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults$3 = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data2, headers) {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");
      if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
        return data2;
      }
      if (utils$6.isArrayBufferView(data2)) {
        return data2.buffer;
      }
      if (utils$6.isURLSearchParams(data2)) {
        setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data2.toString();
      }
      if (utils$6.isObject(data2) || headers && headers["Content-Type"] === "application/json") {
        setContentTypeIfUnset(headers, "application/json");
        return stringifySafely(data2);
      }
      return data2;
    }],
    transformResponse: [function transformResponse(data2) {
      var transitional2 = this.transitional || defaults$3.transitional;
      var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
      if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
        try {
          return JSON.parse(data2);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw enhanceError(e, this, "E_JSON_PARSE");
            }
            throw e;
          }
        }
      }
      return data2;
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults$3.headers[method] = {};
  });
  utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults$3;
  var utils$5 = utils$e;
  var defaults$2 = defaults_1;
  var transformData$1 = function transformData2(data2, headers, fns) {
    var context = this || defaults$2;
    utils$5.forEach(fns, function transform(fn) {
      data2 = fn.call(context, data2, headers);
    });
    return data2;
  };
  var isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  var utils$4 = utils$e;
  var transformData = transformData$1;
  var isCancel = isCancel$1;
  var defaults$1 = defaults_1;
  var Cancel$1 = Cancel_1;
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new Cancel$1("canceled");
    }
  }
  var dispatchRequest$1 = function dispatchRequest2(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults$1.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };
  var utils$3 = utils$e;
  var mergeConfig$2 = function mergeConfig2(config1, config2) {
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
      if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
        return utils$3.merge(target, source);
      } else if (utils$3.isPlainObject(source)) {
        return utils$3.merge({}, source);
      } else if (utils$3.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$3.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function valueFromConfig2(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      }
    }
    function defaultToConfig2(prop) {
      if (!utils$3.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      } else if (!utils$3.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    var mergeMap = {
      "url": valueFromConfig2,
      "method": valueFromConfig2,
      "data": valueFromConfig2,
      "baseURL": defaultToConfig2,
      "transformRequest": defaultToConfig2,
      "transformResponse": defaultToConfig2,
      "paramsSerializer": defaultToConfig2,
      "timeout": defaultToConfig2,
      "timeoutMessage": defaultToConfig2,
      "withCredentials": defaultToConfig2,
      "adapter": defaultToConfig2,
      "responseType": defaultToConfig2,
      "xsrfCookieName": defaultToConfig2,
      "xsrfHeaderName": defaultToConfig2,
      "onUploadProgress": defaultToConfig2,
      "onDownloadProgress": defaultToConfig2,
      "decompress": defaultToConfig2,
      "maxContentLength": defaultToConfig2,
      "maxBodyLength": defaultToConfig2,
      "transport": defaultToConfig2,
      "httpAgent": defaultToConfig2,
      "httpsAgent": defaultToConfig2,
      "cancelToken": defaultToConfig2,
      "socketPath": defaultToConfig2,
      "responseEncoding": defaultToConfig2,
      "validateStatus": mergeDirectKeys
    };
    utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge2 = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge2(prop);
      utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  };
  var data = {
    "version": "0.26.1"
  };
  var VERSION = data.version;
  var validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  validators$1.transitional = function transitional2(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return function(value, opt, opts) {
      if (validator2 === false) {
        throw new Error(formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")));
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future"));
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new TypeError("options must be an object");
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator2 = schema[opt];
      if (validator2) {
        var value = options[opt];
        var result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new TypeError("option " + opt + " must be " + result);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw Error("Unknown option " + opt);
      }
    }
  }
  var validator$1 = {
    assertOptions,
    validators: validators$1
  };
  var utils$2 = utils$e;
  var buildURL = buildURL$2;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;
  var validator = validator$1;
  var validators = validator.validators;
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  Axios$1.prototype.request = function request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    var transitional2 = config.transitional;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest, void 0];
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);
      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }
    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    try {
      promise = dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
  };
  Axios$1.prototype.getUri = function getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
  };
  utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    Axios$1.prototype[method] = function(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: data2
      }));
    };
  });
  var Axios_1 = Axios$1;
  var Cancel = Cancel_1;
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve2) {
      resolvePromise = resolve2;
    });
    var token = this;
    this.promise.then(function(cancel) {
      if (!token._listeners)
        return;
      var i;
      var l = token._listeners.length;
      for (i = 0; i < l; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve2) {
        token.subscribe(resolve2);
        _resolve = resolve2;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  var CancelToken_1 = CancelToken;
  var spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  var utils$1 = utils$e;
  var isAxiosError = function isAxiosError2(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  };
  var utils = utils$e;
  var bind = bind$2;
  var Axios = Axios_1;
  var mergeConfig = mergeConfig$2;
  var defaults = defaults_1;
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    utils.extend(instance, Axios.prototype, context);
    utils.extend(instance, context);
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios$1 = createInstance(defaults);
  axios$1.Axios = Axios;
  axios$1.Cancel = Cancel_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel$1;
  axios$1.VERSION = data.version;
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;
  axios$1.isAxiosError = isAxiosError;
  axios$2.exports = axios$1;
  axios$2.exports.default = axios$1;
  var axios = axios$2.exports;
  var WPMetaBox_vue_vue_type_style_index_0_lang = "";
  const _hoisted_1$d = { class: "postbox" };
  const _hoisted_2$a = { class: "postbox-header !tw-font-semibold !tw-flex !tw-items-center !tw-justify-start !tw-gap-4 !tw-p-4" };
  const _hoisted_3$8 = {
    key: 0,
    class: "tw-font-semibold !tw-p-0"
  };
  const _hoisted_4$5 = { class: "inside !tw-p-0 !tw-m-0" };
  const _sfc_main$f = /* @__PURE__ */ defineComponent({
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$d, [
          createBaseVNode("div", _hoisted_2$a, [
            props.title ? (openBlock(), createElementBlock("h2", _hoisted_3$8, toDisplayString(props.title), 1)) : createCommentVNode("", true),
            !props.title ? renderSlot(_ctx.$slots, "title", { key: 1 }) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_4$5, [
            renderSlot(_ctx.$slots, "content")
          ])
        ]);
      };
    }
  });
  var WPButton_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _hoisted_1$c = { class: "tw-flex tw-justify-center tw-items-center" };
  const _sfc_main$e = /* @__PURE__ */ defineComponent({
    props: {
      variant: {
        type: String,
        default: "primary"
      },
      as: {
        type: String,
        default: "button"
      }
    },
    setup(__props) {
      const props = __props;
      const computedClasses = computed(() => {
        return {
          "button button-primary": props.variant === "primary",
          "button button-secondary": props.variant === "secondary"
        };
      });
      return (_ctx, _cache) => {
        return props.as === "button" ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: normalizeClass(unref(computedClasses))
        }, [
          createBaseVNode("div", _hoisted_1$c, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 2)) : props.as === "a" ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: normalizeClass(unref(computedClasses))
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)) : createCommentVNode("", true);
      };
    }
  });
  var WPButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-cbaaa2b4"]]);
  const _hoisted_1$b = { class: "tw-p-4" };
  const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("p", { class: "!tw-mb-3" }, " Please consider donating to help with further development. Any contribution is appreciated! ", -1);
  const _hoisted_3$7 = /* @__PURE__ */ createBaseVNode("svg", {
    class: "tw-inline tw-align-middle",
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 16 16",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061zM6.543 8.82l-.845 5.213v.001l-.208 1.32c-.01.066.04.123.105.123H8.14c.173 0 .32-.125.348-.296v-.005l.026-.129.48-3.043.03-.164a.873.873 0 0 1 .862-.734h.38c1.201 0 2.24-.244 3.043-.815.797-.567 1.39-1.477 1.663-2.874.229-1.175.096-2.087-.45-2.71a2.126 2.126 0 0 0-.548-.438l-.003.016c-.645 3.312-2.853 4.456-5.672 4.456H6.864a.695.695 0 0 0-.321.079z"
    })
  ], -1);
  const _hoisted_4$4 = /* @__PURE__ */ createTextVNode(" Donate with PayPal ");
  const _sfc_main$d = /* @__PURE__ */ defineComponent({
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createBlock(_sfc_main$f, { title: "\u{1F44B} Enjoying this plugin?" }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_1$b, [
              _hoisted_2$9,
              createVNode(WPButton, {
                variant: "secondary",
                as: "a",
                href: "https://www.paypal.com/donate/?hosted_button_id=ZM78S72YLNBH8",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  _hoisted_3$7,
                  _hoisted_4$4
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        });
      };
    }
  });
  function T(t, n, ...u) {
    if (t in n) {
      let o = n[t];
      return typeof o == "function" ? o(...u) : o;
    }
    let e = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((o) => `"${o}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e, T), e;
  }
  function x(_a2) {
    var _b = _a2, { visible: t = true, features: n = 0 } = _b, u = __objRest(_b, ["visible", "features"]);
    var e;
    if (t || n & 2 && u.props.static)
      return Se(u);
    if (n & 1) {
      let o = ((e = u.props.unmount) != null ? e : true) ? 0 : 1;
      return T(o, { [0]() {
        return null;
      }, [1]() {
        return Se(__spreadProps(__spreadValues({}, u), { props: __spreadProps(__spreadValues({}, u.props), { hidden: true, style: { display: "none" } }) }));
      } });
    }
    return Se(u);
  }
  function Se({ props: t, attrs: n, slots: u, slot: e, name: o }) {
    var a;
    let _a2 = L(t, ["unmount", "static"]), { as: r } = _a2, s = __objRest(_a2, ["as"]), d = (a = u.default) == null ? void 0 : a.call(u, e);
    if (r === "template") {
      if (Object.keys(s).length > 0 || Object.keys(n).length > 0) {
        let [i, ...l] = d != null ? d : [];
        if (!co(i) || l.length > 0)
          throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(n)).map((c) => `  - ${c}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((c) => `  - ${c}`).join(`
`)].join(`
`));
        return cloneVNode(i, s);
      }
      return Array.isArray(d) && d.length === 1 ? d[0] : d;
    }
    return h$1(r, s, d);
  }
  function L(t, n = []) {
    let u = Object.assign({}, t);
    for (let e of n)
      e in u && delete u[e];
    return u;
  }
  function co(t) {
    return t == null ? false : typeof t.type == "string" || typeof t.type == "object" || typeof t.type == "function";
  }
  var mo = 0;
  function vo() {
    return ++mo;
  }
  function h() {
    return vo();
  }
  function bo(t) {
    throw new Error("Unexpected object: " + t);
  }
  function J(t, n) {
    let u = n.resolveItems();
    if (u.length <= 0)
      return null;
    let e = n.resolveActiveIndex(), o = e != null ? e : -1, r = (() => {
      switch (t.focus) {
        case 0:
          return u.findIndex((s) => !n.resolveDisabled(s));
        case 1: {
          let s = u.slice().reverse().findIndex((d, a, i) => o !== -1 && i.length - a - 1 >= o ? false : !n.resolveDisabled(d));
          return s === -1 ? s : u.length - 1 - s;
        }
        case 2:
          return u.findIndex((s, d) => d <= o ? false : !n.resolveDisabled(s));
        case 3: {
          let s = u.slice().reverse().findIndex((d) => !n.resolveDisabled(d));
          return s === -1 ? s : u.length - 1 - s;
        }
        case 4:
          return u.findIndex((s) => n.resolveId(s) === t.id);
        case 5:
          return null;
        default:
          bo(t);
      }
    })();
    return r === -1 ? e : r;
  }
  function v(t) {
    return t == null || t.value == null ? null : "$el" in t.value ? t.value.$el : t.value;
  }
  function C(t, n, u) {
    typeof window != "undefined" && watchEffect((e) => {
      window.addEventListener(t, n, u), e(() => {
        window.removeEventListener(t, n, u);
      });
    });
  }
  var at = Symbol("Context");
  function it() {
    return I() !== null;
  }
  function I() {
    return inject(at, null);
  }
  function M(t) {
    provide(at, t);
  }
  function ut(t, n) {
    if (t)
      return t;
    let u = n != null ? n : "button";
    if (typeof u == "string" && u.toLowerCase() === "button")
      return "button";
  }
  function P(t, n) {
    let u = ref(ut(t.value.type, t.value.as));
    return onMounted(() => {
      u.value = ut(t.value.type, t.value.as);
    }), watchEffect(() => {
      var e;
      u.value || !v(n) || v(n) instanceof HTMLButtonElement && !((e = v(n)) == null ? void 0 : e.hasAttribute("type")) && (u.value = "button");
    }), u;
  }
  function Y({ container: t, accept: n, walk: u, enabled: e }) {
    watchEffect(() => {
      let o = t.value;
      if (!o || e !== void 0 && !e.value)
        return;
      let r = Object.assign((d) => n(d), { acceptNode: n }), s = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, r, false);
      for (; s.nextNode(); )
        u(s.currentNode);
    });
  }
  var ct = Symbol("ComboboxContext");
  function ee(t) {
    let n = inject(ct, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <Combobox /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, ee), u;
    }
    return n;
  }
  defineComponent({ name: "Combobox", emits: { "update:modelValue": (t) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean] } }, setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(1), r = ref(null), s = ref(null), d = ref(null), a = ref(null), i = ref({ static: false, hold: false }), l = ref([]), c = ref(null), p2 = computed(() => t.modelValue), f = { comboboxState: o, value: p2, inputRef: s, labelRef: r, buttonRef: d, optionsRef: a, disabled: computed(() => t.disabled), options: l, activeOptionIndex: c, inputPropsRef: ref({ displayValue: void 0 }), optionsPropsRef: i, closeCombobox() {
      t.disabled || o.value !== 1 && (o.value = 1, c.value = null);
    }, openCombobox() {
      t.disabled || o.value !== 0 && (o.value = 0);
    }, goToOption(m, g) {
      if (t.disabled || a.value && !i.value.static && o.value === 1)
        return;
      let S = J(m === 4 ? { focus: 4, id: g } : { focus: m }, { resolveItems: () => l.value, resolveActiveIndex: () => c.value, resolveId: (y) => y.id, resolveDisabled: (y) => y.dataRef.disabled });
      c.value !== S && (c.value = S);
    }, syncInputValue() {
      let m = f.value.value;
      if (!v(f.inputRef) || m === void 0)
        return;
      let g = f.inputPropsRef.value.displayValue;
      typeof g == "function" ? f.inputRef.value.value = g(m) : typeof m == "string" && (f.inputRef.value.value = m);
    }, selectOption(m) {
      let g = l.value.find((y) => y.id === m);
      if (!g)
        return;
      let { dataRef: S } = g;
      e("update:modelValue", S.value), f.syncInputValue();
    }, selectActiveOption() {
      if (c.value === null)
        return;
      let { dataRef: m } = l.value[c.value];
      e("update:modelValue", m.value), f.syncInputValue();
    }, registerOption(m, g) {
      var R, E;
      let S = c.value !== null ? l.value[c.value] : null, y = Array.from((E = (R = a.value) == null ? void 0 : R.querySelectorAll('[id^="headlessui-combobox-option-"]')) != null ? E : []).reduce((D, w, F) => Object.assign(D, { [w.id]: F }), {});
      l.value = [...l.value, { id: m, dataRef: g }].sort((D, w) => y[D.id] - y[w.id]), c.value = (() => S === null ? null : l.value.indexOf(S))();
    }, unregisterOption(m) {
      let g = l.value.slice(), S = c.value !== null ? g[c.value] : null, y = g.findIndex((R) => R.id === m);
      y !== -1 && g.splice(y, 1), l.value = g, c.value = (() => y === c.value || S === null ? null : g.indexOf(S))();
    } };
    C("mousedown", (m) => {
      var S, y, R;
      let g = m.target;
      o.value === 0 && (((S = v(s)) == null ? void 0 : S.contains(g)) || ((y = v(d)) == null ? void 0 : y.contains(g)) || ((R = v(a)) == null ? void 0 : R.contains(g)) || f.closeCombobox());
    }), watch([f.value, f.inputRef], () => f.syncInputValue(), { immediate: true }), provide(ct, f), M(computed(() => T(o.value, { [0]: 0, [1]: 1 })));
    let b = computed(() => c.value === null ? null : l.value[c.value].dataRef.value);
    return () => {
      let m = { open: o.value === 0, disabled: t.disabled, activeIndex: c.value, activeOption: b.value };
      return x({ props: L(t, ["modelValue", "onUpdate:modelValue", "disabled"]), slot: m, slots: n, attrs: u, name: "Combobox" });
    };
  } });
  defineComponent({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" } }, setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxLabel"), o = `headlessui-combobox-label-${h()}`;
    function r() {
      var s;
      (s = v(e.inputRef)) == null || s.focus({ preventScroll: true });
    }
    return () => {
      let s = { open: e.comboboxState.value === 0, disabled: e.disabled.value }, d = { id: o, ref: e.labelRef, onClick: r };
      return x({ props: __spreadValues(__spreadValues({}, t), d), slot: s, attrs: n, slots: u, name: "ComboboxLabel" });
    };
  } });
  defineComponent({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" } }, setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxButton"), o = `headlessui-combobox-button-${h()}`;
    function r(a) {
      e.disabled.value || (e.comboboxState.value === 0 ? e.closeCombobox() : (a.preventDefault(), e.openCombobox()), nextTick(() => {
        var i;
        return (i = v(e.inputRef)) == null ? void 0 : i.focus({ preventScroll: true });
      }));
    }
    function s(a) {
      switch (a.key) {
        case "ArrowDown":
          a.preventDefault(), a.stopPropagation(), e.comboboxState.value === 1 && (e.openCombobox(), nextTick(() => {
            e.value.value || e.goToOption(0);
          })), nextTick(() => {
            var i;
            return (i = e.inputRef.value) == null ? void 0 : i.focus({ preventScroll: true });
          });
          return;
        case "ArrowUp":
          a.preventDefault(), a.stopPropagation(), e.comboboxState.value === 1 && (e.openCombobox(), nextTick(() => {
            e.value.value || e.goToOption(3);
          })), nextTick(() => {
            var i;
            return (i = e.inputRef.value) == null ? void 0 : i.focus({ preventScroll: true });
          });
          return;
        case "Escape":
          a.preventDefault(), e.optionsRef.value && !e.optionsPropsRef.value.static && a.stopPropagation(), e.closeCombobox(), nextTick(() => {
            var i;
            return (i = e.inputRef.value) == null ? void 0 : i.focus({ preventScroll: true });
          });
          return;
      }
    }
    let d = P(computed(() => ({ as: t.as, type: n.type })), e.buttonRef);
    return () => {
      var l, c;
      let a = { open: e.comboboxState.value === 0, disabled: e.disabled.value }, i = { ref: e.buttonRef, id: o, type: d.value, tabindex: "-1", "aria-haspopup": true, "aria-controls": (l = v(e.optionsRef)) == null ? void 0 : l.id, "aria-expanded": e.disabled.value ? void 0 : e.comboboxState.value === 0, "aria-labelledby": e.labelRef.value ? [(c = v(e.labelRef)) == null ? void 0 : c.id, o].join(" ") : void 0, disabled: e.disabled.value === true ? true : void 0, onKeydown: s, onClick: r };
      return x({ props: __spreadValues(__spreadValues({}, t), i), slot: a, attrs: n, slots: u, name: "ComboboxButton" });
    };
  } });
  defineComponent({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, displayValue: { type: Function } }, emits: { change: (t) => true }, setup(t, { emit: n, attrs: u, slots: e }) {
    let o = ee("ComboboxInput"), r = `headlessui-combobox-input-${h()}`;
    o.inputPropsRef = computed(() => t);
    function s(a) {
      switch (a.key) {
        case "Enter":
          a.preventDefault(), a.stopPropagation(), o.selectActiveOption(), o.closeCombobox();
          break;
        case "ArrowDown":
          return a.preventDefault(), a.stopPropagation(), T(o.comboboxState.value, { [0]: () => o.goToOption(2), [1]: () => {
            o.openCombobox(), nextTick(() => {
              o.value.value || o.goToOption(0);
            });
          } });
        case "ArrowUp":
          return a.preventDefault(), a.stopPropagation(), T(o.comboboxState.value, { [0]: () => o.goToOption(1), [1]: () => {
            o.openCombobox(), nextTick(() => {
              o.value.value || o.goToOption(3);
            });
          } });
        case "Home":
        case "PageUp":
          return a.preventDefault(), a.stopPropagation(), o.goToOption(0);
        case "End":
        case "PageDown":
          return a.preventDefault(), a.stopPropagation(), o.goToOption(3);
        case "Escape":
          a.preventDefault(), o.optionsRef.value && !o.optionsPropsRef.value.static && a.stopPropagation(), o.closeCombobox();
          break;
        case "Tab":
          o.selectActiveOption(), o.closeCombobox();
          break;
      }
    }
    function d(a) {
      o.openCombobox(), n("change", a);
    }
    return () => {
      var c, p2, f, b, m;
      let a = { open: o.comboboxState.value === 0 }, i = { "aria-controls": (c = o.optionsRef.value) == null ? void 0 : c.id, "aria-expanded": o.disabled ? void 0 : o.comboboxState.value === 0, "aria-activedescendant": o.activeOptionIndex.value === null || (p2 = o.options.value[o.activeOptionIndex.value]) == null ? void 0 : p2.id, "aria-labelledby": (m = (f = v(o.labelRef)) == null ? void 0 : f.id) != null ? m : (b = v(o.buttonRef)) == null ? void 0 : b.id, id: r, onKeydown: s, onChange: d, onInput: d, role: "combobox", type: "text", tabIndex: 0, ref: o.inputRef }, l = L(t, ["displayValue"]);
      return x({ props: __spreadValues(__spreadValues({}, l), i), slot: a, attrs: u, slots: e, features: 1 | 2, name: "ComboboxInput" });
    };
  } });
  defineComponent({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, hold: { type: [Boolean], default: false } }, setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxOptions"), o = `headlessui-combobox-options-${h()}`;
    watchEffect(() => {
      e.optionsPropsRef.value.static = t.static;
    }), watchEffect(() => {
      e.optionsPropsRef.value.hold = t.hold;
    });
    let r = I(), s = computed(() => r !== null ? r.value === 0 : e.comboboxState.value === 0);
    return Y({ container: computed(() => v(e.optionsRef)), enabled: computed(() => e.comboboxState.value === 0), accept(d) {
      return d.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : d.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
    }, walk(d) {
      d.setAttribute("role", "none");
    } }), () => {
      var l, c, p2, f;
      let d = { open: e.comboboxState.value === 0 }, a = { "aria-activedescendant": e.activeOptionIndex.value === null || (l = e.options.value[e.activeOptionIndex.value]) == null ? void 0 : l.id, "aria-labelledby": (f = (c = v(e.labelRef)) == null ? void 0 : c.id) != null ? f : (p2 = v(e.buttonRef)) == null ? void 0 : p2.id, id: o, ref: e.optionsRef, role: "listbox" }, i = L(t, ["hold"]);
      return x({ props: __spreadValues(__spreadValues({}, i), a), slot: d, attrs: n, slots: u, features: 1 | 2, visible: s.value, name: "ComboboxOptions" });
    };
  } });
  defineComponent({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(t, { slots: n, attrs: u }) {
    let e = ee("ComboboxOption"), o = `headlessui-combobox-option-${h()}`, r = computed(() => e.activeOptionIndex.value !== null ? e.options.value[e.activeOptionIndex.value].id === o : false), s = computed(() => toRaw(e.value.value) === toRaw(t.value)), d = computed(() => ({ disabled: t.disabled, value: t.value }));
    onMounted(() => e.registerOption(o, d)), onUnmounted(() => e.unregisterOption(o)), onMounted(() => {
      watch([e.comboboxState, s], () => {
        e.comboboxState.value === 0 && (!s.value || e.goToOption(4, o));
      }, { immediate: true });
    }), watchEffect(() => {
      e.comboboxState.value === 0 && (!r.value || nextTick(() => {
        var p2, f;
        return (f = (p2 = document.getElementById(o)) == null ? void 0 : p2.scrollIntoView) == null ? void 0 : f.call(p2, { block: "nearest" });
      }));
    });
    function a(p2) {
      if (t.disabled)
        return p2.preventDefault();
      e.selectOption(o), e.closeCombobox(), nextTick(() => {
        var f;
        return (f = v(e.inputRef)) == null ? void 0 : f.focus({ preventScroll: true });
      });
    }
    function i() {
      if (t.disabled)
        return e.goToOption(5);
      e.goToOption(4, o);
    }
    function l() {
      t.disabled || r.value || e.goToOption(4, o);
    }
    function c() {
      t.disabled || !r.value || e.optionsPropsRef.value.hold || e.goToOption(5);
    }
    return () => {
      let { disabled: p2 } = t, f = { active: r.value, selected: s.value, disabled: p2 }, b = { id: o, role: "option", tabIndex: p2 === true ? void 0 : -1, "aria-disabled": p2 === true ? true : void 0, "aria-selected": s.value === true ? s.value : void 0, disabled: void 0, onClick: a, onFocus: i, onPointermove: l, onMousemove: l, onPointerleave: c, onMouseleave: c };
      return x({ props: __spreadValues(__spreadValues({}, t), b), slot: f, attrs: u, slots: n, name: "ComboboxOption" });
    };
  } });
  var Ke = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
  function ae(t = document.body) {
    return t == null ? [] : Array.from(t.querySelectorAll(Ke));
  }
  function mt(t, n = 0) {
    return t === document.body ? false : T(n, { [0]() {
      return t.matches(Ke);
    }, [1]() {
      let u = t;
      for (; u !== null; ) {
        if (u.matches(Ke))
          return true;
        u = u.parentElement;
      }
      return false;
    } });
  }
  function te(t) {
    t == null || t.focus({ preventScroll: true });
  }
  function O(t, n) {
    let u = Array.isArray(t) ? t.slice().sort((l, c) => {
      let p2 = l.compareDocumentPosition(c);
      return p2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : p2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
    }) : ae(t), e = document.activeElement, o = (() => {
      if (n & (1 | 4))
        return 1;
      if (n & (2 | 8))
        return -1;
      throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
    })(), r = (() => {
      if (n & 1)
        return 0;
      if (n & 2)
        return Math.max(0, u.indexOf(e)) - 1;
      if (n & 4)
        return Math.max(0, u.indexOf(e)) + 1;
      if (n & 8)
        return u.length - 1;
      throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
    })(), s = n & 32 ? { preventScroll: true } : {}, d = 0, a = u.length, i;
    do {
      if (d >= a || d + a <= 0)
        return 0;
      let l = r + d;
      if (n & 16)
        l = (l + a) % a;
      else {
        if (l < 0)
          return 3;
        if (l >= a)
          return 1;
      }
      i = u[l], i == null || i.focus(s), d += o;
    } while (i !== document.activeElement);
    return i.hasAttribute("tabindex") || i.setAttribute("tabindex", "0"), 2;
  }
  function ie(t, n) {
    for (let u of t)
      if (u.contains(n))
        return true;
    return false;
  }
  function Re(t, n = ref(true), u = ref({})) {
    let e = ref(typeof window != "undefined" ? document.activeElement : null), o = ref(null);
    function r() {
      if (!n.value || t.value.size !== 1)
        return;
      let { initialFocus: d } = u.value, a = document.activeElement;
      if (d) {
        if (d === a)
          return;
      } else if (ie(t.value, a))
        return;
      if (e.value = a, d)
        te(d);
      else {
        let i = false;
        for (let l of t.value)
          if (O(l, 1) === 2) {
            i = true;
            break;
          }
        i || console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.value = document.activeElement;
    }
    function s() {
      te(e.value), e.value = null, o.value = null;
    }
    watchEffect(r), onUpdated(() => {
      n.value ? r() : s();
    }), onUnmounted(s), C("keydown", (d) => {
      if (!!n.value && d.key === "Tab" && !!document.activeElement && t.value.size === 1) {
        d.preventDefault();
        for (let a of t.value)
          if (O(a, (d.shiftKey ? 2 : 4) | 16) === 2) {
            o.value = document.activeElement;
            break;
          }
      }
    }), C("focus", (d) => {
      if (!n.value || t.value.size !== 1)
        return;
      let a = o.value;
      if (!a)
        return;
      let i = d.target;
      i && i instanceof HTMLElement ? ie(t.value, i) ? (o.value = i, te(i)) : (d.preventDefault(), d.stopPropagation(), te(a)) : te(o.value);
    }, true);
  }
  var bt = "body > *", oe = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Map();
  function gt(t) {
    t.setAttribute("aria-hidden", "true"), t.inert = true;
  }
  function xt(t) {
    let n = K.get(t);
    !n || (n["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", n["aria-hidden"]), t.inert = n.inert);
  }
  function yt(t, n = ref(true)) {
    watchEffect((u) => {
      if (!n.value || !t.value)
        return;
      let e = t.value;
      oe.add(e);
      for (let o of K.keys())
        o.contains(e) && (xt(o), K.delete(o));
      document.querySelectorAll(bt).forEach((o) => {
        if (o instanceof HTMLElement) {
          for (let r of oe)
            if (o.contains(r))
              return;
          oe.size === 1 && (K.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), gt(o));
        }
      }), u(() => {
        if (oe.delete(e), oe.size > 0)
          document.querySelectorAll(bt).forEach((o) => {
            if (o instanceof HTMLElement && !K.has(o)) {
              for (let r of oe)
                if (o.contains(r))
                  return;
              K.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), gt(o);
            }
          });
        else
          for (let o of K.keys())
            xt(o), K.delete(o);
      });
    });
  }
  var St = Symbol("StackContext");
  function ht() {
    return inject(St, () => {
    });
  }
  function Rt(t) {
    let n = ht();
    watchEffect((u) => {
      let e = t == null ? void 0 : t.value;
      !e || (n(0, e), u(() => n(1, e)));
    });
  }
  function Te(t) {
    let n = ht();
    function u(...e) {
      t == null || t(...e), n(...e);
    }
    provide(St, u);
  }
  var Tt = Symbol("ForcePortalRootContext");
  function Ot() {
    return inject(Tt, false);
  }
  var Ne = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(t, { slots: n, attrs: u }) {
    return provide(Tt, t.force), () => {
      let _a2 = t, { force: e } = _a2, o = __objRest(_a2, ["force"]);
      return x({ props: o, slot: {}, slots: n, attrs: u, name: "ForcePortalRoot" });
    };
  } });
  function It() {
    let t = document.getElementById("headlessui-portal-root");
    if (t)
      return t;
    let n = document.createElement("div");
    return n.setAttribute("id", "headlessui-portal-root"), document.body.appendChild(n);
  }
  var Pt = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(t, { slots: n, attrs: u }) {
    let e = Ot(), o = inject(Dt, null), r = ref(e === true || o === null ? It() : o.resolveTarget());
    watchEffect(() => {
      e || o !== null && (r.value = o.resolveTarget());
    });
    let s = ref(null);
    return Rt(s), onUnmounted(() => {
      var a;
      let d = document.getElementById("headlessui-portal-root");
      !d || r.value === d && r.value.children.length <= 0 && ((a = r.value.parentElement) == null || a.removeChild(r.value));
    }), Te(), () => {
      if (r.value === null)
        return null;
      let d = { ref: s };
      return h$1(Teleport, { to: r.value }, x({ props: __spreadValues(__spreadValues({}, t), d), slot: {}, attrs: u, slots: n, name: "Portal" }));
    };
  } }), Dt = Symbol("PortalGroupContext"), wt = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(t, { attrs: n, slots: u }) {
    let e = reactive({ resolveTarget() {
      return t.target;
    } });
    return provide(Dt, e), () => {
      let _a2 = t, { target: o } = _a2, r = __objRest(_a2, ["target"]);
      return x({ props: r, slot: {}, attrs: n, slots: u, name: "PortalGroup" });
    };
  } });
  var Lt = Symbol("DescriptionContext");
  function Xo() {
    let t = inject(Lt, null);
    if (t === null)
      throw new Error("Missing parent");
    return t;
  }
  function G({ slot: t = ref({}), name: n = "Description", props: u = {} } = {}) {
    let e = ref([]);
    function o(r) {
      return e.value.push(r), () => {
        let s = e.value.indexOf(r);
        s !== -1 && e.value.splice(s, 1);
      };
    }
    return provide(Lt, { register: o, slot: t, name: n, props: u }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
  }
  defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" } }, setup(t, { attrs: n, slots: u }) {
    let e = Xo(), o = `headlessui-description-${h()}`;
    return onMounted(() => onUnmounted(e.register(o))), () => {
      let { name: r = "Description", slot: s = ref({}), props: d = {} } = e, a = t, i = __spreadProps(__spreadValues({}, Object.entries(d).reduce((l, [c, p2]) => Object.assign(l, { [c]: unref(p2) }), {})), { id: o });
      return x({ props: __spreadValues(__spreadValues({}, a), i), slot: s.value, attrs: n, slots: u, name: r });
    };
  } });
  var kt = Symbol("DialogContext");
  function $e(t) {
    let n = inject(kt, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, $e), u;
    }
    return n;
  }
  var Ee = "DC8F892D-2EBD-447C-A4C8-A03058436FF4";
  defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: Ee }, initialFocus: { type: Object, default: null } }, emits: { close: (t) => true }, setup(t, { emit: n, attrs: u, slots: e }) {
    let o = ref(/* @__PURE__ */ new Set()), r = I(), s = computed(() => t.open === Ee && r !== null ? T(r.value, { [0]: true, [1]: false }) : t.open);
    if (!(t.open !== Ee || r !== null))
      throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
    if (typeof s.value != "boolean")
      throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${s.value === Ee ? void 0 : t.open}`);
    let a = computed(() => t.open ? 0 : 1), i = computed(() => r !== null ? r.value === 0 : a.value === 0), l = ref(null), c = ref(a.value === 0);
    onUpdated(() => {
      c.value = a.value === 0;
    });
    let p2 = `headlessui-dialog-${h()}`, f = computed(() => ({ initialFocus: t.initialFocus }));
    Re(o, c, f), yt(l, c), Te((y, R) => T(y, { [0]() {
      o.value.add(R);
    }, [1]() {
      o.value.delete(R);
    } }));
    let b = G({ name: "DialogDescription", slot: computed(() => ({ open: s.value })) }), m = ref(null), g = { titleId: m, dialogState: a, setTitleId(y) {
      m.value !== y && (m.value = y);
    }, close() {
      n("close", false);
    } };
    provide(kt, g), C("mousedown", (y) => {
      let R = y.target;
      a.value === 0 && o.value.size === 1 && (ie(o.value, R) || (g.close(), nextTick(() => R == null ? void 0 : R.focus())));
    }), C("keydown", (y) => {
      y.key === "Escape" && a.value === 0 && (o.value.size > 1 || (y.preventDefault(), y.stopPropagation(), g.close()));
    }), watchEffect((y) => {
      if (a.value !== 0)
        return;
      let R = document.documentElement.style.overflow, E = document.documentElement.style.paddingRight, D = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden", document.documentElement.style.paddingRight = `${D}px`, y(() => {
        document.documentElement.style.overflow = R, document.documentElement.style.paddingRight = E;
      });
    }), watchEffect((y) => {
      if (a.value !== 0)
        return;
      let R = v(l);
      if (!R)
        return;
      let E = new IntersectionObserver((D) => {
        for (let w of D)
          w.boundingClientRect.x === 0 && w.boundingClientRect.y === 0 && w.boundingClientRect.width === 0 && w.boundingClientRect.height === 0 && g.close();
      });
      E.observe(R), y(() => E.disconnect());
    });
    function S(y) {
      y.stopPropagation();
    }
    return () => {
      let y = __spreadProps(__spreadValues({}, u), { ref: l, id: p2, role: "dialog", "aria-modal": a.value === 0 ? true : void 0, "aria-labelledby": m.value, "aria-describedby": b.value, onClick: S }), _a2 = t, { open: R, initialFocus: E } = _a2, D = __objRest(_a2, ["open", "initialFocus"]), w = { open: a.value === 0 };
      return h$1(Ne, { force: true }, () => h$1(Pt, () => h$1(wt, { target: l.value }, () => h$1(Ne, { force: false }, () => x({ props: __spreadValues(__spreadValues({}, D), y), slot: w, attrs: u, slots: e, visible: i.value, features: 1 | 2, name: "Dialog" })))));
    };
  } });
  defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" } }, setup(t, { attrs: n, slots: u }) {
    let e = $e("DialogOverlay"), o = `headlessui-dialog-overlay-${h()}`;
    function r(s) {
      s.target === s.currentTarget && (s.preventDefault(), s.stopPropagation(), e.close());
    }
    return () => x({ props: __spreadValues(__spreadValues({}, t), { id: o, "aria-hidden": true, onClick: r }), slot: { open: e.dialogState.value === 0 }, attrs: n, slots: u, name: "DialogOverlay" });
  } });
  defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" } }, setup(t, { attrs: n, slots: u }) {
    let e = $e("DialogTitle"), o = `headlessui-dialog-title-${h()}`;
    return onMounted(() => {
      e.setTitleId(o), onUnmounted(() => e.setTitleId(null));
    }), () => x({ props: __spreadValues(__spreadValues({}, t), { id: o }), slot: { open: e.dialogState.value === 0 }, attrs: n, slots: u, name: "DialogTitle" });
  } });
  var At = Symbol("DisclosureContext");
  function qe(t) {
    let n = inject(At, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <Disclosure /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, qe), u;
    }
    return n;
  }
  var Ht = Symbol("DisclosurePanelContext");
  function an() {
    return inject(Ht, null);
  }
  defineComponent({ name: "Disclosure", props: { as: { type: [Object, String], default: "template" }, defaultOpen: { type: [Boolean], default: false } }, setup(t, { slots: n, attrs: u }) {
    let e = `headlessui-disclosure-button-${h()}`, o = `headlessui-disclosure-panel-${h()}`, r = ref(t.defaultOpen ? 0 : 1), s = ref(null), d = ref(null), a = { buttonId: e, panelId: o, disclosureState: r, panel: s, button: d, toggleDisclosure() {
      r.value = T(r.value, { [0]: 1, [1]: 0 });
    }, closeDisclosure() {
      r.value !== 1 && (r.value = 1);
    }, close(i) {
      a.closeDisclosure();
      let l = (() => i ? i instanceof HTMLElement ? i : i.value instanceof HTMLElement ? v(i) : v(a.button) : v(a.button))();
      l == null || l.focus();
    } };
    return provide(At, a), M(computed(() => T(r.value, { [0]: 0, [1]: 1 }))), () => {
      let _a2 = t, { defaultOpen: i } = _a2, l = __objRest(_a2, ["defaultOpen"]), c = { open: r.value === 0, close: a.close };
      return x({ props: l, slot: c, slots: n, attrs: u, name: "Disclosure" });
    };
  } });
  defineComponent({ name: "DisclosureButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false } }, setup(t, { attrs: n, slots: u }) {
    let e = qe("DisclosureButton"), o = an(), r = o === null ? false : o === e.panelId, s = ref(null);
    r || watchEffect(() => {
      e.button.value = s.value;
    });
    let d = P(computed(() => ({ as: t.as, type: n.type })), s);
    function a() {
      var c;
      t.disabled || (r ? (e.toggleDisclosure(), (c = v(e.button)) == null || c.focus()) : e.toggleDisclosure());
    }
    function i(c) {
      var p2;
      if (!t.disabled)
        if (r)
          switch (c.key) {
            case " ":
            case "Enter":
              c.preventDefault(), c.stopPropagation(), e.toggleDisclosure(), (p2 = v(e.button)) == null || p2.focus();
              break;
          }
        else
          switch (c.key) {
            case " ":
            case "Enter":
              c.preventDefault(), c.stopPropagation(), e.toggleDisclosure();
              break;
          }
    }
    function l(c) {
      switch (c.key) {
        case " ":
          c.preventDefault();
          break;
      }
    }
    return () => {
      let c = { open: e.disclosureState.value === 0 }, p2 = r ? { ref: s, type: d.value, onClick: a, onKeydown: i } : { id: e.buttonId, ref: s, type: d.value, "aria-expanded": t.disabled ? void 0 : e.disclosureState.value === 0, "aria-controls": v(e.panel) ? e.panelId : void 0, disabled: t.disabled ? true : void 0, onClick: a, onKeydown: i, onKeyup: l };
      return x({ props: __spreadValues(__spreadValues({}, t), p2), slot: c, attrs: n, slots: u, name: "DisclosureButton" });
    };
  } });
  defineComponent({ name: "DisclosurePanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(t, { attrs: n, slots: u }) {
    let e = qe("DisclosurePanel");
    provide(Ht, e.panelId);
    let o = I(), r = computed(() => o !== null ? o.value === 0 : e.disclosureState.value === 0);
    return () => {
      let s = { open: e.disclosureState.value === 0, close: e.close }, d = { id: e.panelId, ref: e.panel };
      return x({ props: __spreadValues(__spreadValues({}, t), d), slot: s, attrs: n, slots: u, features: 1 | 2, visible: r.value, name: "DisclosurePanel" });
    };
  } });
  defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null } }, setup(t, { attrs: n, slots: u }) {
    let e = ref(/* @__PURE__ */ new Set()), o = ref(null), r = ref(true), s = computed(() => ({ initialFocus: t.initialFocus }));
    return onMounted(() => {
      !o.value || (e.value.add(o.value), Re(e, r, s));
    }), onUnmounted(() => {
      r.value = false;
    }), () => {
      let d = {}, a = { ref: o }, _a2 = t, { initialFocus: i } = _a2, l = __objRest(_a2, ["initialFocus"]);
      return x({ props: __spreadValues(__spreadValues({}, l), a), slot: d, attrs: n, slots: u, name: "FocusTrap" });
    };
  } });
  function gn(t) {
    requestAnimationFrame(() => requestAnimationFrame(t));
  }
  var Kt = Symbol("ListboxContext");
  function pe(t) {
    let n = inject(Kt, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <Listbox /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, pe), u;
    }
    return n;
  }
  defineComponent({ name: "Listbox", emits: { "update:modelValue": (t) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean] } }, setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(1), r = ref(null), s = ref(null), d = ref(null), a = ref([]), i = ref(""), l = ref(null), c = computed(() => t.modelValue), p2 = { listboxState: o, value: c, orientation: computed(() => t.horizontal ? "horizontal" : "vertical"), labelRef: r, buttonRef: s, optionsRef: d, disabled: computed(() => t.disabled), options: a, searchQuery: i, activeOptionIndex: l, closeListbox() {
      t.disabled || o.value !== 1 && (o.value = 1, l.value = null);
    }, openListbox() {
      t.disabled || o.value !== 0 && (o.value = 0);
    }, goToOption(f, b) {
      if (t.disabled || o.value === 1)
        return;
      let m = J(f === 4 ? { focus: 4, id: b } : { focus: f }, { resolveItems: () => a.value, resolveActiveIndex: () => l.value, resolveId: (g) => g.id, resolveDisabled: (g) => g.dataRef.disabled });
      i.value === "" && l.value === m || (i.value = "", l.value = m);
    }, search(f) {
      if (t.disabled || o.value === 1)
        return;
      let m = i.value !== "" ? 0 : 1;
      i.value += f.toLowerCase();
      let S = (l.value !== null ? a.value.slice(l.value + m).concat(a.value.slice(0, l.value + m)) : a.value).find((R) => R.dataRef.textValue.startsWith(i.value) && !R.dataRef.disabled), y = S ? a.value.indexOf(S) : -1;
      y === -1 || y === l.value || (l.value = y);
    }, clearSearch() {
      t.disabled || o.value !== 1 && i.value !== "" && (i.value = "");
    }, registerOption(f, b) {
      var g, S;
      let m = Array.from((S = (g = d.value) == null ? void 0 : g.querySelectorAll('[id^="headlessui-listbox-option-"]')) != null ? S : []).reduce((y, R, E) => Object.assign(y, { [R.id]: E }), {});
      a.value = [...a.value, { id: f, dataRef: b }].sort((y, R) => m[y.id] - m[R.id]);
    }, unregisterOption(f) {
      let b = a.value.slice(), m = l.value !== null ? b[l.value] : null, g = b.findIndex((S) => S.id === f);
      g !== -1 && b.splice(g, 1), a.value = b, l.value = (() => g === l.value || m === null ? null : b.indexOf(m))();
    }, select(f) {
      t.disabled || e("update:modelValue", f);
    } };
    return C("mousedown", (f) => {
      var g, S, y;
      let b = f.target, m = document.activeElement;
      o.value === 0 && (((g = v(s)) == null ? void 0 : g.contains(b)) || (((S = v(d)) == null ? void 0 : S.contains(b)) || p2.closeListbox(), !(m !== document.body && (m == null ? void 0 : m.contains(b))) && (f.defaultPrevented || (y = v(s)) == null || y.focus({ preventScroll: true }))));
    }), provide(Kt, p2), M(computed(() => T(o.value, { [0]: 0, [1]: 1 }))), () => {
      let f = { open: o.value === 0, disabled: t.disabled };
      return x({ props: L(t, ["modelValue", "onUpdate:modelValue", "disabled", "horizontal"]), slot: f, slots: n, attrs: u, name: "Listbox" });
    };
  } });
  defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" } }, setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxLabel"), o = `headlessui-listbox-label-${h()}`;
    function r() {
      var s;
      (s = v(e.buttonRef)) == null || s.focus({ preventScroll: true });
    }
    return () => {
      let s = { open: e.listboxState.value === 0, disabled: e.disabled.value }, d = { id: o, ref: e.labelRef, onClick: r };
      return x({ props: __spreadValues(__spreadValues({}, t), d), slot: s, attrs: n, slots: u, name: "ListboxLabel" });
    };
  } });
  defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" } }, setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxButton"), o = `headlessui-listbox-button-${h()}`;
    function r(i) {
      switch (i.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          i.preventDefault(), e.openListbox(), nextTick(() => {
            var l;
            (l = v(e.optionsRef)) == null || l.focus({ preventScroll: true }), e.value.value || e.goToOption(0);
          });
          break;
        case "ArrowUp":
          i.preventDefault(), e.openListbox(), nextTick(() => {
            var l;
            (l = v(e.optionsRef)) == null || l.focus({ preventScroll: true }), e.value.value || e.goToOption(3);
          });
          break;
      }
    }
    function s(i) {
      switch (i.key) {
        case " ":
          i.preventDefault();
          break;
      }
    }
    function d(i) {
      e.disabled.value || (e.listboxState.value === 0 ? (e.closeListbox(), nextTick(() => {
        var l;
        return (l = v(e.buttonRef)) == null ? void 0 : l.focus({ preventScroll: true });
      })) : (i.preventDefault(), e.openListbox(), gn(() => {
        var l;
        return (l = v(e.optionsRef)) == null ? void 0 : l.focus({ preventScroll: true });
      })));
    }
    let a = P(computed(() => ({ as: t.as, type: n.type })), e.buttonRef);
    return () => {
      var c, p2;
      let i = { open: e.listboxState.value === 0, disabled: e.disabled.value }, l = { ref: e.buttonRef, id: o, type: a.value, "aria-haspopup": true, "aria-controls": (c = v(e.optionsRef)) == null ? void 0 : c.id, "aria-expanded": e.disabled.value ? void 0 : e.listboxState.value === 0, "aria-labelledby": e.labelRef.value ? [(p2 = v(e.labelRef)) == null ? void 0 : p2.id, o].join(" ") : void 0, disabled: e.disabled.value === true ? true : void 0, onKeydown: r, onKeyup: s, onClick: d };
      return x({ props: __spreadValues(__spreadValues({}, t), l), slot: i, attrs: n, slots: u, name: "ListboxButton" });
    };
  } });
  defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxOptions"), o = `headlessui-listbox-options-${h()}`, r = ref(null);
    function s(i) {
      switch (r.value && clearTimeout(r.value), i.key) {
        case " ":
          if (e.searchQuery.value !== "")
            return i.preventDefault(), i.stopPropagation(), e.search(i.key);
        case "Enter":
          if (i.preventDefault(), i.stopPropagation(), e.activeOptionIndex.value !== null) {
            let { dataRef: l } = e.options.value[e.activeOptionIndex.value];
            e.select(l.value);
          }
          e.closeListbox(), nextTick(() => {
            var l;
            return (l = v(e.buttonRef)) == null ? void 0 : l.focus({ preventScroll: true });
          });
          break;
        case T(e.orientation.value, { vertical: "ArrowDown", horizontal: "ArrowRight" }):
          return i.preventDefault(), i.stopPropagation(), e.goToOption(2);
        case T(e.orientation.value, { vertical: "ArrowUp", horizontal: "ArrowLeft" }):
          return i.preventDefault(), i.stopPropagation(), e.goToOption(1);
        case "Home":
        case "PageUp":
          return i.preventDefault(), i.stopPropagation(), e.goToOption(0);
        case "End":
        case "PageDown":
          return i.preventDefault(), i.stopPropagation(), e.goToOption(3);
        case "Escape":
          i.preventDefault(), i.stopPropagation(), e.closeListbox(), nextTick(() => {
            var l;
            return (l = v(e.buttonRef)) == null ? void 0 : l.focus({ preventScroll: true });
          });
          break;
        case "Tab":
          i.preventDefault(), i.stopPropagation();
          break;
        default:
          i.key.length === 1 && (e.search(i.key), r.value = setTimeout(() => e.clearSearch(), 350));
          break;
      }
    }
    let d = I(), a = computed(() => d !== null ? d.value === 0 : e.listboxState.value === 0);
    return () => {
      var p2, f, b, m;
      let i = { open: e.listboxState.value === 0 }, l = { "aria-activedescendant": e.activeOptionIndex.value === null || (p2 = e.options.value[e.activeOptionIndex.value]) == null ? void 0 : p2.id, "aria-labelledby": (m = (f = v(e.labelRef)) == null ? void 0 : f.id) != null ? m : (b = v(e.buttonRef)) == null ? void 0 : b.id, "aria-orientation": e.orientation.value, id: o, onKeydown: s, role: "listbox", tabIndex: 0, ref: e.optionsRef };
      return x({ props: __spreadValues(__spreadValues({}, t), l), slot: i, attrs: n, slots: u, features: 1 | 2, visible: a.value, name: "ListboxOptions" });
    };
  } });
  defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(t, { slots: n, attrs: u }) {
    let e = pe("ListboxOption"), o = `headlessui-listbox-option-${h()}`, r = computed(() => e.activeOptionIndex.value !== null ? e.options.value[e.activeOptionIndex.value].id === o : false), s = computed(() => toRaw(e.value.value) === toRaw(t.value)), d = ref({ disabled: t.disabled, value: t.value, textValue: "" });
    onMounted(() => {
      var f, b;
      let p2 = (b = (f = document.getElementById(o)) == null ? void 0 : f.textContent) == null ? void 0 : b.toLowerCase().trim();
      p2 !== void 0 && (d.value.textValue = p2);
    }), onMounted(() => e.registerOption(o, d)), onUnmounted(() => e.unregisterOption(o)), onMounted(() => {
      watch([e.listboxState, s], () => {
        var p2, f;
        e.listboxState.value === 0 && (!s.value || (e.goToOption(4, o), (f = (p2 = document.getElementById(o)) == null ? void 0 : p2.focus) == null || f.call(p2)));
      }, { immediate: true });
    }), watchEffect(() => {
      e.listboxState.value === 0 && (!r.value || nextTick(() => {
        var p2, f;
        return (f = (p2 = document.getElementById(o)) == null ? void 0 : p2.scrollIntoView) == null ? void 0 : f.call(p2, { block: "nearest" });
      }));
    });
    function a(p2) {
      if (t.disabled)
        return p2.preventDefault();
      e.select(t.value), e.closeListbox(), nextTick(() => {
        var f;
        return (f = v(e.buttonRef)) == null ? void 0 : f.focus({ preventScroll: true });
      });
    }
    function i() {
      if (t.disabled)
        return e.goToOption(5);
      e.goToOption(4, o);
    }
    function l() {
      t.disabled || r.value || e.goToOption(4, o);
    }
    function c() {
      t.disabled || !r.value || e.goToOption(5);
    }
    return () => {
      let { disabled: p2 } = t, f = { active: r.value, selected: s.value, disabled: p2 }, b = { id: o, role: "option", tabIndex: p2 === true ? void 0 : -1, "aria-disabled": p2 === true ? true : void 0, "aria-selected": s.value === true ? s.value : void 0, disabled: void 0, onClick: a, onFocus: i, onPointermove: l, onMousemove: l, onPointerleave: c, onMouseleave: c };
      return x({ props: __spreadValues(__spreadValues({}, t), b), slot: f, attrs: u, slots: n, name: "ListboxOption" });
    };
  } });
  function Rn(t) {
    requestAnimationFrame(() => requestAnimationFrame(t));
  }
  var Nt = Symbol("MenuContext");
  function De(t) {
    let n = inject(Nt, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <Menu /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, De), u;
    }
    return n;
  }
  var Ga = defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(t, { slots: n, attrs: u }) {
    let e = ref(1), o = ref(null), r = ref(null), s = ref([]), d = ref(""), a = ref(null), i = { menuState: e, buttonRef: o, itemsRef: r, items: s, searchQuery: d, activeItemIndex: a, closeMenu: () => {
      e.value = 1, a.value = null;
    }, openMenu: () => e.value = 0, goToItem(l, c) {
      let p2 = J(l === 4 ? { focus: 4, id: c } : { focus: l }, { resolveItems: () => s.value, resolveActiveIndex: () => a.value, resolveId: (f) => f.id, resolveDisabled: (f) => f.dataRef.disabled });
      d.value === "" && a.value === p2 || (d.value = "", a.value = p2);
    }, search(l) {
      let p2 = d.value !== "" ? 0 : 1;
      d.value += l.toLowerCase();
      let b = (a.value !== null ? s.value.slice(a.value + p2).concat(s.value.slice(0, a.value + p2)) : s.value).find((g) => g.dataRef.textValue.startsWith(d.value) && !g.dataRef.disabled), m = b ? s.value.indexOf(b) : -1;
      m === -1 || m === a.value || (a.value = m);
    }, clearSearch() {
      d.value = "";
    }, registerItem(l, c) {
      var f, b;
      let p2 = Array.from((b = (f = r.value) == null ? void 0 : f.querySelectorAll('[id^="headlessui-menu-item-"]')) != null ? b : []).reduce((m, g, S) => Object.assign(m, { [g.id]: S }), {});
      s.value = [...s.value, { id: l, dataRef: c }].sort((m, g) => p2[m.id] - p2[g.id]);
    }, unregisterItem(l) {
      let c = s.value.slice(), p2 = a.value !== null ? c[a.value] : null, f = c.findIndex((b) => b.id === l);
      f !== -1 && c.splice(f, 1), s.value = c, a.value = (() => f === a.value || p2 === null ? null : c.indexOf(p2))();
    } };
    return C("mousedown", (l) => {
      var f, b, m;
      let c = l.target, p2 = document.activeElement;
      e.value === 0 && (((f = v(o)) == null ? void 0 : f.contains(c)) || (((b = v(r)) == null ? void 0 : b.contains(c)) || i.closeMenu(), !(p2 !== document.body && (p2 == null ? void 0 : p2.contains(c))) && (l.defaultPrevented || (m = v(o)) == null || m.focus({ preventScroll: true }))));
    }), provide(Nt, i), M(computed(() => T(e.value, { [0]: 0, [1]: 1 }))), () => {
      let l = { open: e.value === 0 };
      return x({ props: t, slot: l, slots: n, attrs: u, name: "Menu" });
    };
  } }), _a = defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" } }, setup(t, { attrs: n, slots: u }) {
    let e = De("MenuButton"), o = `headlessui-menu-button-${h()}`;
    function r(i) {
      switch (i.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          i.preventDefault(), i.stopPropagation(), e.openMenu(), nextTick(() => {
            var l;
            (l = v(e.itemsRef)) == null || l.focus({ preventScroll: true }), e.goToItem(0);
          });
          break;
        case "ArrowUp":
          i.preventDefault(), i.stopPropagation(), e.openMenu(), nextTick(() => {
            var l;
            (l = v(e.itemsRef)) == null || l.focus({ preventScroll: true }), e.goToItem(3);
          });
          break;
      }
    }
    function s(i) {
      switch (i.key) {
        case " ":
          i.preventDefault();
          break;
      }
    }
    function d(i) {
      t.disabled || (e.menuState.value === 0 ? (e.closeMenu(), nextTick(() => {
        var l;
        return (l = v(e.buttonRef)) == null ? void 0 : l.focus({ preventScroll: true });
      })) : (i.preventDefault(), i.stopPropagation(), e.openMenu(), Rn(() => {
        var l;
        return (l = v(e.itemsRef)) == null ? void 0 : l.focus({ preventScroll: true });
      })));
    }
    let a = P(computed(() => ({ as: t.as, type: n.type })), e.buttonRef);
    return () => {
      var c;
      let i = { open: e.menuState.value === 0 }, l = { ref: e.buttonRef, id: o, type: a.value, "aria-haspopup": true, "aria-controls": (c = v(e.itemsRef)) == null ? void 0 : c.id, "aria-expanded": t.disabled ? void 0 : e.menuState.value === 0, onKeydown: r, onKeyup: s, onClick: d };
      return x({ props: __spreadValues(__spreadValues({}, t), l), slot: i, attrs: n, slots: u, name: "MenuButton" });
    };
  } }), qa = defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(t, { attrs: n, slots: u }) {
    let e = De("MenuItems"), o = `headlessui-menu-items-${h()}`, r = ref(null);
    Y({ container: computed(() => v(e.itemsRef)), enabled: computed(() => e.menuState.value === 0), accept(l) {
      return l.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : l.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
    }, walk(l) {
      l.setAttribute("role", "none");
    } });
    function s(l) {
      var c;
      switch (r.value && clearTimeout(r.value), l.key) {
        case " ":
          if (e.searchQuery.value !== "")
            return l.preventDefault(), l.stopPropagation(), e.search(l.key);
        case "Enter":
          if (l.preventDefault(), l.stopPropagation(), e.activeItemIndex.value !== null) {
            let { id: p2 } = e.items.value[e.activeItemIndex.value];
            (c = document.getElementById(p2)) == null || c.click();
          }
          e.closeMenu(), nextTick(() => {
            var p2;
            return (p2 = v(e.buttonRef)) == null ? void 0 : p2.focus({ preventScroll: true });
          });
          break;
        case "ArrowDown":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(2);
        case "ArrowUp":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(1);
        case "Home":
        case "PageUp":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(0);
        case "End":
        case "PageDown":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(3);
        case "Escape":
          l.preventDefault(), l.stopPropagation(), e.closeMenu(), nextTick(() => {
            var p2;
            return (p2 = v(e.buttonRef)) == null ? void 0 : p2.focus({ preventScroll: true });
          });
          break;
        case "Tab":
          l.preventDefault(), l.stopPropagation();
          break;
        default:
          l.key.length === 1 && (e.search(l.key), r.value = setTimeout(() => e.clearSearch(), 350));
          break;
      }
    }
    function d(l) {
      switch (l.key) {
        case " ":
          l.preventDefault();
          break;
      }
    }
    let a = I(), i = computed(() => a !== null ? a.value === 0 : e.menuState.value === 0);
    return () => {
      var f, b;
      let l = { open: e.menuState.value === 0 }, c = { "aria-activedescendant": e.activeItemIndex.value === null || (f = e.items.value[e.activeItemIndex.value]) == null ? void 0 : f.id, "aria-labelledby": (b = v(e.buttonRef)) == null ? void 0 : b.id, id: o, onKeydown: s, onKeyup: d, role: "menu", tabIndex: 0, ref: e.itemsRef };
      return x({ props: __spreadValues(__spreadValues({}, t), c), slot: l, attrs: n, slots: u, features: 1 | 2, visible: i.value, name: "MenuItems" });
    };
  } }), za = defineComponent({ name: "MenuItem", props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false } }, setup(t, { slots: n, attrs: u }) {
    let e = De("MenuItem"), o = `headlessui-menu-item-${h()}`, r = computed(() => e.activeItemIndex.value !== null ? e.items.value[e.activeItemIndex.value].id === o : false), s = ref({ disabled: t.disabled, textValue: "" });
    onMounted(() => {
      var p2, f;
      let c = (f = (p2 = document.getElementById(o)) == null ? void 0 : p2.textContent) == null ? void 0 : f.toLowerCase().trim();
      c !== void 0 && (s.value.textValue = c);
    }), onMounted(() => e.registerItem(o, s)), onUnmounted(() => e.unregisterItem(o)), watchEffect(() => {
      e.menuState.value === 0 && (!r.value || nextTick(() => {
        var c, p2;
        return (p2 = (c = document.getElementById(o)) == null ? void 0 : c.scrollIntoView) == null ? void 0 : p2.call(c, { block: "nearest" });
      }));
    });
    function d(c) {
      if (t.disabled)
        return c.preventDefault();
      e.closeMenu(), nextTick(() => {
        var p2;
        return (p2 = v(e.buttonRef)) == null ? void 0 : p2.focus({ preventScroll: true });
      });
    }
    function a() {
      if (t.disabled)
        return e.goToItem(5);
      e.goToItem(4, o);
    }
    function i() {
      t.disabled || r.value || e.goToItem(4, o);
    }
    function l() {
      t.disabled || !r.value || e.goToItem(5);
    }
    return () => {
      let { disabled: c } = t, p2 = { active: r.value, disabled: c };
      return x({ props: __spreadValues(__spreadValues({}, t), { id: o, role: "menuitem", tabIndex: c === true ? void 0 : -1, "aria-disabled": c === true ? true : void 0, onClick: d, onFocus: a, onPointermove: i, onMousemove: i, onPointerleave: l, onMouseleave: l }), slot: p2, attrs: u, slots: n, name: "MenuItem" });
    };
  } });
  var Wt = Symbol("PopoverContext");
  function Le(t) {
    let n = inject(Wt, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <${Cn.name} /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, Le), u;
    }
    return n;
  }
  var Ut = Symbol("PopoverGroupContext");
  function $t() {
    return inject(Ut, null);
  }
  var Gt = Symbol("PopoverPanelContext");
  function On() {
    return inject(Gt, null);
  }
  var Cn = defineComponent({ name: "Popover", props: { as: { type: [Object, String], default: "div" } }, setup(t, { slots: n, attrs: u }) {
    let e = `headlessui-popover-button-${h()}`, o = `headlessui-popover-panel-${h()}`, r = ref(1), s = ref(null), d = ref(null), a = { popoverState: r, buttonId: e, panelId: o, panel: d, button: s, togglePopover() {
      r.value = T(r.value, { [0]: 1, [1]: 0 });
    }, closePopover() {
      r.value !== 1 && (r.value = 1);
    }, close(f) {
      a.closePopover();
      let b = (() => f ? f instanceof HTMLElement ? f : f.value instanceof HTMLElement ? v(f) : v(a.button) : v(a.button))();
      b == null || b.focus();
    } };
    provide(Wt, a), M(computed(() => T(r.value, { [0]: 0, [1]: 1 })));
    let i = { buttonId: e, panelId: o, close() {
      a.closePopover();
    } }, l = $t(), c = l == null ? void 0 : l.registerPopover;
    function p2() {
      var f, b, m;
      return (m = l == null ? void 0 : l.isFocusWithinPopoverGroup()) != null ? m : ((f = v(s)) == null ? void 0 : f.contains(document.activeElement)) || ((b = v(d)) == null ? void 0 : b.contains(document.activeElement));
    }
    return watchEffect(() => c == null ? void 0 : c(i)), C("focus", () => {
      r.value === 0 && (p2() || !s || !d || a.closePopover());
    }, true), C("mousedown", (f) => {
      var m, g, S;
      let b = f.target;
      r.value === 0 && (((m = v(s)) == null ? void 0 : m.contains(b)) || ((g = v(d)) == null ? void 0 : g.contains(b)) || (a.closePopover(), mt(b, 1) || (f.preventDefault(), (S = v(s)) == null || S.focus())));
    }), () => {
      let f = { open: r.value === 0, close: a.close };
      return x({ props: t, slot: f, slots: n, attrs: u, name: "Popover" });
    };
  } });
  defineComponent({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false } }, setup(t, { attrs: n, slots: u }) {
    let e = Le("PopoverButton"), o = $t(), r = o == null ? void 0 : o.closeOthers, s = On(), d = s === null ? false : s === e.panelId, a = ref(null), i = ref(typeof window == "undefined" ? null : document.activeElement);
    C("focus", () => {
      i.value = a.value, a.value = document.activeElement;
    }, true);
    let l = ref(null);
    d || watchEffect(() => {
      e.button.value = l.value;
    });
    let c = P(computed(() => ({ as: t.as, type: n.type })), l);
    function p2(m) {
      var g, S, y, R;
      if (d) {
        if (e.popoverState.value === 1)
          return;
        switch (m.key) {
          case " ":
          case "Enter":
            m.preventDefault(), m.stopPropagation(), e.closePopover(), (g = v(e.button)) == null || g.focus();
            break;
        }
      } else
        switch (m.key) {
          case " ":
          case "Enter":
            m.preventDefault(), m.stopPropagation(), e.popoverState.value === 1 && (r == null || r(e.buttonId)), e.togglePopover();
            break;
          case "Escape":
            if (e.popoverState.value !== 0)
              return r == null ? void 0 : r(e.buttonId);
            if (!v(e.button) || !((S = v(e.button)) == null ? void 0 : S.contains(document.activeElement)))
              return;
            m.preventDefault(), m.stopPropagation(), e.closePopover();
            break;
          case "Tab":
            if (e.popoverState.value !== 0 || !e.panel || !e.button)
              return;
            if (m.shiftKey) {
              if (!i.value || ((y = v(e.button)) == null ? void 0 : y.contains(i.value)) || ((R = v(e.panel)) == null ? void 0 : R.contains(i.value)))
                return;
              let E = ae(), D = E.indexOf(i.value);
              if (E.indexOf(v(e.button)) > D)
                return;
              m.preventDefault(), m.stopPropagation(), O(v(e.panel), 8);
            } else
              m.preventDefault(), m.stopPropagation(), O(v(e.panel), 1);
            break;
        }
    }
    function f(m) {
      var g, S;
      if (!d && (m.key === " " && m.preventDefault(), e.popoverState.value === 0 && !!e.panel && !!e.button))
        switch (m.key) {
          case "Tab":
            if (!i.value || ((g = v(e.button)) == null ? void 0 : g.contains(i.value)) || ((S = v(e.panel)) == null ? void 0 : S.contains(i.value)))
              return;
            let y = ae(), R = y.indexOf(i.value);
            if (y.indexOf(v(e.button)) > R)
              return;
            m.preventDefault(), m.stopPropagation(), O(v(e.panel), 8);
            break;
        }
    }
    function b() {
      var m, g;
      t.disabled || (d ? (e.closePopover(), (m = v(e.button)) == null || m.focus()) : (e.popoverState.value === 1 && (r == null || r(e.buttonId)), (g = v(e.button)) == null || g.focus(), e.togglePopover()));
    }
    return () => {
      let m = { open: e.popoverState.value === 0 }, g = d ? { ref: l, type: c.value, onKeydown: p2, onClick: b } : { ref: l, id: e.buttonId, type: c.value, "aria-expanded": t.disabled ? void 0 : e.popoverState.value === 0, "aria-controls": v(e.panel) ? e.panelId : void 0, disabled: t.disabled ? true : void 0, onKeydown: p2, onKeyup: f, onClick: b };
      return x({ props: __spreadValues(__spreadValues({}, t), g), slot: m, attrs: n, slots: u, name: "PopoverButton" });
    };
  } });
  defineComponent({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(t, { attrs: n, slots: u }) {
    let e = Le("PopoverOverlay"), o = `headlessui-popover-overlay-${h()}`, r = I(), s = computed(() => r !== null ? r.value === 0 : e.popoverState.value === 0);
    function d() {
      e.closePopover();
    }
    return () => {
      let a = { open: e.popoverState.value === 0 };
      return x({ props: __spreadValues(__spreadValues({}, t), { id: o, "aria-hidden": true, onClick: d }), slot: a, attrs: n, slots: u, features: 1 | 2, visible: s.value, name: "PopoverOverlay" });
    };
  } });
  defineComponent({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, focus: { type: Boolean, default: false } }, setup(t, { attrs: n, slots: u }) {
    let { focus: e } = t, o = Le("PopoverPanel");
    provide(Gt, o.panelId), onUnmounted(() => {
      o.panel.value = null;
    }), watchEffect(() => {
      var i;
      if (!e || o.popoverState.value !== 0 || !o.panel)
        return;
      let a = document.activeElement;
      ((i = v(o.panel)) == null ? void 0 : i.contains(a)) || O(v(o.panel), 1);
    }), C("keydown", (a) => {
      var l, c;
      if (o.popoverState.value !== 0 || !v(o.panel) || a.key !== "Tab" || !document.activeElement || !((l = v(o.panel)) == null ? void 0 : l.contains(document.activeElement)))
        return;
      a.preventDefault();
      let i = O(v(o.panel), a.shiftKey ? 2 : 4);
      if (i === 3)
        return (c = v(o.button)) == null ? void 0 : c.focus();
      if (i === 1) {
        if (!v(o.button))
          return;
        let p2 = ae(), f = p2.indexOf(v(o.button)), b = p2.splice(f + 1).filter((m) => {
          var g;
          return !((g = v(o.panel)) == null ? void 0 : g.contains(m));
        });
        O(b, 1) === 0 && O(document.body, 1);
      }
    }), C("focus", () => {
      var a;
      !e || o.popoverState.value === 0 && (!v(o.panel) || ((a = v(o.panel)) == null ? void 0 : a.contains(document.activeElement)) || o.closePopover());
    }, true);
    let r = I(), s = computed(() => r !== null ? r.value === 0 : o.popoverState.value === 0);
    function d(a) {
      var i, l;
      switch (a.key) {
        case "Escape":
          if (o.popoverState.value !== 0 || !v(o.panel) || !((i = v(o.panel)) == null ? void 0 : i.contains(document.activeElement)))
            return;
          a.preventDefault(), a.stopPropagation(), o.closePopover(), (l = v(o.button)) == null || l.focus();
          break;
      }
    }
    return () => {
      let a = { open: o.popoverState.value === 0, close: o.close }, i = { ref: o.panel, id: o.panelId, onKeydown: d };
      return x({ props: __spreadValues(__spreadValues({}, t), i), slot: a, attrs: n, slots: u, features: 1 | 2, visible: s.value, name: "PopoverPanel" });
    };
  } });
  defineComponent({ name: "PopoverGroup", props: { as: { type: [Object, String], default: "div" } }, setup(t, { attrs: n, slots: u }) {
    let e = ref(null), o = ref([]);
    function r(i) {
      let l = o.value.indexOf(i);
      l !== -1 && o.value.splice(l, 1);
    }
    function s(i) {
      return o.value.push(i), () => {
        r(i);
      };
    }
    function d() {
      var l;
      let i = document.activeElement;
      return ((l = v(e)) == null ? void 0 : l.contains(i)) ? true : o.value.some((c) => {
        var p2, f;
        return ((p2 = document.getElementById(c.buttonId)) == null ? void 0 : p2.contains(i)) || ((f = document.getElementById(c.panelId)) == null ? void 0 : f.contains(i));
      });
    }
    function a(i) {
      for (let l of o.value)
        l.buttonId !== i && l.close();
    }
    return provide(Ut, { registerPopover: s, unregisterPopover: r, isFocusWithinPopoverGroup: d, closeOthers: a }), () => x({ props: __spreadValues(__spreadValues({}, t), { ref: e }), slot: {}, attrs: n, slots: u, name: "PopoverGroup" });
  } });
  var _t = Symbol("LabelContext");
  function qt() {
    let t = inject(_t, null);
    if (t === null) {
      let n = new Error("You used a <Label /> component, but it is not inside a parent.");
      throw Error.captureStackTrace && Error.captureStackTrace(n, qt), n;
    }
    return t;
  }
  function fe({ slot: t = {}, name: n = "Label", props: u = {} } = {}) {
    let e = ref([]);
    function o(r) {
      return e.value.push(r), () => {
        let s = e.value.indexOf(r);
        s !== -1 && e.value.splice(s, 1);
      };
    }
    return provide(_t, { register: o, slot: t, name: n, props: u }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
  }
  defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false } }, setup(t, { slots: n, attrs: u }) {
    let e = qt(), o = `headlessui-label-${h()}`;
    return onMounted(() => onUnmounted(e.register(o))), () => {
      let { name: r = "Label", slot: s = {}, props: d = {} } = e, _a2 = t, { passive: a } = _a2, i = __objRest(_a2, ["passive"]), l = __spreadProps(__spreadValues({}, Object.entries(d).reduce((p2, [f, b]) => Object.assign(p2, { [f]: unref(b) }), {})), { id: o }), c = __spreadValues(__spreadValues({}, i), l);
      return a && delete c.onClick, x({ props: c, slot: s, attrs: u, slots: n, name: r });
    };
  } });
  var Qt = Symbol("RadioGroupContext");
  function Jt(t) {
    let n = inject(Qt, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <RadioGroup /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, Jt), u;
    }
    return n;
  }
  defineComponent({ name: "RadioGroup", emits: { "update:modelValue": (t) => true }, props: { as: { type: [Object, String], default: "div" }, disabled: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean] } }, setup(t, { emit: n, attrs: u, slots: e }) {
    let o = ref(null), r = ref([]), s = fe({ name: "RadioGroupLabel" }), d = G({ name: "RadioGroupDescription" }), a = computed(() => t.modelValue), i = { options: r, value: a, disabled: computed(() => t.disabled), firstOption: computed(() => r.value.find((p2) => !p2.propsRef.disabled)), containsCheckedOption: computed(() => r.value.some((p2) => toRaw(p2.propsRef.value) === toRaw(t.modelValue))), change(p2) {
      var b;
      if (t.disabled || a.value === p2)
        return false;
      let f = (b = r.value.find((m) => toRaw(m.propsRef.value) === toRaw(p2))) == null ? void 0 : b.propsRef;
      return (f == null ? void 0 : f.disabled) ? false : (n("update:modelValue", p2), true);
    }, registerOption(p2) {
      var b;
      let f = Array.from((b = o.value) == null ? void 0 : b.querySelectorAll('[id^="headlessui-radiogroup-option-"]')).reduce((m, g, S) => Object.assign(m, { [g.id]: S }), {});
      r.value.push(p2), r.value.sort((m, g) => f[m.id] - f[g.id]);
    }, unregisterOption(p2) {
      let f = r.value.findIndex((b) => b.id === p2);
      f !== -1 && r.value.splice(f, 1);
    } };
    provide(Qt, i), Y({ container: computed(() => v(o)), accept(p2) {
      return p2.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : p2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
    }, walk(p2) {
      p2.setAttribute("role", "none");
    } });
    function l(p2) {
      if (!o.value || !o.value.contains(p2.target))
        return;
      let f = r.value.filter((b) => b.propsRef.disabled === false).map((b) => b.element);
      switch (p2.key) {
        case "ArrowLeft":
        case "ArrowUp":
          if (p2.preventDefault(), p2.stopPropagation(), O(f, 2 | 16) === 2) {
            let m = r.value.find((g) => g.element === document.activeElement);
            m && i.change(m.propsRef.value);
          }
          break;
        case "ArrowRight":
        case "ArrowDown":
          if (p2.preventDefault(), p2.stopPropagation(), O(f, 4 | 16) === 2) {
            let m = r.value.find((g) => g.element === document.activeElement);
            m && i.change(m.propsRef.value);
          }
          break;
        case " ":
          {
            p2.preventDefault(), p2.stopPropagation();
            let b = r.value.find((m) => m.element === document.activeElement);
            b && i.change(b.propsRef.value);
          }
          break;
      }
    }
    let c = `headlessui-radiogroup-${h()}`;
    return () => {
      let _a2 = t, { modelValue: p2, disabled: f } = _a2, b = __objRest(_a2, ["modelValue", "disabled"]), m = { ref: o, id: c, role: "radiogroup", "aria-labelledby": s.value, "aria-describedby": d.value, onKeydown: l };
      return x({ props: __spreadValues(__spreadValues({}, b), m), slot: {}, attrs: u, slots: e, name: "RadioGroup" });
    };
  } });
  defineComponent({ name: "RadioGroupOption", props: { as: { type: [Object, String], default: "div" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(t, { attrs: n, slots: u }) {
    let e = Jt("RadioGroupOption"), o = `headlessui-radiogroup-option-${h()}`, r = fe({ name: "RadioGroupLabel" }), s = G({ name: "RadioGroupDescription" }), d = ref(null), a = computed(() => ({ value: t.value, disabled: t.disabled })), i = ref(1);
    onMounted(() => e.registerOption({ id: o, element: d, propsRef: a })), onUnmounted(() => e.unregisterOption(o));
    let l = computed(() => {
      var S;
      return ((S = e.firstOption.value) == null ? void 0 : S.id) === o;
    }), c = computed(() => e.disabled.value || t.disabled), p2 = computed(() => toRaw(e.value.value) === toRaw(t.value)), f = computed(() => c.value ? -1 : p2.value || !e.containsCheckedOption.value && l.value ? 0 : -1);
    function b() {
      var S;
      !e.change(t.value) || (i.value |= 2, (S = d.value) == null || S.focus());
    }
    function m() {
      i.value |= 2;
    }
    function g() {
      i.value &= ~2;
    }
    return () => {
      let S = L(t, ["value", "disabled"]), y = { checked: p2.value, disabled: c.value, active: Boolean(i.value & 2) }, R = { id: o, ref: d, role: "radio", "aria-checked": p2.value ? "true" : "false", "aria-labelledby": r.value, "aria-describedby": s.value, "aria-disabled": c.value ? true : void 0, tabIndex: f.value, onClick: c.value ? void 0 : b, onFocus: c.value ? void 0 : m, onBlur: c.value ? void 0 : g };
      return x({ props: __spreadValues(__spreadValues({}, S), R), slot: y, attrs: n, slots: u, name: "RadioGroupOption" });
    };
  } });
  var Zt = Symbol("GroupContext");
  defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(t, { slots: n, attrs: u }) {
    let e = ref(null), o = fe({ name: "SwitchLabel", props: { onClick() {
      !e.value || (e.value.click(), e.value.focus({ preventScroll: true }));
    } } }), r = G({ name: "SwitchDescription" });
    return provide(Zt, { switchRef: e, labelledby: o, describedby: r }), () => x({ props: t, slot: {}, slots: n, attrs: u, name: "SwitchGroup" });
  } });
  defineComponent({ name: "Switch", emits: { "update:modelValue": (t) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: false } }, setup(t, { emit: n, attrs: u, slots: e }) {
    let o = inject(Zt, null), r = `headlessui-switch-${h()}`;
    function s() {
      n("update:modelValue", !t.modelValue);
    }
    let d = ref(null), a = o === null ? d : o.switchRef, i = P(computed(() => ({ as: t.as, type: u.type })), a);
    function l(f) {
      f.preventDefault(), s();
    }
    function c(f) {
      f.key !== "Tab" && f.preventDefault(), f.key === " " && s();
    }
    function p2(f) {
      f.preventDefault();
    }
    return () => {
      let f = { checked: t.modelValue }, b = { id: r, ref: a, role: "switch", type: i.value, tabIndex: 0, "aria-checked": t.modelValue, "aria-labelledby": o == null ? void 0 : o.labelledby.value, "aria-describedby": o == null ? void 0 : o.describedby.value, onClick: l, onKeyup: c, onKeypress: p2 };
      return x({ props: __spreadValues(__spreadValues({}, t), b), slot: f, attrs: u, slots: e, name: "Switch" });
    };
  } });
  var oo = Symbol("TabsContext");
  function ve(t) {
    let n = inject(oo, null);
    if (n === null) {
      let u = new Error(`<${t} /> is missing a parent <TabGroup /> component.`);
      throw Error.captureStackTrace && Error.captureStackTrace(u, ve), u;
    }
    return n;
  }
  var nu = defineComponent({ name: "TabGroup", emits: { change: (t) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(null), r = ref([]), s = ref([]), d = { selectedIndex: o, orientation: computed(() => t.vertical ? "vertical" : "horizontal"), activation: computed(() => t.manual ? "manual" : "auto"), tabs: r, panels: s, setSelectedIndex(a) {
      o.value !== a && (o.value = a, e("change", a));
    }, registerTab(a) {
      r.value.includes(a) || r.value.push(a);
    }, unregisterTab(a) {
      let i = r.value.indexOf(a);
      i !== -1 && r.value.splice(i, 1);
    }, registerPanel(a) {
      s.value.includes(a) || s.value.push(a);
    }, unregisterPanel(a) {
      let i = s.value.indexOf(a);
      i !== -1 && s.value.splice(i, 1);
    } };
    return provide(oo, d), watchEffect(() => {
      var c;
      if (d.tabs.value.length <= 0 || t.selectedIndex === null && o.value !== null)
        return;
      let a = d.tabs.value.map((p2) => v(p2)).filter(Boolean), i = a.filter((p2) => !p2.hasAttribute("disabled")), l = (c = t.selectedIndex) != null ? c : t.defaultIndex;
      if (l < 0)
        o.value = a.indexOf(i[0]);
      else if (l > d.tabs.value.length)
        o.value = a.indexOf(i[i.length - 1]);
      else {
        let p2 = a.slice(0, l), b = [...a.slice(l), ...p2].find((m) => i.includes(m));
        if (!b)
          return;
        o.value = a.indexOf(b);
      }
    }), () => {
      let a = { selectedIndex: o.value };
      return x({ props: L(t, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]), slot: a, slots: n, attrs: u, name: "TabGroup" });
    };
  } }), lu = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(t, { attrs: n, slots: u }) {
    let e = ve("TabList");
    return () => {
      let o = { selectedIndex: e.selectedIndex.value }, r = { role: "tablist", "aria-orientation": e.orientation.value };
      return x({ props: __spreadValues(__spreadValues({}, t), r), slot: o, attrs: n, slots: u, name: "TabList" });
    };
  } }), ru = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false } }, setup(t, { attrs: n, slots: u }) {
    let e = ve("Tab"), o = `headlessui-tabs-tab-${h()}`, r = ref();
    onMounted(() => e.registerTab(r)), onUnmounted(() => e.unregisterTab(r));
    let s = computed(() => e.tabs.value.indexOf(r)), d = computed(() => s.value === e.selectedIndex.value);
    function a(p2) {
      let f = e.tabs.value.map((b) => v(b)).filter(Boolean);
      if (p2.key === " " || p2.key === "Enter") {
        p2.preventDefault(), p2.stopPropagation(), e.setSelectedIndex(s.value);
        return;
      }
      switch (p2.key) {
        case "Home":
        case "PageUp":
          return p2.preventDefault(), p2.stopPropagation(), O(f, 1);
        case "End":
        case "PageDown":
          return p2.preventDefault(), p2.stopPropagation(), O(f, 8);
      }
      return T(e.orientation.value, { vertical() {
        if (p2.key === "ArrowUp")
          return O(f, 2 | 16);
        if (p2.key === "ArrowDown")
          return O(f, 4 | 16);
      }, horizontal() {
        if (p2.key === "ArrowLeft")
          return O(f, 2 | 16);
        if (p2.key === "ArrowRight")
          return O(f, 4 | 16);
      } });
    }
    function i() {
      var p2;
      (p2 = v(r)) == null || p2.focus();
    }
    function l() {
      var p2;
      t.disabled || ((p2 = v(r)) == null || p2.focus(), e.setSelectedIndex(s.value));
    }
    let c = P(computed(() => ({ as: t.as, type: n.type })), r);
    return () => {
      var b, m;
      let p2 = { selected: d.value }, f = { ref: r, onKeydown: a, onFocus: e.activation.value === "manual" ? i : l, onClick: l, id: o, role: "tab", type: c.value, "aria-controls": (m = (b = e.panels.value[s.value]) == null ? void 0 : b.value) == null ? void 0 : m.id, "aria-selected": d.value, tabIndex: d.value ? 0 : -1, disabled: t.disabled ? true : void 0 };
      return x({ props: __spreadValues(__spreadValues({}, t), f), slot: p2, attrs: n, slots: u, name: "Tab" });
    };
  } }), au = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(t, { slots: n, attrs: u }) {
    let e = ve("TabPanels");
    return () => {
      let o = { selectedIndex: e.selectedIndex.value };
      return x({ props: t, slot: o, attrs: u, slots: n, name: "TabPanels" });
    };
  } }), iu = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(t, { attrs: n, slots: u }) {
    let e = ve("TabPanel"), o = `headlessui-tabs-panel-${h()}`, r = ref();
    onMounted(() => e.registerPanel(r)), onUnmounted(() => e.unregisterPanel(r));
    let s = computed(() => e.panels.value.indexOf(r)), d = computed(() => s.value === e.selectedIndex.value);
    return () => {
      var l, c;
      let a = { selected: d.value }, i = { ref: r, id: o, role: "tabpanel", "aria-labelledby": (c = (l = e.tabs.value[s.value]) == null ? void 0 : l.value) == null ? void 0 : c.id, tabIndex: d.value ? 0 : -1 };
      return x({ props: __spreadValues(__spreadValues({}, t), i), slot: a, attrs: n, slots: u, features: 2 | 1, visible: d.value, name: "TabPanel" });
    };
  } });
  function no(t) {
    let n = { called: false };
    return (...u) => {
      if (!n.called)
        return n.called = true, t(...u);
    };
  }
  function Ze() {
    let t = [], n = [], u = { enqueue(e) {
      n.push(e);
    }, requestAnimationFrame(...e) {
      let o = requestAnimationFrame(...e);
      u.add(() => cancelAnimationFrame(o));
    }, nextFrame(...e) {
      u.requestAnimationFrame(() => {
        u.requestAnimationFrame(...e);
      });
    }, setTimeout(...e) {
      let o = setTimeout(...e);
      u.add(() => clearTimeout(o));
    }, add(e) {
      t.push(e);
    }, dispose() {
      for (let e of t.splice(0))
        e();
    }, async workQueue() {
      for (let e of n.splice(0))
        await e();
    } };
    return u;
  }
  function et(t, ...n) {
    t && n.length > 0 && t.classList.add(...n);
  }
  function Fe(t, ...n) {
    t && n.length > 0 && t.classList.remove(...n);
  }
  function $n(t, n) {
    let u = Ze();
    if (!t)
      return u.dispose;
    let { transitionDuration: e, transitionDelay: o } = getComputedStyle(t), [r, s] = [e, o].map((d) => {
      let [a = 0] = d.split(",").filter(Boolean).map((i) => i.includes("ms") ? parseFloat(i) : parseFloat(i) * 1e3).sort((i, l) => l - i);
      return a;
    });
    return r !== 0 ? u.setTimeout(() => n("finished"), r + s) : n("finished"), u.add(() => n("cancelled")), u.dispose;
  }
  function tt(t, n, u, e, o, r) {
    let s = Ze(), d = r !== void 0 ? no(r) : () => {
    };
    return Fe(t, ...o), et(t, ...n, ...u), s.nextFrame(() => {
      Fe(t, ...u), et(t, ...e), s.add($n(t, (a) => (Fe(t, ...e, ...n), et(t, ...o), d(a))));
    }), s.add(() => Fe(t, ...n, ...u, ...e, ...o)), s.add(() => d("cancelled")), s.dispose;
  }
  function Q(t = "") {
    return t.split(" ").filter((n) => n.trim().length > 1);
  }
  var lt = Symbol("TransitionContext");
  function _n() {
    return inject(lt, null) !== null;
  }
  function qn() {
    let t = inject(lt, null);
    if (t === null)
      throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
    return t;
  }
  function zn() {
    let t = inject(rt, null);
    if (t === null)
      throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
    return t;
  }
  var rt = Symbol("NestingContext");
  function He(t) {
    return "children" in t ? He(t.children) : t.value.filter(({ state: n }) => n === "visible").length > 0;
  }
  function io(t) {
    let n = ref([]), u = ref(false);
    onMounted(() => u.value = true), onUnmounted(() => u.value = false);
    function e(r, s = 1) {
      let d = n.value.findIndex(({ id: a }) => a === r);
      d !== -1 && (T(s, { [0]() {
        n.value.splice(d, 1);
      }, [1]() {
        n.value[d].state = "hidden";
      } }), !He(n) && u.value && (t == null || t()));
    }
    function o(r) {
      let s = n.value.find(({ id: d }) => d === r);
      return s ? s.state !== "visible" && (s.state = "visible") : n.value.push({ id: r, state: "visible" }), () => e(r, 0);
    }
    return { children: n, register: o, unregister: e };
  }
  var uo = 1, Qn = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(t, { emit: n, attrs: u, slots: e }) {
    if (!_n() && it())
      return () => h$1(Yn, __spreadProps(__spreadValues({}, t), { onBeforeEnter: () => n("beforeEnter"), onAfterEnter: () => n("afterEnter"), onBeforeLeave: () => n("beforeLeave"), onAfterLeave: () => n("afterLeave") }), e);
    let o = ref(null), r = ref("visible"), s = computed(() => t.unmount ? 0 : 1), { show: d, appear: a } = qn(), { register: i, unregister: l } = zn(), c = { value: true }, p2 = h(), f = { value: false }, b = io(() => {
      f.value || (r.value = "hidden", l(p2), n("afterLeave"));
    });
    onMounted(() => {
      let F = i(p2);
      onUnmounted(F);
    }), watchEffect(() => {
      if (s.value === 1 && !!p2) {
        if (d && r.value !== "visible") {
          r.value = "visible";
          return;
        }
        T(r.value, { hidden: () => l(p2), visible: () => i(p2) });
      }
    });
    let m = Q(t.enter), g = Q(t.enterFrom), S = Q(t.enterTo), y = Q(t.entered), R = Q(t.leave), E = Q(t.leaveFrom), D = Q(t.leaveTo);
    onMounted(() => {
      watchEffect(() => {
        if (r.value === "visible") {
          let F = v(o);
          if (F instanceof Comment && F.data === "")
            throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
        }
      });
    });
    function w(F) {
      let xe = c.value && !a.value, U = v(o);
      !U || !(U instanceof HTMLElement) || xe || (f.value = true, d.value && n("beforeEnter"), d.value || n("beforeLeave"), F(d.value ? tt(U, m, g, S, y, (ye) => {
        f.value = false, ye === "finished" && n("afterEnter");
      }) : tt(U, R, E, D, y, (ye) => {
        f.value = false, ye === "finished" && (He(b) || (r.value = "hidden", l(p2), n("afterLeave")));
      })));
    }
    return onMounted(() => {
      watch([d, a], (F, xe, U) => {
        w(U), c.value = false;
      }, { immediate: true });
    }), provide(rt, b), M(computed(() => T(r.value, { visible: 0, hidden: 1 }))), () => {
      let _a2 = t, { appear: F, show: xe, enter: U, enterFrom: ye, enterTo: Xn, entered: Zn, leave: el, leaveFrom: tl, leaveTo: ol } = _a2, so = __objRest(_a2, ["appear", "show", "enter", "enterFrom", "enterTo", "entered", "leave", "leaveFrom", "leaveTo"]);
      return x({ props: __spreadValues(__spreadValues({}, so), { ref: o }), slot: {}, slots: e, attrs: u, features: uo, visible: r.value === "visible", name: "TransitionChild" });
    };
  } }), Jn = Qn, Yn = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(t, { emit: n, attrs: u, slots: e }) {
    let o = I(), r = computed(() => t.show === null && o !== null ? T(o.value, { [0]: true, [1]: false }) : t.show);
    watchEffect(() => {
      if (![true, false].includes(r.value))
        throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
    });
    let s = ref(r.value ? "visible" : "hidden"), d = io(() => {
      s.value = "hidden";
    }), a = { value: true }, i = { show: r, appear: computed(() => t.appear || !a.value) };
    return onMounted(() => {
      watchEffect(() => {
        a.value = false, r.value ? s.value = "visible" : He(d) || (s.value = "hidden");
      });
    }), provide(rt, d), provide(lt, i), () => {
      let l = L(t, ["show", "appear", "unmount"]), c = { unmount: t.unmount };
      return x({ props: __spreadProps(__spreadValues({}, c), { as: "template" }), slot: {}, slots: __spreadProps(__spreadValues({}, e), { default: () => [h$1(Jn, __spreadValues(__spreadValues(__spreadValues({ onBeforeEnter: () => n("beforeEnter"), onAfterEnter: () => n("afterEnter"), onBeforeLeave: () => n("beforeLeave"), onAfterLeave: () => n("afterLeave") }, u), c), l), e.default)] }), attrs: {}, features: uo, visible: s.value === "visible", name: "Transition" });
    };
  } });
  const _hoisted_1$a = ["value"];
  const _sfc_main$c = /* @__PURE__ */ defineComponent({
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("input", {
          value: props.value,
          class: "tw-relative tw-block tw-w-full",
          onInput: _cache[0] || (_cache[0] = (e) => emit("change", e.target.value))
        }, null, 40, _hoisted_1$a);
      };
    }
  });
  var WPFormGroup_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _hoisted_1$9 = ["for"];
  const _hoisted_2$8 = { class: "tw-relative tw-block tw-w-full tw-font-semibold" };
  const _hoisted_3$6 = { class: "tw-relative tw-block tw-w-full tw-mt-1" };
  const _sfc_main$b = /* @__PURE__ */ defineComponent({
    props: {
      title: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: ""
      },
      for: {
        type: String,
        default: ""
      },
      state: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["form-group input-text-wrap tw-relative tw-block tw-w-full", {
            "form-group--required": __props.required
          }])
        }, [
          props.title ? (openBlock(), createElementBlock("label", {
            key: 0,
            class: "tw-relative tw-block tw-w-full",
            for: props.for
          }, [
            createBaseVNode("span", _hoisted_2$8, toDisplayString(props.title), 1),
            props.description ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["tw-relative tw-block tw-w-full tw-text-xs tw-font-normal", {
                "tw-text-gray-500": props.state === "",
                "tw-text-red-500": props.state === "error",
                "tw-text-green-500": props.state === "success"
              }])
            }, toDisplayString(props.description), 3)) : createCommentVNode("", true)
          ], 8, _hoisted_1$9)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$6, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 2);
      };
    }
  });
  var WPFormGroup = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-bbb68bcc"]]);
  const _hoisted_1$8 = ["value", "rows"];
  const _sfc_main$a = /* @__PURE__ */ defineComponent({
    props: {
      value: {
        type: String,
        default: ""
      },
      rows: {
        type: Number,
        default: 4
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("textarea", {
          value: props.value,
          class: "tw-relative tw-block tw-w-full !tw-p-[8px]",
          rows: props.rows,
          onInput: _cache[0] || (_cache[0] = (e) => emit("change", e.target.value))
        }, null, 40, _hoisted_1$8);
      };
    }
  });
  const _hoisted_1$7 = { class: "tw-relative tw-block tw-w-full" };
  const _hoisted_2$7 = ["id", "checked"];
  const _hoisted_3$5 = ["for"];
  const _sfc_main$9 = /* @__PURE__ */ defineComponent({
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$7, [
          createBaseVNode("input", {
            id: props.id,
            type: "checkbox",
            checked: props.checked,
            class: "tw-relative tw-inline-block tw-align-top",
            onInput: _cache[0] || (_cache[0] = (e) => emit("change", e.target.checked))
          }, null, 40, _hoisted_2$7),
          props.label ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: props.id,
            class: "tw-relative tw-inline-block tw-ml-1 tw-align-middle"
          }, toDisplayString(props.label), 9, _hoisted_3$5)) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$6 = ["value"];
  const _hoisted_2$6 = ["value"];
  const _sfc_main$8 = /* @__PURE__ */ defineComponent({
    props: {
      value: {
        type: String,
        default: ""
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("select", {
          class: "tw-relative tw-block tw-w-full !tw-max-w-none",
          value: props.value,
          onInput: _cache[0] || (_cache[0] = (e) => emit("change", e.target.value))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
            return openBlock(), createElementBlock("option", {
              key: option.value,
              value: option.value
            }, toDisplayString(option.label), 9, _hoisted_2$6);
          }), 128))
        ], 40, _hoisted_1$6);
      };
    }
  });
  var WPNotice_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _hoisted_1$5 = { key: 0 };
  const _hoisted_2$5 = { key: 1 };
  const _sfc_main$7 = /* @__PURE__ */ defineComponent({
    props: {
      variant: {
        type: String,
        default: "error"
      },
      content: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["notice inline wp-pp-notice", {
            "notice-error": props.variant === "error",
            "notice-warning": props.variant === "warning",
            "notice-success": props.variant === "success",
            "notice-info": props.variant === "info"
          }])
        }, [
          props.content ? (openBlock(), createElementBlock("p", _hoisted_1$5, toDisplayString(__props.content), 1)) : _ctx.$slots.default ? (openBlock(), createElementBlock("p", _hoisted_2$5, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ], 2);
      };
    }
  });
  var WPNotice = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-70ee0d60"]]);
  const _hoisted_1$4 = { class: "tw-relative tw-block tw-overflow-hidden" };
  const _hoisted_2$4 = { class: "tw-relative tw-block tw-w-full tw-overflow-hidden" };
  const _hoisted_3$4 = { class: "tw-block tw-rounded-sm tw-w-full tw-overflow-x-hidden tw-overflow-y-auto tw-h-60 tw-border tw-border-gray-400" };
  const _hoisted_4$3 = {
    key: 0,
    class: "tw-p-2"
  };
  const _sfc_main$6 = /* @__PURE__ */ defineComponent({
    props: {
      popupDetails: {
        type: Object,
        required: true
      },
      busy: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      const magicPopupsAjax = window.magic_popups_ajax;
      const popupDetails = reactive(__spreadValues({}, props.popupDetails));
      const isLoadingPages = ref(false);
      const pages = ref([]);
      watch(popupDetails, (newVal, oldVal) => {
        emit("change", newVal);
      });
      onMounted(async () => {
        isLoadingPages.value = true;
        const formData = new FormData();
        formData.append("action", "magic_popups_get_pages");
        formData.append("nonce", magicPopupsAjax.nonce);
        try {
          const resp = await axios.post(magicPopupsAjax.url, formData);
          pages.value = resp.data;
        } catch (err) {
          console.log(err);
        } finally {
          isLoadingPages.value = false;
        }
      });
      computed(() => {
        if (popupDetails.displayFrequency === "page-load")
          return "Every Page Load";
        else if (popupDetails.displayFrequency === "session")
          return "Once Per Session (Recommended)";
        else if (popupDetails.displayFrequency === "daily")
          return "Once Per Day";
        else if (popupDetails.displayFrequency === "weekly")
          return "Once Per Week";
        return "";
      });
      computed(() => {
        if (popupDetails.openingDelay === 0)
          return "0 Second Delay";
        else if (popupDetails.openingDelay === 1)
          return "1 Second Delay";
        else if (popupDetails.openingDelay === 2)
          return "2 Second Delay";
        else if (popupDetails.openingDelay === 3)
          return "3 Second Delay";
        else if (popupDetails.openingDelay === 4)
          return "4 Second Delay";
        else if (popupDetails.openingDelay === 5)
          return "5 Second Delay (Recommended)";
        else if (popupDetails.openingDelay === 10)
          return "10 Second Delay";
        else if (popupDetails.openingDelay === 15)
          return "15 Second Delay";
        else if (popupDetails.openingDelay === 20)
          return "20 Second Delay";
        else if (popupDetails.openingDelay === 25)
          return "25 Second Delay";
        else if (popupDetails.openingDelay === 30)
          return "30 Second Delay";
        return "";
      });
      computed(() => {
        if (popupDetails.backdropOpacity === 0)
          return "0% Opacity";
        else if (popupDetails.backdropOpacity === 10)
          return "10% Opacity";
        else if (popupDetails.backdropOpacity === 20)
          return "20% Opacity";
        else if (popupDetails.backdropOpacity === 30)
          return "30% Opacity";
        else if (popupDetails.backdropOpacity === 40)
          return "40% Opacity";
        else if (popupDetails.backdropOpacity === 50)
          return "50% Opacity";
        else if (popupDetails.backdropOpacity === 60)
          return "60% Opacity";
        else if (popupDetails.backdropOpacity === 70)
          return "70% Opacity (Recommended)";
        else if (popupDetails.backdropOpacity === 80)
          return "80% Opacity";
        else if (popupDetails.backdropOpacity === 90)
          return "90% Opacity";
        else if (popupDetails.backdropOpacity === 100)
          return "100% Opacity";
        return "";
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createVNode(unref(nu), {
              vertical: "",
              as: "div",
              class: "tw-flex tw-items-start"
            }, {
              default: withCtx(() => [
                createVNode(unref(lu), {
                  as: "div",
                  class: "tw-flex-none tw-w-60 tw-bg-gray-50 tw-border tw-border-gray-300 tw-border-r-0 tw-overflow-hidden"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ru), { as: "template" }, {
                      default: withCtx(({ selected }) => [
                        createBaseVNode("button", {
                          class: normalizeClass(["tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all", {
                            "tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500": selected,
                            "tw-bg-transparent tw-font-semibold": !selected
                          }])
                        }, " Content ", 2)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ru), { as: "template" }, {
                      default: withCtx(({ selected }) => [
                        createBaseVNode("button", {
                          class: normalizeClass(["tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all", {
                            "tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500": selected,
                            "tw-bg-transparent tw-font-semibold": !selected
                          }])
                        }, " Behaviour ", 2)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ru), { as: "template" }, {
                      default: withCtx(({ selected }) => [
                        createBaseVNode("button", {
                          class: normalizeClass(["tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all", {
                            "tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500": selected,
                            "tw-bg-transparent tw-font-semibold": !selected
                          }])
                        }, " Appearance ", 2)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ru), { as: "template" }, {
                      default: withCtx(({ selected }) => [
                        createBaseVNode("button", {
                          class: normalizeClass(["tw-block tw-w-full tw-text-left tw-p-4 tw-transition-all", {
                            "tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500": selected,
                            "tw-bg-transparent tw-font-semibold": !selected
                          }])
                        }, " Other ", 2)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(au), {
                  as: "div",
                  class: "tw-shrink tw-w-full tw-border tw-border-gray-300 tw-p-6"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(iu), {
                      as: "div",
                      class: "tw-block tw-w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(WPFormGroup, {
                          title: "Title",
                          description: "Please provide a title for your popup. E.g. 'Check out our latest offers!'",
                          for: "popup-title",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-title",
                              type: "text",
                              disabled: __props.busy,
                              placeholder: "Popup Title...",
                              value: unref(popupDetails).title,
                              onChange: _cache[0] || (_cache[0] = (val) => unref(popupDetails).title = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Content",
                          description: "Please enter the main body of text within this popup. (Shortcodes are allowed)",
                          for: "popup-content",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$a, {
                              id: "popup-content",
                              rows: 12,
                              disabled: __props.busy,
                              placeholder: "Popup Content...",
                              value: unref(popupDetails).content,
                              onChange: _cache[1] || (_cache[1] = (val) => unref(popupDetails).content = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Show Button",
                          description: "Add a button to your popup",
                          for: "popup-show-button"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$9, {
                              id: "popup-show-button",
                              disabled: __props.busy,
                              checked: unref(popupDetails).buttonEnabled,
                              onChange: _cache[2] || (_cache[2] = (val) => unref(popupDetails).buttonEnabled = val)
                            }, null, 8, ["disabled", "checked"])
                          ]),
                          _: 1
                        }),
                        unref(popupDetails).buttonEnabled ? (openBlock(), createBlock(WPFormGroup, {
                          key: 0,
                          class: "tw-mt-6",
                          title: "Button Label",
                          description: "E.g. 'See More'",
                          for: "popup-button-label"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-button-label",
                              type: "text",
                              disabled: __props.busy,
                              value: unref(popupDetails).buttonLabel,
                              onChange: _cache[3] || (_cache[3] = (val) => unref(popupDetails).buttonLabel = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        unref(popupDetails).buttonEnabled ? (openBlock(), createBlock(WPFormGroup, {
                          key: 1,
                          class: "tw-mt-6",
                          title: "Button URL",
                          description: "E.g. 'https://www.example.com/my-page'",
                          for: "popup-button-url"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-button-url",
                              type: "text",
                              disabled: __props.busy,
                              value: unref(popupDetails).buttonURL,
                              onChange: _cache[4] || (_cache[4] = (val) => unref(popupDetails).buttonURL = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(iu), {
                      as: "div",
                      class: "tw-block tw-w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(WPFormGroup, {
                          title: "Display Frequency",
                          description: "How often should this popup be displayed to the end user?",
                          required: "",
                          for: "popup-display-frequency"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$8, {
                              id: "popup-display-frequency",
                              disabled: __props.busy,
                              value: unref(popupDetails).displayFrequency,
                              options: [
                                { label: "Every Page Load", value: "page-load" },
                                { label: "Once Per Session (Recommended)", value: "session" },
                                { label: "Once Per Day", value: "daily" },
                                { label: "Once Per Week", value: "weekly" }
                              ],
                              onChange: _cache[5] || (_cache[5] = (val) => unref(popupDetails).displayFrequency = val)
                            }, null, 8, ["disabled", "value", "options"]),
                            unref(popupDetails).displayFrequency === "page-load" ? (openBlock(), createBlock(WPNotice, {
                              key: 0,
                              variant: "warning",
                              class: "!tw-mt-2",
                              content: "The popup will be displayed everytime the user navigates to a new page. This is not recommended as it will be annoying for the end-user."
                            })) : unref(popupDetails).displayFrequency === "session" ? (openBlock(), createBlock(WPNotice, {
                              key: 1,
                              variant: "info",
                              class: "!tw-mt-2",
                              content: "This will only display the popup once during a users session on your website. Once they close the browser and revisit your website, it'll appear again."
                            })) : unref(popupDetails).displayFrequency === "daily" ? (openBlock(), createBlock(WPNotice, {
                              key: 2,
                              variant: "info",
                              class: "!tw-mt-2",
                              content: "The popup will appear to the user at a maximum of once a day."
                            })) : unref(popupDetails).displayFrequency === "weekly" ? (openBlock(), createBlock(WPNotice, {
                              key: 3,
                              variant: "info",
                              class: "!tw-mt-2",
                              content: "The popup will appear to the user at a maximum of once a week."
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Opening Delay",
                          description: "How many seconds delay before the popup should appear?",
                          for: "popup-opening-delay",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$8, {
                              id: "popup-opening-delay",
                              disabled: __props.busy,
                              value: unref(popupDetails).openingDelay.toString(),
                              options: [
                                { label: "0 seconds", value: "0" },
                                { label: "1 second", value: "1" },
                                { label: "2 seconds", value: "2" },
                                { label: "3 seconds", value: "3" },
                                { label: "4 seconds", value: "4" },
                                { label: "5 seconds (Recommended)", value: "5" },
                                { label: "10 seconds", value: "10" },
                                { label: "15 seconds", value: "15" },
                                { label: "20 seconds", value: "20" },
                                { label: "25 seconds", value: "25" },
                                { label: "30 seconds", value: "30" }
                              ],
                              onChange: _cache[6] || (_cache[6] = (val) => unref(popupDetails).openingDelay = Number(val))
                            }, null, 8, ["disabled", "value", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Show Popup on all pages",
                          description: "If you disable this option, you can manually select which pages the popup should appear on.",
                          for: "popup-show-all-pages"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$9, {
                              id: "popup-show-all-pages",
                              disabled: __props.busy,
                              checked: unref(popupDetails).showOnAllPages,
                              onChange: _cache[7] || (_cache[7] = (val) => unref(popupDetails).showOnAllPages = val)
                            }, null, 8, ["disabled", "checked"])
                          ]),
                          _: 1
                        }),
                        !unref(popupDetails).showOnAllPages ? (openBlock(), createBlock(WPFormGroup, {
                          key: 0,
                          class: "tw-mt-6",
                          title: "Page Selection",
                          description: "Please select which pages the popup should appear on."
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_3$4, [
                              isLoadingPages.value ? (openBlock(), createElementBlock("p", _hoisted_4$3, " Loading pages... ")) : createCommentVNode("", true),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (page) => {
                                return openBlock(), createBlock(_sfc_main$9, {
                                  id: `popup-page-${page.ID}`,
                                  key: page.ID,
                                  checked: unref(popupDetails).showOnThesePages.includes(page.ID),
                                  disabled: __props.busy,
                                  label: page.post_title,
                                  class: "tw-p-2 tw-border-b tw-border-b-gray-400",
                                  onChange: (val) => unref(popupDetails).showOnThesePages = val ? [...unref(popupDetails).showOnThesePages, page.ID] : unref(popupDetails).showOnThesePages.filter((id) => id !== page.ID)
                                }, null, 8, ["id", "checked", "disabled", "label", "onChange"]);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(iu), {
                      as: "div",
                      class: "tw-block tw-w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(WPFormGroup, {
                          title: "Backdrop Color",
                          description: "The color of the backdrop behind the popup",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              type: "color",
                              placeholder: "Select",
                              disabled: __props.busy,
                              value: unref(popupDetails).backdropColor,
                              onChange: _cache[8] || (_cache[8] = (val) => unref(popupDetails).backdropColor = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Backdrop Opacity",
                          description: "How solid should the backdrop appear? Lower opacity means you'll see the content behind the popup more.",
                          for: "popup-backdrop-opacity",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$8, {
                              id: "popup-backdrop-opacity",
                              disabled: __props.busy,
                              value: unref(popupDetails).backdropOpacity.toString(),
                              options: [
                                { label: "0%", value: "0" },
                                { label: "10%", value: "10" },
                                { label: "20%", value: "20" },
                                { label: "30%", value: "30" },
                                { label: "40%", value: "40" },
                                { label: "50%", value: "50" },
                                { label: "60%", value: "60" },
                                { label: "70% (Recommended)", value: "70" },
                                { label: "80%", value: "80" },
                                { label: "90%", value: "90" },
                                { label: "100%", value: "100" }
                              ],
                              onChange: _cache[9] || (_cache[9] = (val) => unref(popupDetails).backdropOpacity = Number(val))
                            }, null, 8, ["disabled", "value", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Maximum Width (px)",
                          description: "This is relevant mainly for larger screens. We recommended around 600px.",
                          for: "popup-max-width",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-max-width",
                              type: "number",
                              placeholder: "Maximum Width...",
                              disabled: __props.busy,
                              value: unref(popupDetails).maxWidth.toString(),
                              onChange: _cache[10] || (_cache[10] = (val) => unref(popupDetails).maxWidth = Number(val))
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Rounded Corners",
                          description: "Adds rounded corners to your popup",
                          for: "popup-rounded-corners"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$9, {
                              id: "popup-rounded-corners",
                              disabled: __props.busy,
                              checked: unref(popupDetails).roundedCornersEnabled,
                              onChange: _cache[11] || (_cache[11] = (val) => unref(popupDetails).roundedCornersEnabled = val)
                            }, null, 8, ["disabled", "checked"])
                          ]),
                          _: 1
                        }),
                        unref(popupDetails).buttonEnabled ? (openBlock(), createBlock(WPFormGroup, {
                          key: 0,
                          class: "tw-mt-6",
                          title: "Button Background Color",
                          description: "Set the background color of the button. You should use a colour that matches your theme.",
                          for: "popup-button-background-color"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-button-background-color",
                              type: "color",
                              disabled: __props.busy,
                              value: unref(popupDetails).buttonBackgroundColor,
                              onChange: _cache[12] || (_cache[12] = (val) => unref(popupDetails).buttonBackgroundColor = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        unref(popupDetails).buttonEnabled ? (openBlock(), createBlock(WPFormGroup, {
                          key: 1,
                          class: "tw-mt-6",
                          title: "Button Text Color",
                          description: "Pick a colour that is readable on your Button Background Color.",
                          for: "popup-button-text-color"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$c, {
                              id: "popup-button-text-color",
                              type: "color",
                              disabled: __props.busy,
                              value: unref(popupDetails).buttonTextColor,
                              onChange: _cache[13] || (_cache[13] = (val) => unref(popupDetails).buttonTextColor = val)
                            }, null, 8, ["disabled", "value"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(iu), {
                      as: "div",
                      class: "tw-block tw-w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(WPFormGroup, {
                          title: "Deactivate",
                          description: "Deactive the popup. It will no longer appear anywhere.",
                          for: "popup-deactivated"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$9, {
                              id: "popup-deactivated",
                              disabled: __props.busy,
                              checked: unref(popupDetails).deactivated,
                              onChange: _cache[14] || (_cache[14] = (val) => unref(popupDetails).deactivated = val)
                            }, null, 8, ["disabled", "checked"])
                          ]),
                          _: 1
                        }),
                        createVNode(WPFormGroup, {
                          class: "tw-mt-6",
                          title: "Test Mode",
                          description: "Enabling test mode will only show the popup to logged in users (like yourself). It will also ignore the display frequency and show it to you every time the page loads. This is good for testing your popup, but don't forget to disabled it when you're finished!",
                          for: "popup-test-mode"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$9, {
                              id: "popup-test-mode",
                              disabled: __props.busy,
                              checked: unref(popupDetails).testModeEnabled,
                              onChange: _cache[15] || (_cache[15] = (val) => unref(popupDetails).testModeEnabled = val)
                            }, null, 8, ["disabled", "checked"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]);
      };
    }
  });
  var WPLoadingBar_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _sfc_main$5 = {};
  const _withScopeId = (n) => (pushScopeId("data-v-31da7e64"), n = n(), popScopeId(), n);
  const _hoisted_1$3 = { class: "wp-loading-bar tw-relative tw-block tw-w-full tw-bg-white tw-overflow-hidden tw-h-[4px]" };
  const _hoisted_2$3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "wp-loading-bar__bar !tw-absolute tw-block tw-bg-primary-500 tw-h-[4px]" }, null, -1));
  const _hoisted_3$3 = [
    _hoisted_2$3
  ];
  function _sfc_render(_ctx, _cache) {
    return openBlock(), createElementBlock("div", _hoisted_1$3, _hoisted_3$3);
  }
  var WPLoadingBar = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render], ["__scopeId", "data-v-31da7e64"]]);
  const _hoisted_1$2 = { class: "tw-flex tw-gap-4" };
  const _hoisted_2$2 = { class: "tw-flex-1" };
  const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "tw-h-5 tw-w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 17l-5-5m0 0l5-5m-5 5h12"
    })
  ], -1);
  const _hoisted_4$2 = /* @__PURE__ */ createTextVNode(" Back ");
  const _hoisted_5$2 = /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("h2", { class: "!tw-p-0" }, " Edit Popup ")
  ], -1);
  const _hoisted_6$2 = { class: "tw-ml-auto" };
  const _hoisted_7$2 = /* @__PURE__ */ createTextVNode(" Save Changes ");
  const _hoisted_8$2 = { class: "!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-z-10" };
  const _hoisted_9$2 = { class: "tw-relative tw-block tw-p-4 tw-min-h-[400px]" };
  const _hoisted_10$2 = {
    key: 0,
    class: "tw-block"
  };
  const _hoisted_11$1 = {
    key: 1,
    class: "tw-block"
  };
  const _hoisted_12$1 = /* @__PURE__ */ createBaseVNode("div", { class: "tw-text-center tw-font-semibold tw-my-6 tw-mb-3" }, " Sorry, this popup no longer exists. ", -1);
  const _hoisted_13$1 = { class: "tw-text-center" };
  const _hoisted_14$1 = /* @__PURE__ */ createTextVNode(" Go Back ");
  const _hoisted_15$1 = { class: "tw-w-full md:tw-w-[350px]" };
  const _sfc_main$4 = /* @__PURE__ */ defineComponent({
    setup(__props) {
      const magicPopupsAjax = window.magic_popups_ajax;
      const router2 = useRouter();
      const route = useRoute();
      const popupId = route.params.id;
      const isPopupSaving = ref(false);
      const isPopupLoading = ref(false);
      const doesPopupExist = ref(true);
      const popupDetails = reactive({
        id: "",
        title: "",
        content: "",
        displayFrequency: "session",
        openingDelay: 5,
        buttonEnabled: false,
        buttonLabel: "",
        buttonURL: "",
        buttonBackgroundColor: "#6f47e5",
        buttonTextColor: "#FFFFFF",
        backdropColor: "#000000",
        backdropOpacity: 70,
        maxWidth: 600,
        roundedCornersEnabled: true,
        showOnAllPages: true,
        showOnThesePages: [],
        testModeEnabled: false,
        deactivated: false
      });
      onMounted(async () => {
        isPopupLoading.value = true;
        const formData = new FormData();
        formData.append("action", "magic_popups_get_popup_by_id");
        formData.append("nonce", magicPopupsAjax.nonce);
        formData.append("id", popupId);
        try {
          const { data: data2 } = await axios.post(magicPopupsAjax.url, formData);
          doesPopupExist.value = data2.success;
          if (!data2.success)
            return;
          popupDetails.id = data2.popupDetails.id;
          popupDetails.title = data2.popupDetails.title;
          popupDetails.content = data2.popupDetails.content;
          popupDetails.displayFrequency = data2.popupDetails.displayFrequency;
          popupDetails.openingDelay = data2.popupDetails.openingDelay;
          popupDetails.buttonEnabled = data2.popupDetails.buttonEnabled;
          popupDetails.buttonLabel = data2.popupDetails.buttonLabel;
          popupDetails.buttonURL = data2.popupDetails.buttonURL;
          popupDetails.buttonBackgroundColor = data2.popupDetails.buttonBackgroundColor;
          popupDetails.buttonTextColor = data2.popupDetails.buttonTextColor;
          popupDetails.backdropColor = data2.popupDetails.backdropColor;
          popupDetails.backdropOpacity = data2.popupDetails.backdropOpacity;
          popupDetails.maxWidth = data2.popupDetails.maxWidth;
          popupDetails.roundedCornersEnabled = data2.popupDetails.roundedCornersEnabled;
          popupDetails.showOnAllPages = data2.popupDetails.showOnAllPages;
          popupDetails.showOnThesePages = data2.popupDetails.showOnThesePages;
          popupDetails.testModeEnabled = data2.popupDetails.testModeEnabled;
          popupDetails.deactivated = data2.popupDetails.deactivated;
        } catch (err) {
          console.log(err);
        } finally {
          isPopupLoading.value = false;
        }
      });
      async function onChange(newPopupDetails) {
        popupDetails.id = newPopupDetails.id;
        popupDetails.title = newPopupDetails.title;
        popupDetails.content = newPopupDetails.content;
        popupDetails.displayFrequency = newPopupDetails.displayFrequency;
        popupDetails.openingDelay = newPopupDetails.openingDelay;
        popupDetails.buttonEnabled = newPopupDetails.buttonEnabled;
        popupDetails.buttonLabel = newPopupDetails.buttonLabel;
        popupDetails.buttonURL = newPopupDetails.buttonURL;
        popupDetails.buttonBackgroundColor = newPopupDetails.buttonBackgroundColor;
        popupDetails.buttonTextColor = newPopupDetails.buttonTextColor;
        popupDetails.backdropColor = newPopupDetails.backdropColor;
        popupDetails.backdropOpacity = newPopupDetails.backdropOpacity;
        popupDetails.maxWidth = newPopupDetails.maxWidth;
        popupDetails.roundedCornersEnabled = newPopupDetails.roundedCornersEnabled;
        popupDetails.showOnAllPages = newPopupDetails.showOnAllPages;
        popupDetails.showOnThesePages = newPopupDetails.showOnThesePages;
        popupDetails.testModeEnabled = newPopupDetails.testModeEnabled;
        popupDetails.deactivated = newPopupDetails.deactivated;
      }
      async function onSave() {
        const details = __spreadValues({}, popupDetails);
        if (!details.title)
          return alert("Please enter a title before saving.");
        isPopupSaving.value = true;
        const formData = new FormData();
        formData.append("action", "magic_popups_update_popup");
        formData.append("nonce", magicPopupsAjax.nonce);
        formData.append("popup", JSON.stringify(__spreadValues({}, details)));
        try {
          const { data: data2 } = await axios.post(magicPopupsAjax.url, formData);
          console.log(data2);
          if (!data2.success) {
            alert("Sorry, there was an problem saving the popup. Please try again.");
            return;
          }
          alert("Saved successfully!");
        } catch (err) {
          console.log(err);
        } finally {
          isPopupSaving.value = false;
        }
      }
      function onBack() {
        router2.push("/");
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            createVNode(_sfc_main$f, null, {
              title: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(WPButton, {
                    variant: "secondary",
                    onClick: onBack
                  }, {
                    default: withCtx(() => [
                      _hoisted_3$2,
                      _hoisted_4$2
                    ]),
                    _: 1
                  })
                ]),
                _hoisted_5$2,
                createBaseVNode("div", _hoisted_6$2, [
                  createVNode(WPButton, {
                    disabled: isPopupSaving.value || isPopupLoading.value || !doesPopupExist.value,
                    onClick: onSave
                  }, {
                    default: withCtx(() => [
                      _hoisted_7$2
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_8$2, [
                  isPopupSaving.value || isPopupLoading.value ? (openBlock(), createBlock(WPLoadingBar, { key: 0 })) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_9$2, [
                  !isPopupLoading.value && doesPopupExist.value ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
                    createVNode(_sfc_main$6, {
                      "popup-details": unref(popupDetails),
                      busy: isPopupSaving.value || isPopupLoading.value,
                      onChange
                    }, null, 8, ["popup-details", "busy"])
                  ])) : createCommentVNode("", true),
                  !isPopupLoading.value && !doesPopupExist.value ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                    _hoisted_12$1,
                    createBaseVNode("div", _hoisted_13$1, [
                      createVNode(WPButton, {
                        variant: "primary",
                        onClick: onBack
                      }, {
                        default: withCtx(() => [
                          _hoisted_14$1
                        ]),
                        _: 1
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_15$1, [
            createVNode(_sfc_main$d)
          ])
        ]);
      };
    }
  });
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    props: {
      width: {
        type: String,
        default: "210px"
      },
      anchor: {
        type: String,
        default: "right"
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createBlock(unref(Ga), {
          as: "div",
          class: "tw-block tw-z-100"
        }, {
          default: withCtx(() => [
            createVNode(unref(_a), { as: "div" }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "trigger")
              ]),
              _: 3
            }),
            createVNode(Transition, {
              "enter-active-class": "tw-transition tw-duration-100 tw-ease-out",
              "enter-from-class": "tw-transform tw-scale-95 tw-opacity-0",
              "enter-to-class": "tw-transform tw-scale-100 tw-opacity-100",
              "leave-active-class": "tw-transition tw-duration-75 tw-ease-in",
              "leave-from-class": "tw-transform tw-scale-100 tw-opacity-100",
              "leave-to-class": "tw-transform tw-scale-95 tw-opacity-0"
            }, {
              default: withCtx(() => [
                createVNode(unref(qa), {
                  class: normalizeClass(["!tw-absolute tw-bg-white tw-bg-opacity-70 tw-backdrop-filter tw-backdrop-blur tw-divide-y tw-divide-wp-border-500 tw-rounded-md tw-shadow-lg tw-overflow-hidden tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none tw-z-20", {
                    "tw-right-0 tw-origin-top-right": props.anchor === "right",
                    "tw-left-0 tw-origin-top-left": props.anchor === "left"
                  }]),
                  style: normalizeStyle({
                    width: props.width
                  })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "options")
                  ]),
                  _: 3
                }, 8, ["class", "style"])
              ]),
              _: 3
            })
          ]),
          _: 3
        });
      };
    }
  });
  const _sfc_main$2 = /* @__PURE__ */ defineComponent({
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createBlock(unref(za), { disabled: __props.disabled }, {
          default: withCtx(({ active }) => [
            createBaseVNode("button", {
              class: normalizeClass(["tw-group tw-flex tw-items-center tw-w-full tw-px-2.5 tw-py-2 tw-transition-colors tw-duration-200", {
                "tw-bg-primary-500 tw-text-white": active,
                "tw-opacity-60 tw-cursor-not-allowed": __props.disabled
              }])
            }, [
              renderSlot(_ctx.$slots, "default", { active })
            ], 2)
          ]),
          _: 3
        }, 8, ["disabled"]);
      };
    }
  });
  const _hoisted_1$1 = { class: "tw-flex tw-gap-4" };
  const _hoisted_2$1 = { class: "tw-flex-1" };
  const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("div", { class: "tw-w-8 tw-h-8 tw-rounded-full tw-bg-primary-500 tw-text-white" }, [
      /* @__PURE__ */ createBaseVNode("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        class: "tw-h-4 tw-w-4 tw-ml-2 tw-mt-2",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, [
        /* @__PURE__ */ createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
      ])
    ])
  ], -1);
  const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("h2", { class: "!tw-p-0" }, " My Popups ")
  ], -1);
  const _hoisted_5$1 = { class: "tw-ml-auto" };
  const _hoisted_6$1 = /* @__PURE__ */ createTextVNode(" Create Popup ");
  const _hoisted_7$1 = { class: "tw-relative tw-block tw-w-full tw-min-h-[400px]" };
  const _hoisted_8$1 = {
    key: 0,
    class: "!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-z-10"
  };
  const _hoisted_9$1 = {
    key: 1,
    class: "tw-table-auto tw-w-full tw-border-b tw-border-b-gray-300"
  };
  const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode("thead", { class: "tw-bg-gray-50 tw-text-xs tw-font-semibold tw-uppercase tw-border-b tw-border-b-gray-300" }, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", { class: "tw-p-4 tw-whitespace-nowrap" }, [
        /* @__PURE__ */ createBaseVNode("div", { class: "tw-font-semibold tw-text-left" }, " Title ")
      ]),
      /* @__PURE__ */ createBaseVNode("th", { class: "tw-p-4 tw-whitespace-nowrap tw-w-[150px]" }, [
        /* @__PURE__ */ createBaseVNode("div", { class: "tw-font-semibold tw-text-left" }, " Test Mode ")
      ]),
      /* @__PURE__ */ createBaseVNode("th", { class: "tw-p-4 tw-whitespace-nowrap tw-w-[150px]" }, [
        /* @__PURE__ */ createBaseVNode("div", { class: "tw-font-semibold tw-text-left" }, " Status ")
      ]),
      /* @__PURE__ */ createBaseVNode("th", { class: "tw-p-4 tw-whitespace-nowrap tw-w-[100px]" }, [
        /* @__PURE__ */ createBaseVNode("div", { class: "tw-font-semibold tw-text-left" }, " Action ")
      ])
    ])
  ], -1);
  const _hoisted_11 = { class: "tw-divide-y tw-divide-gray-300" };
  const _hoisted_12 = { class: "tw-p-4" };
  const _hoisted_13 = { class: "tw-text-left tw-font-semibold hover:tw-underline focus:tw-underline active:tw-underline" };
  const _hoisted_14 = { class: "tw-p-4 tw-whitespace-nowrap" };
  const _hoisted_15 = {
    key: 0,
    class: "tw-bg-orange-200 tw-text-orange-600 tw-text-center tw-rounded-md tw-text-xs tw-px-2 tw-py-1"
  };
  const _hoisted_16 = /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "tw-h-5 tw-w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ], -1);
  const _hoisted_17 = /* @__PURE__ */ createTextVNode(" Active ");
  const _hoisted_18 = [
    _hoisted_16,
    _hoisted_17
  ];
  const _hoisted_19 = {
    key: 1,
    class: "tw-bg-gray-200 tw-text-gray-600 tw-text-center tw-rounded-md tw-text-xs tw-px-2 tw-py-1"
  };
  const _hoisted_20 = { class: "tw-p-4 tw-whitespace-nowrap" };
  const _hoisted_21 = {
    key: 0,
    class: "tw-rounded-md tw-bg-red-200 tw-text-red-600 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold"
  };
  const _hoisted_22 = {
    key: 1,
    class: "tw-rounded-md tw-bg-green-200 tw-text-green-600 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold"
  };
  const _hoisted_23 = { class: "tw-p-4 tw-whitespace-nowrap" };
  const _hoisted_24 = /* @__PURE__ */ createBaseVNode("a", {
    href: "#",
    class: "tw-cursor-pointer"
  }, [
    /* @__PURE__ */ createBaseVNode("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "tw-h-5 tw-w-5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }, [
      /* @__PURE__ */ createBaseVNode("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      })
    ])
  ], -1);
  const _hoisted_25 = /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "tw-h-4 tw-w-5 tw-mr-2",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
  ], -1);
  const _hoisted_26 = /* @__PURE__ */ createTextVNode(" Edit ");
  const _hoisted_27 = /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "tw-h-4 tw-w-5 tw-mr-2",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
      "clip-rule": "evenodd"
    })
  ], -1);
  const _hoisted_28 = /* @__PURE__ */ createTextVNode(" Delete ");
  const _hoisted_29 = {
    key: 2,
    class: "tw-relative tw-block tw-p-6"
  };
  const _hoisted_30 = /* @__PURE__ */ createBaseVNode("div", { class: "tw-text-center tw-font-semibold tw-my-4" }, " Create your first popup! ", -1);
  const _hoisted_31 = { class: "tw-text-center" };
  const _hoisted_32 = /* @__PURE__ */ createTextVNode(" Create Popup ");
  const _hoisted_33 = { class: "tw-w-full md:tw-w-[350px]" };
  const _sfc_main$1 = /* @__PURE__ */ defineComponent({
    setup(__props) {
      const magicPopupsAjax = window.magic_popups_ajax;
      const router2 = useRouter();
      const isLoading = ref(false);
      const popups = ref([]);
      function onCreatePopupClick() {
        router2.push("/create");
      }
      onMounted(async () => {
        isLoading.value = true;
        const formData = new FormData();
        formData.append("action", "magic_popups_get_popups");
        formData.append("nonce", magicPopupsAjax.nonce);
        try {
          const { data: data2 } = await axios.post(magicPopupsAjax.url, formData);
          popups.value = data2;
        } catch (err) {
          console.log(err);
        } finally {
          isLoading.value = false;
        }
      });
      async function handleDeleteClick(popup) {
        const confirmed = window.confirm("Are you sure you want to delete this popup?");
        if (!confirmed)
          return;
        popups.value = popups.value.filter((p2) => p2.id !== popup.id);
        const formData = new FormData();
        formData.append("action", "magic_popups_delete_popup");
        formData.append("nonce", magicPopupsAjax.nonce);
        formData.append("id", popup.id);
        try {
          await axios.post(magicPopupsAjax.url, formData);
        } catch (err) {
          console.log(err);
        }
      }
      function handleEditClick(popup) {
        router2.push(`/popups/${popup.id}`);
      }
      return (_ctx, _cache) => {
        const _component_router_link = resolveComponent("router-link");
        return openBlock(), createElementBlock("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            createVNode(_sfc_main$f, null, {
              title: withCtx(() => [
                _hoisted_3$1,
                _hoisted_4$1,
                createBaseVNode("div", _hoisted_5$1, [
                  createVNode(WPButton, { onClick: onCreatePopupClick }, {
                    default: withCtx(() => [
                      _hoisted_6$1
                    ]),
                    _: 1
                  })
                ])
              ]),
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_7$1, [
                  isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
                    createVNode(WPLoadingBar)
                  ])) : createCommentVNode("", true),
                  !isLoading.value && popups.value.length > 0 ? (openBlock(), createElementBlock("table", _hoisted_9$1, [
                    _hoisted_10$1,
                    createBaseVNode("tbody", _hoisted_11, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(popups.value, (popup) => {
                        return openBlock(), createElementBlock("tr", {
                          key: popup.id,
                          class: "tw-bg-white hover:tw-bg-gray-50"
                        }, [
                          createBaseVNode("td", _hoisted_12, [
                            createBaseVNode("div", _hoisted_13, [
                              createVNode(_component_router_link, {
                                to: `/popups/${popup.id}`
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(popup.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ])
                          ]),
                          createBaseVNode("td", _hoisted_14, [
                            popup.testModeEnabled ? (openBlock(), createElementBlock("span", _hoisted_15, _hoisted_18)) : createCommentVNode("", true),
                            !popup.testModeEnabled ? (openBlock(), createElementBlock("span", _hoisted_19, " Off ")) : createCommentVNode("", true)
                          ]),
                          createBaseVNode("td", _hoisted_20, [
                            popup.deactivated ? (openBlock(), createElementBlock("span", _hoisted_21, "Deactivated")) : (openBlock(), createElementBlock("span", _hoisted_22, "Active"))
                          ]),
                          createBaseVNode("td", _hoisted_23, [
                            createVNode(_sfc_main$3, { width: "120px" }, {
                              trigger: withCtx(() => [
                                _hoisted_24
                              ]),
                              options: withCtx(() => [
                                createVNode(_sfc_main$2, {
                                  onClick: ($event) => handleEditClick(popup)
                                }, {
                                  default: withCtx(() => [
                                    _hoisted_25,
                                    _hoisted_26
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(_sfc_main$2, {
                                  onClick: ($event) => handleDeleteClick(popup)
                                }, {
                                  default: withCtx(() => [
                                    _hoisted_27,
                                    _hoisted_28
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  !isLoading.value && popups.value.length == 0 ? (openBlock(), createElementBlock("div", _hoisted_29, [
                    _hoisted_30,
                    createBaseVNode("div", _hoisted_31, [
                      createVNode(WPButton, {
                        variant: "primary",
                        onClick: onCreatePopupClick
                      }, {
                        default: withCtx(() => [
                          _hoisted_32
                        ]),
                        _: 1
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_33, [
            createVNode(_sfc_main$d)
          ])
        ]);
      };
    }
  });
  const _hoisted_1 = { class: "tw-flex tw-gap-4" };
  const _hoisted_2 = { class: "tw-flex-1" };
  const _hoisted_3 = /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "tw-h-5 tw-w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 17l-5-5m0 0l5-5m-5 5h12"
    })
  ], -1);
  const _hoisted_4 = /* @__PURE__ */ createTextVNode(" Back ");
  const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("h2", { class: "!tw-p-0" }, " Create Popup ")
  ], -1);
  const _hoisted_6 = { class: "tw-ml-auto" };
  const _hoisted_7 = /* @__PURE__ */ createTextVNode(" Save Popup ");
  const _hoisted_8 = { class: "!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-z-10" };
  const _hoisted_9 = { class: "tw-block tw-p-4" };
  const _hoisted_10 = { class: "tw-w-full md:tw-w-[350px]" };
  const _sfc_main = /* @__PURE__ */ defineComponent({
    setup(__props) {
      const magicPopupsAjax = window.magic_popups_ajax;
      const router2 = useRouter();
      const isPopupSaving = ref(false);
      const popupDetails = reactive({
        id: "",
        title: "",
        content: "",
        displayFrequency: "session",
        openingDelay: 5,
        buttonEnabled: false,
        buttonLabel: "",
        buttonURL: "",
        buttonBackgroundColor: "#6f47e5",
        buttonTextColor: "#FFFFFF",
        backdropColor: "#000000",
        backdropOpacity: 70,
        maxWidth: 600,
        roundedCornersEnabled: true,
        showOnAllPages: true,
        showOnThesePages: [],
        testModeEnabled: false,
        deactivated: false
      });
      async function onChange(newPopupDetails) {
        popupDetails.id = newPopupDetails.id;
        popupDetails.title = newPopupDetails.title;
        popupDetails.content = newPopupDetails.content;
        popupDetails.displayFrequency = newPopupDetails.displayFrequency;
        popupDetails.openingDelay = newPopupDetails.openingDelay;
        popupDetails.buttonEnabled = newPopupDetails.buttonEnabled;
        popupDetails.buttonLabel = newPopupDetails.buttonLabel;
        popupDetails.buttonURL = newPopupDetails.buttonURL;
        popupDetails.buttonBackgroundColor = newPopupDetails.buttonBackgroundColor;
        popupDetails.buttonTextColor = newPopupDetails.buttonTextColor;
        popupDetails.backdropColor = newPopupDetails.backdropColor;
        popupDetails.backdropOpacity = newPopupDetails.backdropOpacity;
        popupDetails.maxWidth = newPopupDetails.maxWidth;
        popupDetails.roundedCornersEnabled = newPopupDetails.roundedCornersEnabled;
        popupDetails.showOnAllPages = newPopupDetails.showOnAllPages;
        popupDetails.showOnThesePages = newPopupDetails.showOnThesePages;
        popupDetails.testModeEnabled = newPopupDetails.testModeEnabled;
        popupDetails.deactivated = newPopupDetails.deactivated;
      }
      async function onSave() {
        const details = __spreadValues({}, popupDetails);
        if (!details.title)
          return alert("Please enter a title before saving.");
        isPopupSaving.value = true;
        const formData = new FormData();
        formData.append("action", "magic_popups_create_popup");
        formData.append("nonce", magicPopupsAjax.nonce);
        formData.append("popup", JSON.stringify(__spreadValues({}, details)));
        try {
          const { data: data2 } = await axios.post(magicPopupsAjax.url, formData);
          if (!data2.success) {
            alert("Sorry, there was an error saving the popup. Please try again.");
            return;
          }
          router2.push("/");
        } catch (err) {
          console.log(err);
        } finally {
          isPopupSaving.value = false;
        }
      }
      function onBack() {
        router2.push("/");
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createVNode(_sfc_main$f, null, {
              title: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(WPButton, {
                    variant: "secondary",
                    onClick: onBack
                  }, {
                    default: withCtx(() => [
                      _hoisted_3,
                      _hoisted_4
                    ]),
                    _: 1
                  })
                ]),
                _hoisted_5,
                createBaseVNode("div", _hoisted_6, [
                  createVNode(WPButton, {
                    disabled: isPopupSaving.value,
                    onClick: onSave
                  }, {
                    default: withCtx(() => [
                      _hoisted_7
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_8, [
                  isPopupSaving.value ? (openBlock(), createBlock(WPLoadingBar, { key: 0 })) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_9, [
                  createVNode(_sfc_main$6, {
                    "popup-details": unref(popupDetails),
                    busy: isPopupSaving.value,
                    onChange
                  }, null, 8, ["popup-details", "busy"])
                ])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_10, [
            createVNode(_sfc_main$d)
          ])
        ]);
      };
    }
  });
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: "/",
        alias: "/popups",
        component: _sfc_main$1
      },
      {
        path: "/popups/:id",
        component: _sfc_main$4
      },
      {
        path: "/create",
        component: _sfc_main
      }
    ]
  });
  const app = createApp(App);
  app.use(router);
  app.mount("#app");
})();
