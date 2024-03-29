
/* 
     @MODULE - Elode.js Module: Unique Way Web Development
     it's main core of all elode functions that brings all together 
     to make HTMLElement creation with standard DOM Procedural technique

     @param
     - query: string that used to make HTMLElement with Unique Syntax HTML QUERY (HQ)
     - property: object that used to describe HTMLElement with property or event listener

     @return HTMLElement/ElodeElement (DOM)
*/

// @ElodeModule - Main Function
window.Elode = function _ElodeModule_(query, property) {
    // Check: required @param query and property not null
    if (query == null && property == null) return;

    // Define first @var el as represent of HTMLElement that want to create
    var el = null;

    /* 
        @HTML_INTERPRETER (Machine Learning :v)
        it's an Elode.js feature to run HTML QUERY (HQ) at HTML code
        split with line by line of innerHTML/outerHTML/HTMLValue
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
                vdom = _component_(eattr.trim(), property);
            } catch (err) {
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
            vdom.ab = c_char(c[i].split('((').join('<').split('))').join('>'), '    ');
            vdom.a = vdom.ab.str;
            vdom.b = vdom.ab.len;
            if (vdom.a.length <= 0 || vdom.a == '\t') continue;
            vdom.el.push([window.Elode(vdom.a, property), vdom.b]);
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
                    if (b == root[0][1]) { // Change To First
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
                el.appendChild(root[index][0]); //Append to Element #ROOT
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
        el.__init__();

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

/* @ElodeImport - Import feature from internal to window */
window.Elode.import = function () {
    var i, data = arguments;
    for (i = 0; i < data.length; i++) {
        window[data[i]] = window.Elode[data[i]];
    }
}

/* @ElodeApplication - Build application on single page */
window.Elode.app = function (data, callback) {
    if (data == null) return;

    if (typeof data == 'string') {
        var i,
            x = document.querySelectorAll(data);
        for (i = 0; i < x.length; i++) {
            callback(x[i]);
        }
        return x;
    }

    function bindTarget(target) {
        return window.Elode("_" + target);
    }

    return {
        db: data,

        at(target, action) {
            return app(data[target], action)[0];
        },

        set(target, reverse) {
            if (reverse == null) reverse = false;
            var x = null, i, j;
            for (i in data) {
                if (data[i].constructor == Array) {
                    for (j = 0; j < data[i].length; j++) {
                        x = bindTarget(data[i][j]);
                        if (reverse) x.show();
                        else x.hide();
                    }
                } else {
                    x = bindTarget(data[i]);
                    if (reverse) x.show();
                    else x.hide();
                }

            }
            if (data[target].constructor == Array) {
                for (j = 0; j < data[target].length; j++) {
                    x = bindTarget(data[target][j]);
                    if (reverse) x.hide();
                    else x.show();
                }
            } else {
                x = bindTarget(data[target]);
                if (reverse) x.hide();
                else x.show();
            }

        },

        get(target) {
            if (target.constructor == Array) {
                var i, list = [];
                for (i = 0; i < target.length; i++) {
                    list.push(bindTarget(data[target[i]]));
                }
                return list;
            }
            return bindTarget(data[target]);
        }
    }
};

/* @ElodeRouter - Manage web router based on window.location.href */
window.Elode.router = function (routes, args) {
    var x, href = window.location.href, rts;

    if (typeof routes == 'string') {
        if (href.includes("?/")) {
            rts = href.split("?/");
            if (routes != '') routes = "?/" + routes.trim();
            if (args) routes += "?" + args;
            window.location.href =
                href.split("?/" + rts[1].trim()).join(routes.trim());
        } else {
            window.location.href = href + "?/" + routes.trim();
        }
        return;
    }

    function ARGS(x) {
        return x.trim().split("%20").join(" ");
    }

    if (!href.includes("?/")) {
        if (href.includes("?"))
            routes["/"](ARGS(href.split("?")[1]));
        else routes["/"]();
        return;
    }
    for (x in routes) {
        rts = href.split("?/")[1];
        if (rts.includes("?")) {
            rts = rts.split("?");
        } else {
            rts = [rts, null];
        }

        if (x == rts[0].trim()) {
            if (rts[1])
                routes[x](ARGS(rts[1]));
            else
                routes[x]();
        }
    }
};

/* @ElodeInit - Initialize Elode element procedures */
window.Elode.init = function (element) {
    element = _property_(element);
    return element;
};

/* @ElodeHook - Include your function hook/bind into Component/Element */
window.Elode.hook = function (data) {
    for (var i in data) {
        window.Elode.__hook__[i.toLowerCase()] = data[i];
    }
    return data;
};
window.Elode.__hook__ = {};
window.Elode.__disableHook__ = false;
window.Elode.__hookTag__ = ":";

/* @ElodeMap - Manipulate your Array into Component/Element */
window.Elode.map = function (root, array, callback, isArray) {
    var _root_ = null;
    if (typeof root != 'string') {
        _root_ = root;
    } else {
        if (root == '') root == 'div';
        _root_ = window.Elode(root);
    }

    array.root = function () { return _root_; };
    array.el = callback;

    function append(__array) {
        try {
            var i, map = eval("array.map(" + array.el + ")");
            if (__array != null) {
                if (map[__array] != null) map[__array].render(array.root());
            } else {
                for (i in map) {
                    if (map[i] != null) map[i].render(array.root());
                }
            }
        } catch (err) { }
    } append();

    array.init = function () {
        array = this;
        array.root().html(''); append();
    }

    array.push = (function () {
        var push = array.push;
        return function () {
            var i, fun = push.apply(this, arguments);
            for (i = 0; i < arguments.length; i++) {
                append((array.length - arguments.length) + i);
            }
            return fun;
        }
    })();
    array.pop = (function () {
        var pop = array.pop;
        return function () {
            var fun = pop.apply(this, arguments);
            array.root().get(array.length).destroy();
            return fun;
        }
    })();
    array.shift = (function () {
        var shift = array.shift;
        return function () {
            var fun = shift.apply(this, arguments);
            array.root().get(0).destroy();
            return fun;
        }
    })();
    array.filter = (function () {
        var filter = array.filter;
        return function () {
            var fun = filter.apply(this, arguments);
            fun = window.Elode.map(array.root(), fun, array.el, true);
            fun.__key__ = array.__key__; fun.__value__ = array.__value__;
            array.root().html(''); array = fun;
            append(); return array;
        }
    })();

    var i, f = ["splice", "sort", "reverse"];
    for (i in f) {
        eval(
            "array." + f[i] + " = (function(){" +
            "   var " + f[i] + " = array." + f[i] + ";" +
            "   return function(){" +
            "       var fun = " + f[i] + ".apply(this,arguments);" +
            "       array.root().html(''); append();" +
            "       return fun;" +
            "   }" +
            "})();"
        );
    }
    if (isArray) return array;

    array.root().map = array;
    return array.root();
};

/* @ElodeUse - Using namespace HTMLTag */
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
    } return setUse(tags, html);
    function setUse(x, y) {
        /* OLD v1.3 */
        /*  window.eval("function " + x + "(html,prop){" +
            "return Elode('" + y + " '+html,prop);}"); */

        /* NEW v2.0 */
        return window.eval("function " + x + "(){" +
            "var el = window.Elode('" + y + "'), i, args = arguments, query = '', sp = ' ', " +
            "prop = args[args.length-1].constructor == Object ? args[args.length-1]:null;" +
            "if(prop!=null) el = window.Elode('" + y + "', prop);" +
            "for(i = 0; i < args.length; i++){" +
            "if(typeof args[i] == 'string' ||typeof args[i]=='number'){ " +
            "if(i==0){" +
            "if(typeof args[i] == 'string'){" +
            " if(args[i][0]=='#'||args[i][0]=='.') sp='';" +
            " el = window.Elode('" + y + "'+sp+args[i], prop); " +
            "}else{ el = window.Elode('" + y + " '+args[i], prop); }" +
            "}else{ window.Elode(args[i]).render(el); }" +
            "}" +
            "else if(args[i].constructor==Array){ var j; for(j = 0; j < args[i].length; j++) Elode(args[i][j]).render(el); }" +
            "else { if(args[i].constructor.toString().includes('Element')){ if(el.render){args[i].render(el);}else{el.add(args[i]);} }}" +
            "if(args[i].constructor != Object) query += args[i].__query__ != null ? '<'+args[i].__query__+'>':''; } el.__query__ += ' '+query; " +
            "return el.react();"
            + "}");
    }
};

/* @ElodeRef - Reference for reactive global variable  */
window.Elode.ref = function (vars) {
    var i, v, F;
    for (i in vars) {
        v = vars[i];
        window["$" + i] = v;
        F = " function _name_(value){" +
            "var x, e = _i; " +
            "if(e.constructor == Object){ " +
            "for(x in value){_i[x] = value[x];} " +
            "}else if(e.constructor.toString().includes('Element')){" +
            "_i = value;" +
            "}else{_i = value;} " +
            "var I, E = document.querySelectorAll('[ref]'); " +
            "for(I = 0; I < E.length; I++){if(E[I].react)E[I].react();} " +
            "return _i};";
        window.eval(F.split('_name_').
            join(i).split('_i').join("$" + i));
    }
};

/* @ElodeRender - Rendering arguments of elode element */
window.Elode.render = function (nodes) {
    if (nodes == null) return;
    if (arguments.length > 1) {
        nodes = arguments; var i;
        for (i = 0; i < nodes.length; i++) {
            window.Elode.render(nodes[i]);
        }
    }
    if (typeof nodes == 'string') {
        if (nodes == '') return;
        window.Elode(nodes).render();
    } else {
        if (nodes.render) nodes.render();
    }
};

/* @ElodeXSS - Split < > syntax to replace by snipset */
window.Elode.xss = function (source) {
    if (source.includes("<") || source.includes(">"))
        return source.split("<").join("&lt;").split(">").join("&gt;");
    else
        return source.split("&lt;").join("<").split("&gt;").join(">");
}

/* @ElodeInfo - Extra properties for describe Elode.js */
window.Elode.__info__ = {
    VERSION: '2.0',
    CODE: 2028062023
};

/* _module.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/