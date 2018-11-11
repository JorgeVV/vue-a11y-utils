# Vue A11y Utils

<div style="display: flex; align-items: center;">
  <img src="https://vuejs.org/images/logo.png" width="200" height="200" />
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" x="0" y="0" viewBox="-3627 353 1024 1024" style="enable-background:new -3627 353 1024 1024;"><circle cx="-3115" cy="865" r="512" fill="#4dba87"></circle><path d="M-3116.4 353c-282 0-510.6 228.6-510.6 510.6s228.6 510.6 510.6 510.6s510.6-228.6 510.6-510.6S-2834.4 353-3116.4 353z M-3124.1 454.4c36.6 0 66.2 29.6 66.2 65.9c0 36.6-29.6 66.2-66.2 66.2c-36.3 0-65.9-29.6-65.9-66.2 C-3190.1 484-3160.5 454.4-3124.1 454.4L-3124.1 454.4z M-2838 667.7l-196.4 24.8l0.1 196.6l95.2 317.7c5 20.1-7 40.1-26.9 45.1 c-19.8 5-40.1-6-45.1-26l-97.5-289.2h-30l-89.7 295.2c-7.5 19.3-29 28.1-48.2 20.6c-19.1-7.4-30.7-29.1-23.2-48.4l82.4-311.8V692.5 l-181-24.6c-18.6-1.5-31.2-17.8-29.7-36.4c1.4-18.7 18.3-32.6 36.8-31.1l219.9 18.9h96.4l234.1-19.3c18.6-0.7 34.4 13.7 35 32.5 C-2805 651-2819.4 666.9-2838 667.7L-2838 667.7z" fill="#435466"></path></svg>
</div>

[![NPM Version](https://img.shields.io/npm/v/vue-a11y-utils.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-a11y-utils)
[![Language Types](https://img.shields.io/npm/types/vue-a11y-utils.svg?style=for-the-badge)](https://github.com/Jinjiang/vue-a11y-utils)
[![LICENSE](https://img.shields.io/github/license/Jinjiang/vue-a11y-utils.svg?style=for-the-badge)](https://github.com/Jinjiang/vue-a11y-utils/blob/master/LICENSE)
[![CircleCI](https://img.shields.io/circleci/project/github/Jinjiang/vue-a11y-utils/master.svg?style=for-the-badge)](https://circleci.com/gh/Jinjiang/vue-a11y-utils/tree/master)

Utilities for accessibility (a11y) in Vue.js

## Table of Contents

- [Why](#why)
- [Getting Started](#getting-started)
- [`<VueAria>` Component](#vuearia-component)
- [`v-aria` Custome Directive](#v-aria-custom-directive)
- [`KeyTravel` Mixin](#keytravel-mixin)
- [`Id` Mixin](#id-mixin)
- [`<VueFocusTrap>` Component](#vuefocustrap-component)
- [`KeyShortcuts` Mixin](#keyshortcuts-mixin)
- [`<VueLive>` Component](#vuelive-component)

## Why

### Background

As the [(WIP) Vue accessibility guide page](https://github.com/vuejs/vuejs.org/pull/1002) says:

> The World Health Organization estimate that 15% of the world's population has some form of disability, 2-4% of them severely so ... which can be divided roughly into four categories: _visual impairments_, _motor impairments_, _hearing impairments_ and _cognitive impairments_.

_table: issues for different impairments_

| visual  | motor              | hearing | cognitive                    |
| ------- | ------------------ | ------- | ---------------------------- |
| 🖥 🔎 🎨 | 🖱 📱 ⌨️ 🕹 🎮 🎙 🖊 🎛 | 🔈      | content, layout, interaction |

Or there are also some accessibility issues for a normal person in such a situation like driving a car, having a meeting, using a mobile device with a bluetooth keyboard etc.

So actually accessibility is not just for the "less amount of people", but for almost everyone.

But some mistakes we often make in a real project like:

- Mouse-only in a desktop app
- Touch-only in a mobile app
- Remote-control-only in a TV app
- Operation through keyboard only is not possible or with low efficiency
- No text alternative for non-text content
- Have no fallback way for the creative interaction like e-pencil, audio input, face ID, touch ID, NFC etc.
- The color contrast is not enough

Each of them might make user confused, block the user flow or lead user to a no-way-out trap in some certain cases.

### Web Standards

However, there are already some web standards and best practice to follow which let developers do it better.

In W3C there are 3 main parts of accessibility standards:

![WAI standard overview](https://www.w3.org/WAI/content-images/wai-std-gl-overview/specs.png)  
via: [W3C Accessibility Standards Overview](https://www.w3.org/WAI/standards-guidelines/)

- [WCAG](https://www.w3.org/TR/WCAG20/): about web content, targeting websites.
- [UAAG](https://www.w3.org/TR/UAAG20/): about user agent, targeting browsers, screen readers etc.
- [ATAG](https://www.w3.org/TR/ATAG20/): about authoring tools, targeting CMS, WYSIWYG editor etc.

and a technical spec which is commonly used:

- [WAI-ARIA](https://w3c.github.io/aria/): targeting web app.

For web developers, we may pay more attention on WCAG and WAI-ARIA. At the same time, we should know which user agents people use most and how about their support and compatibility to the standard.

Here is a survey about most common screen reader and browser combinations table:

| Screen Reader & Browser     | # of Respondents | % of Respondents |
| --------------------------- | ---------------- | ---------------- |
| JAWS with Internet Explorer | 424              | 24.7%            |
| NVDA with Firefox           | 405              | 23.6%            |
| JAWS with Firefox           | 260              | 15.1%            |
| VoiceOver with Safari       | 172              | 10.0%            |
| JAWS with Chrome            | 112              | 6.5%             |
| NVDA with Chrome            | 102              | 5.9%             |
| NVDA with IE                | 40               | 2.3%             |
| VoiceOver with Chrome       | 24               | 1.4%             |
| Other combinations          | 180              | 10.5%            |

_via [Screen Reader User Survey by webaim.org](https://webaim.org/projects/screenreadersurvey7/#browsercombos)_

### Specific Problems

When you write a Vue app with full accessibility. You may meet some issues frequently. For example:

- Making sure the [W3C WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) roles & properties of each DOM element are set properly.
- Controling the _focus_ and finish every use case elegantly only through _keyboard_.
- Using a central [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) to read messages right now in a screen reader.
- Sometimes you need set a _ID reference_ or _ID reference list_ type aria attribute with _ID_ of another DOM element. But we don't use _ID_ in Vue to identify a DOM element right?

So that's why **Vue A11y Utils** is trying to supply a group of utilities to help Vue developers finish these jobs easier.

## Getting Started

### Install

```bash
npm install vue-a11y-utils
```

or

```bash
yarn add vue-a11y-utils
```

### Import

```js
// choose the utils below as you like
import {
  VueAria,
  directiveAria,
  MixinKeyTravel,
  MixinId,
  VueFocusTrap,
  MixinKeyShortcuts,
  VueLive
} from "vue-a11y-utils";
```

### Usage

See the docs below or preview some [examples](https://github.com/Jinjiang/vue-a11y-utils/tree/master/examples) [online](https://jinjiang.github.io/vue-a11y-utils/examples).

## `<VueAria>` Component

This component helps you to write `role` and `aria-*` attributes likely in a better way.

First you could put all `aria-*` attributes in an JS object. Second these a11y attributes could be inherited when more than 1 `<VueAria>` components nested. Third, it's more portable to use.

Another thing important is the [`tabindex` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) which could make an element focusable. But sometimes when the `role` changed into `"none"` or `"appearance"`, there should be a easy way to control whether it is focusable as well.

### Examples

#### For Props `role` And `aria`

```vue
<template>
  <VueAria role="menubutton" :aria="aria">
    <button>WAI-ARIA Quick Links</button>
  </VueAria>
</template>

<script>
import { VueAria } from "vue-a11y-utils";
export default {
  components: { VueAria },
  data() {
    return {
      aria: {
        haspopup: true,
        controls: "menu2"
      }
    };
  }
};
</script>
```

which is same to:

```vue
<template>
  <button id="menubutton" aria-haspopup="true" aria-controls="menu2">
    WAI-ARIA Quick Links
  </button>
</template>
```

So the content and structure in template is more clear than which with a lot of `aria-*` attribute in.

The `aria` prop could also be an Array which is convenient to merge multiple `aria-*` attribute from different places:

```vue
<template>
  <VueAria
    role="menubutton"
    :aria="[
      ariaData,
      ariaProps,
      otherAriaFromSomewhereElse
    ]"
  >
      <button>WAI-ARIA Quick Links</button>
  </VueAria>
</template>
```

And this component could be nested like:

```vue
<template>
  <VueAria :aria="otherAriaFromSomewhereElse">
    <VueAria :aria="ariaProps">
      <VueAria role="menubutton" :aria="ariaData">
        <button>WAI-ARIA Quick Links</button>
      </VueAria>
    </VueAria>
  </VueAria>
</template>
```

or:

```vue
<template>
  <VueAria role="menubutton">
    <VueAria :aria="aria">
      <button>WAI-ARIA Quick Links</button>
    </VueAria>
  </VueAria>
</template>
```

#### For Prop `tabindex`

If you want to make a `<div>` focusable. You should give it a `tabindex` attribute. For example:

```vue
<template>
  <VueAria
    role="menubutton"
    :tabindex="0"
  >
    <div>WAI-ARIA Quick Links</div>
  </VueAria>
</template>
```

When you pass `"none"` or `"appearance"` value into `role` prop but without a `tabindex` prop. The `tabindex` attribute on the root element will finally be `""` by default. For examples:

```vue
<template>
  <!-- won't be focused by click or TAB key -->
  <VueAria role="none">
    <div tabindex="0" role="menubutton">WAI-ARIA Quick Links</div>
  </VueAria>
</template>
```

```vue
<template>
  <!-- won't be focused TAB key but could be focused by click -->
  <VueAria role="none" :tabindex="-1">
    <div role="button" tabindex="0">WAI-ARIA Quick Links</div>
  </VueAria>
</template>
```

### API

#### props

- `role`: `string`
- `aria`: `Array` or `Object`
- `tabindex`: `number`

::: tip
When you pass `"none"` or `"appearance"` value into `role` prop but without a `tabindex` prop. The `tabindex` attribute on the root element will finally be `""` by default.
:::

#### slots

- default slot: the element you would put these a11y attributes on (only one root element is accepted)

## `v-aria` Custom Directive

If you prefer using directives rather than components, here is another choise: `v-aria` custom directive.

It helps you to write `aria-*` attributes better throught a Vue custom directive.

Almost the same to the `aria` prop in `<VueAria>` component, let you put all `aria-*` attributes in an object or array.

::: tip
Because the custom directive would modify the DOM element. It is different from component which renders virtual DOM. So `v-aria` will run after all `<VueAria>` executed if you put both of them on a same DOM element. And the performance of `v-aria` would be theoritically a little bit slower than `<VueAria>` if you use them bested quite a lot.
:::

### Examples

```vue
<template>
  <i class="icon-save" role="button" v-aria="aria" />
</template>

<script>
import { directiveAria } from "vue-a11y-utils";
export default {
  data() {
    return {
      aria: {
        label: "save your changes",
        controls: "id-of-a-textbox"
      }
    };
  },
  directives: {
    aria: directiveAria
  }
};
</script>
```

This example above is same to:

```vue
<template>
  <i
    class="icon-save"
    role="button"
    aria-label="save your changes"
    aria-controls="id-of-a-textbox"
  >
</template>
```

Btw. there is no custom directive such as `v-role` and `v-tabindex` because you can set the two raw attributes directly on the same component or element with `v-aria`.

## `KeyTravel` Mixin

This mixin helps you using <kbd>Arrow</kbd> keys to travel through declared focusable items by overrided `getKeyItems()` in a Vue component. At the same time you could easily fire an action using <kbd>ENTER</kbd> key or <kbd>SPACE</kbd> key.

It also has an `autofocus` value to determine whether auto-focus an item when _mounted_. The default auto-focused item is the first focusable item you declared. And you can specify it by overrided `getAutofocusItem()` method.

### Examples

#### Auto-focus

The first example is about auto-focus. Make sure where is a value (through a prop/data/computed etc.) named `autofocus` in the component. When it's truthy, the item returned by `getAutofocusItem()` would be focused when component mounted to the DOM.

```vue
<template>
  <div>
    <button ref="btn">Click!</button>
  </div>
</template>

<script>
import { MixinKeyTravel } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyTravel],
  data() {
    return {
      // You can also define this value through `prop` or `computed` etc.
      autofocus: true
    };
  },
  methods: {
    // The mixin will call this method to find the focus when mounted to the DOM.
    getAutofocusItem() {
      return this.$refs.btn;
    }
  }
};
</script>
```

::: tip

1. The auto-focus item won't be focused if it is invisible when mounted.
2. If you want to auto-focus a dialog which will be mounted when you open it, by such as `v-if`, it will also work as you like. But if your dialog is already mounted before open, by such as `v-show`, this mixin won't work. You must set the focus manually.
   :::

#### Focus Travel Using Arrow Keys

The second example is about focus travel using <kbd>Arrow</kbd> keys in a Vue component. There are 2 files:

- `App.vue`:

  ```vue
  <template>
    <div role="list" @keydown="keyTravel">
      <ListItem
        ref="items"
        v-for="option in options"
        :key="option.value"
        :text="option.text"
        :value="option.value"
      />
    </div>
  </template>
  
  <script>
  import { MixinKeyTravel } from "vue-a11y-utils";
  export default {
    mixins: [MixinKeyTravel],
    components: { ListItem },
    data() {
      return {
        autofocus: true,
        // Only ArrowUp and ArrowDown keys work.
        orientation: "vertical"
      };
    },
    props: {
      options: Array
    },
    methods: {
      // You need to declare all focusable items here. And if you don't override
      // getAutofocusItem(), the first one you declared will be auto-focused.
      getKeyItems() {
        return this.$refs.items;
      }
    }
  };
  </script>
  ```

- `ListItem.vue`:

  ```vue
  <template>
    <div role="listitem" tabindex="-1" @click="fireAction">{{ text }}</div>
  </template>
  
  <script>
  export default {
    props: {
      text: String,
      value: String
    },
    methods: {
      fireAction() {
        alert(this.value);
        return true;
      }
    }
  };
  </script>
  ```

Here are some points you may notice:

1. Bind `@keydown="keyTravel"` to the root DOM element of your component.
2. Put a prop/data/computed named `orientation` to declare which <kbd>Arrow</kbd> keys would work.
3. Override a `getKeyItems()` method to return all focusable items.
4. Override a `fireAction()` method in `<ListItem>` for the action when user press <kbd>ENTER</kbd> or <kbd>SPACE</kbd>. The returned truthy value means to prevent the default keyboard event.

Now you can use <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> to travel each items. When you press <kbd>ENTER</kbd> or <kbd>SPACE</kbd>, an alert with the value of the current focused item would be poped up.

### API

#### Method you can call

- `keyTravel(event: KeyboardEvent, config?: KeyConfig): void`

  The second parameter is an optional JS object. The key of this JS object is the [`key` value](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) in the keyboard event, and the value is the "travel signal" to trigger when corresponding key pressed.

  All available "travel signals" are: `prev`, `next`, `prevPage`, `nextPage`, `first`, `last`, `action`.

  Default config:

  - `ArrowUp`: `prev` when `this.orientation` is `vertical` or empty
  - `ArrowDown`: `next` when `this.orientation` is `vertical` or empty
  - `ArrowLeft`: `prev` when `this.orientation` is `horizontal` or empty
  - `ArrowRight`: `next` when `this.orientation` is `horizontal` or empty
  - `Home`: `first`
  - `End`: `last`
  - `Enter`: `action`
  - `` (Space): `action`

#### Values you can declare

- `autofocus: boolean`
- `orientation: "horizontal" | "vertical"`

#### Methods you can override

_Main method for travel:_

- `getKeyItems(): Array<Vue | HTMLElement>`: return an empty array by default

_Main method for auto-focus:_

- `getAutofocusItem(): Vue`: return first key item by default

_Methods you can customize to fire action:_

- `fireAction(item: Vue | HTMLElement): void`: call `item.fireAction()` and return `true` if new element focused by default

_Methods you can customize to travel:_

- `goPrev(): any`: focus previous item
- `goNext(): any`: focus next item
- `goFirst(): any`: focus the first item
- `goLast(): any`: focus the last item
- `goNextPage(): any`: do nothing by default
- `goPrevPage(): any`: do nothing by default
- `goAction(): any`: fire action at the current focused item

#### Method you can declare in item component

- `fireAction(): void`

## `Id` Mixin

In modern web framework today, the _id_ attribute of an HTML element is almost never used. But in WAI-ARIA, some `aria-*` attributes like `aria-controls`, `aria-labelledby` only accept _ID reference_ or _ID reference list_. Another problem about id is that it's always global unique. But every Vue component has its own scope. It's not easy to make sure an id not used in other Vue components.

This mixin helps you generate unique id (sometimes as an id prefix) for HTML elements in a component by default. And you can also easily specify the id manually if necessary.

### Examples

#### Generate unique id

`input.vue`:

```vue
<template>
  <div :id="localId">
    <label ref="label" :id="`${localId}-label`">Username</label>
    <input
      ref="input"
      :id="`${localId}-input`"
      :aria-labelledby="`${localId}-label`"
    />
  </div>
</template>

<script>
import { MixinId } from "vue-a11y-utils";
export default {
  mixins: [MixinId]
};
</script>
```

In this example, the `localId` is a data member which is generated by `Id` mixin. It's globally unique so you don't need worry about that.

If you have a form with a group of inputs, it is suitable for set each input with a different auto-generated id in that way above.

#### Use id passed from parent component

Think about you should bind a clear button out of the input component above. Now you can easily set an `id` prop from parent like this:

`foo.vue`:

```vue
<template>
  <div>
    <VueInput id="foo" />
    <button aria-controls="foo-input">Clear</button>
  </div>
</template>

<script>
import VueInput from "input.vue";
import { MixinId } from "vue-a11y-utils";
export default {
  mixins: [MixinId],
  components: { VueInput }
};
</script>
```

Now the final generated DOM tree will be:

```html
<div>
  <div id="foo">
    <label id="foo-label">Username</label>
    <input id="foo-input" aria-labelledby="foo-label" />
  </div>
  <button aria-controls="foo-input">Clear</button>
</div>
```

### API

#### Props you can use

- `id: string`

#### Values you can get

- `localId: string`

## `<VueFocusTrap>` Component

Usually, when you have a modal dialog in your Vue app, you should keep the focus always in it whatever you navigate with touch, mouse or keyboard.

`<VueFocusTrap>` gives you a easy way to wrap a modal with trapped focus by just two events: `gofirst` and `golast`, which should bind handlers to reset the focus to the first or last focusable target in the dialog. It also has a `disabled` prop to stop trapping focus which could be set `true` when the dialog is hidden or disabled.

### Examples

In this example below, after you open the modal dialog by click the trigger button, the focus will always be in one of the 4 control elements in `<form>`, whatever you press <kbd>tab</kbd>, <kbd>tab</kbd> + <kbd>shift</kbd> or click somewhere out of the dialog:

```vue
<template>
  <div>
    <button ref="trigger" @click="shown = true">
      Open a Modal Dialog
    </button>
    <form class="dialog" v-show="shown">
      <VueFocusTrap :disabled="!shown" @gofirst="goFirst" @golast="goLast">
        <label>Email: <input ref="email" type="email" /></label>
        <label>Password: <input ref="password" type="password" /></label>
        <button ref="login" @click="shown = false">Login</button>
        <button ref="cancel">Cancel</button>
      </VueFocusTrap>
    </form>
  </div>
</template>

<script>
import { VueFocusTrap } from "vue-a11y-utils";
export default {
  components: { VueFocusTrap },
  data() {
    return { shown: false };
  },
  watch: {
    shown(value) {
      if (value) {
        this.$nextTick(() => this.goFirst());
      } else {
        this.$nextTick(() => this.goTrigger());
      }
    }
  },
  methods: {
    goFirst() {
      this.$refs.email.focus();
    },
    goLast() {
      this.$refs.cancel.focus();
    },
    goTrigger() {
      this.$refs.trigger.focus();
    }
  }
};
</script>
```

::: tip
Additionally, as a best practise of managing focus, you'd better auto-focus the first control element in when the dialog shows up, and focus the trigger button back when the dialog closed. Just like the code logic in the example above.
:::

### API

#### Props

- `disabled: boolean`

#### Slots

- default slot: the content you would trap focus in.

#### Events

- `gofirst`: when you should manually set focus to the first focusable element
- `golast`: when you should manually set focus to the last focusable element

### Using `<VueFocusTrap>` Component and `KeyTravel` Mixin Together

The better thing is: you can combine `<VueFocusTrap>` component and `KeyTravel` mixin together in a widget like actionsheet.

```vue
<template>
  <div>
    <button ref="trigger" @click="shown = true">
      Open a Modal Dialog
    </button>
    <ul class="actionsheet" v-show="shown" @keydown="keyTravel">
      <VueFocusTrap @gofirst="goFirst" @golast="goLast">
        <li
          v-for="option in options"
          :key="option.value"
          ref="items"
          tabindex="0"
        >{{ option.text }}</li>
      </VueFocusTrap>
    </ul>
  </div>
</template>

<script>
import { MixinKeyTravel, VueFocusTrap } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyTravel],
  components: { VueFocusTrap },
  props: { options: Array, value: String },
  data() {
    return { shown: false, orientation: "vertical" };
  },
  watch: {
    shown(value) {
      if (value) {
        this.$nextTick(() => this.getAutofocusItem().focus());
      } else {
        this.$nextTick(() => this.goTrigger());
      }
    }
  },
  methods: {
    getKeyItems() {
      return this.$refs.items;
    },
    getAutofocusItem() {
      const items = this.getKeyItems();
      const index = this.options.map(option => option.value).indexOf(value);
      return items[index] || items[0];
    },
    goTrigger() {
      this.$refs.trigger.focus();
    },
    fireAction(item) {
      const items = this.getKeyItems();
      const index = this.options.map(option => option.value).indexOf(value);
      const currentIndex = items.indexOf(item);
      if (index !== currentIndex) {
        const option = this.options[index];
        if (option) {
          this.$emit("input", option.value);
        }
      }
      this.shown = false;
    }
  }
};
</script>
```

## `KeyShortcuts` Mixin

In an app we may need some keyboard shortcuts to do operations more effectively. Fortunately we have a `KeyShortcuts` mixin.

### Examples

In this example, this component will listen shortcut <kbd>CMD</kbd> + <kbd>G</kbd> globally:

```vue
<template>...</template>

<script>
import { MixinKeyShortcuts } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyShortcuts],
  shortcuts: [
    {
      key: "G",
      modifiers: { meta: true },
      handle(event) {
        alert("trigger: CMD + G");
      }
    }
  ]
};
</script>
```

Another way to config <kbd>CMD</kbd> + <kbd>K</kbd>, <kbd>CMD</kbd> + <kbd>B</kbd> as a `keys` sequence:

```vue
<template>...</template>

<script>
import { MixinKeyShortcuts } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyShortcuts],
  shortcuts: [
    {
      keys: [
        { key: "K", modifiers: { meta: true } },
        { key: "B", modifiers: { meta: true } }
      ],
      handle(event) {
        alert("trigger: CMD + K, B");
      }
    }
  ]
};
</script>
```

You can also quickly config each key in `keys` as a string if there is no modifiers to declare:

```vue
<template>...</template>

<script>
import { MixinKeyShortcuts } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyShortcuts],
  shortcuts: [
    {
      keys: ["a", "s", "d", "f"],
      handle(event) {
        alert("trigger: A-S-D-F");
      }
    }
  ]
};
</script>
```

At last, if you would like to bind key shortcuts on a certain element, for example an input text box, we also supports named shortcuts config like below:

```vue
<template>
  <div>
    <input
      type="text" value="CMD + G"
      @keydown="bindShortcut($event, 'foo')"
    />
    <input
      type="text" value="CMD + K"
      @keydown="bindShortcut($event, 'bar')"
    />
  </div>
</template>

<script>
import { MixinKeyShortcuts } from "vue-a11y-utils";
export default {
  mixins: [MixinKeyShortcuts],
  shortcuts: {
    foo: [
      {
        key: "g",
        modifiers: { meta: true },
        handle(event) {
          alert("trigger: CMD + G");
        }
      }
    ],
    bar: [
      {
        key: "k",
        modifiers: { meta: true },
        handle(event) {
          alert("trigger: CMD + K");
        }
      }
    ],
    default: [
      {
        keys: ["a", "s", "d", "f"],
        handle(event) {
          alert("trigger: A-S-D-F");
        }
      }
    ]
  }
};
</script>
```

### API

#### New option you can declare

- `shortcuts: Array<ShortcutConfig>`
- `shortcuts: Record<string, ShortcutConfig>`
- `shortcuts: Record<string, Array<ShortcutConfig>>`

  The interface `ShortcutConfig` is like:

  ```ts
  {
    key: string, // we will introduce later
    modifiers: {
      ctrl?: boolean,
      shift?: boolean,
      alt?: boolean, // you can also use `option`
      meta?: boolean // you can also use `cmd` or `window`
    },
    handle(event: KeyboardEvent)
  } |
  {
    keys[
      {
        key: string,
        modifiers: {
          ctrl?: boolean,
          shift?: boolean,
          alt?: boolean, // you can also use `option`
          meta?: boolean // you can also use `cmd` or `window`
        }
      } |
      key: string
    ],
    handle(event: KeyboardEvent)
  }
  ```

  The `key` value in interface `ShortcutConfig` could be one of them below:

  - letter: a-z (case-insensitive)
  - number: 0-9
  - common key names: `up`, `down`, `left`, `right`, `home`, `end`, `pagedown`, `pageup` (case-insensitive)
  - any other valid [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) value in [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

### Methods you can call

- `bindShortcut(event: KeyboardEvent, name: string)`

## `<VueLive>` Component

_inspired from [react-aria-live](https://github.com/AlmeroSteyn/react-aria-live) by AlmeroSteyn_

This component is actually a wrapper which generates a invisible [WAI-ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) and provides a default slot which injects some methods to announce live messages on its descendant components.

### Examples

- `App.vue`:

  ```vue
  <template>
    <VueLive>
      <Foo />
    </VueLive>
  </template>
  
  <script>
  import { VueLive } from "vue-a11y-utils";
  export default {
    components: { VueLive }
  };
  </script>
  ```

- `Foo.vue`:

  ```vue
  <template>
    <div>
      Message: <input type="text" v-model="message" />
      <button @click="announce(message)">Announce</button>
    </div>
  </template>
  
  <script>
  export default {
    inject: ["announce"],
    data() {
      return { message: "" };
    }
  };
  </script>
  ```

Now, if you enable VoiceOver or other a11y screen readers, there will be a live message announced when you input some text in the textbox and press the "announce" button.

The injected method `announce(message)` could announce live message to the screen reader.

But by default the live message will be announced "politely" after other voices spoken. If you want to announce the message immediately, you can add a second parameter with a truthy value:

```vue
<template>
  <div>
    Message: <input type="text" v-model="message" />
    <input type="checkbox" v-model="immediately" />: immediately
    <button @click="announce(message, immediately)">Announce</button>
  </div>
</template>

<script>
export default {
  inject: ["announce"],
  data() {
    return {
      message: "",
      immediately: false
    };
  }
};
</script>
```

Also there is a third boolean parameter which could announce the same message by force if the current message is same to the previous one.

As the example below, you can choose the way by two parameters: `immediately` and `force`. And another injected method could manually clear the message history. That is another way to ensure the same message could be announced.

```vue
<template>
  <div>
    Message: <input type="text" v-model="message" />
    <input type="checkbox" v-model="immediately" />: immediately
    <input type="checkbox" v-model="force" />: force
    <button @click="announce(message, immediately, force)">Announce</button>
    <button @click="clear()">Clear</button>
  </div>
</template>

<script>
export default {
  inject: ["announce", "clear"],
  data() {
    return {
      message: "",
      immediately: false,
      force: false
    };
  }
};
</script>
```

### API

#### Props

- `role: string`: `"log"` by default, you can also choose other [live region roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#Preferring_Specialized_Live_Region_Roles)
- `label: string`: the label of the live region

#### Slots

- default slot: the content you would wrap.

#### Provide

- `announce(message: string, immediately: boolean, force: boolean)`: announce message to screen reader
  - `message`: the message text would be announced
  - `immediately`: whether announce immediately or "politely"
  - `force`: whether announce by force whatever the message is same to the previous one
- `clear()`: clear the previous message history to ensure the next message 100% would be announced
- `isBusy(busy: boolean)` if you set it true, only the last message you send during that time would be announced after you set it false later _(experimental, not sure screen readers support that well)_
