/* 
    Elode.js (Source) - v1.2 (Release: 29-11-2022) 
    ~ A unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -
*/
(function(_doc,_win){ 'use strict';

    /* SYMBOL BETWEEN ALGORITHM v1.2 (10-10-2022)
       ~ Find perfect value between custom symbol. Without RegExp ~
       EX: {this yes} this not {{this yes too}}
    */
    function _SBA_(a,b,c){ //a - target,  b - symbol, c - debugging
       var e=[],i,j=0,k,l,v,z=a.trim(), _E = "Symbol Between Algorithm Error";
       b = b.trim().split(",");
       //Validation: check if 'a' have symbol b[i]
       if(!there(a,b[0])&&!there(a,b[1]))return null;
       if(!there(a,b[0])&&there(a,b[1])){
        return _error_(_E+": Symbol Not Found! for '"+b[0]+"'");
       }
       if(there(a,b[0])&&!there(a,b[1])){
        return _error_(_E+": Symbol Not Found! for '"+b[1]+"'");
       }
       //Execution: Alogrithm Process
       a = a.trim().split(""); v = "";
       for(i = 0; i < a.length; i++){
           if(a[i]===b[0]){ //Open Symbol
               l = true; j+=1;
           }
           if(l){ v+= a[i]; } //Record Value
           if(a[i]===b[1]){ //Close Symbol
               if(j>1){
                   j-=1;
               }else{
                   l = false;
                   //Close Tags
                   e.push(v.trim()); 
                   v = ""; j = 0; k = i;
               }
           }
       }
       //check if error closing symbol
       if(j==1){
        if(c!=null)c(_E+": No Closing Symbol! at "+z.substring(k+1)); 
        return null;
       }
       return e; //Return list of founded value (Array)
    }

    /* Usefull Elode Functions Built-in ES5 for Old Web Browser Support */
    function there(a,b){ return (a.indexOf(b)>-1); } //String.includes() implementation
    /* ES5 POLYFILLS */
    if (!Object.keys) {
        Object.keys = function(obj) {
          var keys = [];
          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              keys.push(i);
            }
          }
          return keys;
        };
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
    /* END POLYFILSS */
    function query_search(a,b,c,e){//search query expression like [attr] (expr) {js}
        //a - target, b - source, c - callback, e - description
        if(b==null)return a;
        var t, i, k, v, r=[];
        function found(x,y,z){ //found execution
            v = x.trim().split(' ');
            k = v[0].trim(); //Key
            v = x.trim().replace(k,''); //Value
            c({k:k.trim(), v:v.trim(), r:r, i:y, z:z}); //r Return - i Index - z Special Descriptor
        }
        if(e.dont==null){
        t = b[0].substring(1,b[0].length-1); //source substring
        if(e.split!=null){
            t = t.split(e.split);
            for(i = 0; i < t.length; i++){
                found(t[i]); //case split [a,b]
            }
        }else{
            found(t); //case single [a]
        }}
        for(i = 0; i < b.length; i++){
            if(e.dont!=null)found(b[i].substring(1,b[i].length-1),i,b[i]);
            if(r.length<=0)a = a.replace(b[i],'');
            else a = a.replace(b[i],r[0]);
            r = [];
            if(!e.all)break; //if not all replacement
        } 
        return a; //return replaced target (String)
    }
    function set_obj(a,b,c,e){ //object set
        //a - target, b - key, c - source
        if(a!=null && b!=null && c !=null){
            var x = c.constructor == Object ? Object.keys(c) : null, i;
            if(e && x!=null){
                for(i = 0; i < x.length; i++){
                    set_obj(a,b+"."+x[i],c[x[i]]);
                }
            }else{
                //eval("a."+b+" = c"); BUG for IE < 9
                a[b] = c; //FIXED
            }
        }
        return a; //return modified object
    }
    function c_char(a,b){ //find and count character
        //a - target, b - character
        var i,j=0; for(i = 0; i < a.length; i++){ j+=1; if(a[i]!=b) break;}
        return {str:a.trim().substring(i),len:j};
    }
    //Elode Transform for reactive expression
    function elode_react($,x){
        try{ //Fix IE < 9 (Object failed)
            if($.constructor=="function Text() { [native code] }")$.elodeBase = $.textContent;
            //FIXED BUG FOR REACTIVE SYNTAX CASE
            else $.elodeBase = $.innerHTML.split('&gt;').join('>')
            .split('&lt;').join('<').split('&amp;').join('&');
            if(x!=null)$.elodeBase = x;
        }catch(err){
            console.log(err);
        }
        var xc = $.childNodes, i;
        if(xc!=null&&xc.length>0){
           for(i = 0; i < xc.length; i++){
              elode_react(xc[i],x);
              _property_(xc[i]); //FIXED NOT ALL ADAPTED ELODE FUNCTIONS
           }
        }
     }
     //Elode Property for managing properties
     function elode_prop($,el,e){
        var x = $!=null ? Object.keys($) : null, n, i, j;
        if(x != null){
            for(i = 0; i < x.length; i++){
                set_obj(el,x[i],$[x[i]],e);
                if(x[i]=="style"){
                    n = Object.keys($.style);
                    for(j = 0; j < n.length; j++){
                        set_obj(el.style,n[j],$.style[n[j]],e);
                    }
                }
            }
        }
     }

    /* Element Procedure [a - query] [b - property]*/
    function _element_(a,b){
		if(a==null&&b==null)return null;
		if(a.trim().length<=0)return 'undefined';
        var q = a.split(' '), qy = {a:'',b:''}, e = {tag:'',attr:{},prop:{},val:''}, el;

        /* Check Property */
        if(b!=null)e.prop = b;
        e.prop.elodeQuery = a;
        e.prop.elodeProperty = b;

        //First Check, if is'nt <style></style> Element
        if(q[0].trim() == "style"){
            el = _doc.createElement(q[0]);
            el.innerHTML = a.trim().replace(q[0],'');
            return _property_(el); //Return HTMLStyleElement
        }

        //Element Reactive: {javascript}
        qy.react = _SBA_(a,'{,}'); if(qy.react!=null)qy.reactives = [];
        a = query_search(a,qy.react,function($){
            var rep = "!elode_react"+$.i;
            qy.reactives.push({k:rep,v:$.z}); //Recording
            $.r.push(rep); //Replacing
        },{all:true,dont:true});

        //Element Attribute [class blue | style color:red]
        qy.attr = _SBA_(a,'[,]');
        if(qy.attr!=null&&qy.attr.constructor!=Array)return qy.attr;
        a = query_search(a,qy.attr,function($){
            if(($.k+$.v).trim().length<=0){
                e.attr = null;
            }else{
                e.attr[$.k] = $.v;
            }
        },{split:'|',all:false});

        //Reactivity: check if there are reactive javascript
        qy.react = qy.reactives!=null ? qy.reactives : null;
        if(qy.react != null){
            for(i = 0; i < qy.react.length; i++){
                a = a.replace(qy.react[i].k,qy.react[i].v);
            }
        }
        q = a.split(' '); qy.a = q[0].trim(); qy.b = a.replace(q[0],'');
        //Element ID
        if(there(qy.a,'#')){ 
            var x = qy.a.split('#')[1];
            if(there(x,'.')){ x = x.split('.')[0]; }
            qy.a = qy.a.replace('#'+x,''); 
            e.attr['id'] = x;
        }
        //Element Class
        if(there(qy.a,'.')){
            var x = qy.a.split('.'),
            y = x.toString(); qy.a = x[0];
            x = y.replace(x[0]+',','').replace(/,/g,' ');
            set_obj(e.attr,'class',x);
        }
        //Create Element
        e.tag = qy.a.trim(); e.val = qy.b.substring(1);
        if(e.tag.length<=0)e.tag = 'div'; //if tag defined as none
        try{
            el = _doc.createElement(e.tag);
        }catch(err){
            return _error_(err); //Error return
        }
        try{
            el.innerHTML = e.val;
        }catch(err){
            el.textContent = e.val; //FIXED Bug for IE < 9
        }
        //Attribute: check if there are attributes of element
        var k = e.attr!=null ? Object.keys(e.attr) : null, i, j;
        if(k != null){
            for(i = 0; i < k.length; i++){
                el.setAttribute(k[i],e.attr[k[i]]);
            }
        }
        //Append Element Creation
        elode_prop(e.prop,el);
        el = _property_(el);
        //Define React
        if(qy.react!=null)elode_react(el);
        var props = e.prop!=null ? e.prop : null, k, i, x = null;
        if(props!=null){ k = Object.keys(props);
            if(k!=null){ //Synchronize React Event
                for(i = 0; i < k.length; i++){
                    x = props[k[i]]; if(x==null)break;
                    if(x.constructor==Function&&k[i].substring(0,2)=="on"){
                     //Javascript Event Listener
                     try{ //FOR IE > 9
                        el.addEventListener(k[i].substring(2),
					    function(){
					      this.react();
                          //Reactive Callback
                          if(this.onReact!=null&&this.
                            onReact.constructor==Function){this.onReact();}
					   });
                     }catch(err){ //FIXED Event Listener for IE < 9
                        el.attachEvent(k[i],
					    function(){
						   this.react();
                           //Reactive Callback
                           if(this.onReact!=null&&this.
                            onReact.constructor==Function){this.onReact();}
					    });
                     }
                    }
                }
            }
        }
        return el; //Return HTML Element (DOM)
    }
	
	/* Component Procedure [a - query] [b - property] */
	function _component_(a,b){
		if(a==null&&b==null)return null;
		if(a.trim().length<=0)return 'undefined';

        //FIXED BUG FOR ELODE QUERY CHANGES to !elode_react0..
        var A = a; // <-- Saving First Query

        //Element Reactive: {javascript} FIXED BUG REACTIVE SYNTAX CASE
        var react = _SBA_(a,'{,}'), rep, qy; if(react!=null)qy = [];
        a = query_search(a,react,function($){
            rep = "!elode_react"+$.i;
            qy.push({k:rep,v:$.z}); //Recording
            $.r.push(rep); //Replacing
        },{all:true,dont:true});

		var el, c = _SBA_(a,"<,>",function($){el=_error_($);}),i,r = {}
		if(c==null&&el!=null) return el;
        else if(c==null&&el==null){
            a = _rereact_(a);
            return _element_(a,b);
        };

        //Re-Reactivity: check again if there are reactive javascript
        function _rereact_(X){ var j;
            react = qy!=null ? qy : null;
            if(react != null){
                for(j = 0; j < react.length; j++){
                    X = X.replace(react[j].k,react[j].v);
                }
            } return X;
        }

		r.hash = "!elode_"; r.child = {};
		for(i = 0; i < c.length; i++){
			r.child[r.hash+i] = _rereact_(c[i])
            .substring(1,_rereact_(c[i]).length-1);
			a = a.replace(c[i],r.hash+i);
		}

		el = _element_(_rereact_(a),b);
		if(el.id=="elode_error")return el;
        el.elodeQuery = A; 
        if(el.elodeProperty!=null)
        {el.elodeProperty.elodeQuery = A;}
		for(i = 0; i < c.length; i++){
            r.vdom = "<span id='elode_"+i+"'></span>";
            el.innerHTML = el.innerHTML.replace(r.hash+i,r.vdom);
			r.obj = _component_(r.child[r.hash+i]);
			el.replaceChild(r.obj,el.querySelector("#elode_"+i));
            r.obj.root = el;
		}
        //Define React
        elode_react(el);
		return el; //Return HTML Element (DOM)
	}

    /* Element Reactivity */
    function _react_($el){
        function evaluate(a){
            if(a.elodeBase==null)return null;
            var r = _SBA_(a.elodeBase,'{,}'), i,j,e,v,js,x;
            if(r!=null){ x = a.elodeBase;
                for(i = 0; i < r.length; i++){
                    v = r[i].substring(1,r[i].length-1);
                    js = _SBA_(v,'{,}');
                    if(js!=null){ 
                        for(j = 0; j < js.length; j++){
                            try{
                                var s = js[j].substring(1,js[j].length-1),c;
                                c = eval("a.parentNode."+s);
                                if(c==null||c==undefined){
                                    c = eval("a."+s);
                                }
                            }catch(err){c=null;} if(c==undefined)return;
                            if(typeof c == 'string')c = "'"+c+"'";
                            v = v.replace(js[j],c);
                        }
                    }
                    try{
                        e = _win.eval(v);
                    }catch(err){
                        console.log(err);
                    }
                    x = x.replace(r[i],e);
                }
                if(a.constructor=="function Text() { [native code] }"){
                    if(x!=a.textContent) a.textContent = x;
                }else{
                    if(x!=a.innerHTML) a.innerHTML = x;
                }
            }
        }
        if($el.elodeBase!=null){//Check if react's valid
            var ch = $el.childNodes, i;
            if(ch!=null && ch.length > 0){
                for(i = 0; i < ch.length; i++){
                    evaluate(ch[i]);
                }
            }
        }
    }

    /* Rendering to DOM [a - element] [b - target] */
    function _render_(a,b,c){
      if(b == '' || b == null){
       var bi = _doc.body, h = bi.children, l = h.length, i = 0, el = h[i];
             for(i = 0; i < l; i++){  el = h[i]; //Find - last element at html.body
                   if(el.constructor == "function HTMLScriptElement() { [native code] }")break;
               }
               //Render - at html.body (DOM)
               if(a.constructor == Array){
                   bi.insertBefore(a[0],el);
               }else{
                   bi.insertBefore(a,el);
               }
               return [a,b];
      }

      //Render - at html.#id (DOM-Spesific)
	  var x = b;
	  if(b.constructor==String)x = _doc.querySelector(b);
      if(a.constructor == Array){
        if(c) x.insertAdjacentElement("afterend",a[0]); //Insert after spesific element
       else x.appendChild(a[0]);
      }else{
        if(c) x.insertAdjacentElement("afterend",a);
        else x.appendChild(a);
      }

      //FIX ROOT NULL
      a.root = b;
        return [a,b]; //Return parameter itself (Array)
    }

    /* Elode Element Property [a - target]*/
    function _property_($el){ var i;
        //Elode - Namespaces | Short
        $el.root = $el.parentElement;
		$el.node = $el.children;
        $el.add = $el.appendChild;
        $el.del = $el.removeChild;
        $el.set = $el.replaceChild;
        $el.scope = $el.querySelectorAll;
        
        //Elode - Basic Feature (Method) | Useful Functions
        $el.attr = function(A,B){
           if(A == null && B == null) return $el.attributes;
           if(B == null)return $el.getAttribute(A);
           $el.setAttribute(A,B);
           if($el.parentNode!=null) return $el.parentNode;
           return $el;
        };
        $el.on = function(A,B){
           eval("$el.on"+A+" = B;");
           $el.addEventListener(A,function(){
               this.react(); if(this.root!=null)this.root.react();
           });
           return $el;
        };
        $el.class = function($){if($==null){return $el.classList;}return $el.attr("class",$);};
        $el.css = function($){if($==null){return $el.style;}return $el.attr("style",$);};
        $el.html = function($){ if($==null)return $el.outerHTML;
           else $el.innerHTML = $; return $el;
        };
        $el.txt = function($){ if($==null)return $el.innerText;
           else $el.innerText = $; return $el;
        };
        $el.val = function($){ if($==null)return $el.value;
           else $el.value = $; return $el;
        };
        $el.show = function(){$el.css().display=''; return $el;};
        $el.hide = function(){$el.css().display='none'; return $el;};
        $el.toggle = function(A,B){
           var attr = $el.attr(A), i;
           if(attr==null){ $el.attr(A,""); attr = $el.attr(A)}
           if(B.constructor==Array){
               for(i = 0; i < B.length; i++){
                   $el.toggle(A,B[i]);
               }
           }else{
               if(attr==null){$el.attr(A,""); attr = $el.attr(A)}
               if(there(attr,B)){
                   attr = attr.replace(B,"");
                   $el.attr(A,attr.trim());
               }else{
                   $el.attr(A,(attr+" "+B).trim());
               }
           }
           return $el;
        };
        $el.get = function($){
           if(typeof $ == 'number'){
               return _property_($el.node[$]);
           }else{
               return _property_($el.querySelector($));
           }
        };
        $el.cell = function($){
           var parent = $el.parentElement, cells = [];
           while(parent!=null&&parent.elodeProperty!=null){
               cells.push(parent);
               parent = parent.parentElement;
           }
           if($==null)return cells;
           return cells[(cells.length-1)-$];
        };
        $el.destroy = function($){
           //Remove Callback
           if($el.onDestroy!=null&&$el.onDestroy.constructor==Function)$el.onDestroy();
           if($==null)return $el.parentElement.removeChild($el);
           if(typeof $ == 'number'){
              return $el.removeChild($el.node[$]);
           }
           if($.constructor == Array){
              for(i = 0; i < $.length; i++){
                 $el.removeChild($[i]);
              }
              return;
           }
           return $el.removeChild($);
        };

        //Elode - New Element (CREATE) create new element (duplicate)
        var NEW = function($){ var x;
            if($el.elodeQuery!=null&&$el.elodeProperty!=null)
              x = _win.Elode($el.elodeQuery,$el.elodeProperty);
            else x = _property_($el.cloneNode(true));

            if($!=null)elode_prop($,x);
            return x;
        },
        //Elode - If Element (CHECK) show hide toggle
        IF = function($){
            if(typeof $ == 'string'){
                if($el[$])$el.show();
                else $el.hide();
            }else{
                if($)$el.show();
                else $el.hide();
            }
            return $el;
        },
        //Elode - For Element (DUPLICATE) create duplicate with extended
        FOR = function($,E){
            var el = $el.new(), e = E!=null? E:"div";
            $el = _win.Elode(e,{}); el.render($el);
            function _for(a,b,c){ var e,i; delete el[c];
                for(i = 0; i < b.length-1; i++){
                    e = el.new();
                    e[a] = b[(i+1)];
                    e.index = (i+1);
                    e.react(); e.render($el); delete e[c];
                }
            }
            $ = $.split(":");
            var x =  el[$[1].trim()], y = $[0].trim(),i;
            el[y] = x[0]; el.index = 0; $el[$[1].trim()] = el[$[1].trim()];
            el.react(); _for(y,x,$[1].trim());

            return $el;
        };

        /* Elode Apply Sensitive Keyword Function */
        eval("$el.new = "+NEW+";$el.if = "+IF+"; $el.for = "+FOR);

        //Elode - Property Element (PROP) | set element properties
        $el.prop = function(A){if(A!=null){elode_prop(A,$el,true);$el.react();} return $el;};

        //Elode - React Element (JS) | reactivity function
        $el.react = function(){_react_($el); return $el;};

        //Elode - Render Element (DOM) | a - bind (if blank = html.body)
        $el.render = function(A){
            _render_($el,A,false);
            //Check Reactive            
            $el.react();
            //Create Callback
            if($el.onCreate!=null){try{$el.onCreate();}catch(err){}}
            //Render Callback
            _rendering_($el);
            return $el; //Return itself (DOM)
        };

        var C = $el.childNodes;
        if(C!=null&&C.length>0){
           for(i = 0; i < C.length; i++){
              _property_(C[i]); //FIXED NOT ALL ADAPTED ELODE FUNCTIONS
           }
        }

        return $el;
    }

    /* Elode - Rendering Case (LOOP) */
    function _rendering_($el){
        if($el.onRender!=null&&$el.onRender.constructor==Function){
            var time = $el.interval!=null? $el.interval:1000, frame;

            $el.start = function(){ //start interval
                if($el.interval==null|
                    $el.interval==false)$el.interval=true;
                frame = setInterval(function(){
                    $el.onRender();
                    $el.react();
                },time); //Default 1 second
            };
            $el.start();

            $el.stop = function(){ //stop interval
                clearInterval(frame);
                $el.interval = false;
            };
        }
    }
    
    /* Elode - Application [a - app query] [b - app node] [c - app property]*/
    function _app_(a,b,c){
      var e = _win.Elode(a,c), v, k=a+' ', t, i; 
      for(i = 0; i < b.length; i++){
        if(b[i].constructor ==  String){
           t = _win.Elode(b[i],{});
        }else{
           t = b[i];
        }
        t.render(e); t.root = e;
        _property_(t); t.react();
        k += '<'+t.elodeQuery+'>';
      }
      try{ //Check that child component not null or empty
        v = _win.Elode(k,c);
        e.elodeQuery = k;
        e.elodeBase = v.elodeBase;
        v = null;
      }catch(err){
        return _error_("ElementError: Can't creating element for NULL Nodes | "+err);
      }
        e.react(); return e;
    };

    /* Error Logging Management */
    function _error_(err){ var str = "ELODE_ERROR \""+err+"\"",
        el = _win.Elode('div#elode_error() '+str); console.log(str);
        el.attr("style","color:red;background-color:black;padding:16px");
        return el;
    }

    /* Elode.js Module - A unique javascript library for creating HTML element  */
    _win.Elode = function _ElodeModule_(A,B){ if(A==null&&B==null)return; var el;
        if(typeof A == 'string' && A[0]=='!'){ //Elode - HTML Interpreter (Machine Learning :v)
            el = _doc.querySelector(A.substring(1));
            var skip = el.getAttribute('elode'), vdom = {el:[]}, c = el.innerHTML.trim(), i; c = c.split("\n");
			if(skip!=null){ //Skip Interpreter
			    el.removeAttribute('elode');
				try{vdom = _component_(skip.trim(),B);}catch(err)
				{vdom = _error_("{HTML INTERPRETER} "+err+
				" Maybe you forgot to insert a space identification between TAG and VALUE of ELEMENT "+skip);}
				el.innerHTML = vdom.outerHTML;
                elode_prop(B,el); elode_react(el); _react_(el);
				return _property_(el);
			}
            //Start Interpreter
            vdom.v = _element_('div',B);
            el.innerHTML = "";
            for(i = 0; i < c.length; i++){
                vdom.ab = c_char(c[i],' ');
                vdom.a = vdom.ab.str;
				vdom.b = vdom.ab.len;
                if(vdom.a.length<=0||vdom.a=='\t')continue;
                vdom.el.push([_element_(vdom.a,B),vdom.b]);
            }
            //Record Interpreter
            var rec = false, change = false, root = [], index = 0;
            for(i = 0; i < vdom.el.length; i++){
                var a = vdom.el[i][0],
                    b = vdom.el[i][1], n;
                if(i==0)root.push([a,b]);
                if(i>0){ //Start Record
                    n = vdom.el[i-1];
                    if(b > n[1]){ rec = true; //Recording
                        if(i>1){index += 1; root.push([n[0],n[1]]);}
                    }
                    if(b < n[1]){ //Pause Record
                        if(b == root[index][1]){
                            root[index] = [a,b];    
                            change = true;
                        }else{
                            index -= 1;
                            change = false;
                        }
                        if(b == root[0][1]){ // CHANGE - ALGORITHM RULES
                            index = 0;
                        }
                        if(index==0)rec = false; 
                        if(i>1)index -= 1;
                    }
                    if(b == n[1]){
                        root[index+1] = [a,b];
                    }
                }
                if(rec){ //Recorded
                    root[index][0].appendChild(a);
                }else{
                    if(i > 0 && b == root[0][1]){
                        root = []; index = 0; root[0] = [a,b]; //Stop Record
                    }
                    el.appendChild(root[index][0]); //Append to Recording
                }
            }
            elode_prop(B,el); elode_react(el); _react_(el); _property_(el)
			if(el.onCreate!=null){try{el.onCreate();}catch(err){}}
            _rendering_(el);
            return el; //Return HTML Interpreter (DOM)
        }
        if(typeof A == 'string' && A[0]=='_'){ //Elode - HTML Element Selector (single)
            el = _doc.querySelector(A.substring(1));
            if(B!=null){
                elode_prop(B,el); 
            } elode_react(el); _react_(el); _property_(el);
			if(el.onCreate!=null){try{el.onCreate();}catch(err){}}
            _rendering_(el);
            return el;
        }
        if(typeof A != 'string' && 
            there(A.constructor.toString(),"Element")){ //Elode - HTML Element
            el = A; elode_prop(B,el); elode_react(el); _react_(el);
            return _property_(el);
        }
        if(A.constructor==Array){ //Defined as Elode Root Node
            el = _app_(A[0],A.slice(1),B);
            return el;
        }
        el = A.split(' '); //Defined as HTML Element Style
        if(el[0].trim()=="style"){
            el = _element_(A,B);
            return el;
        }
        if(B!=null)el = _component_(A,B); //Elode - HTML Element
        else el = _component_(A); //Elode - Wihout Property
        return el; //Return HTML Element (DOM)
    };

})(document,window); //END - Elode.js