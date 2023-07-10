/* 
    AllyLoad.js (Source v1.0) - A Simple Lazy Loading Implementation
    this experimental test for load your files like <link> or <script>
    in one time load (OTL) or it's called lazyload.

    Using simple technique:
    - generating arguments list
    - document.body/head Injection
*/
var AllyLoad = function () {
    var i, args = arguments;
    if (args.length > 0) {
        for (i = 0; i < args.length; i++) {
            if (args[i] != null) {
                if (typeof args[i] == 'string') {
                    load(args[i]);
                } else {
                    load(args[i][0], args[i][1]);
                }
            }
        }
        return {
            bye(selector){
                document.querySelector(selector).remove();
            }
        }
    }
    function load(source, custom) {
        var el = null, bef = null;
        if (!custom) custom = {};
        
        if(!custom.js_type) custom.js_type = "text/javascript";
        if(!custom.css_type) custom.css_type = "text/css";

        if (source.indexOf(".js") != -1) {
            el = document.createElement("script");
            el.src = source;
            el.type = custom.js_type;

            if(custom.head){
                document.head.appendChild(el);
                return;
            }

            bef = document.body.getElementsByTagName('script');
            if (bef.length > 1) {
                document.body.insertBefore(el,bef[0]);
            } else {
                document.body.appendChild(el);
            }

        } else {
            el = document.createElement("link");
            el.href = source;
            el.type = custom.css_type;
            el.rel = "stylesheet";

            document.head.appendChild(el);
        }
    }
}
/* 
    allyload.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
*/