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
/* _elode_internal.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/