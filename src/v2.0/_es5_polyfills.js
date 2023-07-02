/* 
    @ES5_POLYFILLS - for fix EcmaScript support on IE < 9
    here, there's usefull function prototype from for Elode.js purpose
    Object.keys() | String.includes() | String.trim()
*/

// Fix the Object.keys for IE < 9
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [], i;
        for (i in object) {
            if (obj.hasOwnProperty(i)) {
                keys.push(i);
            }
        }
        return keys;
    };
}

// Fix the String.includes for IE < 9
if (!String.prototype.includes) {
    String.prototype.includes = function (target) {
        return (this.indexOf(target) > -1);
    }
}

// Fix the String.trim for IE < 9
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
/* _es5_polyfills.js
    
    @contributors
    - equneko (Muhammad Alfajri Arraihan)
*/