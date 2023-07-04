<img src="https://github.com/equneko/elode/blob/main/res/images/logo.png?raw=true" width="128"></img>
# Get Started to Elode.js
Welcome to the **Elode.js Documentation!** here you can learn Elode.js <br>
There's a Tutorial, Reference, Example and Tips. Lets gooo!

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
Data Binding are **HTML-DOM prototypes** that can be manipulate data changes in your HTMLElement. <br>
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


