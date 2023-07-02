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
            i, ident = " ", match = "", reg = "";

        if (attrib == "style" || attrib.includes("on")) ident = ";";

        if (attr == null) {
            element.attr(attrib, "");
            attr = element.attr(attrib);
        }

        if (value.constructor == Array) {
            for (i = 0; i < value.length; i++) {
                element.toggle(attrib, value[i]);
            }
        } else {
            reg = '/\^(' + value.trim() + ')|\\\s+('
                + value.trim() + ')|\\\s+(' + value.trim() + ')\$/g';

            match = eval('attr.match(' + reg + ')')
            if (match) {
                /* FIX BUG v1.3 TOGGLE REPLACE ALL CHARACTER WITH A SAME EXAMPLE 
                    class="bg-dark dark" wants to toggle just "dark"
                    but the result's "bg-" it means that bg-dark is replaced too :v

                    OLD CODE: attr.replace(value.trim(), '')
                */
                eval('attr = attr.replace(' + reg + ',"")');

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

/* _elode_property.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/