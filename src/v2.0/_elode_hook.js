/* 
    @ElodeHook Thread - Invoked Function
    this function makes a directive/shortcut feature
    on some Elode.js procedure.
*/
(function _Elode_Hook_() {

    // Set hookable data from reactive/reference
    function setHookData(el, data, value) {
        if (data.trim()[0] == '$') {
            window[data.trim().substring(1)](value)
        }
        else if (el[data]) {
            el[data] = value;
        } else {
            el.root[data] = value;
        }
        el.react();
    }

    // Get hookable data from reactive/reference
    function getHookData(el, data) {
        if (data == null) return null;

        if (data.trim()[0] == '$') {
            return window[data]
        }
        else if (el[data]) {
            return el[data]
        } else {
            return el.root[data];
        }
    }

    // [on:event function] - bring event handler directive
    window.Elode.__hook__.on = {};
    for (var x in HTMLElement.prototype) {
        if (x.substring(0, 2) == "on") {
            var name = x.substring(2);
            eval(`window.Elode.__hook__.on.` + name + ` = function(el, data){
                el.on("`+ name + `", function () {
                    try {
                        // Case: SELF
                        eval("this." + data.trim());
                    } catch (err) {
                        // Case: ROOT
                        eval("this.root." + data.trim());
                    }
                });
            };
            `);
        }
    }

    // [anim:action time] - bring animation directive
    window.Elode.__hook__.anim = {};
    var anims = {
        fade_in: "fadeIn", fade_out: "fadeOut"
    };
    for (var x in anims) {
        eval(`window.Elode.__hook__.anim.` + x + ` = function(el, data){
            time = getHookData(el, data);
            if(time==null) time = data;
            
            el.anim.`+ anims[x] + `(time);
        };
        `);
    }

    /* @ElodeHook Includes - Standard Directive */
    window.Elode.hook({

        // [:attr attribute] - Reactive attribute manipulation
        attr(el, data) {
            el.__proto__.__attr = data;
            var fun = el.onReact;
            el.onReact = function () {
                if (fun) fun();
                var i, k, v, data = getHookData(el, el.__proto__.__attr);
                if (data == null) return;

                if (typeof data == 'string' &&
                    data.includes("|")) data = data.split("|");

                if (data.constructor == Object) {
                    for (i in data) {
                        k = i;
                        v = data[i].trim();
                        if (v != '') el.attr(k, v);
                        else el.removeAttribute(k);
                    }
                }
                else if (data.constructor == Array) {
                    for (i = 0; i < data.length; i++) {
                        k = data[i].trim().split(" ")[0].trim();
                        v = data[i].trim().replace(k, '').trim();
                        if (v != '') el.attr(k, v);
                        else el.removeAttribute(k);
                    }
                } else {
                    k = data.split(" ")[0].trim();
                    v = data.replace(k, '').trim();
                    if (v != '') el.attr(k, v);
                    else el.removeAttribute(k);
                }
            }
        },

        // [:def key=value] - Define some reactive data
        def(el, data) {
            var i, x;
            data = data.split(",");
            for (i in data) {
                if (data[i].includes(":")) {
                    var fun = el.onReact;
                    el.onReact = function () {
                        if (fun) fun();
                        x = data[i].split(":");
                        el[x[0]] = getHookData(el, x[1]);
                    };
                }
                try {
                    eval("el." + data[i]);
                } catch (err) { }
            }
            el.react();
        },

        // [:memo data,...] - Define memorable react-data
        memo(el, data) {
            var fun = el.onCreate;
            el.__proto__.__memo = data;
            el.onCreate = function () {
                if (fun) fun();
                if (el.__proto__.__memo.includes(" ")) {
                    el.__proto__.__memo = el.__proto__.__memo.split(" ");
                    for (var i = 0; i < el.__proto__.__memo.length; i++) {
                        el.memo(el.__proto__.__memo[i]);
                    }
                }
                el.memo(el.__proto__.__memo);
            }

        },

        // [:model data] - Input model bind a reactive data
        model(el, data) {
            var i, index = 0, val;

            if (el.constructor == HTMLInputElement) {
                el.on("input", function () {
                    val = el.val();
                    if (el.attr().type) {
                        if (el.attr().type.value == "checkbox")
                            val = el.checked;
                        else if (el.attr().type.value == "radio") {
                            for (i = 0; i < el.root.node.length; i++) {
                                if (el.root.node[i] == el) val = index;
                                if (el.root.node[i].attr().type &&
                                    el.root.node[i].attr().type.value === "radio") index++;
                            }
                        }
                        else if (el.attr().type.value == "file")
                            val = el.files;
                    }
                    setHookData(el, data, val);
                });
            }
            else if (el.constructor == HTMLSelectElement) {
                el.on('input', function () {
                    val = el.selectedOptions;
                    setHookData(el, data, val);
                });
            }
        },

        // [:seen visible] - Dynamic show/hide with reactive
        seen(el, data) {
            el.__proto__.__seen = data;
            var fun = el.onReact;
            el.onReact = function () {
                if (fun) fun();
                el.seen(getHookData(el, el.__proto__.__seen));
            }
        },

        // [:for array] - array manipulation based on Array.map and @ElodeMap
        for(el, data) {
            if (data == null || data == '') return;
            var k, v, db;
            db = data.split("in");
            k = db[0].trim();
            v = data.replace(k, '').substring(3).trim();

            db = getHookData(el, v);
            if (db == null || db && db.constructor !== Array) return;

            el[k] = db[0];
            el.index = 0;
            el.__query__ = el.__query__.split(":for " + data).join(":for");
            db.__key__ = k;
            db.__value__ = el;

            window.Elode.map(el.root, db,
                (value, index) => {
                    var e = array.__value__.clone();
                    e[array.__key__] = value;
                    e.index = index;
                    return e;
                }
            );

            el.root.node[0].destroy();
        },

        // [:do action] - Action to manipulate your element at first creation
        do(el, action) {
            el.__proto__.__do = action;
            var fun = el.onCreate;
            el.onCreate = function () {
                if (fun) fun();
                eval("this." + el.__proto__.__do);
            }
        },

        // [:if condition | :then action | :else action] - if-then-else handler
        if(el, data) {
            var fun = el.onReact;
            el.__proto__.__ifdef = data;
            el.onReact = function () {
                if (fun) fun();
                try {
                    el.__proto__.__if = eval(getHookData(el, el.__proto__.__ifdef));
                    if (el.__proto__.__if) {
                        eval("this." + el.__proto__.__then);
                    } else {
                        eval("this." + el.__proto__.__else);
                    }
                } catch (err) { }

            };
        },
        then(el, action) {
            el.__proto__.__then = action;
        },
        else(el, action) {
            el.__proto__.__else = action;
        },

        // [:once] - No reactive update
        once(el) {
            if (el.__react__)
                el.__react__ = null;
        },

        // [:delay time action] - do action but at time delay
        delay(el, data) {
            var time, action;
            action = data.split(' ');
            time = action[0].trim();
            action = data.replace(time, '');

            el.delay(eval(time), function (el) {
                eval("el." + action);
            });

        }

    });

})();

/* 
    _elode_hook.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
    - AdiPutra
*/