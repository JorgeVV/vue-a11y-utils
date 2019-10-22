import Vue from "vue";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r =
      c < 3
        ? target
        : desc === null
        ? (desc = Object.getOwnPropertyDescriptor(target, key))
        : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i]))
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default")
    ? x["default"]
    : x;
}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var vueClassComponent_common = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }

  var Vue$1 = _interopDefault(Vue);

  var reflectionIsSupported =
    typeof Reflect !== "undefined" && Reflect.defineMetadata;
  function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function(key) {
      forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function(key) {
      forwardMetadata(to, from, key);
    });
  }
  function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
      ? Reflect.getOwnMetadataKeys(from, propertyKey)
      : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function(metaKey) {
      var metadata = propertyKey
        ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
        : Reflect.getOwnMetadata(metaKey, from);
      if (propertyKey) {
        Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
      } else {
        Reflect.defineMetadata(metaKey, metadata, to);
      }
    });
  }

  var fakeArray = { __proto__: [] };
  var hasProto = fakeArray instanceof Array;
  function createDecorator(factory) {
    return function(target, key, index) {
      var Ctor = typeof target === "function" ? target : target.constructor;
      if (!Ctor.__decorators__) {
        Ctor.__decorators__ = [];
      }
      if (typeof index !== "number") {
        index = undefined;
      }
      Ctor.__decorators__.push(function(options) {
        return factory(options, key, index);
      });
    };
  }
  function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      Ctors[_i] = arguments[_i];
    }
    return Vue$1.extend({ mixins: Ctors });
  }
  function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== "object" && type !== "function");
  }
  function warn(message) {
    if (typeof console !== "undefined") {
      console.warn("[vue-class-component] " + message);
    }
  }

  function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function() {
      var _this = this;
      // proxy to actual vm
      var keys = Object.getOwnPropertyNames(vm);
      // 2.2.0 compat (props are no longer exposed as self properties)
      if (vm.$options.props) {
        for (var key in vm.$options.props) {
          if (!vm.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
      }
      keys.forEach(function(key) {
        if (key.charAt(0) !== "_") {
          Object.defineProperty(_this, key, {
            get: function() {
              return vm[key];
            },
            set: function(value) {
              vm[key] = value;
            },
            configurable: true
          });
        }
      });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function(key) {
      if (data[key] !== undefined) {
        plainData[key] = data[key];
      }
    });
    if (process.env.NODE_ENV !== "production") {
      if (
        !(Component.prototype instanceof Vue$1) &&
        Object.keys(plainData).length > 0
      ) {
        warn(
          "Component class must inherit Vue or its descendant class " +
            "when class property is used."
        );
      }
    }
    return plainData;
  }

  var $internalHooks = [
    "data",
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeDestroy",
    "destroyed",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "render",
    "errorCaptured" // 2.5
  ];
  function componentFactory(Component, options) {
    if (options === void 0) {
      options = {};
    }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function(key) {
      if (key === "constructor") {
        return;
      }
      // hooks
      if ($internalHooks.indexOf(key) > -1) {
        options[key] = proto[key];
        return;
      }
      var descriptor = Object.getOwnPropertyDescriptor(proto, key);
      if (descriptor.value !== void 0) {
        // methods
        if (typeof descriptor.value === "function") {
          (options.methods || (options.methods = {}))[key] = descriptor.value;
        } else {
          // typescript decorated data
          (options.mixins || (options.mixins = [])).push({
            data: function() {
              var _a;
              return (_a = {}), (_a[key] = descriptor.value), _a;
            }
          });
        }
      } else if (descriptor.get || descriptor.set) {
        // computed properties
        (options.computed || (options.computed = {}))[key] = {
          get: descriptor.get,
          set: descriptor.set
        };
      }
    });
    (options.mixins || (options.mixins = [])).push({
      data: function() {
        return collectDataFromConstructor(this, Component);
      }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
      decorators.forEach(function(fn) {
        return fn(options);
      });
      delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue$1 ? superProto.constructor : Vue$1;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
      copyReflectionMetadata(Extended, Component);
    }
    return Extended;
  }
  var reservedPropertyNames = [
    // Unique id
    "cid",
    // Super Vue constructor
    "super",
    // Component options that will be used by the component
    "options",
    "superOptions",
    "extendOptions",
    "sealedOptions",
    // Private assets
    "component",
    "directive",
    "filter"
  ];
  function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function(key) {
      // `prototype` should not be overwritten
      if (key === "prototype") {
        return;
      }
      // Some browsers does not allow reconfigure built-in properties
      var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
      if (extendedDescriptor && !extendedDescriptor.configurable) {
        return;
      }
      var descriptor = Object.getOwnPropertyDescriptor(Original, key);
      // If the user agent does not support `__proto__` or its family (IE <= 10),
      // the sub class properties may be inherited properties from the super class in TypeScript.
      // We need to exclude such properties to prevent to overwrite
      // the component options object which stored on the extended constructor (See #192).
      // If the value is a referenced value (object or function),
      // we can check equality of them and exclude it if they have the same reference.
      // If it is a primitive value, it will be forwarded for safety.
      if (!hasProto) {
        // Only `cid` is explicitly exluded from property forwarding
        // because we cannot detect whether it is a inherited property or not
        // on the no `__proto__` environment even though the property is reserved.
        if (key === "cid") {
          return;
        }
        var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
        if (
          !isPrimitive(descriptor.value) &&
          superDescriptor &&
          superDescriptor.value === descriptor.value
        ) {
          return;
        }
      }
      // Warn if the users manually declare reserved properties
      if (
        process.env.NODE_ENV !== "production" &&
        reservedPropertyNames.indexOf(key) >= 0
      ) {
        warn(
          "Static property name '" +
            key +
            "' declared on class '" +
            Original.name +
            "' " +
            "conflicts with reserved property name of Vue internal. " +
            "It may cause unexpected behavior of the component. Consider renaming the property."
        );
      }
      Object.defineProperty(Extended, key, descriptor);
    });
  }

  function Component(options) {
    if (typeof options === "function") {
      return componentFactory(options);
    }
    return function(Component) {
      return componentFactory(Component, options);
    };
  }
  Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
  };

  exports.default = Component;
  exports.createDecorator = createDecorator;
  exports.mixins = mixins;
});

var Component = unwrapExports(vueClassComponent_common);
var vueClassComponent_common_1 = vueClassComponent_common.createDecorator;
var vueClassComponent_common_2 = vueClassComponent_common.mixins;

const VueAriaInterface = Vue.extend({
  props: {
    role: String,
    aria: [Object, Array],
    tabindex: Number
  }
});
/**
 * <VueAria role aria tabindex>
 * - props: role, aria, tabindex
 * - slots: default slot
 */
let VueAria = class VueAria extends VueAriaInterface {
  render(h) {
    const { role, aria, tabindex } = this;
    const rootVNode = this.$slots.default[0];
    if (rootVNode) {
      if (!rootVNode.data) {
        rootVNode.data = {};
      }
      if (!rootVNode.data.attrs) {
        rootVNode.data.attrs = {};
      }
      const attrs = rootVNode.data.attrs;
      // set `role`
      if (role) {
        attrs.role = role;
      }
      // set `tabindex`
      mergeTabindexToVNode(attrs, tabindex);
      // set `aria-*`
      mergeAriaAttrsToVNode(attrs, aria);
    }
    return rootVNode;
  }
};
VueAria = __decorate([Component], VueAria);
/**
 * <Foo v-aria>
 */
const directiveAria = {
  inserted(el, { value, oldValue }) {
    mergeAriaAttrsToElement(el, value, oldValue);
  },
  update(el, { value, oldValue }) {
    mergeAriaAttrsToElement(el, value, oldValue);
  }
};
// merging functions
function mergeTabindexToVNode(attrs, tabindex) {
  if (attrs) {
    const isAppearance = attrs.role === "none" || attrs.role === "appearance";
    if (typeof tabindex !== "number" || isNaN(tabindex)) {
      // no value passed in
      if (isAppearance) {
        attrs.tabindex = "";
      }
    } else {
      // a number passed in
      attrs.tabindex = tabindex.toString();
    }
  }
}
function mergeAriaAttrsToVNode(attrs, aria) {
  if (attrs) {
    const flatAria = flattenAria(aria);
    for (const name in flatAria) {
      const value = flatAria[name];
      if (isValidAttributeValue(value)) {
        attrs[`aria-${name}`] = value.toString();
      } else {
        delete attrs[`aria-${name}`];
      }
    }
  }
}
function mergeAriaAttrsToElement(el, aria, oldAria) {
  const flatAria = flattenAria(aria);
  const flatOldAria = flattenAria(oldAria);
  // 1. find attributes in value but not in oldValue and remove them
  for (const name in flatOldAria) {
    if (
      !isValidAttributeValue(flatAria[name]) &&
      isValidAttributeValue(flatOldAria[name])
    ) {
      el.removeAttribute(`aria-${name}`);
    }
  }
  // 2. set all attributes in value
  for (const name in flatAria) {
    const value = flatAria[name];
    if (isValidAttributeValue(value)) {
      el.setAttribute(`aria-${name}`, value.toString());
    }
  }
}
// util functions
function flattenAria(aria) {
  const result = {};
  if (aria) {
    if (Array.isArray(aria)) {
      aria.forEach(ariaItem => {
        Object.assign(result, ariaItem);
      });
    } else {
      Object.assign(result, aria);
    }
  }
  return result;
}
function isValidAttributeValue(value) {
  if (typeof value === "undefined") {
    return false;
  }
  if (value === null) {
    return false;
  }
  return true;
}

const trapStack = [];
/**
 * <VueFocusTrap>
 * - methods: open(), replace(), close(returnFocus)
 * - events: open, gofirst, golast
 * - slots: default slot
 */
let VueFocusTrap = class VueFocusTrap extends Vue {
  trapFocus(event) {
    const trap = trapStack[trapStack.length - 1];
    if (!trap || trap.vm !== this) {
      return;
    }
    const root = this.$el;
    const { start, end } = this.$refs;
    const { target } = event;
    if (!root.contains(target)) {
      event.preventDefault();
      this.$emit("gofirst");
    } else if (target === start) {
      event.preventDefault();
      this.$emit("golast");
    } else if (target === end) {
      event.preventDefault();
      this.$emit("gofirst");
    }
  }
  open() {
    const prevTraget = document.activeElement;
    trapStack.push({ vm: this, prevTraget });
    this.$emit("open");
  }
  replace() {
    const prevTraget = document.activeElement;
    trapStack.pop();
    trapStack.push({ vm: this, prevTraget });
    this.$emit("open");
  }
  close(returnFocus) {
    const trap = trapStack.pop();
    if (!trap) {
      return;
    }
    const { prevTraget } = trap;
    if (returnFocus) {
      prevTraget.focus();
    }
    const lastTrap = trapStack[trapStack.length - 1];
    if (lastTrap) {
      lastTrap.vm.$emit("open", prevTraget);
    }
  }
};
VueFocusTrap = __decorate(
  [
    Component({
      data() {
        return {
          mounted: false
        };
      },
      mounted() {
        this.mounted = true;
        document.addEventListener("focus", this.trapFocus, true);
      },
      beforeDestroy() {
        if (this.mounted) {
          document.removeEventListener("focus", this.trapFocus, true);
        }
      }
    })
  ],
  VueFocusTrap
);
var script = VueFocusTrap;

function normalizeComponent(
  template,
  style,
  script,
  scopeId,
  isFunctionalTemplate,
  moduleIdentifier,
  /* server only */
  shadowMode,
  createInjector,
  createInjectorSSR,
  createInjectorShadow
) {
  if (typeof shadowMode !== "boolean") {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.

  var options = typeof script === "function" ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId

  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles

      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference

      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called

    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode
      ? function() {
          style.call(
            this,
            createInjectorShadow(this.$root.$options.shadowRoot)
          );
        }
      : function(context) {
          style.call(this, createInjector(context));
        };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("div", { ref: "start", attrs: { tabindex: "0" } }),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _c("div", { ref: "end", attrs: { tabindex: "0" } })
    ],
    2
  );
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var focusTrap = normalizeComponent_1(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  undefined,
  undefined
);

function getTravelConfig(travelOption, name = "default") {
  if (travelOption && typeof travelOption.getItems !== "function") {
    return travelOption[name];
  }
  if (name === "default") {
    return travelOption;
  }
}
const defaultKeyToMethod = {
  Home: "first",
  End: "last",
  Enter: "enter",
  " ": "space",
  Escape: "esc"
};
const verticalKeyToMethod = {
  ArrowUp: "prev",
  ArrowDown: "next"
};
const horizontalKeyToMethod = {
  ArrowLeft: "prev",
  ArrowRight: "next"
};
const paginationKeyToMethod = {
  PageUp: "prevPage",
  PageDown: "nextPage"
};
const methodMap = {
  prev(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.move === "function" && length > 0) {
      if (length === 1 && index === 0) {
        return;
      }
      let newIndex = index === -1 ? length - 1 : index - 1;
      if (config.looped && index === 0) {
        newIndex = length - 1;
      }
      config.move(vm, event, newIndex, index, items) && (event.ended = true);
    }
  },
  next(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.move === "function" && length > 0) {
      if (length === 1 && index === 0) {
        return;
      }
      let newIndex = index + 1;
      if (config.looped && newIndex === length) {
        newIndex = 0;
      }
      config.move(vm, event, newIndex, index, items) && (event.ended = true);
    }
  },
  first(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.move === "function" && length > 0 && index !== 0) {
      config.move(vm, event, 0, index, items) && (event.ended = true);
    }
  },
  last(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (
      typeof config.move === "function" &&
      length > 0 &&
      index !== length - 1
    ) {
      config.move(vm, event, length - 1, index, items) && (event.ended = true);
    }
  },
  prevPage(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.prevPage === "function" && length > 0) {
      config.prevPage(vm, event, index, items) && (event.ended = true);
    }
  },
  nextPage(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.nextPage === "function" && length > 0) {
      config.nextPage(vm, event, index, items) && (event.ended = true);
    }
  },
  enter(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.action === "function" && length > 0) {
      config.action(vm, event, index, items) && (event.ended = true);
    }
    if (!event.ended && typeof config.enter === "function" && length > 0) {
      config.enter(vm, event, index, items) && (event.ended = true);
    }
  },
  space(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.action === "function" && length > 0) {
      config.action(vm, event, index, items) && (event.ended = true);
    }
    if (!event.ended && typeof config.space === "function" && length > 0) {
      config.space(vm, event, index, items) && (event.ended = true);
    }
  },
  esc(vm, event, config) {
    const index = config.getIndex(vm);
    const items = config.getItems(vm);
    const length = items.length;
    if (typeof config.esc === "function" && length > 0) {
      config.esc(vm, event, index, items) && (event.ended = true);
    }
  }
};
let MixinTravel = class MixinTravel extends Vue {
  bindTravel(event, name = "default") {
    const option = this.$options.$travel;
    const config = getTravelConfig(option, name);
    if (
      !config ||
      typeof config.getIndex !== "function" ||
      typeof config.setIndex !== "function" ||
      typeof config.getItems !== "function"
    ) {
      return;
    }
    if (event.ended) {
      return;
    }
    // get the current key and corresponding method
    const keyToMethod = Object.assign(
      {},
      defaultKeyToMethod,
      config.orientation === "horizontal"
        ? horizontalKeyToMethod
        : verticalKeyToMethod,
      config.hasPagination ? paginationKeyToMethod : {}
    );
    const methodName = keyToMethod[event.key];
    // make sure what to do next
    const method = methodMap[methodName];
    if (typeof method === "function") {
      method(this, event, config);
    }
    // make sure whether to search
    if (config.hasSearch && typeof config.search === "function") {
      let keyword = "";
      if (event.key.match(/^Digit\d$/)) {
        keyword = event.key.substr(5);
      } else if (event.code.match(/^Key\w$/)) {
        keyword = event.code.substr(3).toLowerCase();
      }
      if (keyword) {
        config.search(
          this,
          event,
          keyword,
          config.getIndex(this),
          config.getItems(this)
        ) && (event.ended = true);
      }
    }
  }
};
MixinTravel = __decorate([Component], MixinTravel);
var MixinTravel$1 = MixinTravel;

const MixinIdInterface = Vue.extend({
  props: {
    id: String
  }
});
/**
 * Mixin: Id
 * - prop: id
 * - data: localId
 */
let MixinId = class MixinId extends MixinIdInterface {
  get localId() {
    return this.id || generateNewId();
  }
};
MixinId = __decorate([Component], MixinId);
var MixinId$1 = MixinId;
let lastId = Date.now();
function generateNewId() {
  const now = Date.now();
  if (now <= lastId) {
    lastId++;
  } else {
    lastId = now;
  }
  return `v-${lastId}`;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Mixin: KeyShortcuts
 * - option: shortcuts: Array<ShortcutConfig>
 * - methods: bindShortcut(KeyboardEvent, name)
 */
let MixinKeyShortcuts = class MixinKeyShortcuts extends Vue {
  bindShortcut(event, name = "default") {
    const target = event.currentTarget;
    if (!target) {
      return;
    }
    // update global unique key seq
    const updated = updateKeySeq(event, target);
    // match shortcuts
    if (updated) {
      // check whether end rule matched
      const touchedEndBefore = keyEventIsEnded(target, event);
      if (!touchedEndBefore) {
        const shortcuts = getShortcutsByName(this.$options.$shortcuts, name);
        shortcuts.some(shortcut => {
          // match new rules in current shortcut config
          if (matchShortcut(shortcut, target)) {
            // do the job and make sure whether to end the matching process
            const ended = shortcut.handle.call(this, event);
            if (ended) {
              endLastKeyDown(target, event);
            }
            return keyEventIsEnded(target, event);
          }
          return false;
        });
      }
    }
  }
};
MixinKeyShortcuts = __decorate(
  [
    Component({
      beforeMount() {
        if (this.$options.$shortcuts) {
          window.addEventListener("keydown", this.bindShortcut);
        }
      },
      beforeDestroy() {
        if (this.$options.$shortcuts) {
          window.removeEventListener("keydown", this.bindShortcut);
        }
      }
    })
  ],
  MixinKeyShortcuts
);
var MixinKeyShortcuts$1 = MixinKeyShortcuts;
class KeyDown {
  constructor(name, modifiers = {}) {
    this.name = parseKeyName(name);
    const { ctrl, shift, alt, meta, window, cmd, option } = modifiers;
    this.ctrl = !!ctrl;
    this.shift = !!shift;
    this.alt = !!alt || !!option;
    this.meta = !!meta || !!window || !!cmd;
    this.timestamp = Date.now();
  }
  static parseEvent(event) {
    const { key, code, ctrlKey, shiftKey, altKey, metaKey } = event;
    // skip modifier key
    if (["Control", "Shift", "Alt", "Meta"].indexOf(key) >= 0) {
      return;
    }
    const keyModifiers = {
      ctrl: ctrlKey,
      shift: shiftKey,
      alt: altKey,
      meta: metaKey
    };
    // number: key
    if (key.match(/^Digit\d$/)) {
      return new KeyDown(key, keyModifiers);
    }
    // alphabet: code
    if (code.match(/^Key\w$/)) {
      return new KeyDown(code, keyModifiers);
    }
    // navigation: key
    if (
      [
        "Up",
        "Down",
        "Left",
        "Right",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "PageUp",
        "PageDown"
      ].indexOf(key) >= 0
    ) {
      return new KeyDown(key, keyModifiers);
    }
    // other: code
    return new KeyDown(code, keyModifiers);
  }
  equals(keyDown) {
    if (!keyDown || typeof keyDown.toString !== "function") {
      return false;
    }
    return this.toString() === keyDown.toString();
  }
  toString() {
    const { name } = this;
    const modifiers = ["ctrl", "shift", "alt", "meta"]
      .filter(modifier => this[modifier])
      .join(",");
    return modifiers ? `${name}(${modifiers})` : name;
  }
}
// keydown functions
function parseKeyName(name) {
  if (name.match(/^[a-z]$/)) {
    return `Key${name.toUpperCase()}`;
  }
  if (name.match(/^[0-9]$/)) {
    return `Digit${name.toUpperCase()}`;
  }
  const specialNameMap = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    home: "Home",
    end: "End",
    pagedown: "PageDown",
    pageup: "PageUp"
  };
  const specialName = specialNameMap[name.toLowerCase()];
  if (specialName) {
    return specialName;
  }
  return capitalizeFirstLetter(name);
}
// key shortcuts config functions
function getShortcutsByName(shortcutsOption, name = "default") {
  if (Array.isArray(shortcutsOption)) {
    if (name === "default") {
      return shortcutsOption;
    }
    return [];
  }
  if (shortcutsOption) {
    const shortcuts = shortcutsOption[name];
    if (Array.isArray(shortcuts)) {
      return shortcuts;
    } else if (shortcuts) {
      return [shortcuts];
    }
    return [];
  }
  return [];
}
// key sequence functions
const maxKeySeqLength = 32;
const keySeqMap = new WeakMap();
function updateKeySeq(event, target) {
  const keySeq = keySeqMap.get(target) || [];
  if (!keySeqMap.has(target)) {
    keySeqMap.set(target, keySeq);
  }
  const keyDown = KeyDown.parseEvent(event);
  if (keyDown) {
    keySeq.push(keyDown);
    if (keySeq.length > maxKeySeqLength) {
      keySeq.shift();
    }
    return true;
  }
  return false;
}
function keyEventIsEnded(target, event) {
  if (event.ended) {
    return true;
  }
  const keySeq = keySeqMap.get(target) || [];
  if (!keySeqMap.has(target)) {
    keySeqMap.set(target, keySeq);
  }
  const lastKeyDown = keySeq[keySeq.length - 1];
  return lastKeyDown ? !!lastKeyDown.ended : false;
}
function matchShortcut(shortcut, target) {
  const keySeq = keySeqMap.get(target) || [];
  if (!keySeqMap.has(target)) {
    keySeqMap.set(target, keySeq);
  }
  const { key, keys, modifiers } = shortcut;
  const keyDownList = [];
  if (Array.isArray(keys)) {
    keyDownList.push(
      ...keys
        .filter(
          descriptor =>
            descriptor && (typeof descriptor === "string" || descriptor.key)
        )
        .map(descriptor => {
          if (typeof descriptor === "string") {
            return new KeyDown(descriptor);
          }
          return new KeyDown(descriptor.key, descriptor.modifiers);
        })
    );
  } else if (key) {
    keyDownList.push(new KeyDown(key, modifiers));
  }
  const keyDownListLength = keyDownList.length;
  const keySeqLength = keySeq.length;
  if (!keyDownListLength) {
    return false;
  }
  for (let index = 0; index < keyDownListLength; index++) {
    if (
      !keySeq[keySeqLength - 1 - index].equals(
        keyDownList[keyDownListLength - 1 - index]
      )
    ) {
      return false;
    }
  }
  return true;
}
function endLastKeyDown(target, event) {
  const keySeq = keySeqMap.get(target) || [];
  if (!keySeqMap.has(target)) {
    keySeqMap.set(target, keySeq);
  }
  const lastKeyDown = keySeq[keySeq.length - 1];
  if (lastKeyDown) {
    lastKeyDown.ended = true;
  }
  event.ended = true;
}

const VueLiveInterface = Vue.extend({
  props: {
    role: String,
    label: String
  }
});
let VueLive = class VueLive extends VueLiveInterface {
  constructor() {
    super(...arguments);
    this.assertive = {
      message: "",
      alternate: false
    };
    this.polite = {
      message: "",
      alternate: false
    };
    this.busy = false;
  }
  get localRole() {
    return this.role || "log";
  }
};
VueLive = __decorate(
  [
    Component({
      components: { VueAria },
      provide() {
        const self = this;
        return {
          announce(message, important) {
            if (important) {
              self.assertive.message = message;
              self.assertive.alternate = !self.assertive.alternate;
            } else {
              self.polite.message = message;
              self.polite.alternate = !self.polite.alternate;
            }
          },
          setBusy(busy) {
            self.busy = busy;
          }
        };
      }
    })
  ],
  VueLive
);
var script$1 = VueLive;

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm._t("default"),
      _vm._v(" "),
      _c(
        "div",
        {
          staticStyle: {
            position: "absolute",
            height: "1px",
            width: "1px",
            margin: "-1px",
            clip: "rect(0 0 0 0)",
            overflow: "hidden"
          }
        },
        [
          _c(
            "VueAria",
            {
              attrs: {
                role: _vm.localRole,
                aria: { live: "assertive", label: _vm.label, busy: _vm.busy }
              }
            },
            [
              _c("div", [
                _vm._v(
                  _vm._s(_vm.assertive.alternate ? _vm.assertive.message : "")
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "VueAria",
            {
              attrs: {
                role: _vm.localRole,
                aria: { live: "assertive", label: _vm.label, busy: _vm.busy }
              }
            },
            [
              _c("div", [
                _vm._v(
                  _vm._s(!_vm.assertive.alternate ? _vm.assertive.message : "")
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "VueAria",
            {
              attrs: {
                role: _vm.localRole,
                aria: { live: "polite", label: _vm.label, busy: _vm.busy }
              }
            },
            [
              _c("div", [
                _vm._v(_vm._s(_vm.polite.alternate ? _vm.polite.message : ""))
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "VueAria",
            {
              attrs: {
                role: _vm.localRole,
                aria: { live: "polite", label: _vm.label, busy: _vm.busy }
              }
            },
            [
              _c("div", [
                _vm._v(_vm._s(!_vm.polite.alternate ? _vm.polite.message : ""))
              ])
            ]
          )
        ],
        1
      )
    ],
    2
  );
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = undefined;
/* scoped */
const __vue_scope_id__$1 = undefined;
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

var live = normalizeComponent_1(
  { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
  __vue_inject_styles__$1,
  __vue_script__$1,
  __vue_scope_id__$1,
  __vue_is_functional_template__$1,
  __vue_module_identifier__$1,
  undefined,
  undefined
);

export {
  MixinId$1 as MixinId,
  MixinKeyShortcuts$1 as MixinShortcuts,
  MixinTravel$1 as MixinTravel,
  VueAria,
  focusTrap as VueFocusTrap,
  live as VueLive,
  directiveAria
};
