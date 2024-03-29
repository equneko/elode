/* 
    @APPLICATION - Elode.js Application
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

/* _application.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/