(function _Elode_Hook_() {

    Elode.hook.on = {};
    for(var x in HTMLElement.prototype){
        if(x.substring(0,2)=="on"){
            var name = x.substring(2);
            eval(`Elode.hook.on.`+name+` = function(el, data){
                el.on("`+name+`", function () {
                    try {
                        eval("this." + data.trim());
                    } catch (err) { }
                });
            };
            `);
        }
    }

    Elode.hook({

        def(el, data) {
            data = data.split(",");
            for (var i in data) {
                try {
                    eval("el." + data[i]);
                } catch (err) { }
            }
            el.react();
        },

        model(el, data) {
            if (el.constructor == HTMLInputElement) {
                el.on("input", function () {
                    if (el[data]) {
                        el[data] = el.val();
                        el.react();
                    } else {
                        el.root[data] = el.val();
                        el.root.react();
                    }
                });
            }
        },

        seen(el, data) {
            el.onReact = function () {
                if (data[0] == '$') {
                    el.seen(window[data]);
                }
                if (el[data] != null) {
                    el.seen(el[data]);
                } else if (el.root[data] != null) {
                    el.seen(el.root[data]);
                }
            }
        }

    });

})();

