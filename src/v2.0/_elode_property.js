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

/* _elode_property.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/