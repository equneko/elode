<img src="https://github.com/equneko/elode/blob/main/res/images/logo.png?raw=true" width="128"></img>
# Get Started to Elode.js
Welcome to **Elode.js!** learn with a unique way web development! <br>
make your experience becomes different and interesting...

## Hello World
Here's the basic procedure to make a simple app "Hello World" <br>
using **Elode.js v2.0** prefer to use it, because it's stable release version.
```javascript
  Elode("h1 Hello World").render();
```
```html
  <h1>Hello World</h1>
```
As you can see, Elode.js is a procedure to make a **HTMLElement** with **HTML-like** syntax <br>
called **HTML-Query**. What's that? it's like HTML but using **CSS-Selector** technique! <br>
Inspired from **jQuery**, they used **Query-Selector** to select the target of **HTMLElement**. <br>

## HTML Query
Elode.js bring a unique syntax called **HTML-Query** as a **HTML-Templating** <br>
based on **CSS-Selector** that you have already know. Here's the example
```javascript
  // One line
  Elode("div#app <h1.title Hello HTML-Query> <p.sub Get Started to <b Unique Syntax>>").render();

  // Multi line
  Elode(["div#app",
    "h1.title Hello HTML-Query",
    "p.sub Get Started to <b Unique Syntax>"
  ]).render();

  // ES6 String
  Elode(`div#app
      <h1.title Hello HTML-Query>
      <p.sub Get Started to <b Unique Syntax>>
  `).render();
```
```html
  <div id="app"
    <h1 class="title">Hello HTML-Query</h1>
    <p class="sub">Get Started to <b>Unique Syntax</b></p>
  </div>
```
When the `.render()` procedure's called. Element was created and rendering to the root `<body></body>` <br>
and Its will becomes to **HTMLElement** which can be manipulate on JavaScript by the **HTML-DOM** <br>

**How It Works?**
- `Elode(query).render()` the procedure's executed
- `query` transpiled and the result's HTMLElement `<div>...</div>`
- `.render()` called and detect which can be render into `<body></body>`

## Data Binding
Data Binding are **HTML-DOM prototypes** that manipulate data changes in your HTMLElement. <br>
Elode.js have two-types **Data Binding** that's **Attributes** and **Properties** for working on data

**Attributes**
```javascript
  Elode("h1[style color:blue] Hello Blue").render();
  Elode("input[placeholder Type something...]").render();
  Elode("button[onclick alert('Hello')] Click Me").render();
```
```html
  <h1 style="color:blue">Hello Blue</h1>
  <input placeholder="Type something...">
  <button onclick="alert('Hello')">Click Me</button>
```
If you already know **HTML-Attributes** that was same as **Elode.js Attributes** <br>
but using **CSS-Selector** without "=" equals separate, replaced by "space" separate. <br>
it's like this `[ attribute-name space the-value ]` becomes to `[ style color:blue ]`

**Properties**
```javascript
  Elode("h1 Hello Red",{
    style: { color:"red" }
  }).render();

  Elode("button Click Me",{
    onclick(){
      alert("Hello Properties!");
    }
  }).render();
```
```html
  <h1>Hello Red</h1>
  <button>Click Me</button>
```
`Elode(query, property).render()` <br><br>
Based on **HTML-DOM Prototype**s the **Elode.js Properties** is actually a **DOM-Properties**. <br>
which there's `style` properties and **EventListener** `onclick` method. both are origin from DOM. <br>
So you can easy to manipulate **Elode.js Element** if you have learned what's DOM is and how it's works.

## Reactive
Here we go, the **Reactive** feature comes to make Elode.js app is interactive! <br>
All **Elements** can be reactive! if you add the data and scope it into **HTML-Query**. <br>
```javascript
  // Global Reactive
  const message = "Elode.js v2.0";
  Elode("h1 News! {message}").render();

  // Self Reactive
  Elode("h1 Hello, {{yourName}}!",{ yourName:"Alf" }).render();
```
```html
  <h1>News! Elode.js v2.0</h1>
  <h1>Hello, Alf!</h1>
```
Scope the data into **HTML-Query** is called **Reactive-Data**  and there's two-types: <br>
it was a **Global Reactive** and a **Self Reactive** data. <br>

The **Global Reactive** is a reactive-scope with global data, like `const` `let` or `var` <br>
symbolic scope with curly brackets `{ javascript }` and it's actually javascript syntax. <br>

The **Self Reactive** is a reactive-scope with self data, like **Attributes** and **Properties** <br>
symbolic scope with double curly brackets `{{ properties }}` and it's actually HTMLElement's DOM-Prototypes

## Action
After creating the **HTMLElement**. Elode.js can composing the **Element** with an **Action**. <br>
Lets we talk about **jQuery Action**. it's seems like that, but not all implementation Elode.js have. <br>
Just a little bit of some actions inspired from jQuery. Here's all of **Elode.js Actions** <br>
- `.add(element)` - Add some HTMLElement into the Element.
- `.anim.fade(visibility,time)` - Animate with fade `(visibility = true/false)` and `(time = number)`.
- `.anim.fadeIn(time) / .fadeOut(time)` - Same as the action above, but with spesific visibility.
- `.attr(name,value)` - Set the Element's attribute with spesific `name` and `value`.
- `.attr(name)` - Get the Element's attribute with spesific `name`.
- `.cell(index)` - Scope the root of Element with `index`. 0 is a top of root-scope.
- `.class(value)` - Set the Element's classList with `value`.
- `.class()` - Get the Element's classList, which can be `.add()` or `.remove()`
- `.clone(props)` - Clone the Element with the `props` as a new Properties.
- `.css(style)` - CSS code implementation of `style` Element attribute.
- `.css()` - Get the `style` attribute from Element.
- `.delay(time, callback)` - Set delay/interval by the `time` for calling the `callback`
- `.destroy(element)` - Remove the Element's child by spesific the `element`
- `.destroy()` - Remove self Element from the root.
- `.get(index)` - Get the Child Element by spesific `index` 0 is start at first child.
- `.get(query)` - Get the Child Element by spesific `query` as a querySelector().
- `.hide()` - Hide the Element from the root.
- `.html(code)` - Set the innerHTML of Element by the `code`
- `.html()` - Get the outerHTML of Element.
- `.memo(keys)` - Record the memorable data `keys` as a reactive `previous` and `next` data.
- `.on(event,callback)` - Add an EventListener to your Element with Reactive-Feature.
- `.prop(props)` - Set the Properties with `props` and then update the changes.
- `.react()` - Manual reactive update the changes.
- `.render(root)` - Procedure to make Element, rendering to the `root` default: `<body></body>`
- `.seen(visible)` - Toggle the visibility of Element by the `visible` boolean.
- `.set(new,old)` - Replace the `old` Child Element by the `new` Child Element.
- `.show()` - Show the Element from the root.
- `.toggle(attribute,value)` - Toggle the spesific `attribute` with some `value`. it can be `string` or `array`.
- `.txt(text)` - Set the innerText of Element by `text`.
- `.txt()` - Get the innerText of Element.
- `.val(value)` - Set the value of Element by `value`.
- `.val()` - Get the value of Element.
