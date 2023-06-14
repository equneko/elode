/* 
====================================================================

    Elode.js (Source) - v2.0 (Release: 07-06-2023) 
    ~ A unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -

====================================================================
*/
(function _ElodeMain_(){ 'use strict';
/* 
    ELODE MODULE - Elode.js Module: Unique Way Web Development
    it's main core of all elode functions that brings all together 
    to make HTMLElement creation with standard DOM Procedural technique

    @param
    - query: string that used to make HTMLElement with Unique Syntax HTML QUERY (HQ)
    - property: object that used to describe HTMLElement with property or event listener

    @return HTMLElement/ElodeElement (DOM)
*/

// Validation: check if there's Elode procedure but null

    // @Elode: _ElodeModule_ main function
    window.Elode = function _ElodeModule_(query, property) {
        // Check: required @param query and property not null
        if (query == null && property == null) return; 
        
        // Define first @var el as represent of HTMLElement that want to create
        var el = null;
        
        /* 
            HTML INTERPRETER (Machine Learning :v)
            it's an Elode.js feature to run HTML QUERY (HQ) at HTML code
            split with line by line of innerHTML/outerHTML/HTMLValue

            Example: 
                <div id="hello">h1.test hei im unique syntax </div>
                <div id="world">p.blue get started! </div>

                or with elode attribute directive

                <div id="withvalue" elode="h1.test Hello World"></div>
        */
        // Validation: if the first query[0] was "!" char, that means it's HTML INTERPRETER case
        if (typeof query == 'string' && query[0] == '!') { // Example: Elode("!#hello");

            // Define: @var el, as target of HTMLElement that want to interpreter
            el = document.querySelector(query.substring(1));

            var eattr = el.getAttribute('elode'), 
                vdom = { 
                    el: []
                }, 
                c = el.innerHTML.trim(), 
                i;

                c = c.split("\n");

            if (eattr != null) { //Skip Interpreter
                el.removeAttribute('elode');
                try { 
                    vdom = _component_(eattr.trim(), property); } catch (err) {
                    vdom = _error_("{HTML INTERPRETER} " + err +
                    " Maybe you forgot to insert a space identification between TAG and VALUE of ELEMENT " + eattr);
                }
                el.innerHTML = vdom.outerHTML;
                elode_prop(property, el); elode_react(el); _react_(el);
                return _property_(el);
            }

            //Start Interpreter
            vdom.v = _element_('div', property);
            el.innerHTML = "";
            for (i = 0; i < c.length; i++) {
                vdom.ab = c_char(c[i], ' ');
                vdom.a = vdom.ab.str;
                vdom.b = vdom.ab.len;
                if (vdom.a.length <= 0 || vdom.a == '\t') continue;
                vdom.el.push([_element_(vdom.a, property), vdom.b]);
            }

            //Record Interpreter
            var rec = false, change = false, root = [], index = 0;
            for (i = 0; i < vdom.el.length; i++) {
                var a = vdom.el[i][0],
                    b = vdom.el[i][1], n;
                if (i == 0) root.push([a, b]);
                if (i > 0) { //Start Record
                    n = vdom.el[i - 1];
                    if (b > n[1]) {
                        rec = true; //Recording
                        if (i > 1) { index += 1; root.push([n[0], n[1]]); }
                    }
                    if (b < n[1]) { //Pause Record
                        if (b == root[index][1]) {
                            root[index] = [a, b];
                            change = true;
                        } else {
                            index -= 1;
                            change = false;
                        }
                        if (b == root[0][1]) { // CHANGE - ALGORITHM RULES
                            index = 0;
                        }
                        if (index == 0) rec = false;
                        if (i > 1) index -= 1;
                    }
                    if (b == n[1]) {
                        root[index + 1] = [a, b];
                    }
                }
                if (rec) { //Recorded
                    root[index][0].appendChild(a);
                } else {
                    if (i > 0 && b == root[0][1]) {
                        root = []; index = 0; root[0] = [a, b]; //Stop Record
                    }
                    el.appendChild(root[index][0]); //Append to Recording
                }
            }

            elode_prop(property, el); 
            elode_react(el); 
            _react_(el); 
            _property_(el);

            if (el.onCreate != null) { 
                try { 
                    el.onCreate(); 
                } catch (err) { } 
            }

            _rendering_(el);

            return el;
        }
        
        // Elode - HTMLElement Selector (single)... Example: Elode("_html").css("background-color:black")
        if (typeof query == 'string' && query[0] == '_') { 
            el = document.querySelector(query.substring(1));
            if (property != null) {
                elode_prop(property, el);
            } 
            elode_react(el); 
            _react_(el); 
            _property_(el);
            
            if (el.onCreate != null) { 
                try { 
                    el.onCreate(); 
                } catch (err) { } 
            }

            _rendering_(el);
            return el;
        }

        // Elode - HTMLElement... Example: Elode(document.createElement("h1")).render();
        if (typeof query != 'string' && query.constructor.toString().includes("Element")) { 
            el = query; 
            elode_prop(property, el); 
            elode_react(el); 
            _react_(el);

            return _property_(el);
        }

        // Elode - Root Node HTMLElement... Example: Elode(["div", "h1 Hello World", "p Elode.js"]).render();
        if (query.constructor == Array) {
            var i, 
                E = query.slice(1);

            for (i = 0; i < E.length; i++) {
                if (E[i].constructor == Array) {
                    E[i] = window.Elode(E[i]);
                }
            }

            el = _app_(query[0], E, property);

            return el;
        }

        // Elode - HTMLElement <style></style>... Example: Elode("style h1{ font-size:17pt }")
        el = query.split(' ');
        if (el[0].trim() == "style") {
            el = _element_(query, property);

            return el;
        }

        // Elode - HTMLElement/ElodeElement (Standard) (Default) Example: Elode("h1 Hello World").render();
        if (property != null) 
            el = _component_(query, property);
        else 
            el = _component_(query); // without property
        
        return el; // Return: HTMLElement (DOM)
    };

    /* Elode Application - Build component based */
    window.Elode.app = function (root, node, prop) { 
        return _app_(root, node, prop); 
    };

    /* Elode Use - Using namespace HTMLTag */
    window.Elode.use = function (tags) {
        var i, html = "";
        if (arguments.length > 1) {
            tags = arguments;
            for (i = 0; i < tags.length; i++) {
                window.Elode.use(tags[i]);
            }
            return;
        }
        if (typeof tags != 'string') {
            for (i in tags) {
                setUse(i, tags[i]);
            }
            return;
        } else {
            html = tags;
        } setUse(tags, html);
        function setUse(x, y) {
            /* OLD v1.3 window.eval("function " + x + "(html,prop){" +
                "return Elode('" + y + " '+html,prop);}"); */

            /* NEW v2.0 */
            window.eval("function " + x + "(){" +
                "var el = window.Elode('"+y+"'), i, args = arguments, "+
                "prop = args[args.length-1].constructor == Object ? args[args.length-1]:null;"+
                "if(prop!=null) el = window.Elode('"+y+"', prop);"+
                "for(i = 0; i < args.length; i++){"+
                    "if(args[i].constructor==String){ "+
                        "if(i==0) el = window.Elode('"+y+" '+args[i], prop);"+
                        "else window.Elode(args[i]).render(el);"+
                    "}"+
                    "else if(args[i].constructor==Array){ window.Elode(['div'].concat(args[i])).render('el'); }"+
                    "else { if(args[i].constructor.toString().includes('Element')) el.add(args[i]); }"+
                "}"+
                "return el.react();"
            +"}");
        }
    };

    /* Elode Ref - Reference for reactive global variable  */
    window.Elode.ref = function (vars) {
        var i, v, F;
        for (i in vars) {
            v = vars[i];
            window["$" + i] = v;
            F = " function _name_(value){" +
                "var x, e = _i; " +
                "if(typeof e == 'object'){ " +
                "for(x in value){_i[x] = value[x];} " +
                "}else{_i = value;} " +
                "var I, E = document.querySelectorAll('[ref]'); " +
                "for(I = 0; I < E.length; I++){E[I].react();} " +
                "};";
            window.eval(F.split('_name_').
                join(i).split('_i').join("$" + i));
        }
    };

    /* Elode Render - Rendering arguments of elode element */
    window.Elode.render = function (nodes) {
        if (arguments.length > 1) {
            nodes = arguments; var i;
            for (i = 0; i < nodes.length; i++) {
                window.Elode.render(nodes[i]);
            }
            return;
        }
        if (typeof nodes == 'string') {
            Elode(nodes).render();
        } else {
            nodes.render();
        }
    };

    /* Elode Common - Extra properties for describe Elode.js */
    window.Elode.VERSION = '2.0';
    window.Elode.CODE = 2007062023;

/* 
    ELODE APPLICATION - Elode.js Application
    it most used for simplyfy the Elode() procedure to make
    Component or Element in Nodes with Container

    @param
    - query: ElodeQuery unique syntax HTMLQuery
    - nodes: array of HTMLChildren
    - property: ElodeProperty to describe Container

    @return HTMLElement/ElodeApplication (DOM)
*/
function _app_(query, nodes, property) {

    // @var e, represent HTMLElement/ElodeElement defined with @param query and property (default)
    var e = window.Elode(query, property), 
        v, // @var v, value instance of HTMLChildren
        k = query + ' ', // @var k, key instance of HTMLQuery
        t, // @var t, template for childrens
        i; // @var i, number for loop

    // Check: if @param nodes not null (required)
    if (nodes != null) {

        // Execution: to do list all of each HTMLElement on Nodes
        for (i = 0; i < nodes.length; i++) {
            // Case: node's string, then define it with ElodeElement procedure
            if (nodes[i].constructor == String) {
                t = window.Elode(nodes[i], {});
            // Case: node's HTMLElement, then define it
            } else {
                t = nodes[i];
            }

            // Element set up with render, define root, property and react()
            t.render(e); 
            t.root = e;
            _property_(t); 
            t.react();

            // Adding some Query to key of query value (child was added and query updated)
            k += '<' + t.elodeQuery + '>';
        }
    }

    // Check: that child component not null or empty (sensitive empty error)
    try {
        // @v as Elode with updated query
        v = window.Elode(k, property);
        e.elodeQuery = k; // update query
        e.elodeBase = v.elodeBase; // update react
        v = null; // reset to null
    } catch (err) {
        // Error: if the @param nodes null then element creation failed
        return _error_("ElementError: Can't creating element for NULL Nodes | " + err);
    }

    // Check for react update
    e.react(); 

    return e; // Return: HTMLElement/ElodeApplication (DOM)
};

/* 
    ELODE ELEMENT - procedure to create HTML Element (DOM)
    elode.js originally made it with HQ (HTML Query)

    HQ (HTML Query) is basically a unique syntax like CSS Selector
    but extended with JQuery Selector and modified as Elode Unique Syntax

    @params
    - query (string): HTML-like templating, based on React.js JSX but it's Query Selector
    - property (object): Prototypes of HTMLElement that describe the Object of Element

    @return HTMLELement (DOM)
*/

function _element_(query, property) {
    // Check: if @param query and property not null, if null return null
    if (query == null && property == null) return null;
    // Check: if @param query length, if small than zero, return undef
    if (query.trim().length <= 0) return 'undefined';

    var // Define: required variables
        q = query.split(' '), // @var q (array), instance splitter of query by space characters
        qy = { query: '', property: '', react:null }, // @var qy, query properties or an option for query
        // @var e, an instance of HTMLElement prototypes (DOM)
        e = {
            tag: '', // tag, HTMLElement Tag
            attr: {}, // attr, HTMLElement Attribute
            prop: {}, // prop, HTMLElement Property
            val: ''  // value, innerHTML/outerHTML, textContent
        },
        el; // @var el, objectives element represents result or return of DOM to became HTML Element

    // Check: if @param property's not null then define e option prop as an instance of property itself
    if (property != null) e.prop = property;

    /* Define: e option prop as instance of @param property, that includes 2 important prototype
      that was elodeQuery and elodeProperty, both are original source of @param query and property*/
    e.prop.elodeQuery = query;
    e.prop.elodeProperty = property;

    /* Check: if the first query (q[0]) as key of query, is defined or equals "style" <style>
       Note: for your information, why first check of query's style element? why not to be check later?
             depending on the standard rule of HTML, element of <style> is placed at the top of <body>
             that's <head> section on the HTMLDocument. yeah, it's cause to be the first check*/
    if (q[0].trim() == "style") {
        // Case: HTMLStyleElement that means this execution for <style></style> elements at <head></head>

        el = document.createElement(q[0]); // @var el, as instance of element defined as <style> element

        // Execution: @var el property innerHTML defined as query value (it's basically native CSS)
        el.innerHTML = query.trim().replace(q[0], '');

        // @_property_ is function for includes elode prototype
        return _property_(el); // Return: HTMLStyleElement (DOM) #END
    }

    /* 
        #Element Expression - @Javascript {}
        it's basically a query expression that bring HQ (HTML QUERY) as a unique syntax
        more usefull and great to use. Example {var a = 1} {yourName} {1+1} {!true}
    */

    // Define: @var qy.react splitter of reactive expression using Symbol Between Algortihm
    qy.react = SymbolBetweenAlgorithm(query, '{,}');

    // Check: if @var qy.react results from defined splitter expression's not null
    if (qy.react != null) qy.reactives = [];

    /* Execution: define execution for @param query, that includes @var qy.react 
       it's means in this section, query expression search using @query_search function
       to find and modify the target of each listed splitter query expression of javascript {} 
       
       @param
       - query (string) : source of query to modify
       - qy.react (array) : listed splitter of javascript expressions
       
       @callback
       - $ : manager or option technique for elode expression
    */
    query = query_search(query, qy.react, function ($) {
        // Define: @var rep, replicate or replacements for elode_reactive case
        var rep = "!elode_react" + $.i; // @param $.i as index of expressions it would be like this !elode_react0

        // Execution: @var qy.reactives that have defined at top, do recording for each elode data expression
        qy.reactives.push({ k: rep, v: $.z }); // @param k (key) is @var rep and @param v (value) is @param $.z

        // Finishing: @param $.r as replacement manager, do external record to send it into internal
        $.r.push(rep); // @var rep was placed to be replace of each javascript expressions
    },
        {
            all: true, // option all, it means that all of each javascript expression's replaced
            next: true  // option next, do next search not once query search
        });

    
    /* 
        #Element Expression - @Attribute []
        it's basically a query expression that bring HQ (HTML QUERY) as a unique syntax
        more usefull and great to use. Example [style color:black] [placeholder your name]
    */

    // Define: @var qy.attr splitter of reactive expression using Symbol Between Algortihm
    qy.attr = SymbolBetweenAlgorithm(query, '[,]');

    // Check: if @var qy.attr results from defined splitter expression's not null
    if (qy.attr != null && qy.attr.constructor != Array) return qy.attr;

    /* Execution: define execution for @param query, that includes @var qy.attr 
       it's means in this section, query expression search using @query_search function
       to find and modify the target of each listed splitter query expression of attribute []
       
       @param
       - query (string) : source of query to modify
       - qy.attr (array) : listed splitter of attribute expressions
       
       @callback
       - $ : manager or option technique for elode expression
    */
    query = query_search(query, qy.attr, function ($) {
        // Check: if @param $.k and $.v (key) and (value) not blank
        if (($.k + $.v).trim().length <= 0) {
            e.attr = null; // Case: if blank, then define it into blank 
        } else {
            // Case: if not, then record attribute expression into @var e.attr
            e.attr[$.k] = $.v; // by @param $v.k (key) and $.v (value) of attribute expression
        }
    },
        {
            split: '|', // option split, expression listed by splitter of char "|" example [style color|placeholder name]
            all: false  // option all, it set to false that means, not all expression replaced, but just once
        });

    /* 
        #Element Reactivity - javascript expression {}
        this continue the previous execution of reactive case
    */

    // Define: @var qy.react instance of Reacts tag, defined into @var qy.reactives
    qy.react = qy.reactives != null ? qy.reactives : null;

    // Check: if @var qy.react not null then do execution
    if (qy.react != null) {

        // Execution: for loop, in order to list @var qy.react (array)
        for (i = 0; i < qy.react.length; i++) {
            // Define: @param query set into itself but replace (modify) a replacement of @var qy.react
            query = query.replace(qy.react[i].k, qy.react[i].v); // Based on @var qy.reactives
        }
    }

    // Define: case reactivity modification, that re-define or modify the @var q and qy
    q = query.split(' '); // @var q, set into origin @param query.split by spacebar (for special attribute)
    qy.query = q[0].trim(); // @var qy.query, set into @var q[0] as query
    qy.property = query.replace(q[0], ''); // @var qy.property, set into @param query.replace by @var q[0] as property

    // Case: Element ID, Example: h1#title or p#subtitle
    if (qy.query.includes('#')) { // Check: if @var qy.query has ID symbol "#"
        // Define: @var x, IDValue, example: #title x=title or #subtitle x=subtitle
        var x = qy.query.split('#')[1];
        // Check: if @var x has symbol CLASS "."
        if (x.includes('.')) {
            x = x.split('.')[0];  // Execution: split the @var x, by CLASS symbol "."
        }
        // Define: @var qy.query, replace itself by ID symbol "#"+IDValue (x) as remove for next
        qy.query = qy.query.replace('#' + x, ''); // Example #title remove to blank

        // Define: @var e.attr[key] id as @var x (IDValue)
        e.attr['id'] = x;
    }

    // Case: Element CLASS, Example: h1.blue or p.italic
    if (qy.query.includes('.')) { // Check: if @var qy.query has CLASS symbol "."

        var x = qy.query.split('.'), // @var x, CLASSValue like IDValue but array
            y = x.toString(); // @var y, transform @var x (array) into (string)

        // Define: @var qy.query set to @var x[0] (HTMLTag)
        qy.query = x[0];

        // Define: @var x as y.replaced by itself x[0] then replace again "comma" by "blank"
        x = y.replace(x[0] + ',', '').replace(/,/g, ' ');

        // @set_obj: set @var e.attr prototype class by value of @var x
        set_obj(e.attr, 'class', x);
    }

    /* 
        #Element Creation - HTMLElement (DOM)
        at this line, elode made element of HTML by @var qy.property
    */

    // Define: @var e.tag (HTMLTag) set into @var qy.query
    e.tag = qy.query.trim();

    // Define: @var e.val (HTMLValue) set into @var qy.property
    e.val = qy.property.substring(1);

    // Check: if @var e.tag (HTMLTag) length blank
    if (e.tag.length <= 0)
        e.tag = 'div'; // Case: Tag defined as none/blank, default set's <div></div>

    // Execution: sensitive section, using try catch to find unknown error
    try {
        // Define: @var el, HTMLElement created with @document.createElement(@var e.tag)
        el = document.createElement(e.tag);
    } catch (err) {
        return _error_(err); // Error: HTMLElement creation error, log into ElodeError
    }

    // Execution: sensitive BUG section, using try catch to find unknown error
    try {
        // Define: @var el.innerHTML set into @var e.val (HTMLValue)
        el.innerHTML = e.val;

    } catch (err) {  // Note: in this section, there's no need to log error

        // Fixed: BUG v1.0 for IE < 9 (Element that can't support innerHTML)
        el.textContent = e.val;
    }

    // Attribute: check if there's attributes of HTMLElement (DOM)
    var k = e.attr != null ? Object.keys(e.attr) : null, // Define @var k as instance key of @var e.attr
        i; // @var i, for loop purpose (it most used all of code below)

    // Check: if @var k not null (if null, just nothing :v)
    if (k != null) {
        // Execution: for loop, @var k keys
        for (i = 0; i < k.length; i++) {
            // Execution: set @var el.setAttribute by @var k[i] (key) and @var e.attr[k[i]] (value)
            el.setAttribute(k[i], e.attr[k[i]]);
        }
    }

    // Append: HTMLElement creation
    elode_prop(e.prop, el); // using @elode_prop to includes all of @var e.prop into @var el (HTMLElement)

    // Re-define: in order to do appending, using _property_ to includes all of ElodePrototypes
    el = _property_(el);

    // Reactivity: check if there's reactivity on HTMLElement (DOM)
    if (qy.react != null) elode_react(el);

    var // @var props, instance of @var e.prop at code above
        props = e.prop != null ? e.prop : null,
        x = null; // @var x for instance of @var props

    // Property: check if HTMLElement has property from user
    if (props != null) {
        // Define @var k as @var props's keys
        k = Object.keys(props);

        // Check: if keys not null
        if (k != null) {

            // Execution: in this section, it almost do Reactivity EventListener
            for (i = 0; i < k.length; i++) {

                // Define: @var x as @var props entities that need to know all of property from user
                x = props[k[i]]; // Check: if null, then break and skip this Execution
                if (x == null) break; // it's means that there's nothing properties from user

                // Check: if there's EventListener function (Example: onclick, onCreate, onRender)
                if (x.constructor == Function && k[i].substring(0, 2) == "on") {

                    // Execution: sensitive BUG section, using try catch to find unknown error
                    try {
                        // For IE > 9 only (Execution) addEventListener
                        el.addEventListener(k[i].substring(2),
                            function () {
                                // Elode Reactive Procedure
                                this.react();

                                // Elode Reactive Callback, check if there's onReact(callback)
                                if (this.onReact != null && this.
                                    onReact.constructor == Function) { this.onReact(); } // using onReact(){ ... } to ElodeLifecycle
                            }
                        );

                    } catch (err) { // Fixed: BUG v0.10 (Execution) attachEvent for IE < 9
                        el.attachEvent(k[i],
                            function () {
                                /* BTW, same as code above :v 
                                    but the different's just attachEvent */
                                this.react();

                                if (this.onReact != null && this.
                                    onReact.constructor == Function) { this.onReact(); }
                            }
                        );
                    }

                }
            }

        }
    }

    return el; //Return: @var el, instance of HTMLElement (DOM)
}

/* 
    ELODE COMPONENT - procedure to create Elode Component of HTML Element (DOM)
    elode.js originally made it with HQ (HTML Query) to be container of elements

    HQ (HTML Query) is basically unique syntax like CSS Selector
    but extended with JQuery Selector and modified as Elode Unique Syntax

    @params
    - query (string): HTML-like templating, based on React.js JSX but it's Query Selector
    - property (object): Prototypes of HTMLElement that describe the Object of Element

    @return HTMLELement (DOM)
*/

function _component_(query, property) {
    // Check: if @param not null, if null return null
    if (query == null && property == null) return null;
    // Check: if @param query not blank, if blank return undev
    if (query.trim().length <= 0) return 'undefined';

    // Fixed: BUG v1.0 EACH ELODE QUERY CHANGES to !elode_react0...
    var A = query; // <-- Saving First Query

    // Element Reactive: {javascript} FIXED BUG REACTIVE SYNTAX CASE
    var react = SymbolBetweenAlgorithm(query, '{,}'), // @var react, listed reactive symbol
        rep, // @var rep, replacement for reactive symbol
        qy; // @var qy, instance of query
    
    // Check: if @var react, not null then query define as array [blank]
    if (react != null) qy = [];

    // Execution: modify @param query with @query_search function, that manage reactive symbols
    query = query_search(query, react, function ($) { // @param $ as manager of reactive queries
        // Define: replacement symbol of reactive case @param $.i as index (Example: !elode_react0)
        rep = "!elode_react" + $.i;

        // Execution: record data of key and value between reactive symbol into @var qy
        qy.push({ k: rep, v: $.z });

        // Finishing: push recorded data into @param $.r as replacement of @query_search (internal)
        $.r.push(rep);

    }, 
    { 
        all: true, // option all, it means that all of each javascript expression's replaced
        next: true  // option next, it means that all of each javascript expression's next
    });

    // Define: @var el as element, represent HTMLElement (DOM)
    var el, 
    // Define: @var c by @SymbolBetweenAlgorithm function that list <component>
    c = SymbolBetweenAlgorithm(query, "<,>", // < > component symbol
        function ($) { 
            // Check: if there's an unknown error, then define element as error
            el = _error_($); 
        }
    ), 
    i, // @var i (number), for loop purpose
    r = {}; // @var r (object), for data recorder
    
    // Check: if @var c becomes null but element's there, then return element. (No Component Detected)
    if (c == null && el != null) return el;
    // Now if both null then return with (No Component) but reacted again using _rereact_ function
    else if (c == null && el == null) {

        // Re-react @param query as well as a plan out to be worked
        query = _rereact_(query);

        // Return: self element (No Component) HTMLElement (DOM)
        return _element_(query, property);
    };

    // Re-Reactivity: check again if there are reactive javascript {} @param X as target
    function _rereact_(X) { // (Only Component)

        var j; // @var j (number), for loop purpose

        // Define: @var react, define again with @var qy, represents of @param query
        react = qy != null ? qy : null;

        // Check: if react not null then replace
        if (react != null) {

            // Execution: replace with for loop, each of all reactive check
            for (j = 0; j < react.length; j++) {
                // Define: replaced @param X by itself with modified key and value with @var react
                X = X.replace(react[j].k, react[j].v);
            }
        } return X; // Return: @param X itself (target) (HTMLElement) (DOM)
    }


    r.hash = "!elode_"; // Define: @var r.hash as replacement symbol of reactive case
    r.child = {}; // Define: @var r.child as blank object, for children record (HTMLElement)

    // Execution: for loop of listed @var c as reactive symbols array
    for (i = 0; i < c.length; i++) {
        // Execution: define and modify with @_rereact_ funcion in order to append reactivity on each element
        r.child[r.hash + i] = _rereact_(c[i])
            .substring(1, _rereact_(c[i]).length - 1); // substring hash with re_react symbol

        // Execution: modify @param query that was replaced with @var c[i] (!elode_react) and r.hash (original react)
        query = query.replace(c[i], r.hash + i);
    }

    // Define: HTMLElement with @_element_ function
    el = _element_(_rereact_(query), property);

    // Check: if @var el.id (HTMLElementID) was elode_error then return itself
    if (el.id == "elode_error") return el;

    // Define: @var el.elodeQuery equals original saved first query @var A at top of code.
    el.elodeQuery = A;
    
    // Check: if @var el.elodeProperty not null
    if (el.elodeProperty != null) { 
        // Define: recursive elodeProperty of elodeQuery equals origin @var A
        el.elodeProperty.elodeQuery = A; 
    }
    
    // Execution: brings all of each elode component to be <span> element
    for (i = 0; i < c.length; i++) {
        // Define: @var r.vdom (represents of HTMLSpanElement) with @var i as index (position)
        r.vdom = "<span id='elode_" + i + "'></span>";

        // Define: @var el.innerHTML as itself but replaced with @var r.hash (symbol) and r.vdom (value)
        el.innerHTML = el.innerHTML.replace(r.hash + i, r.vdom);
        
        // Define: @var r.obj as component recursive that brings origin elements by r.child
        r.obj = _component_(r.child[r.hash + i]);

        // Execution: @va el.replaceChild of @var r.obj and @var el.querySelector (represents of span element) to be replaced
        el.replaceChild(r.obj, el.querySelector("#elode_" + i));
    }

    // Reactivitiy: define again react access to @var el
    elode_react(el);

    return el; // Return: @var el, ElodeComponent, HTMLElements (DOM)
}

/* 
    ELODE PROPERTY - include ElodeProperty to HTMLElement
    there's standard DOM action and event listener (modified)

    @param
    - element: target HTMLElement to includes ElodeProperty

    @return HTMLElement
*/
function _property_(element) {
    var i; // @var i, for loop purpose
    
    // Elode - Namespaces | Short
    element.root = element.parentElement;
    element.node = element.children;
    element.add = element.appendChild;
    element.set = element.replaceChild;

    // Elode - Attribute, HTMLElement attribute
    element.attr = function (A, B) {
        if (A == null && B == null) 
            return element.attributes;
        if (B == null) 
            return element.getAttribute(A);

        element.setAttribute(A, B);

        if (element.parentNode != null) 
            return element.parentNode;

        return element;
    };

    // Elode - EventListener, represent of addEventListener but with reactivity
    element.on = function (A, B) {
        eval("element.on" + A + " = B;");

        element.addEventListener(A, function () {
            this.react(); 
            if (this.root != null) 
                this.root.react();
        });

        return element;
    };

    // Elode - Class, HTMLElement DOM classes
    element.class = function ($) { 
        if ($ == null) { 
            return element.classList;
        } 

        return element.attr("class", $); 
    };
    
    // Elode - Cascading Style Sheet, DOM style of HTMLElement
    element.css = function ($) {
        if ($ == null) { 
            return element.style; 
        } 

        return element.attr("style", $); 
    };

    // Elode - innerHTML/outerHTML, set or get the HTMLValue
    element.html = function ($) {
        if ($ == null) 
            return element.outerHTML;
        else 
            element.innerHTML = $; 

        return element;
    };

    // Elode - innerText, set or get HTMLText
    element.txt = function ($) {
        if ($ == null) 
            return element.innerText;
        else 
            element.innerText = $; 

        return element;
    };

    // Elode - Value, set or get HTMLElement value
    element.val = function ($) {
        if ($ == null) 
            return element.value;
        else 
            element.value = $; 

        return element;
    };

    // Elode - Show, display default HTMLElement
    element.show = function () { 
        element.css().display = ''; 

        return element; 
    };

    // Elode - Hide, display none HTMLElement
    element.hide = function () { 
        element.css().display = 'none'; 

        return element; 
    };

    // Elode - Toggle, toggle handler of HTMLElement attributes
    element.toggle = function (A, B) {
        var attr = element.attr(A), 
            i;

        if (attr == null)
            element.attr(A, ""); attr = element.attr(A)

        if (B.constructor == Array) {
            for (i = 0; i < B.length; i++) {
                element.toggle(A, B[i]);
            }
        } else {
            if (attr == null) 
                element.attr(A, ""); attr = element.attr(A)

            if (attr.includes(B)) {
                attr = attr.replace(B, "");
                element.attr(A, attr.trim());
            } else {
                element.attr(A, (attr + " " + B).trim());
            }

        }

        return element;
    };

    // Elode - Get, get HTMLElement (child)
    element.get = function ($) {
        if (typeof $ == 'number') {
            return _property_(element.node[$]);
        } else {
            return _property_(element.querySelector($));
        }
    };
    
    // Elode - Cell, get HTMLElement (root)
    element.cell = function ($) {
        var parent = element.parentElement, 
        cells = [];

        while (parent != null && parent.elodeProperty != null) {
            cells.push(parent);
            parent = parent.parentElement;
        }

        if ($ == null) return cells;

        return cells[(cells.length - 1) - $];
    };

    // Elode - Destroy, destroy HTMLElement (self or child)
    element.destroy = function ($) {
        // Remove Callback: for ElodeLifecycle case
        if (element.onDestroy != null && element.onDestroy.constructor == Function) 
            element.onDestroy();

        if ($ == null) 
            return element.parentElement.removeChild(element);

        if (typeof $ == 'number') {
            return element.removeChild(element.node[$]);
        }

        if ($.constructor == Array) {
            for (i = 0; i < $.length; i++) {
                element.removeChild($[i]);
            }
            return;
        }

        return element.removeChild($);
    };

    // Elode - Clone, duplicate HTMLElement with same ElodeQuery and ElodeProperty
    element.clone = function ($) {
        var x;

        if (element.elodeQuery != null && element.elodeProperty != null)
            x = window.Elode(element.elodeQuery, element.elodeProperty);
        else 
            x = _property_(element.cloneNode(true));

        if ($ != null) elode_prop($, x);

        return x;
    },
    
    // Elode - Seen, set or get HTMLElement hide/show
    element.seen = function ($) {
        if($ == null){
            var x = true;
            if ($.style.display == 'none') {
                x = false;
            }
            return x;
        }
        if (typeof $ == 'string') {
             if (element[$]) 
                element.show();
             else 
                element.hide();
         } else {
             if ($) 
                element.show();
             else 
                element.hide();
         }
         return element;
     };

    //Elode - Each, it seems like clone, but extended
    element.each = function ($, E) {
        var el = element.clone(), e = E != null ? E : "div";
        element = window.Elode(e, {}); el.render(element);
        function _for(a, b, c) {
            var e, i; delete el[c];
            for (i = 0; i < b.length - 1; i++) {
                e = el.clone();
                e[a] = b[(i + 1)];
                e.index = (i + 1);
                e.react(); e.render(element); delete e[c];
            }
        }
        $ = $.split(":");
        var x = el[$[1].trim()], y = $[0].trim(), i;
        el[y] = x[0]; el.index = 0; element[$[1].trim()] = el[$[1].trim()];
        el.react(); _for(y, x, $[1].trim());

        return element;
    };

    // Elode - Prop, set property of ElodeElement (DOM)
    element.prop = function (A) { 
        if (A != null) { 
            elode_prop(A, element, true); 
            element.react(); 
        } 
        
        return element; 
    };

    // Elode - React, procedure to react HTMLElement
    element.react = function () { 
        _react_(element); var i;
        if(element.children!=null){
            for(i = 0; i< element.children.length; i++){
                element.children[i].react();
                element.children[i].root = element;
            }
        }
        return element; 
    };

    // Elode - Render, procedure to render HTMLElement
    element.render = function (A) {
        _render_(element, A, false);
        // Check Reactive            
        element.react();
        // Create Callback
        if (element.onCreate != null) { 
            try { 
                element.onCreate(); 
            } catch (err) { } 
        }
        // Render Callback
        _rendering_(element);

        return element;
    };

    // Fixed: BUG v1.1 NOT ALL ADAPTED ELODE FUNCTIONS
    var C = element.childNodes;
    if (C != null && C.length > 0) {
        for (i = 0; i < C.length; i++) {
            _property_(C[i]); 
        }
    }

    return element; // Return: @param element (HTMLElement)
}

/* 
    ELODE RENDER - procedure to do rendering HTMLElement
    using standard DOM function to insert ElodeElement on <body></body> (default)
    it's can be render on another container, example for <head></head>

    @param
    - element: HTMLElement that will render with DOM
    - target: a container for element
    - option: extra option to do render technique

    @return array
*/
function _render_(element, target, option) {
    // Check: required variable @param target
    if (target == '' || target == null) {

            // @var body, represent of DOM body
        var body = document.body, 
            h = body.children, // @var h, represent of @var body children
            l = h.length, // @var l (number), represent of @var h length (children amount)
            i = 0, // @var i, for loop
            el = h[i]; // @var el represent childrens of DOM body

        // Execution: find last target at DOM body, <body> <h1> ... <p> ... <last-script> </body>
        for (i = 0; i < l; i++) {
            el = h[i]; // Define: @var el as last target of body (only <script>)

            // Case: if there's <script> then stop, that means the last was <script>
            if (el.constructor == "function HTMLScriptElement() { [native code] }") break;
        }

        // Render: at html.body (DOM) <body></body>
        if (element.constructor == Array) {
            // Case: element's array, then just insert first element of that
            body.insertBefore(element[0], el);
        } else {
            // Case: default, render before last element
            body.insertBefore(element, el);
        }
        
        return [element, target]; // Return: array of both @param element and target
    }

    // Render: at html.body (DOM) <body></body> (Spesific using DOM.querySelector)
    var x = target; // @var x, represent @param target

    // Check: case if @param target was string
    if (target.constructor == String) 
        x = document.querySelector(target); // Define: then select target by querySelector

    // Check: case if @param target was array
    if (element.constructor == Array) {
        // Case: array children element
        if (option) 
            // insert after sepesific
            x.insertAdjacentElement("afterend", element[0]);
        else
            // insert after
            x.appendChild(element[0]);
    } else {
        // Case: element that's not array (origin)
        if (option)
            // insert after sepesific
            x.insertAdjacentElement("afterend", element);
        else 
            // insert after
            x.appendChild(element);
    }

    // FIX ROOT NULL
    element.element = target;

    return [element, target]; // Return: array of both @param element and target
}

/* 
    ELODE RENDERING - lifecycle to listening Elode.render() procedure
    it most used to hook the HTMLElement when rendering is going on

    @param
    - element: HTMLElement that want to hook with rendering lifecycle

    @return void
*/
function _rendering_(element) {
    // Check: if there's onRender() callback (required)
    if (element.onRender != null && element.onRender.constructor == Function) {
        
        // Define: @var time, as element interval (millisecond)
        var time = element.interval != null ? element.interval : 1000, 
            frame; // @var frame, as setInterval function callback

        // Execution: start lifecycle rendering HTMLElement
        element.start = function () {
            if (element.interval == null |
                element.interval == false) element.interval = true;
            frame = setInterval(function () {
                element.onRender();
                element.react();
            }, time); //Default 1 second
        };

        // Execution: stop lifecycle rendering HTMLElement
        element.stop = function () {
            clearInterval(frame);
            element.interval = false;
        };

        element.start(); // set as default (start) at begin
    }
}

/* 
    ELODE REACTIVITY - procedure to make reactive HTMLElement
    it's based on @SymbolBetweenAlgorithm that find symbols of reactive "{ }"
    most of reactive elements using EventListener to do realtime update
    but, sometimes can use alternative technique, using direct update

    @param
    - element: target as HTMLElement based on ElodeElement

    @return void
*/
function _react_(element) {
    /* 
        @evaluate - function to make evaluation of reactive elements
        actually, this is core function to do reactivity case

        @param
        - target: HTMLElement that has react case

        @return void
    */
    function evaluate(target) {
        // Check: if @param target.elodeBase not null (required)
        if (target.elodeBase == null) return null;

            // @var r (array), react target from elodeBase of HTMLElement
        var r = SymbolBetweenAlgorithm(target.elodeBase, '{,}'), 
            i, // @var i (number), for loop
            j, // @var j (number), for loop
            e, // @var e (string), evaluated reactive value
            k, // @var k (string), key of first reactive value (for #Reference)
            v, // @var v (string), reactive value
            x, // @var x (HTMLElement), represents target to do reactive case
            db; // @var db (array), database reference

        // Check: @param r not null (required)
        if (r != null) {

            // Define: @var x, as instance of origin @param target.elodeBase
            x = target.elodeBase;

            // Execution: find react target value split by {} all of them
            for (i = 0; i < r.length; i++) {
                // @var v, value of react { value } { 1 + 1}
                v = r[i].substring(1, r[i].length - 1);
                // @var k, key of react value {key value}
                k = v.split(' ')[0].trim();

                // Check: key equals "$" dollar it means there's #Reference function
                if (k[0] == '$') {
                    // Check: if there's not #ref attribute
                    if (target.getAttribute("ref") == null) {
                        // then set it into HTMLElement to do #Reference
                        target.setAttribute("ref", "");
                    }
                }

                // Self-Reactive: it's means that not javascript reactivity
                db = SymbolBetweenAlgorithm(v, '{,}'); // {{}} database reference

                // Check: required @var db if null not executed
                if (db != null) {
                    
                    // Execution: for loop to do split by {{}} database reference
                    for (j = 0; j < db.length; j++) {
                        // Execution: sensitive case using try to log unknown error
                        try {
                                // @var s, javascript value of react { {value} }
                            var s = db[j].substring(1, db[j].length - 1), 
                            c; // @var c, represents to database source

                            // Define: root/parent for database source
                            c = eval("target.parentNode." + s);

                            // Check: if there's no root/parent then do itself source
                            if (c == null || c == undefined) {
                            // Define: node/child (itself) for database source
                                c = eval("target." + s);
                            }
                        } catch (err) { 
                            // Error: unknown error, then set to null
                            c = null; 
                        } 
                        
                        // Case: if undef, then return void
                        if (c == undefined) return;
                        
                        // Case: that's for string between value "string"
                        if (typeof c == 'string') c = "'" + c + "'";
                        
                        // Execution: replace that react value by database reference value
                        v = v.replace(db[j], c);
                    }
                }

                // Execution: sensitive case using try to log unknown error
                try {
                    // Define: @var e as evaluated value.
                    e = window.eval(v);
                } catch (err) {
                    //console.log(err); BUG v1.2 (Not sure :v)
                }

                // Execution: @var x as target react value (origin) replace by @var e (evaluated)
                x = x.replace(r[i], e); // it's means that reactive case was done and already to set into HTMLElement
            }

            // Execution: set evaluated value into HTMLElement
            if (target.constructor == "function Text() { [native code] }") {
                // Case: HTMLTextElement, there's no innerHTML
                if (x != target.textContent) target.textContent = x;
            } else {
                // Case: HTMLElement, most used for interactive
                if (x != target.innerHTML) target.innerHTML = x;
            }
        }
    }
    /* @evaluate - END */


    // Execution: if there's elodeBase on element (required)
    if (element.elodeBase != null) {
        // @var ch, represent element's childNodes
        var ch = element.childNodes, 
            i; // @var i (number), for loop

        // Check: if @var ch has length (there's children on element)
        if (ch != null && ch.length > 1) {
            // Execution: do reactive case with @evaluate by children
            for (i = 0; i < ch.length; i++) {
                evaluate(ch[i]);
            }
        } else {
            // Execution: do reactive case with @evaluate by itself (no children)
            evaluate(element);
        }
    }
}








/* 
==============================================================================================

            0     0           0
          0   0    0         0       HELLO I'M ALF EQUILFE (Muhammad Alfajri Arraihan)
            0       0       0        ~ PACMAN ENJOYER THAT LIKES EXPERIMENTAL PROJECT ~
                     0     0        
            0         0   0          THANKS FOR ALL SUPPORTERS:
          0   0        0 0           - CONTRIBUTORS (Official Elode.js Team)
            0           0            - USERS (Elode.js Developers)

==============================================================================================
*/







/* 
    ELODE INTERNAL - sensitive elode function from core
    it used as internal core function for do elode execution algorithm
*/

/* 
    @elode_react - function for do internal reactive
    based on the object set modifier to do realtime update
    
    @param
    - target (object/HTMLElement): native element target

    @return void
*/
function elode_react(target) {
    try { // Fixed: BUG v1.1 for IE < 9 (Object failed)

        // Check: if the constructor of target equals Text (HTMLElement)
        if (target.constructor == "function Text() { [native code] }") {
            // Define: elodeBase as a textContent of target (origin)
            target.elodeBase = target.textContent;
        }
        // Fixed: BUG v1.1 Each Reactive Sensitive Syntax Case
        else {
            // Define: replace the sensitive syntax case at reactive expressions
            target.elodeBase = target.innerHTML.split('&gt;').join('>')
                .split('&lt;').join('<').split('&amp;').join('&');
        }
        
        var // @var xc (HTMLNode), @param target property childNodes
            xc = target.childNodes,
            i; // @var i (number), for loop

        // Check: if there's @var xc then do recursive execution
        if (xc != null) {
            // Recursive: based on @var xc length
            for (i = 0; i < xc.length; i++) {
                // Execution: recursive itself to be a simple way
                elode_react(xc[i]);
            }
        }

        // Case: error, then log it into console
    } catch (err) {
        console.log(err);
    }
}

/* 
    @elode_prop - function for do internal properties
    based on @set_obj function to modify data

    @param
    - source (object): main instance
    - target (object): value instance
    - check (boolean): extra option for @set_obj

    @return void
*/
function elode_prop(source, target, check) {
    var // @var x, keys of source (object) instance
        x = source != null ? Object.keys(source) : null,
        n, // @var n (object), another instance
        i, // @var i (number), for loop
        j; // @var j (number), next loop

    // Check: if @var x not null then do main execution
    if (x != null) {
        // Execution: loop @var x as object instance of source
        for (i = 0; i < x.length; i++) {
            // Modify: set target object from source and @param check as option
            set_obj(target, x[i], source[x[i]], check);

            // Case: if has a style keys on it, then do extra execution
            if (x[i] == "style") {
                // @var n as an instance of source.style (object)
                n = Object.keys(source.style);
                // Execution: extra loop (next) for source.style (object)
                for (j = 0; j < n.length; j++) {
                    // Modify: set target.style from source.style and @param check as option
                    set_obj(target.style, n[j], source.style[n[j]], check);
                }
            }
        }
    }
}

/* 
    ELODE UTILITIES - an utilities from elode, that important use.
    it most basically used as a modifier data (usually for object)
*/

/* 
    @set_obj - function for set an object of javascript (extended)

    @params
    - source (object): target for data modifier
    - key (object.key/string): key to scope wheter to modify
    - value (object): value for set into the source
    - check (boolean): if true, the value has much of object

    @return string
 */
    function set_obj(source, key, value, check) {
        // Check: if there's @param source, key and value (important)
        if (source != null && key != null && value != null) {
            var // @var x for value of source set, it's can be (object) or (null);
                x = value.constructor == Object ? Object.keys(value) : null,
                i; // @var i (number) for loop case
    
            // Check: if @param check's true and there's @var x then do object set.
            if (check && x != null) {
                // Execution: object set one by one of all @param value.
                for (i = 0; i < x.length; i++) {
                    // Case: recursive itself in order to do simple way
                    set_obj(source, key + "." + x[i], value[x[i]]);
                }
            } else { // Execution: object set once by @param value
    
                // BUG: eval("source."+key+" = value"); it's old BUG v1.1 for IE < 9
                source[key] = value; //FIXED by original technique
            }
        }
        return source; // Return: @param source (modified if first check's true)
    }
    
    /* 
        @c_char - function that find and count a char from string
    
        @params
        - source (string): original target source that need for find the char
        - find (char): characters that want to find out on the source
    
        @return object
    */
    function c_char(source, find) {
        var i, // @var i (number), for loop
            j = 0; // @var j, for count
        
        // Execution: loop the characters from string
        for (i = 0; i < source.length; i++) { 
            j += 1; // @var j, count it
    
            /* Check: if @param source (array_string) not equal find (string) 
              that means the count execution was done */
            if (source[i] != find) break; 
        }
    
        //Return: (object) { str: origin source (strong), len: length of count (number) }
        return { str: source.trim().substring(i), len: j };
    }
    
    /* 
        @_error_ - function to log error into ElodeLogger
    
        @param
        - err (error): information about an error detected
    
        @return HTMLElement (error)
    */
    function _error_(err) {
        // Define: @var str, as string of error
        var str = "ELODE_ERROR \"" + err + "\"",
            // @var el as element result that log an error cause
            el = window.Elode('div#elode_error() ' + str); console.log(str);
    
        // set error HTMLElement with style
        el.attr("style", "color:red;background-color:black;padding:16px");
    
        return el;
    }

    /* 
    QUERY SEARCH - search query expression like [attr] (expr) {js}
    using SYMBOL BETWEEN ALGORITHM function for find the symbol then modify it

    @params
    - source (string): a base of expression source
    - target (array): a list of expression to be replaced on the source
    - callback (function): for the result callback and modification purpose
    - descriptor (function): an option to do searching technique
    
    @return string
*/

function query_search(source, target, callback, descriptor) {
    // Check: if @param target not included/null then return source (origin)
    if (target == null) return source;

    var t, // @var t (array/string), instance of @param target
        i, // @var i (number), index for loop
        k, // @var k (string), key of expression
        v, // @var v (string), value of expression
        r = []; // @var r, record of replacement

    // @found - function for find out the expression and modify it
    function found(src, index, origin) {
        v = src.trim().split(' '); // @var v defined as an array of string based on @param src (split by spacebar)
        k = v[0].trim(); // Key: from splitted source src[0]
        v = src.trim().replace(k, ''); // Value: from splitted source src[1] but using replacement technique remove the src[0] to blank
        
        // Execution: do the callback modification for external, give record data then modify it
        callback({ 
            k: k.trim(), // @var k, Key of Expression behind the splitter [key space value]
            v: v.trim(), // @var v, Value of Expression behind the splitter [key space value]
            r: r, // @var r, the replacement callback modifier, that can bring the replace by value
            i: index, // @var i, index of replacement position
            z: origin // @var z, original src for modification (extra descriptor)
        });
    }

    /* Check: if @param descriptor, property next not null
      It's mean that option for next's not set (for once query execution)*/
    if (descriptor.next == null) {
        // @param t substring by +1 -1 both of length (Symbol Between Expression Trimmed)
        t = target[0].substring(1, target[0].length - 1);

        // Check: if there's option for split a query value by @param descriptor.split (string)
        if (descriptor.split != null) {
            // @param t defined as an array of string based on the @param descriptor.split
            t = t.split(descriptor.split);
            // for loop to do recording all of the split value
            for (i = 0; i < t.length; i++) {
                found(t[i]); // record the split value by @found function for case split [split, ...]
            }
        } else {
            found(t); // record the split value by @found function for case single [source]
        }

    }

    /* Execution: for loop case, do the source recording by @found function
      and going to modify source then return it as a modified source */
    for (i = 0; i < target.length; i++) {

        /* Check: if there's @param descriptor, property next. Then do @found function
         the parameter include @found (trimmed target, index, original target) */
        if (descriptor.next != null) found(target[i].substring(1, target[i].length - 1), i, target[i]);

        // Check: the length of @var r (array) if the length was small than zero then do (blank) source replacement
        if (r.length <= 0) source = source.replace(target[i], '');

        // Else: do source replacement by @var r (array) defined external input from @found function
        else source = source.replace(target[i], r[0]);

        r = []; // Define: reset @var r from begin of array []

        if (!descriptor.all) break; // Check: if the @param descriptor option all's false, then break the loop (for once search query)
    }

    return source; //Return: @param source-modified (string)
}

/* 
    ES5 POLYFILLS - for fix EcmaScript support on IE < 9
    here, there's usefull function prototype from for Elode.js purpose

    Object.keys() | String.includes() | String.trim()
*/

// Fix the Object.keys for IE < 9
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [], i;
        for (i in object) {
            if (obj.hasOwnProperty(i)) {
                keys.push(i);
            }
        }
        return keys;
    };
}

// Fix the String.includes for IE < 9
if (!String.prototype.includes) {
    String.prototype.includes = function (target) {
        return (this.indexOf(target) > -1);
    }
}

// Fix the String.trim for IE < 9
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

/* 
    SYMBOL BETWEEN ALGORITHM v1.2 (10-10-2022)
    ~ Find perfect value between custom symbol. Without RegExp ~
    EX: {this yes} this not {{this yes too}}

    @params
    - source (string): target for find the symbol
    - symbols (string): which symbol between [0], [1] to find on the source
    - callback (function): for debugging purpose

    @return array
*/

function SymbolBetweenAlgorithm(source, symbol, callback) {
    var e = [], // @var e, recorder of value between symbol
        i, // @var i (number), for loop purpose
        j = 0, // @var j, recursive number
        k, // @var k (number), tag for symbol location 
        l, // @var l  (boolean), loop recorder
        v = "", // @var v, value recorder
        z = source.trim(), // @var z, tag for source of symbol
        _E = "Symbol Between Algorithm Error"; // @var _E, error tag

    /* @param symbol tranform to char_array[2] symbol[0] and symbol[1]
        it's means (Opening Symbol) and (Closing Symbol) separated by comma */
    symbol = symbol.trim().split(",");

    // Validation: check if 'source' not have symbol between char_array of symbol[i] [0][1]
    if (!source.includes(symbol[0]) && !source.includes(symbol[1])) return null;
    
    /* Validation: check if 'source' have symbol[1] between char_array of symbol[i] [0][1] 
      (Second Symbol Case) (Opening Symbol Error) */
    if (!source.includes(symbol[0]) && source.includes(symbol[1])) {
        return _error_(_E + ": Symbol Not Found! for '" + symbol[0] + "'");
    }

    /* Validation: check if 'source' have symbol[0] between char_array of symbol[i] [0][1] 
      (First Symbol Case) (Closing Symbol Error) */
    if (source.includes(symbol[0]) && !source.includes(symbol[1])) {
        return _error_(_E + ": Symbol Not Found! for '" + symbol[1] + "'");
    }

    /* Execution: Alogrithm Process, @param source transform to char_array[i]
       separated by blank_char to execute each of all char on the source*/
    source = source.trim().split("");

    // Execution: Finding the symbol[0][1] at the source[i] with for loop
    for (i = 0; i < source.length; i++) {

        // Case: Open symbol, which source[i] equals symbol[0]
        if (source[i] === symbol[0]) {
            l = true; // @var l, key of recording case (start record)
            j += 1;  // @var j, recursive opening symbol
        }

        // Record: Start recording char by char at first opening symbol[0] when key @var l is true
        if (l) { v += source[i]; }

        // Case: Close symbol, end the recording when source[i] equals symbol[1]
        if (source[i] === symbol[1]) {
            /* Case: Recursive closing, if the @var j bigger than 1 
               that means there's recursive opening symbol { { value } } */
            if (j > 1) {
                j -= 1; // Decrement the recursive number (once)
            } else {
            // Case: End the recording without recursive case.
                l = false;
                e.push(v.trim()); // @var e (array), recorder push the recorded value between symbol
                v = ""; // @var v (string), recorded value reset to blank string
                j = 0;  // @var j (number), recursive symbol validation reset to 0
                k = i; // @var k (number), tag for location of symbol purpose
            }
        }
    }

    /* Case: Error, if there's no closing symbol. cause by recursive
      EX: if the symbol closing's not same as opening like this, {{im value} the closing's -1 */
    if (j == 1) {
        // Debugging: if there's a callback function, do debugging and log the location of symbol error.
        if (callback != null) callback(_E + ": No Closing Symbol! at " + z.substring(k + 1));
        // Return: null
        return null;
    }

    return e; // Return: @var e, list of founded value (array)
}

})();

/* 
    elode.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
*/