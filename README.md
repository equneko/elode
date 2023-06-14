
# <img width="100" src="https://github.com/equneko/elode/blob/main/res/images/logo.png"></img> Elode.js - A Unique Way Web Development
**Elode** (Element Lode / Experimental Objective Development) is a unique javascript library for creating, composing and rendering **HTML Element (DOM)**.
Based on ES5 (EcmaScript 2009) that can support old web browsers and also support with other javascript libraries/frameworks

<img width="800" src="https://github.com/equneko/elode/blob/main/res/images/brand.png"></img>

## Elode.js Lite (Lightweight-Edition)
**Elode.js Lite** comes with a minimalist feature for do **Model View Controller** with reactivity and default composer functions.
Now you can make a simple and minimalist web application using the **Lite Version!**

## Install
- Download Release Versions
- Using CDN JSDelivr:
```xml
<script src="https://cdn.jsdelivr.net/gh/equneko/elode/src/v2.0/elode.js"></script>
```
```xml
<script src="https://cdn.jsdelivr.net/gh/equneko/elode/src/v1.3/elode.min.js"></script>
```
```xml
<script src="https://cdn.jsdelivr.net/gh/equneko/elode/src/v1.2/elode.lite.js"></script>
```

## Playground
Try Elode.js (online) with 
- CodePen.io https://codepen.io/equneko/pen/BaGobLa/ (v2.0)
- JS Fiddle! https://jsfiddle.net/equneko/c9jnu6ma/ (v1.3)

<img width="768" src="https://github.com/equneko/elode/blob/main/res/images/codepen.png"></img>

## Browser Compabilities
 ![Chrome](https://img.icons8.com/color/128/chrome--v1.png)
 ![Edge](https://img.icons8.com/color/128/ms-edge-new.png)
 ![Firefox](https://img.icons8.com/external-tal-revivo-color-tal-revivo/128/external-firefox-a-free-and-open-source-web-browser-developed-by-the-mozilla-foundation-logo-color-tal-revivo.png)
 ![Edge](https://img.icons8.com/color/128/internet-explorer.png)
 ![Android Webview](https://img.icons8.com/color/128/android-os.png)
 
 - Chrome (Full Supported v78+)
 - Edge (Latest Version)
 - Firefox (Latest Version)
 - Internet Explorer (IE9+ / IE11 Stable)
 - Android WebBrowser (v4.4+ / v5.0 Stable)
 - Opera, Safari and IOS WebBrowser (Not Tested)
 
## Library Compabilities
- jQuery (Tested)
- highlight.js (Tested)

## Framework Compabilities
- w3.css (Tested)

# Unique HTML Syntax ![Syntax](https://img.icons8.com/color/36/source-code.png)
**Elode.js** brings you to the unique **HTML Syntax** for typing HTML code in a unique way!<br/>
it's can be fast or simple??? Nope. it's like you will be confused if you don't understand with this unique syntax

### Try It https://codepen.io/equneko/pen/NWzoGEj
```javascript
Elode("h1 Hello World").render(); 
//result: <h1>Hello World</h1>

Elode("h1.blue This Will Be Blue").render(); 
//result: <h1 class="blue">This Will Be Blue</h1>

Elode("h1#title.white.bg-dark Im White and Dark Background").render(); 
//result: <h1 id="title" class="white bg-dark">Im White and Dark Background</h1>
```

# Creating Element ![Element](https://img.icons8.com/color/32/dashboard-layout.png)
Here's basic example of **Elode** to creating HTML Element in javascript code with the unique query syntax type like HTML

### Try It https://codepen.io/equneko/pen/bGKzVJW
```javascript
//HTML Element (DOM)
var NavBar = Elode(`nav 
  <h1 Your Website Title>
  <p Your Website Description>`);
  
NavBar.render(); //Rendering Element to <body></body>
```
Result:
```html
<div>
  <h1>Your Website Title</h1>
  <p>Your Website Description</p>
</div>
```

# Building Component ![Component](https://img.icons8.com/color/48/web-components.png)
As long as an element based, we're going to component, that have more complex to build web interfaces with the properties

### Try It https://codepen.io/equneko/pen/gOKqaNw
```javascript
//Creating Root Element for Building Component
var App = Elode([
  "#app.container",
  "h1 {{app.title}}",
  "p {{app.subtitle}}"
],{
  app:{
    title:"My App",
    subtitle:"Built in Elode.js"
  }
}).render();

//Rendering Button to App
var GetStarted = Elode(
"button.btn.medium Getting Started",{
   onclick:function(){
     alert("Welcome to Elode.js bro!");
   }
//Rendering to root. You can using like this too ".render(App);"
}).render("#app"); 
```
Result:
```html
<div id="app" class="container">
  <h1>My App</h1>
  <p>Built in Elode.js</p>
  <button class="btn medium">Getting Started</button>
</div>
```

# Reactivity ![Reactive](https://img.icons8.com/color/32/swap.png)
All elements can be reactive! if you add an event listener to your element. For example onclick:function(){}

### Try It https://codepen.io/equneko/pen/yLEZYmj
```javascript
Elode("button You Count {{count}}",{
  count:0,
  onclick:function(){
    this.count++;
  }
}).render();
```
Result:
```html
<button>You Count 0</button>
```

# What's The Next?
How about to using **Elode.js** now? First, you need to learn more about this library!
So, where to start? well, let's view this actions below. You can choice to start from:

- [Get Started](https://github.com/equneko/elode/blob/main/docs/get-started.md)
- [Read Documentation](https://github.com/equneko/elode/tree/main/docs)
- [Learn Examples](https://github.com/equneko/elode/tree/main/example)

# Icon Resources By [Icons8](https://icons8.com)
All embedded icon resources in this repository are platformed by **Icons8.com** <br/>
Except the one, that's official **Elode.js** icon by the Author <br/>
![Icons8](https://img.icons8.com/color/256/icons8-new-logo.png)

