
# <img width="128" src="https://github.com/alfajriarraihan/elode/blob/main/logo.png"></img> Elode.js - An Unique Way Development
**Elode** (Element Lode) is an unique javascript module/framework for creating **HTML Element (DOM)** built on top of HTML, CSS and Javascript.
Based on ES5 (EcmaScript 2009) that support old web browser and also support with other javascript modules/frameworks

 
- [Unique HTML Syntax](https://github.com/alfajriarraihan/elode#unique-html-syntax-)
- [Creating Element](https://github.com/alfajriarraihan/elode#creating-element-)
- [Building Component](https://github.com/alfajriarraihan/elode#building-component-)
- [Reactivity Way](https://github.com/alfajriarraihan/elode#reactivity-way-)

 ![Chrome](https://img.icons8.com/color/128/chrome--v1.png)
 ![Edge](https://img.icons8.com/color/128/ms-edge-new.png)
 ![Android Webview](https://img.icons8.com/color/128/android-os.png)
 ![HTML](https://img.icons8.com/fluency/128/html-5.png)
 ![CSS](https://img.icons8.com/fluency/128/css3.png)
 ![Javascript](https://img.icons8.com/fluency/128/javascript.png)

## Unique HTML Syntax ![Syntax](https://img.icons8.com/color/36/source-code.png)
**Elode.js** brings you to the unique **HTML Syntax** for typing HTML code in an unique way!<br/>
it's can be fast or simple??? Nope. it's like you will be confused if you don't understand with this unique syntax
```javascript
Elode("h1 Hello World").render(); 
//result: <h1>Hello World</h1>

Elode("h1.blue This Will Be Blue").render(); 
//result: <h1 class="red">This Will Be Red</h1>

Elode("h1#title.white.bg-dark Im White and Dark-Background").render(); 
//result: <h1 id="title" class="red border">Im Red and Bordered</h1>
```

## Creating Element ![Element](https://img.icons8.com/color/32/dashboard-layout.png)
Here's basic example of **Elode** to creating HTML Element in javascript code with the unique query syntax type like HTML
```javascript
//HTML Element (DOM)
var NavBar = Elode(`div
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

## Building Component ![Component](https://img.icons8.com/color/48/web-components.png)
As long as an element based, we're going to component, that have more complex to build web interfaces with the properties
```javascript
//Creating Root Element for Building Component
var App = Elode([
  "#app.container",
  "h1 {{app.title}}"
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

## Reactivity Way ![Reactive](https://img.icons8.com/color/32/swap.png)
All elements can be reactive! if you add an event listener to your element. For example onclick:function(){}
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
How about to using **Elode.js** now? First, you need to learn more about this module/frameworks!
So, where to start? well, let's view this actions below. You can choice to start from:

- [Get Started](https://github.com/alfajriarraihan/elode/documentation/get-started.md)
- [Read Documentation](https://github.com/alfajriarraihan/elode/documentation/)
- [Create Chat Application](https://github.com/alfajriarraihan/elode/tutorial/chat-application.md)

# Icon Resources By [Icons8](https://icons8.com)
All embedded icon resources in this repository are platformed by Icons8.com <br/>
Except the one, that's official **Elode.js** icon by the Author <br/>
![Icons8](https://img.icons8.com/color/256/icons8-new-logo.png)

