<img src="https://github.com/equneko/elode/blob/main/res/images/logo.png?raw=true" width="128"></img>
# Elode.js Documentation
Lets explore the whole of all things in Elode.js <br>
that helps you to learn this experimental project

## Features
- [`app`](https://github.com/equneko/elode/blob/main/docs/reference/app.md) - Application tools for `View` and `Scope` management
- [`hook`]() - Directive shortcut of repeative function ecosystem
- [`init`]() - Including main tools `Action` of Elode.js for HTMLElement (DOM)
- [`map`]() - Manipulate `Array` to be reactive as a listed `Child` with a container `Root`
- [`ref`]() - Reference do reactive changes with embedding all of scoped `Element`
- [`render`]() - Global rendering represents `<body></body>` as a `Root`
- [`router`]() - Route the `window.location.href` as a router management
- [`use`]() - Use `HTML-Tag` as a function tag() to be declared as a `Component`
- [`xss`]() - XSS bypass the html-special string to split `< >` becomes `&lt &gt`

## Element
- [`htmlquery`]() - HTML-Query represents `HTML-Templating` view with `CSS-Selector`
- [`attribute`]() - Attribute data binding inside HTML-Query strings
- [`property`]() - Property data binding with `HTMLPrototypes` DOM manipulation

## Reactive
- [`global`]() - Global reactive with JavaScript global variables
- [`self`]() - Self reactive using `Object` inside `Element` DOM prototypes
- [`reference`]() - Reference reactive embed all of scoped `Element`

## Lifecycle
- [`onCreate`]() - Called once after the `Element` was created
- [`onRender`]() - When the rendering framed with delta time `interval`
- [`onReact`]() - Each `react()` reactive change triggered
- [`onDestroy`]() - Called once after the `Element` was destroyed

## Action
- [`.add(element)`]() - Add some HTMLElement into the Element.
- [`.anim.fade(visibility,time)`]() - Animate with fade `(visibility = true/false)` and `(time = number)`.
- [`.anim.fadeIn(time).fadeOut(time)`]() - Same as the action above, but with spesific visibility.
- [`.attr(name,value)`]() - Set the Element's attribute with spesific `name` and `value`.
- [`.attr(name)`]() - Get the Element's attribute with spesific `name`.
- [`.cell(index)`]() - Scope the root of Element with `index`. 0 is a top of root-scope.
- [`.class(value)`]() - Set the Element's classList with `value`.
- [`.class()`]() - Get the Element's classList, which can be `.add()` or `.remove()`
- [`.clone(props)`]() - Clone the Element with the `props` as a new Properties.
- [`.css(style)`]() - CSS code implementation of `style` Element attribute.
- [`.css()`]() - Get the `style` attribute from Element.
- [`.delay(time, callback)`]() - Set delay/interval by the `time` for calling the `callback`
- [`.destroy(element)`]() - Remove the Element's child by spesific the `element`
- [`.destroy()`]() - Remove self Element from the root.
- [`.get(index)`]() - Get the Child Element by spesific `index` 0 is start at first child.
- [`.get(query)`]() - Get the Child Element by spesific `query` as a querySelector().
- [`.hide()`]() - Hide the Element from the root.
- [`.html(code)`]() - Set the innerHTML of Element by the `code`
- [`.html()`]() - Get the outerHTML of Element.
- [`.memo(keys)`]() - Record the memorable data `keys` as a reactive `previous` and `next` data.
- [`.on(event,callback)`]() - Add an EventListener to your Element with Reactive-Feature.
- [`.prop(props)`]() - Set the Properties with `props` and then update the changes.
- [`.react()`]() - Manual reactive update the changes.
- [`.render(root)`]() - Procedure to make Element, rendering to the `root` default: `<body></body>`
- [`.seen(visible)`]() - Toggle the visibility of Element by the `visible` boolean.
- [`.set(new,old)`]() - Replace the `old` Child Element by the `new` Child Element.
- [`.show()`]() - Show the Element from the root.
- [`.toggle(attribute,value)`]() - Toggle the spesific `attribute` with some `value`. it can be `string` or `array`.
- [`.txt(text)`]() - Set the innerText of Element by `text`.
- [`.txt()`]() - Get the innerText of Element.
- [`.val(value)`]() - Set the value of Element by `value`.
- [`.val()`]() - Get the value of Element.

## Hook
- [`anim`]() - Animation shortcut version based on `Action`
- [`attr`]() - Attributes change with dynamic style CSS
- [`def`]() - Define or binding a reactive data
- [`memo`]() - Initialize memorize features
- [`model`]() - Modeling `input` value with reactive data
- [`seen`]() - Seen toggler based on true/false change
- [`do`]() - Do self manipulation based on `Action` features
- [`if`]() - If case continue with `then` or `else`
- [`then`]() - Based on above, then is mean when it's become true
- [`else`]() - When it's comes false, then else do it
- [`for`]() - Each array becomes map of `Element`
- [`once`]() - Once reactive change, no more update
- [`delay`]() - Do something with delay time binding

## Extra
- [`Manifold`]() - Loading template with CSS space
- [`Suspense`]() - Fallback view while fetch await data
