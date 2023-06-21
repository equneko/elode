# <img width="100" src="https://github.com/equneko/elode/blob/main/res/images/logo.png"></img> Elode.js - A Unique Way Web Development
**ELODE** (**EL**ement **O**n **DE**velopment) is a unique javascript library/framework for creating, composing and rendering **HTML Element (DOM)** in a unique way.
Based on JavaScript ES5 (EcmaScript 2009) that can support old web browsers and also support with other javascript libraries/frameworks

[![](https://komarev.com/ghpvc/?username=equneko&label=Visit%20Count&color=311B92&style=flat)]()
[![](https://img.shields.io/badge/Elode.js-v2.0%20(07/06/2023)-indigo)]()
[![](https://img.shields.io/badge/Experimental%20Project-black)]()
[![](https://img.shields.io/badge/Unique-purple)]()
[![](https://img.shields.io/badge/Declarative-red)]()
[![](https://img.shields.io/badge/Lightweight-yellow)]()
[![](https://img.shields.io/badge/Front%20End-blue)]()
[![](https://img.shields.io/badge/Reactive-green)]()

<img width="800" src="https://github.com/equneko/elode/blob/main/res/images/brand.png"/>

## Elode.js Lite (Lightweight-Edition)
**Elode.js Lite** comes with a minimalist feature for do **Model View Controller** with reactivity and default composer functions.
Now you can make a simple and minimalist web application using the **Lite Version!**

## Websites Using Elode.js
- SkyFlext (Elode.js + Firebase) https://skyflext.web.app
- Cycle (Elode.js + Firebase) https://alf-cycle-app.web.app
- SiKochengOren (Elode.js + ChatGPT) https://sikochengoren.netlify.app (Server Down)
- Blueplan (Elode.js) https://blueplan.netlify.app
- Selamat Ultah Bro (Elode.js) https://selamat-ultah-broo.netlify.app

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
 
## JS Compabilities
![Firebase](https://img.icons8.com/?size=128&id=62452&format=png)
![jQuery](https://img.icons8.com/?size=128&id=40253&format=png)
<img width="128" src="https://avatars.githubusercontent.com/u/9039821"></img>
- Firebase (Tested) https://firebase.google.com
- jQuery (Tested) https://jquery.com
- highlight.js (Tested) https://highlightjs.org/

## CSS Compabilities

<img width="128" src="https://yt3.googleusercontent.com/dW6to0x5Crmeh7yi-YPLcQRqVrBtx2BSh8eoKTJbE8NbjloQ0sqlmdszIlxokJU_97-ndOt_=s900-c-k-c0x00ffffff-no-rj"></img>
- w3.css (Tested) https://www.w3schools.com/w3css/defaulT.asp

# Unique ![Syntax](https://img.icons8.com/color/36/source-code.png)
**Elode.js** brings you to the unique **HTML-like Syntax** for typing HTML code in a unique way! 
it's can be fast or simple??? Nope. it's like you will be confused if you don't understand with this unique syntax 
but you can **write quickly, different and less-code** if you understand it.

```javascript
//Basic
Elode("h1 Hello World").render();
//result: <h1>Hello World</h1>

//Next
Elode(`div#app 
  <h1 Hello Elode.js!> 
  <p Get Started to <b Elode.js> >
`).render();
/* Result: 
   <div id="app">
      <h1>Hello Elode.js</h1>
      <p>Get Started to <b>Elode.js</b></p>
   </div>
*/

//Extended
Elode.use('div','h1','p');

div("#app.container",
  h1("Elode.js"),
  p("A Unique Way <b Web Development>")
).render();
/* Result: 
   <div id="app" class="container">
      <h1>Elode.js</h1>
      <p>A Unique Way <b>Web Development</b></p>
   </div>
*/
```

# Declarative ![Element](https://img.icons8.com/color/32/dashboard-layout.png)
Based on **HTML-DOM**, build your own Component/Element friendly with **Standard Web Development**. 
How it works? Elode.js includes their procedure into **DOM** that cause the Component/Element's same as **HTMLElement**.

```javascript
const { use, render } = Elode;
use('div','h1','p');

function CardView(title, content){
 return div("#mycard.card-view.some-class",
   h1(title), p(content)
 );
}

render(
 Title = h1("Declarative")
 MyCard = CardView("Elode.js","Get Started to <b Elode.js>")
);
```
Result:
```html
<h1>Declarative</h1>
<div id="mycard" class="card-view some-class">
  <h1>Elode.js</h1>
  <p>Get Started to <b>Elode.js</b></p>
</div>
```

# Lightweight ![Component](https://img.icons8.com/color/48/web-components.png)
Write in **JavaScript ES5** (EcmaScript 2009) that makes the size's small and minimalist
and also it's works on some old web browser such as **IE9+** or with compatible version on **IE11**

```javascript
const { use, render } = Elode;
use('ul','li');

let js = ['React','Vue','Svelte','Angular','jQuery','Elode'];

render(
   ul(
      js.map((x) => li(x))
   )
)
```
Result:
```html
<ul>
   <li>React</li>
   <li>Vue</li>
   <li>Svelte</li>
   <li>Angular</li>
   <li>jQuery</li>
   <li>Elode</li>
</ul>
```

# Reactive ![Reactive](https://img.icons8.com/color/32/swap.png)
All Component/Element can be **Reactive!** if you add some **EventListener** to your element
or you can use alternative way with direct procedure

```javascript
const { use, render } = Elode;
use('button');

render(
  button("You Count {{count}}",{
     count:0,
     onclick(){
        this.count++;
     }
  })
);

```
Result:
```html
<button>You Count 0</button>
```

# What's The Next?
How about to using **Elode.js** now? First, you need to learn more about this library!
So, where to start? well, let's view this actions below. You can choice to start from:

- [Get Started](https://github.com/equneko/elode/blob/main/docs/get-started.md) (Coming Soon)
- [Read Documentation](https://github.com/equneko/elode/tree/main/docs) (Coming Soon)
- [Learn Example](https://github.com/equneko/elode/tree/main/example)

# Icon Resources By [Icons8](https://icons8.com)
All embedded icon resources in this repository are platformed by **Icons8.com** <br/>
Except the one, that's official **Elode.js** icon by the Author <br/>
![Icons8](https://img.icons8.com/color/256/icons8-new-logo.png)

