# Elode.js v2.0
( Release: 28-06-2023 ) ( size: 108kb | min-size: 28kb )

# Elode.js - BIG UPDATE!!!
**Elode.js** have some big changes in this version! There's new feature, bug fixes, deprecated changes and
much more that will be describe here. And now, **The Official Community Team** participate on the development.
Let's see you the **BIG UPDATE** that changes a whole of source-code on the **Elode.js v2**

## Logo Update
Simple, modern and unique's our motto and now we have adapted that into new Elode.js Logo for v2.0
the vector shape's E and it seems like a Bookshelf with the unique violet color.

## Readable Source Code
The last source code on v1.3 is not readable source. That cause, the development's not seriously develop and
now at the new source code. Brings the readable, splitted and sorted source code files of Elode.js

## New Changes, Features and Rules
Now, the new rules changes the style code of v1.3 and below. At the point of creating, composing and rendering.
as you know the main features of Elode.js is **A Unique Way Web Development.** that means we bring a unique changes.

**New Changes:**
 - `Symbol Between Algorithm v1.3` - fixed some bug and delete unused code
 - `ES5 Polyfills` - changes polyfills for IE9+ old web support
 - `HTML QUERY` - a unique syntax for html-templating changes some code (details on documentation)
 - `Elode Reactive & Reference` - fixed some bug and changes new rules (details on documentation)
 - `Elode.use(htmlTag)` - new update v2.0 for using HTML-Tag as a function with extended features
 - `Elode.app(root, nodes, prop)` - deprecated, now using `.app(view)` for manage view-state (details on documentation)
 - `element.each(query, root)` - deprecated, now using `Array.map()` for list HTML-Element (details on documentation)
 - `element.clone(prop), element.seen(visible)` - fixed some bug on element change-state-view
 - `element.elodeQuery` - now changes to `element.__query__` for Elode Query string
 - `element.elodeProperty` - now changes to `element.__property__` for Elode Property object
 - `element.elodeBase` - now changes to `element.__react__` for Elode Reactive string

**New Features**
- **Elode Features**
- `Elode.import(features)` - similiar to `const { app, use, render } = Elode` use Elode Feature without namespace
- `Elode.init(element)` - initialize an element with Elode Property/Procedures
- `Elode.hook(directives)` - includes a directive/shortcut function into Elode Component/Element
- `Elode.map(root, array, callback)` - similiar to Array.map(callback) but extended with Reactive Feature
- `Elode.router(states)` - manipulate window.location.href to manage your state-view
- `Elode.xss(source)` - bypass XSS Attack by split the `<` and `>` to `&lt` and `&gt`
- `Elode.__disableHook__` - an option to disable Elode.hook feature usagement
- `Elode.__hook__` - objects that saves and record the Elode.hook directive function
- `Elode.__hookTag__` - custom tag (default `:`) for split the namespace of directive function
- `Elode.__info__` - common properties of Elode.js `VERSION` and `CODE` release
- **Element Features**
- `element.anim.fade(visible, time)` - animation to fade by `visible` as visibility and `time` duration
- `element.anim.fadeIn(time) .fadeOut(time)` - similar as `.fade(visible, time)` but it spesific visibility
- `element.delay(time, callback)` - set delay time and if timeout the callback's called
- `element.memo(keys)` - set memorable reactive data for your element to record as `prev` and `next` changes
- `element.__init__()` - intialize element on some case. it's includes hook initialization
- `element.__runtime__()` - rendering case without `.render()` feature (it's most used as composing/MVC cases)
- `element.__xss__` - check if the element has XSS Access to inject HTML-Code by Reactive Feature.

**New Rules**

**Standard Rules v1.0 - v2.0**
The rules means that we develop an Elode.js app by the style of code.
Here the standard rules is used for do a basic procedure:
```javascript
  Elode("h1 Hello World").render(); 
  // Result: <h1>Hello World</h1>

  Elode("h1#id.class Hello World").render(); 
  // Result: <h1 id="id" class="class" >Hello World</h1>

  Elode("button[style color:blue | onclick alert('Hello')] Hello World!").render(); 
  // Result: <button style="color:blue" onclick="alert('Hello')" >Hello World!</button>

  Elode("div <h1 Hello World> <p Learn <b Elode.js>>").render(); 
  // Result: <div><h1>Hello World</h1><p>Learn <b>Elode.js</b></p></div>
```

**Extended Rules v1.2 - v1.3**
The next develop rules are extended style of procedure code.
Build component based on some elements.
```javascript
  Elode(["div#app",
      "h1 Hello World",
      "p Learn <b Elode.js>"
  ]).render();
  /* Result:
      <div id="app">
          <h1>Hello World</h1>
          <p>Learn <b>Elode.js</b></p>
      </div>
 */
```

**Next Modern Rules v2.0**
The next modern development rules was great style of extended code.
Build component and elements with stacked and composed sort of view
```javascript
  const { use, render } = Elode;
  
  use('div', 'h1', 'p')

  render(
       div("#app",
         h1("Hello World!"),
         p("Learn <b Elode.js>")
       ),
      "footer Build in <b Elode.js>"
  )

 /* Result:
    <body>
      <div id="app">
          <h1>Hello World</h1>
          <p>Learn <b>Elode.js</b></p>
      </div>
      <footer>Build in <b>Elode.js</b></footer>
   </body>
 */
```

**Array.map(callback)**
The previous version v1.3 and below, Elode.js using old procedure called ".each(query, root)"
for listing HTMLElement with root and child as a component and element. But now we using
Array.map for it and this more efficient.
```javascript
   div(
      [1,2,3,4,5].map(x => h1("Hello "+x))
   )
  /*
     Result:
     <div>
         <h1>Hello 1</h1>
         <h1>Hello 2</h1>
         <h1>Hello 3</h1>
         <h1>Hello 4</h1>
         <h1>Hello 5</h1>
     </div>
 */

   ul(
     ["React", "Vue", "Elode"].map((x, i) => li((i+1)+"."+x))
   )
   /*
     Result:
     <ul>
         <li>1.React</li>
         <li>2.Vue</li>
         <li>3.Elode</li>
     </ul>
   */
```

**HTML Special Tag**
In some case of reactive features, Elode.js have fixed the XSS Attack by adding a new
feature called HTML Special Tag on reactive symbols at first. {html {yourReactiveData}}
```javascript
  div("#app",
      h1(".no-html {{htmlCode}}"),
      h1(".with-html {html {htmlCode}}")
  )

 /*
   Result:
      htmlCode = "Hello <b>How Are You?</b>"
     
     <h1 class="no-html">Hello &ltb&gtHow Are You?&lt/b&gt</h1>
     <h1 class="with-html">Hello <b>How Are You?</b></h1>
*/
```

**Hook - Directive/Shortcut**
Elode.js brings new rules called "Hook" it means that we need
a simplest way to do repeative functions or it's seems like "Directive/Shortcut"
```javascript
  // Attribute can change by reactive feature
  h1("[:attr myAttribute] Reactive Attribute Changes")
  
  // Animation
  h1("[:anim fade_out 3000] Hide in 3 seconds")
  // Short version
  h1("[@fade_out 3000] Hide in 3 seconds")

  // Data Modifier
  h1("[:def name='Alf'] Your name's {{name}}")

  // Data Binding
  h1("[:def bill:$user.payment] The current billing's {{bill} * 2}")

  // Model Control
  h1("Your biodata's {{bio}}")
  input("[:model bio | placeholder Type here... ]")

  // View Handler
  h1("[:seen true] You can see it")
  h1("[:seen false] Ups it's hidden")
  h1("[:seen maybe] If maybe's true then it's visible")

  // Event Listener
  button("[on:click x++] Count {{x}}")
  // Short version
  button("[@click x++] Count {{x}}")

  // For Control
  ul(
      li("[:for i in items] {{i.products}} = ${{i.cost}}")
  )

  // And much more... (see the documentation)
```

# End Of Line
Many thanks to the **Community Team** that want to parcitipate in our **Development**.
and also thanks to some **Developers** who using this **Experimental Project** for their Apps/Games

### ~ equneko (>w<)

# Elode.js v1.3
( Release: 17-12-2022 ) ( size: 28kb | min-size: 12kb )

## Elode Great Update!
- **New Feature!**
  - `Elode.app(root,node,prop)` is a new way for creating a component and it's seems like `Elode([root, node...], prop)`
  - `Elode.use(tags...)` for using namespace of **HTMLTag** example `Elode.use("h1", "p")` for using `h1("Hello World")`
  - `Elode.ref(vars...)` brings global variable to be reactive. which can be update everywhere with function for example `Elode.ref({name:"Alf"})` called by reactive `Elode("h1 {$name}").render()` modify with `nama("Equilfe");` 
  - `Elode.render(elements...)` represents body as root and arguments as nodes to global rendering case.
- **Update Change**
  - `el.for(query, root)` `el.new(prop)` `el.if(handler)` now have similiar keyword function as `el.each(query, root)` `el.clone(prop)` `el.seen(handler)` in order to fix **JavaScript** sensitive syntax case.
- Fixed BUG
  - Some reactive elements can't do perfect working with **Reference Variable** (Now, FIXED)
  - `el.root` always `null` when get parent at none **ElodeElement** (Now, FIXED)

## Elode Project Download
We have already start-up project for **Elode.js!** <br/> Now using this starter pack, just edit `src/app.js` to start building your **Application**.

# Elode.js v1.2
( Release: 29-11-2022 ) ( size: 25kb | min-size: 11kb )

## ~ Code Clean Up! ~ now smaller than older version!
- **Code Clean Up!**
  - Removed and changes unused code: **validate( )** internal function
  - All Elode.js method/function/action are renamed again without _ underscore symbol at first
  - Old: if you using v1.1 and below using **._show()** with underscore at first
  - Now: removed underscore symbol. now you can just using **.show()**
- **New Feature**
  - for(query, root) - duplicating element using query expression and define root (default: div)
  - if(handler) - show/hide an element with a boolean handler
- **Some BUG Fixed**
  - **ElodeQuery** not do perfect working as an element property
  - in this version _validate_ function for **ElementExpression** are deprecated cause a BUG
  - **on(event,handler)** element implementation to handler FIXED
- **Replaced Changes**
  - Now using (for x:$data) indirectly without **ElodeQuery** at your javascript element.for(query,root) function
  - Now using (if handler) indirectly without **ElodeQuery** at your javascript element.if(handler) function
- **Deprecated Change**
  - (to h1,h2,h3,h4) duplicating with different tag element for now are disabled

# Elode.js v1.1
( Release: 20-11-2022 ) ( size: 28kb | min-size: 13kb )

- New Feature
  - **element._new()** is a function to clone your element, it's seems like **element.cloneNode(true)**
  - **element._on(event, handler)** is a function to add an event listener to your element and it's seems like **addEventListener**
- Update Fixed Initial Version
- Fatal BUG Fixed
  - **ElodeQuery** unique syntax can't read less-than/great-than <> syntax on **Reactivity** {} (FIXED)
  - **Reactivity** case can't do perfect working on **Model View Controller** and **HTML-Interpreter** case (FIXED)
  - **Element** deprecated _elode_feature in order to accepting all **Elode Functions** to childNode (FIXED)
- Minimal BUG Fixed
  - Disabled _elode_property accepting to all childNodes. it makes confusing and **Garbage Collection** for useless variable (FIXED)
  - **EventListener** do all functions append. Even that a non **EventHandler** functions (FIXED)
  - **onCreate() & onRender()** lifecycle hook not comes from calling at **Model View Controller** and **HTML-Interpreter** case (FIXED)
- Replaced Changes
  - **onRemove()** lifecycle hook now replaced by **onDestroy()**
  - **_remove** property at **ElodeElement** replaced by **_destroy**
- **Performance Update** garbage collection clean up, code clean up.

# New! Elode.js Lite (Lightweight-Edition) ( size: 6kb )
- Minimalist feature, just do **Model View Controller** with **Reactivity** case!
- Elode Functions can be default useable. like normal version.

# Elode.js v1.0
( Release: 01-11-2022 ) ( size: 27kb  |  min-size: 11kb )

- Re-Development (Remake)
- Official Release (Ends of Beta Version)
- Based on ES5 (EcmaScript 2009) for Old WebBrowser Support
- Some Big Changes Update
    - Rewrite code from initial
    - Symbol Between Algorithm v1.2
    - Fixed all old BUG on previous versions
    - New rules of ElodeSyntax,ElodeQuery and ElodeProperty
- Deprecated Changes
    - {db.data} replaced by {{data}} in order to element property itself
    - (x : db.list) replaced by (for x:$list) to duplicate element
    - (!h1,h2,h3,h4) replaced by h1(to h2,h3,h4) for multitag element
    - el._click(function) and all eventHandler functions are deprecated
    - database moved to element property (HTMLElement.prototype)
    - shorthand $ as an el._render() on ElodeQuery are deprecated
    - Now use el._render() as el.render() and el._react() as el.react()
- New Feature
    - Property
        - ( BIG CHANGES ON SOME OLD PROPERTY )
        - el._elode_feature - Elode main feature
        - el._elode_query - Elode main query
        - el._elode_property - Elode main property
        - el._elode_react - Elode reactive query
        - el._get(x) - get children on element
        - el._cell(x) - get parent on element
    - Function
        - el.prop({propertyOfElement}) - for changes the property of HTMLElement (DOM)
    - Callback
        - onCreate:function() when element was created
        - onRender:function() when element was rendering (loop) with el._interval
        - onReact:function() when element was reacting changes
        - onRemove:function() when element has been removed
- New Rules
    - Database are implemented on HTMLElement.prototype (Element's property)
        - [Old Rules] Elode("h1 Hello {db.x}",{db:{x:"World"}}).render();
        - [New Rules] Elode("h1 Hello {{x}}",{x:"World"}).render();


# Elode.js v0.10 
( Release: 01-10-2022 ) ( size: 16kb  |  min-size: 8kb )

- Update Monthly
- New Feature
- ElodeModule v1.1 (As,Component,Using,App,Render,Scope)
    - App (update) - Now you can using just string syntax without Elode itself
    - Component (new) - A templates for element: header,text,button etc.
    - Using (new) - Templating function for creating element
- Fix BUG
    - ElodeSyntax - Component,Attribute,Syntax, now are fixed
    - ElodeQuery - Update fixed, now can cloning element
    - Database - Now changed to db, no el implementation
- Regular Expression's Dead (Because it's reason of Component BUG)
- Using Symbol Between Algorithm v1.1, Replacing Regular Expression
- For now, we can't find BUG in this version :v


# Elode.js v0.09 
( Release: 25-09-2022 ) ( size: 14kb  |  min-size: 7kb )

- Initial Release
- Basic Feature Release
- ElodeSyntax v1 (Element,Component,Attribute,Expression,Reactive)
- ElodeQuery v1 (Property,Event,Render,React,Update,Scope)
- ElodeModule v1 (As,App,Render,Scope)
- Using Regular Expression
- There are some BUG
    - Component - Can't make an element inside some element itself
    - Attribute - Parent always no attributes
    - Update - Some updated element not cloning itself to new element
    - Database - el.db too hard to implement on reactive case
