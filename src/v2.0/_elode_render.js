/* 
    ELODE RENDER - procedure to do rendering HTMLElement
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
    element.element = target;

    return [element, target]; // Return: array of both @param element and target
}

/* 
    ELODE RENDERING - lifecycle to listening Elode.render() procedure
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

/* _elode_render.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/