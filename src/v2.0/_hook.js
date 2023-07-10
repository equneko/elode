/* 
    @HOOK
    this script makes a directive/shortcut feature
    on some Elode.js procedure. (Standard Elode Hook)
*/

// Set hookable data from reactive/reference
function setHookData(el, data, value) {
    if (data[0] == "*") {
        var i, c = c_char(data, "*");
        for (i = 0; i < c.len; i++) {
            c.str = "root." + c.str;
        }
        data = c.str;
    }

    if (data.trim()[0] == '$') {
        return eval("window." + data + " = value;");
    }
    try {
        if (el[data]) {
            eval("el." + data + " = value;");
        } else {
            eval("el.root." + data + " = value;");
        }
    } catch (err) {
    }
}

// Get hookable data from reactive/reference
function getHookData(el, data) {
    if (data == null) return null;

    if (data[0] == "*") {
        var i, c = c_char(data, "*");
        for (i = 0; i < c.len; i++) {
            c.str = "root." + c.str;
        }
        data = c.str;
    }

    if (data.trim()[0] == '$') {
        return eval("window." + data);
    }
    try {
        return eval("el." + data);
    } catch (err) {
        try {
            return eval("el.root." + data);
        } catch (err) {
            return eval(data);
        }

    }
}

// [on:event function] - bring event handler directive
window.Elode.__hook__.on = {};
for (var x in HTMLElement.prototype) {
    if (x.substring(0, 2) == "on") {
        var name = x.substring(2);
        eval("window.Elode.__hook__.on." + name + " = function(el, data){\n" +
            "el.on('" + name + "', function () { var exec = data.replace(/[^a-zA-Z0-9 ]/g, '');\n" +
            "try { \n" +
            "if(this[exec]==null||isNaN(this[exec])) eval('this.root.' + data.trim());\n" +
            "else eval('this.'+ data.trim());\n" +
            "} catch (err) {\n" +
            "}\n" +
            "});\n" +
            "};"
        );
    }
}

// [anim:action time] - bring animation directive
window.Elode.__hook__.anim = {};
var anims = {
    fade_in: "fadeIn", fade_out: "fadeOut"
};
for (var x in anims) {
    eval("window.Elode.__hook__.anim." + x + " = function(el, data){\n" +
        "var time = getHookData(el, data);\n" +
        "if(time==null) time = data;\n" +

        "el.anim." + anims[x] + "(time);\n" +
        "};"
    );
}

/* @ElodeHook Includes - Standard Directive */
window.Elode.hook({

    // [:attr attribute] - Reactive attribute manipulation
    attr: function (el, data) {
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
    def: function (el, data) {
        var i, x;
        if (el.__property__ == null)
            el.__property__ = {};
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
                eval("el.__property__." + data[i]);
            } catch (err) { }
        }
        el.react();
    },

    // [:memo data,...] - Define memorable react-data
    memo: function (el, data) {
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
    model: function (el, data) {
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
    seen: function (el, data) {
        el.__proto__.__seen = data;
        var fun = el.onReact;
        el.onReact = function () {
            if (fun) fun();
            el.seen(getHookData(el, el.__proto__.__seen));
        }
    },

    // [:for array] - array manipulation based on Array.map and @ElodeMap
    for: function (el, data) {
        if (data == null || data == '' || el.__query__ == null) return;
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
            function (value, index) {
                var e = array.__value__.clone();
                e[array.__key__] = value;
                e.index = index;
                return e;
            }
        );

        el.root.node[0].destroy();
    },

    // [:do action] - Action to manipulate your element at first creation
    do: function (el, action) {
        el.__proto__.__do = action;
        var fun = el.onCreate;
        el.onCreate = function () {
            if (fun) fun();
            eval("this." + el.__proto__.__do);
        }
    },

    // [:if condition | :then action | :else action] - if-then-else handler
    if: function (el, data) {
        var fun = el.onReact;
        el.__proto__.__ifdef = data;
        el.onReact = function () {
            if (fun) fun();

            try {
                el.__proto__.__if = getHookData(el, el.__proto__.__ifdef);
                if (el.__proto__.__if) {
                    eval("this." + el.__proto__.__then);
                } else {
                    if (el.__proto__.__else != null) eval("this." + el.__proto__.__else);
                }
            } catch (err) { }

        };
    },
    then: function (el, action) {
        el.__proto__.__then = action;
    },
    else: function (el, action) {
        el.__proto__.__else = action;
    },

    // [:once] - No reactive update
    once: function (el) {
        if (el.__react__)
            el.__react__ = null;
    },

    // [:delay time action] - do action but at time delay
    delay: function (el, data) {
        var time, action;
        action = data.split(' ');
        time = action[0].trim();
        action = data.replace(time, '');

        el.delay(eval(time), function (el) {
            eval("el." + action);
        });

    }

});
/* 
    _hook.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
    - AdiPutra
*/