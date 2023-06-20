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
                                c, // @var c, represents to database source
                                h = null; // @var h, extra for HTML reactive

                            // Define: root/parent for database source
                            c = target.parentNode[s];

                            // Check: if there's no root/parent then do itself source
                            if (c == null || c == undefined) {
                                // Define: node/child (itself) for database source
                                c = target[s];
                            }
                        } catch (err) {
                            // Error: unknown error, then set to null
                            c = null;
                        }

                        // Case: if undef, then return void
                        if (c == undefined) return;

                        // Case: if HTML exists
                        if (c.constructor.toString().includes("Element")) h = c;

                        //Case: number check. if it's only number or alphabet
                        if (/^\d+$/.test(c)) c = c;
                        // Case: string check else
                        else c = "\"" + c + "\"";

                        // Execution: replace that react value by database reference value
                        v = v.replace(db[j], c);
                    }
                }

                // Execution: sensitive case using try to log unknown error
                try {
                    // Define: @var e as evaluated value.
                    e = window.eval(v) == undefined ? '' : window.eval(v);
                } catch (err) {
                    //console.log(err); BUG v1.2 (Not sure :v)
                }

                // HTML Reactive
                if (typeof e == 'string') {
                    if (e.includes("HTML") && e.includes("Element")) {
                        e = h.outerHTML;
                    } else {
                        // XSS Option to do no XSS Attack
                        if (window.Elode.XSSDefault) {
                            e = window.Elode.XSS(e);
                        }
                    }

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

/* _elode_reactivity.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/