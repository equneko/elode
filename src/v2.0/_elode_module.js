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

/* _elode_module.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/