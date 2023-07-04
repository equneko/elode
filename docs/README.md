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

## The HTML Query
Elode.js bring a unique syntax called **HTML-Query** as a **HTML-Templating** <br>
based on **CSS-Selector** that you have already know. Here's the example
```javascript
  // One line
  Elode("div#app <h1.title Hello HTML-Query> <p.sub Get Started to Unique Syntax>").render();

  // Multi line
  Elode(["div#app",
    "h1.title Hello HTML-Query",
    "p.sub Get Started to Unique Syntax"
  ]).render();

  // ES6 String
  Elode(`div#app
      <h1.title Hello HTML-Query>
      <p.sub Get Started to Unique Syntax>
  `).render();
```
```html
  <div id="app"
    <h1 class="title">Hello HTML-Query</h1>
    <p class="sub">Hello HTML-Query</p>
  </div>
```
When the `.render()` procedure's called. Element was created and rendering to the root `<body></body>` <br>
and Its will becomes to **HTMLElement** which can be manipulate on JavaScript by the **HTML-DOM** <br>

**How It Works?**
- `Elode(query).render()` the procedure's executed
- `query` transpiled and the result's HTMLElement `<div>...</div>`
- `.render()` called and detect which can be render into `<body></body>`

## Property
