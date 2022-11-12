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
