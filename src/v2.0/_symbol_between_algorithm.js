/* 
    SYMBOL BETWEEN ALGORITHM v1.2 (10-10-2022)
    ~ Find perfect value between custom symbol. Without RegExp ~
    EX: {this yes} this not {{this yes too}}

    @params
    - source (string): target for find the symbol
    - symbols (string): which symbol between [0], [1] to find on the source
    - callback (function): for debugging purpose

    @return array
*/

function SymbolBetweenAlgorithm(source, symbol, callback) {
    var e = [], // @var e, recorder of value between symbol
        i, // @var i (number), for loop purpose
        j = 0, // @var j, recursive number
        k, // @var k (number), tag for symbol location 
        l, // @var l  (boolean), loop recorder
        v = "", // @var v, value recorder
        z = source.trim(), // @var z, tag for source of symbol
        _E = "Symbol Between Algorithm Error"; // @var _E, error tag

    /* @param symbol tranform to char_array[2] symbol[0] and symbol[1]
        it's means (Opening Symbol) and (Closing Symbol) separated by comma */
    symbol = symbol.trim().split(",");

    // Validation: check if 'source' not have symbol between char_array of symbol[i] [0][1]
    if (!source.includes(symbol[0]) && !source.includes(symbol[1])) return null;
    
    /* Validation: check if 'source' have symbol[1] between char_array of symbol[i] [0][1] 
      (Second Symbol Case) (Opening Symbol Error) */
    if (!source.includes(symbol[0]) && source.includes(symbol[1])) {
        return _error_(_E + ": Symbol Not Found! for '" + symbol[0] + "'");
    }

    /* Validation: check if 'source' have symbol[0] between char_array of symbol[i] [0][1] 
      (First Symbol Case) (Closing Symbol Error) */
    if (source.includes(symbol[0]) && !source.includes(symbol[1])) {
        return _error_(_E + ": Symbol Not Found! for '" + symbol[1] + "'");
    }

    /* Execution: Alogrithm Process, @param source transform to char_array[i]
       separated by blank_char to execute each of all char on the source*/
    source = source.trim().split("");

    // Execution: Finding the symbol[0][1] at the source[i] with for loop
    for (i = 0; i < source.length; i++) {

        // Case: Open symbol, which source[i] equals symbol[0]
        if (source[i] === symbol[0]) {
            l = true; // @var l, key of recording case (start record)
            j += 1;  // @var j, recursive opening symbol
        }

        // Record: Start recording char by char at first opening symbol[0] when key @var l is true
        if (l) { v += source[i]; }

        // Case: Close symbol, end the recording when source[i] equals symbol[1]
        if (source[i] === symbol[1]) {
            /* Case: Recursive closing, if the @var j bigger than 1 
               that means there's recursive opening symbol { { value } } */
            if (j > 1) {
                j -= 1; // Decrement the recursive number (once)
            } else {
            // Case: End the recording without recursive case.
                l = false;
                e.push(v.trim()); // @var e (array), recorder push the recorded value between symbol
                v = ""; // @var v (string), recorded value reset to blank string
                j = 0;  // @var j (number), recursive symbol validation reset to 0
                k = i; // @var k (number), tag for location of symbol purpose
            }
        }
    }

    /* Case: Error, if there's no closing symbol. cause by recursive
      EX: if the symbol closing's not same as opening like this, {{im value} the closing's -1 */
    if (j == 1) {
        // Debugging: if there's a callback function, do debugging and log the location of symbol error.
        if (callback != null) callback(_E + ": No Closing Symbol! at " + z.substring(k + 1));
        // Return: null
        return null;
    }

    return e; // Return: @var e, list of founded value (array)
}

/* _symbol_between_algorithm.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/