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
        i, // @var i (number), index for loop
        k, // @var k (string), key of expression
        v, // @var v (string), value of expression
        r = []; // @var r, record of replacement

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
            t = t.split(descriptor.split);
            // for loop to do recording all of the split value
            for (i = 0; i < t.length; i++) {
                found(t[i]); // record the split value by @found function for case split [split, ...]
            }
        } else {
            found(t); // record the split value by @found function for case single [source]
        }

    }

    /* Execution: for loop case, do the source recording by @found function
      and going to modify source then return it as a modified source */
    for (i = 0; i < target.length; i++) {

        /* Check: if there's @param descriptor, property next. Then do @found function
         the parameter include @found (trimmed target, index, original target) */
        if (descriptor.next != null) found(target[i].substring(1, target[i].length - 1), i, target[i]);

        // Check: the length of @var r (array) if the length was small than zero then do (blank) source replacement
        if (r.length <= 0) source = source.replace(target[i], '');

        // Else: do source replacement by @var r (array) defined external input from @found function
        else source = source.replace(target[i], r[0]);

        r = []; // Define: reset @var r from begin of array []

        if (!descriptor.all) break; // Check: if the @param descriptor option all's false, then break the loop (for once search query)
    }

    return source; //Return: @param source-modified (string)
}

/* _query_search.js
    
   @contributors
   - equneko (Muhammad Alfajri Arraihan)
*/