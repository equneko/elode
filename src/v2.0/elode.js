/* 
====================================================================

    Elode.js (Source) - v2.0 (Release: 28-06-2023) 
    ~ A unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -

====================================================================
*/

/* @ElodeMain Thread - Invoked Function */
(function _ElodeMain_() {
    'use strict';
    /* 
        @ELODE_MODULE - Elode.js Module: Unique Way Web Development
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

        return {
            /* @ElodeBuild - Compile and build your Elode.js App into Standard HTML and JS Code */
            build: function (data) {
                var i, j, x, use = [], ref = [], def = [], prop = [], base = '', js = '', html = '';
                for (x in window) {
                    if (x[0] == "$") {
                        var v = window[x];
                        if (!/^\d+$/.test(v) || v.trim() != "true" || v.trim() != "false") v = '"' + v + '"';
                        ref.push(x.substring(1) + ":" + v + "");
                    }
                }

                if (ref.length > 0)
                    js += "window.Elode.ref({" + ref.toString() + "});\n";

                function arrayCompiler(array) {
                    if (array.length == 0) return "";
                    var i, v, r = '';
                    for (i = 0; i < array.length; i++) {
                        v = array[i];
                        if (!/^\d+$/.test(v)) r += '"' + v + '"';
                        else r += v;
                    }
                    return r;
                }
                function elodeUseCase(element) {
                    var i, e = element.children;
                    if (e.length > 0) {
                        for (i = 0; i < e.length; i++) {
                            elodeUseCase(e[i]);
                        }
                    }
                    use.push('"' + element.tagName.toLowerCase() + '"');
                }

                function compile(node, index, isChild) {
                    var compress = false, co = '';
                    if (data && data.compress) {
                        for (i = 0; i < data.compress.length; i++) {
                            var a = data.compress[i];
                            if (node.__query__ && a.__query__.replace(a.__react__, '').trim() ==
                                node.__query__.replace(node.__react__, '').trim()) {

                                if (index == 0) {
                                    compress = true;
                                } else {
                                    return;
                                }
                            }
                        }
                    }
                    var ev = "e" + index + "" + (Math.floor(Math.random() * 10000)), fn = '';
                    if (node.__map__) {
                        prop.push("window.Elode('_[_e=" + ev + "]').__map__ = {};\n");
                        var V = '', useHtmlTag;
                        if (node.__map__.array) {
                            V = arrayCompiler(node.__map__.array);
                            prop.push("window.Elode('_[_e=" + ev + "]').__map__.array = [" + V + "];\n");
                        }
                        if (node.__map__.callback) {
                            V = node.__map__.callback;
                            useHtmlTag = V();
                            if (useHtmlTag.constructor.toString().includes("Element")) {
                                elodeUseCase(useHtmlTag);
                            }
                            prop.push("window.Elode('_[_e=" + ev + "]').__map__.callback = " + V + ";\n");
                        }

                        prop.push("window.Elode.map(window.Elode('_[_e=" + ev + "]')," +
                            "window.Elode('_[_e=" + ev + "]').__map__.array," +
                            "window.Elode('_[_e=" + ev + "]').__map__.callback);\n");
                    }
                    for (x in node) {
                        if (node[x] != null) {
                            var bo = node[x].constructor == Function && node[x].name != ""
                                && !node[x].toString().includes("[native code]");

                            if (bo && node[x].name.substring(0, 2) != "on" ||
                                bo && node[x].name[2] == "R" ||
                                bo && node[x].name[2] == "D") {
                                js += "window.Elode('_[_e=" + ev + "]')." + x + " = function" + node[x].toString().replace(x, '') + ";\n";
                                if (x == "onRender") {
                                    js += "window.Elode('_[_e=" + ev + "]').__runtime__();\n";
                                }
                                node.attr("_e", ev);
                            }
                        }
                        if (x == "__react__") {
                            if (node.__react__.includes("{") && node.__react__.includes("}")) {
                                if (compress) co += "window.Elode(_elode_element_).__react__ = \"" + node.__react__ + "\"; \n";
                                else base += "window.Elode('_[_e=" + ev + "]').__react__ = \"" + node.__react__ + "\"; \n";
                            }
                        }
                        if (x == "__property__") {
                            var p, q;
                            for (p in node[x]) {
                                if (p == "__query__" || p == "__property__") continue;
                                q = node[x][p];
                                if (q.constructor == Function) continue;
                                if (!/^\d+$/.test(q) && typeof q == 'string') q = '"' + q + '"';
                                if (q.constructor == Array && q.length == 0) q = "[]";
                                if (q.constructor == Object && Object.keys(q).length == 0) q = "{}";

                                if (compress) co += "window.Elode(_elode_element_)." + p + " = " + q + "; \n";
                                else prop.push("window.Elode('_[_e=" + ev + "]')." + p + " = " + q + "; \n");
                            }
                        }
                        if (x == "onCreate") {
                            js += "(" + node.onCreate.toString().replace("onCreate", 'function') + ").call(window.Elode('_[_e=" + ev + "]'));\n";
                        }
                        if (x.substring(0, 2) == "on" && x.length > 2 || x == "__react__") {
                            if (node[x] != null) {
                                fn = node[x].toString().replace(x, "function") + "\n";
                                if (x != "__react__" && x[2] != "C" && x[2] != "R" && x[2] != "D") {
                                    if (compress) co += "window.Elode(_elode_element_).on('" + x.substring(2) + "'," + fn + ");\n";
                                    else js += "window.Elode('_[_e=" + ev + "]').on('" + x.substring(2) + "'," + fn + ");\n";
                                }
                                node.attr("_e", ev);
                            }
                        }
                    }
                    if (node.attr) {
                        for (i = 0; i < node.attr().length; i++) {
                            var a = node.attr()[i].name;
                            if (a.includes(window.Elode.__hookTag__)) {
                                js += "window.Elode('_[_e=" + ev + "]').__init__();\n";
                                break;
                            }
                        }
                    }
                    if (node.children.length > 0) {
                        childCompile(node);
                    }
                    if (isChild == null) html += node.html() + "\n";
                    if (compress) {
                        js += 'const ' + ev + ' = document.querySelectorAll("' + node.__query__.split(' ')[0].trim() + '");\n' +
                            'for(var i = 0; i < ' + ev + '.length; i++){\n' +
                            co.split("_elode_element_").join(ev + "[i]") +
                            '}';
                    }
                }
                function childCompile(root) {
                    var j;
                    for (j = 0; j < root.children.length; j++) {
                        compile(root.children[j], j, true);
                    }
                }

                if (nodes.length > 1) {
                    for (i = 0; i < nodes.length; i++) {
                        compile(nodes[i], i);
                    }
                } else {
                    compile(nodes, 0);
                }

                if (data.include) {
                    if (data.include.constructor == Object) {
                        for (x in data.include) {
                            var v = data.include[x];
                            if (v.constructor == Function) {
                                if (x == null) x = "";
                                def.push(v.toString() + x + "();\n");
                            } else if (v.constructor.toString().includes("Element")) {
                                def.push(x + " = window.Elode('_[_e=" + v.attr("_e") + "]');\n");
                            }
                        }
                    } else {
                        def.push(data.include.toString() + "\n");
                    }
                }
                function scopeSet(_x, _y) {
                    if (typeof _x == 'string') return _x.split(_y[1].trim() + "=" +
                        _y[2].substring(0, _y[2].length - 1).trim()).join(_y[0].trim());

                    var _i, r = [];
                    for (_i = 0; _i < _x.length; _i++) {
                        r.push(_x[_i].split(_y[1].trim() + "=" +
                            _y[2].substring(0, _y[2].length - 1).trim()).join(_y[0].trim()));
                    }
                    return r;
                }
                function arraySet(_x) {
                    var i, r = '';
                    for (i = 0; i < _x.length; i++) {
                        r += _x[i];
                    }
                    return r;
                }

                for (i = 0; i < def.length; i++) {
                    x = def[i].trim().split("=");
                    js = scopeSet(js, x);
                    prop = scopeSet(prop, x);
                }

                def = arraySet(def); prop = arraySet(prop);

                var imp = '';
                if (data.import) {
                    if (typeof data.import == 'string') {
                        imp = "window.Elode.import('" + data.import + "');\n";
                    } else {
                        for (i = 0; i < data.import.length; i++) {
                            imp += "'" + data.import[i] + "',";
                        }
                        imp = "window.Elode.import(" + imp + ");\n";
                    }
                }

                js = imp + (use.length > 0 ? "window.Elode.use(" + use.reverse().toString() + ");\n" : "") + def + prop + "\n" + js + base;

                if (data.scope == null) data.scope = "_";
                if (data.name == null) data.name = "{ Project Name }";
                if (data.author == null) data.author = "{ Your Name }";

                js = "/*\n   Elode.js v2.0 Build \n   Date: " + new Date().toLocaleString() + "\
                    \n\n   Project: "+ data.name + "\n   Author: " + data.author + "\n*/\
                    \n\nwindow."+ data.scope + " = Elode; " + data.scope + ".init(document.body);\n" + js.split("window.Elode").join(data.scope)

                if (data.hidden == null || data.hidden == false) {
                    window.Elode.use('code', 'pre', 'h1', 'button')
                    window.Elode.render(
                        code("#build",
                            h1("Elode.js Build"),

                            button("[style padding:2px 8px;background-color:orange] HTML Code", {
                                onclick: function () {
                                    navigator.clipboard.writeText(html);
                                    alert("HTML Code Copied!");
                                }
                            }),
                            pre("").txt(html),

                            button("[style padding:2px 8px;background-color:yellow] JavaScript Code", {
                                onclick: function () {
                                    navigator.clipboard.writeText(js);
                                    alert("Javascript Code Copied!");
                                }
                            }),
                            pre("").txt(js)
                        )
                    )
                }

                return { html: html, js: js };
            }
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
        CODE: 2007062023
    };

    /* 
        @ELODE_APPLICATION - Elode.js Application
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

                // Adding some Query to key of query value (isChild was added and query updated)
                k += '<' + t.__query__ + '>';
            }
        }

        // Check: that isChild component not null or empty (sensitive empty error)
        try {
            // @v as Elode with updated query
            v = window.Elode(k, property);
            e.__query__ = k; // update query
            e.__react__ = v.__react__; // update react
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
        @ELODE_HOOK - procedure to include functions
        on Component/Element with custom directive

        @param
        - target: HTMLElement
        - include: string

        @return void
    */
    function _hook_(target, include) {
        var name = include.name.split(window.Elode.__hookTag__),
            value = include.value == null ? "" : include.value;

        if (name[0] == "") {
            window.Elode.__hook__[name[1]](target, value);
        } else {
            eval("window.Elode.__hook__." + name[0] + "." + name[1] + "(target,value);");
        }
    }

    /* 
        @ELODE_ELEMENT - procedure to create HTML Element (DOM)
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
            qy = { query: '', property: '', react: null }, // @var qy, query properties or an option for query
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
          that was __query__ and __property__, both are original source of @param query and property*/
        e.prop.__query__ = query;
        e.prop.__property__ = property;

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
                all: true  // option all, it set to false that means, not all expression replaced, but just once
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

                // Attribute Modifier from @ElodeHook
                if (k[i][0] == "@") {
                    var rep = "", at = k[i].substring(1);

                    if (window.Elode.__hook__.anim[at] != null)
                        rep = "anim:";
                    if (window.Elode.__hook__.on[at] != null)
                        rep = "on:";

                    el.setAttribute(rep + at, e.attr[k[i]]);

                } else {
                    // Execution: set @var el.setAttribute by @var k[i] (key) and @var e.attr[k[i]] (value)
                    el.setAttribute(k[i], e.attr[k[i]]);
                }
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
                                    if (this.root != null && this.root.react) this.root.react();

                                }
                            );

                        } catch (err) { // Fixed: BUG v0.10 (Execution) attachEvent for IE < 9
                            el.attachEvent(k[i],
                                function () {
                                    /* BTW, same as code above :v 
                                        but the different's just attachEvent */
                                    this.react();

                                    // Elode Reactive Procedure for Root
                                    if (this.root != null && this.root.react) this.root.react();
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
        @ELODE_COMPONENT - procedure to create Elode Component of HTML Element (DOM)
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

    /* 
        @ELODE_PROPERTY - include ElodeProperty to HTMLElement
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

        element.anim = {

            fade(set, time) {
                var opacity = set == true ? 0 : 100, val = 10000 / eval(time);
                element.style.opacity = opacity + "%";
                f_frame(time, function () {
                    if (set)
                        opacity += val;
                    else
                        opacity -= val;

                    if (set == true && opacity >= 100) opacity = 100;
                    if (set == false && opacity <= 0) opacity = 0;

                    element.style.opacity = opacity + "%";
                });
                return element;
            },
            fadeIn(time) {
                return this.fade(true, time);
            },
            fadeOut(time) {
                return this.fade(false, time);
            },
        }

        // Elode - Attribute, HTMLElement attribute
        element.attr = function (name, value) {
            if (name == null && value == null)
                return element.attributes;
            if (value == null)
                return element.getAttribute(name);

            element.setAttribute(name, value);

            if (element.parentNode != null)
                return element.parentNode;

            return element;
        };

        // Elode - EventListener, represent of addEventListener but with reactivity
        element.on = function (event, callback) {
            eval("element.on" + event + " = callback;");

            element.addEventListener(event, function () {
                this.react();
                if (this.root != null && this.root.react)
                    this.root.react();
            });

            return element;
        };

        // Elode - Class, HTMLElement DOM classes
        element.class = function (value) {
            if (value == null) {
                return element.classList;
            }

            return element.attr("class", value);
        };

        // Elode - Cascading Style Sheet, DOM style of HTMLElement
        element.css = function (value) {
            if (value == null) {
                return {
                    add(newValue) {
                        var oldValue = element.css().style;
                        return element.attr("style", oldValue + ";" + newValue);
                    },
                    del(delValue) {
                        var newValue = element.css().style;
                        if (newValue.include(delValue))
                            newValue = newValue.split(delValue).join("");
                        return element.attr("style", newValue)
                    },
                };
            } else if (value == '') {
                return element.attr("style");
            }

            return element.attr("style", value);
        };

        // Elode - innerHTML/outerHTML, set or get the HTMLValue
        element.html = function (value) {
            if (value == null)
                return element.outerHTML;
            else
                element.innerHTML = value;

            return element;
        };

        // Elode - innerText, set or get HTMLText
        element.txt = function (value) {
            if (value == null)
                return element.innerText;
            else
                element.innerText = value;

            return element;
        };

        // Elode - Value, set or get HTMLElement value
        element.val = function (value) {
            if (value == null)
                return element.value;
            else
                element.value = value;

            return element;
        };

        // Elode - Show, display default HTMLElement
        element.show = function () {
            element.style.display = '';

            return element;
        };

        // Elode - Hide, display none HTMLElement
        element.hide = function () {
            element.style.display = 'none';

            return element;
        };

        // Elode - Toggle, toggle handler of HTMLElement attributes
        element.toggle = function (attrib, value) {
            var attr = element.attr(attrib),
                i, ident = "";

            if (attrib == "style" || attrib.includes("on")) ident = ";";

            if (attr == null)
                element.attr(attrib, ""); attr = element.attr(attrib)

            if (value.constructor == Array) {
                for (i = 0; i < value.length; i++) {
                    element.toggle(attrib, value[i]);
                }
            } else {
                if (attr == null)
                    element.attr(attrib, ""); attr = element.attr(attrib)

                if (attr.includes(value)) {
                    attr = attr.replace(ident + value, "");
                    element.attr(attrib, attr.trim());
                } else {
                    element.attr(attrib, (attr + ident + value).trim());
                }

            }

            return element;
        };

        // Elode - Get, get HTMLElement (isChild)
        element.get = function (key) {
            if (typeof key == 'number') {
                return _property_(element.node[key]);
            } else {
                return _property_(element.querySelector(key));
            }
        };

        // Elode - Cell, get HTMLElement (root)
        element.cell = function (key) {
            var parent = element.root,
                cells = [];

            while (parent != null && parent != document.body) {
                cells.push(parent);
                parent = parent.root;
            }

            if (key == null) return cells;

            return cells[(cells.length - 1) - key];
        };

        // Elode - Destroy, destroy HTMLElement (self or isChild)
        element.destroy = function (key) {
            // Remove Callback: for ElodeLifecycle case
            if (element.onDestroy != null && element.onDestroy.constructor == Function)
                element.onDestroy();

            if (key == null)
                return element.parentElement.removeChild(element);

            if (typeof key == 'number') {
                return element.removeChild(element.node[key]);
            }

            if (key.constructor == Array) {
                for (i = 0; i < key.length; i++) {
                    element.removeChild(key[i]);
                }
                return;
            }

            return element.removeChild(key);
        };

        // Elode - Clone, duplicate HTMLElement with same ElodeQuery and ElodeProperty
        element.clone = function (prop) {
            var x;

            if (element.__query__ != null && element.__property__ != null)
                x = window.Elode(element.__query__, element.__property__);
            else
                x = _property_(element.cloneNode(true));

            if (prop != null) elode_prop(prop, x);

            return x;
        };

        // Elode - Seen, set or get HTMLElement hide/show
        element.seen = function (visible) {
            if (visible == null) {
                var x = true;
                if (element.style.display == 'none') {
                    x = false;
                }
                return x;
            }
            if (typeof visible == 'string') {
                if (element[visible])
                    element.show();
                else
                    element.hide();
            } else {
                if (visible)
                    element.show();
                else
                    element.hide();
            }
            return element;
        };

        // Elode - Prop, set property of ElodeElement (DOM)
        element.prop = function (property) {
            if (property != null) {
                elode_prop(property, element, true);
                element.react();
            }

            return element;
        };

        // Elode - Memo, procedure to memorize react of HTMLElement
        element.memo = function (keys) {
            var i, x, record;

            if (keys == null) {
                for (x in element.memo) {
                    record = element.memo[x][1];

                    if (x[0] == "$") {
                        if (record == window[x]) return element;
                        element.memo[x] = [record, window[x]];
                    } else {
                        if (record == element[x]) return element;
                        element.memo[x] = [record, element[x]];
                    }
                }
                return element;
            }

            if (keys.includes(" "))
                keys = keys.split(" ");
            else
                keys = [keys];

            element.memo();

            for (i = 0; keys.length; i++) {
                if (keys[i][0] == "$") {
                    if (element.memo[keys[i]] == null)
                        element.memo[keys[i]] = [window[keys[i]], ""];
                    else
                        return element.memo[keys[i]][0];
                } else {
                    if (element.memo[keys[i]] == null)
                        element.memo[keys[i]] = [element[keys[i]], ""];
                    else
                        return element.memo[keys[i]][0];
                }
            }
        }

        // Elode - React, procedure to react HTMLElement
        element.react = function () {
            _react_(element); var i;
            if (element.children != null) {
                for (i = 0; i < element.children.length; i++) {
                    if (element.children[i].react) element.children[i].react();
                    element.children[i].root = element;
                }
            }
            // Elode Reactive Callback, check if there's onReact(callback)
            if (element.onReact != null && element.
                // using onReact(){ ... } to ElodeLifecycle
                onReact.constructor == Function) { element.onReact(element.memo); }

            return element;
        };

        element.delay = function (time, action) {
            f_frame(time, null, null, function () {
                action(element);
            });
            return element;
        }

        // Elode - Render, procedure to render HTMLElement
        element.render = function (root) {
            _render_(element, root, false);
            // Fix Root NULL
            if (root != null) element.root = root;
            else element.root = document.body;
            // Initialize Elode
            element.__init__();
            // Check Reactive           
            element.react();
            // Create Callback
            if (element.onCreate != null) {
                try {
                    element.onCreate();
                } catch (err) { }
            }
            // Rendering Callback
            element.__runtime__();
            return element;
        };

        // Elode - Init, include procedural
        element.__init__ = function () {
            // Hook Includes
            if (!window.Elode.__disableHook__) {
                var i, attr = element.attr(), del = [];
                if (attr != null) {
                    for (i = 0; i < attr.length; i++) {
                        if (attr[i].name.includes(window.Elode.__hookTag__)) {
                            _hook_(element, attr[i]);
                            if (attr[i]) del.push(attr[i].name);
                        }
                    }
                    for (i = 0; i < del.length; i++) {
                        element.removeAttribute(del[i]);
                    }
                }
            }
            return element;
        };

        // Elode - Runtime, rendering without render function
        element.__runtime__ = function () {
            _rendering_(element);
            return element;
        };

        // Elode - XSS, define case of HTML-Tag injection
        element.__xss__ = false;

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
        @ELODE_RENDER - procedure to do rendering HTMLElement
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
        element.root = target;

        return [element, target]; // Return: array of both @param element and target
    }

    /* 
        @ELODE_RENDERING - lifecycle to listening Elode.render() procedure
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
        @ELODE_REACTIVE - procedure to make reactive HTMLElement
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
            // Check: if @param target.__react__ not null (required)
            if (target.__react__ == null) return null;

            // @var r (array), react target from __react__ of HTMLElement
            var r = SymbolBetweenAlgorithm(target.__react__, '{,}'),
                i, // @var i (number), for loop
                j, // @var j (number), for loop
                e, // @var e (string), evaluated reactive value
                k, // @var k (string), key of first reactive value (for #Reference)
                v, // @var v (string), reactive value
                x, // @var x (HTMLElement), represents target to do reactive case
                db, // @var db (array), database reference
                xss = false; // @var xss (string), user can type HTML or No (XSS Injection)

            // Check: @param r not null (required)
            if (r != null) {

                // Define: @var x, as instance of origin @param target.__react__
                x = target.__react__;

                // Execution: find react target value split by {} all of them
                for (i = 0; i < r.length; i++) {
                    // @var v, value of react { value } { 1 + 1}
                    v = r[i].substring(1, r[i].length - 1);

                    // Check: XSS Enable/Disable option defined as first line of reactive's "html"
                    if (v.substring(0, 4) == "html") {
                        v = v.substring(4).trim();
                        xss = true;
                        if (!target.__xss__)
                            target.__xss__ = true;
                    } else {
                        xss = false;
                    }

                    // @var k, key of react value {key value}
                    k = v.split(' ')[0].trim();

                    // Check: key equals "$" dollar it means there's #Reference function
                    if (k[0] == '$') {
                        // Check: if there's not #ref attribute
                        if (target.getAttribute) {
                            if (target.getAttribute("ref") == null) {
                                // then set it into HTMLElement to do #Reference
                                target.setAttribute("ref", "");
                            }
                        } else {
                            // Case: TEXT NODE there's no getAtttribute then using parentNode
                            if (target.parentNode.getAttribute("ref") == null) {
                                // then set it into HTMLElement to do #Reference
                                target.parentNode.setAttribute("ref", "");
                            }
                        }

                    }

                    // Internal-Reactive: it's means not global javascript reactivity
                    db = SymbolBetweenAlgorithm(v, '{,}'); // {{}} database reference

                    // Check: required @var db if null not executed
                    if (db != null) {

                        // Execution: for loop to do split by {{}} database reference
                        for (j = 0; j < db.length; j++) {
                            // @var s, javascript value of react { {value} }
                            var s = db[j].substring(1, db[j].length - 1),
                                c, // @var c, represents to database source
                                h = null, // @var h, extra for HTML reactive
                                t = ''; // @var t for temporary string

                            // Special: scope/bind the root from cell feature
                            if (s.trim()[0] == "#") {
                                t = s.trim().substring(0, 2);
                                s = s.split(t).join('').trim();
                                if (t[1] == ' ')
                                    s = "cell(0)." + s;
                                else
                                    s = "cell(" + t[1] + ")." + s;
                            }
                            else if (s.trim()[0] == "*") {
                                var cc = c_char(s, '*'), l, extra = '';
                                for (l = 0; l < cc.len; l++) {
                                    extra += "parentNode.";
                                }
                                s = extra + cc.str.trim();
                            }

                            // Execution: sensitive case using try to log unknown error
                            try {
                                // Define: node/isChild (itself) for database source
                                c = eval("target." + s);
                                // Check: if there's no root/parent then do itself source
                                if (c == null || c == undefined) {
                                    // Define: root/parent for database source
                                    c = eval("target.parentNode." + s);
                                }

                            } catch (err) {
                                // Error: React has been changed, but not detected
                                try {
                                    /* Case: RE-CHECK AGAIN REACTIVE CHANGED
                                       DANGER - this section's using double try case
                                       it's maybe affected to JS-VM to executed again?
                                    */

                                    c = eval("target.parentNode." + s);

                                } catch (err2) {
                                    // Error: unknown error, then set to null (REACT NULL)
                                    c = null;
                                }
                            }

                            // Case: if undef, then return blank
                            if (c == undefined || c == null) c = '';

                            // Case: if HTML exists
                            if (c.constructor.toString().includes("Element")) h = c;

                            //Case: number check. if it's only number or alphabet
                            if (!/^\d+$/.test(c)) c = "\"" + c + "\"";

                            // Execution: replace that react value by database reference value
                            v = v.replace(db[j], c);
                        }
                    }



                    // Execution: sensitive case using try to log unknown error
                    try {
                        // Define: @var e as evaluated value.
                        e = window.eval(v) == undefined ? '' : window.eval(v);

                        // HTML Reactive {{element}}
                        if (typeof e == 'string') {
                            if (e.includes("HTML") && e.includes("Element")) {
                                e = h.outerHTML;
                            }
                        } else if (e.constructor.toString().includes("Element")) {
                            // HTML Reference {$element}
                            e = e.outerHTML;
                        }
                    } catch (err) {
                        //console.log(err); BUG v1.2 (Not sure :v)
                        e = '';
                    }

                    // Execution: @var x as target react value (origin) replace by @var e (evaluated)
                    if (!xss) {
                        if (typeof e == 'string') {
                            e = window.Elode.xss(e);
                        }
                    }

                    x = x.replace(r[i], e);
                }

                // Execution: set evaluated value into HTMLElement
                if (target.constructor == "function Text() { [native code] }") {
                    if (!xss) x = window.Elode.xss(x);
                    // Case: HTMLTextElement, there's no innerHTML
                    if (x != target.textContent) target.textContent = x;
                } else {
                    // Case: HTMLElement, most used for interactive
                    if (x != target.innerHTML) target.innerHTML = x;
                }
            }
        }
        /* @evaluate - END */


        // Execution: if there's __react__ on element (required)
        if (element.__react__ != null) {
            // @var ch, represent element's childNodes
            var ch = element.childNodes,
                i; // @var i (number), for loop

            // Check: if @var ch has length (there's children on element)
            if (ch != null && ch.length > 1 && !element.__xss__) {
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
        @ELODE_INTERNAL - sensitive elode function from core
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
                // Define: __react__ as a textContent of target (origin)
                if (!target.__react__ && !target.textContent.includes("!elode_"))
                    target.__react__ = target.textContent;
            }
            // Fixed: BUG v1.1 Each Reactive Sensitive Syntax Case
            else {
                // Define: replace the sensitive syntax case at reactive expressions
                if (!target.__react__ && !target.textContent.includes("!elode_"))
                    target.__react__ = target.innerHTML.split('&gt;').join('>')
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
        @ELODE_UTILITIES - an utilities from elode, that important use.
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
        @f_frame - make frame time callback

        @param
        - time (number) - countdown
        - callback (function) - runtime until time leave

        @return void
    */
    function f_frame(time, callback, tick, out) {
        if (tick == null) tick = 100;
        var i = 0, frame =
            setInterval(function () {
                i += tick;
                if (i > time) {
                    if (out) out();
                    clearInterval(frame);
                }
                if (callback) callback();
            }, tick);
    }

    /* 
        @QUERY_SEARCH - search query expression like [attr] (expr) {js}
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
            i, j, // @var i,j (number), index for loop
            k, // @var k (string), key of expression
            v, // @var v (string), value of expression
            r = [], // @var r, record of replacement
            skip = []; // @var skip, for skip splitted query.

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
                var T = t.split(descriptor.split);
                // for loop to do recording all of the split value
                for (i = 0; i < T.length; i++) {
                    found(T[i]); // record the split value by @found function for case split [split, ...]
                    skip.push(t); // push the split query to skip array for do skip splitted query case
                }
            } else {
                found(t); // record the split value by @found function for case single [source]
            }

        }

        /* Execution: for loop case, do the source recording by @found function
          and going to modify source then return it as a modified source */
        for (i = 0; i < target.length; i++) {
            t = target[i].substring(1, target[i].length - 1);

            /* Check: if there's @param descriptor, property next. Then do @found function
             the parameter include @found (trimmed target, index, original target) */
            if (descriptor.next != null) found(t, i, target[i]);

            // All replacement case, that not include splitted query to be found
            if (descriptor.all) {
                for (j = 0; j < skip.length; j++) {
                    if (t != skip[j]) {
                        found(t, i, target[i]);
                    }
                }
            }

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
        @ES5_POLYFILLS - for fix EcmaScript support on IE < 9
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
        @SYMBOL_BETWEEN_ALGORITHM v1.3 (7-06-2023)
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
    @ElodeHook Thread - Invoked Function
    this function makes a directive/shortcut feature
    on some Elode.js procedure.
*/
(function _Elode_Hook_() {

    // Set hookable data from reactive/reference
    function setHookData(el, data, value) {
        if (data.trim()[0] == '$') {
            window[data.trim().substring(1)](value)
        }
        else if (el[data]) {
            el[data] = value;
        } else {
            el.root[data] = value;
        }
        el.react();
    }

    // Get hookable data from reactive/reference
    function getHookData(el, data) {
        if (data == null) return null;

        if (data.trim()[0] == '$') {
            return window[data]
        }
        else if (el[data]) {
            return el[data]
        } else {
            return el.root[data];
        }
    }

    // [on:event function] - bring event handler directive
    window.Elode.__hook__.on = {};
    for (var x in HTMLElement.prototype) {
        if (x.substring(0, 2) == "on") {
            var name = x.substring(2);
            eval(`window.Elode.__hook__.on.` + name + ` = function(el, data){
                el.on("`+ name + `", function () {
                    try {
                        // Case: SELF
                        eval("this." + data.trim());
                    } catch (err) {
                        // Case: ROOT
                        eval("this.root." + data.trim());
                    }
                });
            };
            `);
        }
    }

    // [anim:action time] - bring animation directive
    window.Elode.__hook__.anim = {};
    var anims = {
        fade_in: "fadeIn", fade_out: "fadeOut"
    };
    for (var x in anims) {
        eval(`window.Elode.__hook__.anim.` + x + ` = function(el, data){
            time = getHookData(el, data);
            if(time==null) time = data;
            
            el.anim.`+ anims[x] + `(time);
        };
        `);
    }

    /* @ElodeHook Includes - Standard Directive */
    window.Elode.hook({

        // [:attr attribute] - Reactive attribute manipulation
        attr(el, data) {
            el.__proto__.__attr = data;
            var fun = el.onReact;
            el.onReact = function () {
                if (fun) fun();
                var i, k, v, data = getHookData(el, el.__proto__.__attr);
                if (data == null) return;

                if (typeof data == 'string' &&
                    data.includes("|")) data = data.split("|");

                if (data.constructor == Object) {
                    for (i in data) {
                        k = i;
                        v = data[i].trim();
                        if (v != '') el.attr(k, v);
                        else el.removeAttribute(k);
                    }
                }
                else if (data.constructor == Array) {
                    for (i = 0; i < data.length; i++) {
                        k = data[i].trim().split(" ")[0].trim();
                        v = data[i].trim().replace(k, '').trim();
                        if (v != '') el.attr(k, v);
                        else el.removeAttribute(k);
                    }
                } else {
                    k = data.split(" ")[0].trim();
                    v = data.replace(k, '').trim();
                    if (v != '') el.attr(k, v);
                    else el.removeAttribute(k);
                }
            }
        },

        // [:def key=value] - Define some reactive data
        def(el, data) {
            var i, x;
            data = data.split(",");
            for (i in data) {
                if (data[i].includes(":")) {
                    var fun = el.onReact;
                    el.onReact = function () {
                        if (fun) fun();
                        x = data[i].split(":");
                        el[x[0]] = getHookData(el, x[1]);
                    };
                }
                try {
                    eval("el." + data[i]);
                } catch (err) { }
            }
            el.react();
        },

        // [:memo data,...] - Define memorable react-data
        memo(el, data) {
            var fun = el.onCreate;
            el.__proto__.__memo = data;
            el.onCreate = function () {
                if (fun) fun();
                if (el.__proto__.__memo.includes(" ")) {
                    el.__proto__.__memo = el.__proto__.__memo.split(" ");
                    for (var i = 0; i < el.__proto__.__memo.length; i++) {
                        el.memo(el.__proto__.__memo[i]);
                    }
                }
                el.memo(el.__proto__.__memo);
            }

        },

        // [:model data] - Input model bind a reactive data
        model(el, data) {
            var i, index = 0, val;

            if (el.constructor == HTMLInputElement) {
                el.on("input", function () {
                    val = el.val();
                    if (el.attr().type) {
                        if (el.attr().type.value == "checkbox")
                            val = el.checked;
                        else if (el.attr().type.value == "radio") {
                            for (i = 0; i < el.root.node.length; i++) {
                                if (el.root.node[i] == el) val = index;
                                if (el.root.node[i].attr().type &&
                                    el.root.node[i].attr().type.value === "radio") index++;
                            }
                        }
                        else if (el.attr().type.value == "file")
                            val = el.files;
                    }
                    setHookData(el, data, val);
                });
            }
            else if (el.constructor == HTMLSelectElement) {
                el.on('input', function () {
                    val = el.selectedOptions;
                    setHookData(el, data, val);
                });
            }
        },

        // [:seen visible] - Dynamic show/hide with reactive
        seen(el, data) {
            el.__proto__.__seen = data;
            var fun = el.onReact;
            el.onReact = function () {
                if (fun) fun();
                el.seen(getHookData(el, el.__proto__.__seen));
            }
        },

        // [:for array] - array manipulation based on Array.map and @ElodeMap
        for(el, data) {
            if (data == null || data == '') return;
            var k, v, db;
            db = data.split("in");
            k = db[0].trim();
            v = data.replace(k, '').substring(3).trim();

            db = getHookData(el, v);
            if (db == null || db && db.constructor !== Array) return;

            el[k] = db[0];
            el.index = 0;
            el.__query__ = el.__query__.split(":for " + data).join(":for");
            db.__key__ = k;
            db.__value__ = el;

            window.Elode.map(el.root, db,
                (value, index) => {
                    var e = array.__value__.clone();
                    e[array.__key__] = value;
                    e.index = index;
                    return e;
                }
            );

            el.root.node[0].destroy();
        },

        // [:do action] - Action to manipulate your element at first creation
        do(el, action) {
            el.__proto__.__do = action;
            var fun = el.onCreate;
            el.onCreate = function () {
                if (fun) fun();
                eval("this." + el.__proto__.__do);
            }
        },

        // [:if condition | :then action | :else action] - if-then-else handler
        if(el, data) {
            var fun = el.onReact;
            el.__proto__.__ifdef = data;
            el.onReact = function () {
                if (fun) fun();
                try {
                    el.__proto__.__if = eval(getHookData(el, el.__proto__.__ifdef));
                    if (el.__proto__.__if) {
                        eval("this." + el.__proto__.__then);
                    } else {
                        eval("this." + el.__proto__.__else);
                    }
                } catch (err) { }

            };
        },
        then(el, action) {
            el.__proto__.__then = action;
        },
        else(el, action) {
            el.__proto__.__else = action;
        },

        // [:once] - No reactive update
        once(el) {
            if (el.__react__)
                el.__react__ = null;
        },

        // [:delay time action] - do action but at time delay
        delay(el, data) {
            var time, action;
            action = data.split(' ');
            time = action[0].trim();
            action = data.replace(time, '');

            el.delay(eval(time), function (el) {
                eval("el." + action);
            });

        }

    });

})();

/* 
    elode.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
*/