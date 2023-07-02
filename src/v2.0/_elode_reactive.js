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

/* _elode_reactivity.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/