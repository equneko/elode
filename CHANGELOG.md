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
