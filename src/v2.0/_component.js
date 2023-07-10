
/* 
    @COMPONENT - procedure to create Elode Component of HTML Element (DOM)
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
    r.isChild = {}; // Define: @var r.isChild as blank object, for children record (HTMLElement)

    // Execution: for loop of listed @var c as reactive symbols array
    for (i = 0; i < c.length; i++) {
        // Execution: define and modify with @_rereact_ funcion in order to append reactivity on each element
        r.isChild[r.hash + i] = _rereact_(c[i])
            .substring(1, _rereact_(c[i]).length - 1); // substring hash with re_react symbol

        // Execution: modify @param query that was replaced with @var c[i] (!elode_react) and r.hash (original react)
        query = query.replace(c[i], r.hash + i);
    }

    // Define: HTMLElement with @_element_ function
    el = _element_(_rereact_(query), property);

    // Check: if @var el.id (HTMLElementID) was elode_error then return itself
    if (el.id == "elode_error") return el;

    // Define: @var el.__query__ equals original saved first query @var A at top of code.
    el.__query__ = A;

    // Check: if @var el.__property__ not null
    if (el.__property__ != null) {
        // Define: recursive __property__ of __query__ equals origin @var A
        el.__property__.__query__ = A;
    }

    // Execution: brings all of each elode component to be <span> element
    for (i = 0; i < c.length; i++) {
        // Define: @var r.vdom (represents of HTMLSpanElement) with @var i as index (position)
        r.vdom = "<span id='elode_" + i + "'></span>";

        // Define: @var el.innerHTML as itself but replaced with @var r.hash (symbol) and r.vdom (value)
        el.innerHTML = el.innerHTML.replace(r.hash + i, r.vdom);

        // Define: @var r.obj as component recursive that brings origin elements by r.isChild
        r.obj = _component_(r.isChild[r.hash + i]);

        // Execution: @va el.replaceChild of @var r.obj and @var el.querySelector (represents of span element) to be replaced
        el.replaceChild(r.obj, el.querySelector("#elode_" + i));
    }

    // Reactivitiy: define again react access to @var el
    elode_react(el);

    return el; // Return: @var el, ElodeComponent, HTMLElements (DOM)
}

/* _component.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/