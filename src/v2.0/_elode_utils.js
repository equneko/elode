/* 
    ELODE UTILITIES - an utilities from elode, that important use.
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

/* _elode_utils.js
    
   @contributors
   - equneko (Muhammad Alfajri Arraihan)
*/