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
        qy = { query: '', property: '' }, // @var qy, query properties or an option for query
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
    // Define: @var e.tag (HTMLValue) set into @var qy.property
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

                                // Elode Reactive Procedure for Root
                                if(this.root!=null) this.root.react();

                            }
                        );

                    } catch (err) { // Fixed: BUG v0.10 (Execution) attachEvent for IE < 9
                        el.attachEvent(k[i],
                            function () {
                                /* BTW, same as code above :v 
                                    but the different's just attachEvent */
                                this.react();

                                // Elode Reactive Procedure for Root
                                if(this.root!=null) this.root.react();
                            }
                        );
                    }

                }
            }

        }
    }

    return el; //Return: @var el, instance of HTMLElement (DOM)
}

/* _elode_element.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/