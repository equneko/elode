/* 
    Elode.js (Source) - v1.1 (Release: 20-11-2022) 
    ~ An unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -
*/
(function(_doc,_win){ 'use strict';

    /* SYMBOL BETWEEN ALGORITHM v1.2 (10-10-2022)
       ~ Find perfect value between custom symbol. Without RegExp ~
       EX: {this yes} this not {{this yes too}}
    */
    function _SBA_(a,b,c){ //a - target,  b - symbol, c - debugging
       var e=[],i,j=0,k,l,v,z=fite(a), _E = "Symbol Between Algorithm Error";
       b = fite(b).split(",");
       //Validation: check if 'a' have symbol b[i]
       if(!there(a,b[0])&&!there(a,b[1]))return null;
       if(!there(a,b[0])&&there(a,b[1])){
        return _error_(_E+": Symbol Not Found! for '"+b[0]+"'");
       }
       if(there(a,b[0])&&!there(a,b[1])){
        return _error_(_E+": Symbol Not Found! for '"+b[1]+"'");
       }
       //Execution: Alogrithm Process
       a = fite(a).split(""); v = "";
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
                   e.push(fite(v)); 
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
    function fite(_x){ //String.trim() implementation
        if(_x==null||_x==undefined||_x=='')return "";
        var r = "", c = _x.split(''), i;
        for(i = 0; i < c.length; i++){
            if(c[i]!=' '&&c[i]!='\n'
			&&c[i]!='\t'){
                r = _x.substring(i);
                break;
            }
        }
        c = r.split('');
        for(i = c.length; i > 0; i--){
            if(c[i]!=' '&&c[i]!='\n'
			&&c[i]!='\t'){
                r = r.substring(0,i);
                break;
            }
        }
        return r;
    }
    /*Object.keys fixed for IE < 9 #code copied from stackoverflow by @jabclab
        https://stackoverflow.com/questions/18912932/object-keys-not-working-in-internet-explorer
    */
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
    function query_search(a,b,c,e){//search query expression like [attr] (expr) {js}
        //a - target, b - source, c - callback, e - description
        if(b==null)return a;
        var t, i, k, v, r=[];
        function found(x,y,z){ //found execution
            v = fite(x).split(' ');
            k = fite(v[0]); //Key
            v = fite(x.replace(k,'')); //Value
            c({k:fite(k), v:fite(v), r:r, i:y, z:z}); //r Return - i Index - z Special Descriptor
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
        return {str:fite(a.substring(i)),len:j};
    }
    //Elode Transform for reactive expression
    function elode_react($,x){
        try{ //Fix IE < 9 (Object failed)
            if($.constructor=="function Text() { [native code] }")$._elode_react = $.textContent;
            //FIXED BUG FOR REACTIVE SYNTAX CASE
            else $._elode_react = $.innerHTML.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
            if(x!=null)$._elode_react = x;
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

    /* Element Procedure [a - query] [b - property] [c - content] */
    function _element_(a,b){
		if(a==null&&b==null || a.constructor!=String)return null;
		if(fite(a).length<=0)return 'undefined';
        var q = a.split(' '), qy = {a:'',b:''}, e = {tag:'',attr:{},prop:{},val:''}, el;

        /* Check Property */
        if(b!=null)e.prop = b;
        e.prop._elode_query = a;
        e.prop._elode_property = b;

        //First Check, if is'nt <style></style> Element
        if(fite(q[0])=='style'){
            el = _doc.createElement(q[0]);
            el.innerHTML = fite(a.replace(q[0],''));
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
            if(fite(($.k+$.v)).length<=0){
                e.attr = null;
            }else{
                e.attr[$.k] = $.v;
            }
        },{split:'|',all:false});

        //Element Expression: (if seen) (for x:3)
        qy.expr = _SBA_(a,'(,)');
        if(qy.expr!=null&&qy.expr.constructor!=Array)return qy.expr;
        a = query_search(a,qy.expr,function($){ var r = {};
            $.k = $.k.toLowerCase();
            if($.k == 'if'){// if expression (if boolean)
                try { r.x = _win.eval(r.v); }catch(err){ r.x = false; return _error_(err); }
                if(r.x){
                    set_obj(e.attr,"style","display:;");
                }else{
                    set_obj(e.attr,"style","display:none;");
                } r = {};
            }
            if($.k == 'for'){//for expression (for x:length)
                r.x = $.v.split(':');
                try{ 
                    r.v = eval(r.x[1].replace('$',"e.prop."));
                }catch(err){ r.v = -1; return _error_(err);}
                if(r.v == undefined)r.v = null;
                if(r.v!= null && r.v.constructor==Array){
                    r.len = r.v.length;
                }
                if(typeof r.v == 'number'){
                    r.len = r.v; r.v = [];
                    for(r.i = 0; r.i < r.len; r.i++){
                        r.v.push(r.i);
                    }
                }

                e.attr['e_:for'] = (r.len-1)+" "+r.x[0];
                e.prop[r.x[0]] = r.v;
                e.prop["_index"] = 0; r = {};
            }
            if($.k == 'to'){//to expression (to x1,x2,x3)
                e.attr['e_:to'] = $.v;
            }
        },{split:'|',all:false});

        //Reactivity: check if there are reactive javascript
        qy.react = qy.reactives!=null ? qy.reactives : null;
        if(qy.react != null){
            for(i = 0; i < qy.react.length; i++){
                a = a.replace(qy.react[i].k,qy.react[i].v);
            }
        }
        q = a.split(' '); qy.a = fite(q[0]); qy.b = a.replace(q[0],'');
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
        e.tag = fite(qy.a); e.val = qy.b.substring(1);
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
        return el; //Return HTML Element (DOM)
    }
	
	/* Component Procedure [a - query] [b - property] */
	function _component_(a,b){
		if(a==null&&b==null)return null;
		if(fite(a).length<=0)return 'undefined';

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
            }
            return X;
        }

		r.hash = "!elode_"; r.child = {}; r.a = a;
		for(i = 0; i < c.length; i++){
			r.child[r.hash+i] = _rereact_(c[i])
            .substring(1,_rereact_(c[i]).length-1);
			a = a.replace(c[i],r.hash+i);
		}
		el = _element_(a,b);
		if(el.id=="elode_error")return el;
        el._elode_query = r.a; 
        if(el._elode_property!=null)
        {el._elode_property._elode_query = r.a;}
		for(i = 0; i < c.length; i++){
            r.vdom = "<span id='elode_"+i+"'></span>";
            el.innerHTML = el.innerHTML.replace(r.hash+i,r.vdom);
			r.obj = _component_(r.child[r.hash+i]); r.obj._root = el;
			el.replaceChild(r.obj,el.querySelector("#elode_"+i));
		}
        //Define React
        elode_react(el);
		return el; //Return HTML Element (DOM)
	}

    /* Element Reactivity */
    function _react_($el){
        function evaluate(a){
            if(a._elode_react==null)return null;
            var r = _SBA_(a._elode_react,'{,}'), i,j,e,v,js,x;
            if(r!=null){ x = a._elode_react;
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
                        //!BUG $el.innerHTML = _error_(err).outerHTML;
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
        if($el._elode_react!=null){//Check if react's valid
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
        return [a,b]; //Return parameter itself (Array)
    }
    
    /* Validate Rendering Expression [a - target] [b - bind] [c - condition] [d - descriptor]@app*/
	function _validate_(a,b,c,d){
        //Check Reactive
        _react_(a);
        var props = a._elode_property!=null ? a._elode_property : null, k, i, j, x, r, E;
        if(props!=null){ k = Object.keys(props);
            if(k!=null){ //Synchronize React Event
                for(i = 0; i < k.length; i++){
                    x = props[k[i]];
                    if(x.constructor==Function&&k[i].substring(0,2)=="on"){
                        //Javascript Event Listener
                        try{ //FOR IE > 9
                            a.addEventListener(k[i].substring(2),
						    function(){
							    this.react();
                                //Reactive Callback
                                if(this.onReact!=null&&this.onReact.constructor==Function){this.onReact();}
						    });
                        }catch(err){ //FIXED Event Listener for IE < 9
                            a.attachEvent(k[i],
						    function(){
							    this.react();
                                //Reactive Callback
                                if(this.onReact!=null&&this.onReact.constructor==Function){this.onReact();}
						    });
                        }
                    }
                }
            }
        }


        //Start Validate
		var exp = "e_:for", x = a.getAttribute(exp), i, l;
            if(x!=null){
                x = x.split(' ');
                a.removeAttribute(exp);
                //First Check
                try{
                    if(x[3]=='null'){
                        x[0] = eval("a."+x[1]+".length");
                    } eval("a."+x[1]+"=a."+x[1]+"[a._index]");
                }catch(err){}
                var __react = function($){
                    if($.parentNode!=null&&
                        $.parentNode._elode_react!=null)
                        $.parentNode.react();
                    else $.react();
                };
                __react(a);
                if(typeof x[0] == 'string')l = eval(x[0]);
                else l = x[0];
                //Next Check
                var _case = function(_i,_j){
                    var e = _component_(a._elode_query,a._elode_property);
                      e.removeAttribute(exp);
                      eval("e._index="+(_i+_j));
                      eval("e."+x[1]+"=e."+x[1]+"[e._index]");
                    _render_(e,b,c); _property_(e); __react(e); 
                    if(e.onCreate!=null){try{e.onCreate();}catch(err){}}
                };
                if(d==null) for(i = 0; i < l; i++)_case(i,1);
                else for(i = l; i > 0; i--)_case(i,0);
            }
            exp = "e_:to"; x = a.getAttribute(exp);
            if(x!=null){
                x = x.split(',');
                if(c)x = x.reverse(); //if inside more element, then reverse
                a.removeAttribute(exp);
                for(i = 0; i < x.length; i++)
                { var e = _win.Elode(x[i],a._elode_property); e.innerHTML = a.innerHTML;
                      e.removeAttribute(exp);
                    _render_(e,b,c); e.parentNode.react();
                }
            }

        //Element Create Callback
        _property_(a);
        if(a.onCreate!=null){try{a.onCreate();}catch(err){}}

        return a;
	}

    /* Elode Element Property [a - target]*/
    function _property_($el){ var i;
        //Elode - Basic Feature (Method) | Useful Functions
		$el._root = $el.parentElement;
		$el._node = $el.children;
        $el._add = $el.appendChild;
        $el._del = $el.removeChild;
        $el._set = $el.replaceChild;
        $el._scope = $el.querySelectorAll;
        $el._attr = function(A,B){
           if(A == null && B == null) return $el.attributes;
           if(B == null)return $el.getAttribute(A);
           $el.setAttribute(A,B);
           if($el.parentNode!=null) return $el.parentNode;
           return $el;
        };
        $el._on = function(A,B){
           $el.addEventListener(A,function(){
               B(this._root,this); this._root.react();
           });
           return $el;
        };
        $el._class = function($){if($==null){return $el.classList;}return $el._attr("class",$);};
        $el._css = function($){if($==null){return $el.style;}return $el._attr("style",$);};
        $el._html = function($){ if($==null)return $el.outerHTML;
           else $el.innerHTML = $; return $el;
        };
        $el._txt = function($){ if($==null)return $el.innerText;
           else $el.innerText = $; return $el;
        };
        $el._val = function($){ if($==null)return $el.value;
           else $el.value = $; return $el;
        };
        $el._show = function(){$el._css().display=''; return $el;};
        $el._hide = function(){$el._css().display='none'; return $el;};
        $el._toggle = function(A,B){
           var attr = $el._attr(A), i;
           if(B.constructor==Array){
               for(i = 0; i < B.length; i++){
                   $el._toggle(A,B[i]);
               }
           }else{
                if(attr==null){$el._attr(A,""); attr = $el._attr(A)}
               if(there(attr,B)){
                   attr = attr.replace(B,"");
                   $el._attr(A,fite(attr));
               }else{
                   $el._attr(A,fite(attr+" "+B));
               }
           }
           return $el;
        };
        $el._get = function($){
           if(typeof $ == 'number'){
               return _property_($el._node[$]);
           }else{
               return _property_($el.querySelector($));
           }
        };
        $el._cell = function($){
           var parent = $el.parentElement, cells = [];
           while(parent!=null&&parent._elode_property!=null){
               cells.push(parent);
               parent = parent.parentElement;
           }
           if($==null)return cells;
           return cells[(cells.length-1)-$];
        };
        $el._destroy = function($){
           //Remove Callback
           if($el.onDestroy!=null&&$el.onDestroy.constructor==Function)$el.onDestroy();
           if($==null)return $el.parentElement.removeChild($el);
           if(typeof $ == 'number'){
              return $el.removeChild($el._node[$]);
           }
           if($.constructor == Array){
              for(i = 0; i < $.length; i++){
                 $el.removeChild($[i]);
              }
              return;
           }
           return $el.removeChild($);
        };
        $el._new = function(){
            if($el._elode_query!=null&&$el._elode_property!=null)
            return _win.Elode($el._elode_query,$el._elode_property);
            else
            return _property_($el.cloneNode(true));
        }

        //Elode - Property Element (PROP) | set element properties
        $el.prop = function(a){if(a!=null){elode_prop(a,$el,true);$el.react();} return $el;};

        //Elode - React Element (JS) | reactivity function
        $el.react = function(){_react_($el); return $el;};

        //Elode - Render Element (DOM) | a - bind (if blank = html.body)
        $el.render = function(a){
            _render_($el,a,false);
			var v = _validate_($el,a,false);
			if(v!=null) $el = v;
            
            //Validrule - validate render expression, x - children
            function validrule(x){ var i,y,z;
              y = x.children; 
              if(y!=null){
                for(i = 0; i < y.length; i++){
					z = _validate_(y[i],y[i],true);
                    if(z==null) z = validrule(y[i]);
				}
                if(z!=null)return z;
              }
              return null;
            }
            //Check validation render to all child
			v = validrule($el);
            //Check Reactive
            
            $el.react();
            //Render Callback
            _rendering_($el);
            return $el; //Return itself (DOM)
        };

        var xc = $el.childNodes;
        if(xc!=null&&xc.length>0){
           for(i = 0; i < xc.length; i++){
              _property_(xc[i]); //FIXED NOT ALL ADAPTED ELODE FUNCTIONS
           }
        }

        return $el;
    }

    /* Elode - Rendering Case (LOOP) */
    function _rendering_($el){
        if($el.onRender!=null&&$el.onRender.constructor==Function){
            var time = $el._interval!=null? $el._interval:1000, frame;

            $el._start = function(){ //start interval
                if($el._interval==null|
                    $el._interval==false)$el._interval=true;

                frame = setInterval(function(){
                    $el.onRender();
                    $el.react();
                },time); //Default 1 second
            };
            $el._start();

            $el._stop = function(){ //stop interval
                clearInterval(frame);
                $el._interval = false;
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
        e.appendChild(t);
        t = _property_(t); t.react();
        _validate_(t,t,true,true);
        k += '<'+t._elode_query+'>';
      }
      try{ //Check that child component not null or empty
        v = _win.Elode(k,c);
        e._elode_query = k;
        e._elode_react = v._elode_react;
        v = null;
      }catch(err){
        return _error_("ElementError: Can't creating element for NULL Nodes | "+err);
      }
        e.react(); return e;
    };

    /* Error Logging Management */
    function _error_(err){ var str = "ELODE_ERROR \""+err+"\"",
        el = _win.Elode('div#elode_error() '+str); console.log(str);
        el._attr("style","color:red;background-color:black;padding:16px");
        return el;
    }

    /* Elode.js Module - An unique javascript module for creating element  */
    _win.Elode = function _ElodeModule_(A,B){ if(A==null&&B==null)return; var el;
        if(typeof A == 'string' && A[0]=='!'){ //Elode - HTML Interpreter (Machine Learning :v)
            el = _doc.querySelector(A.substring(1));
            var skip = el.getAttribute('elode'), vdom = {el:[]}, c = fite(el.innerHTML), i; c = c.split("\n");
			if(skip!=null){ //Skip Interpreter
			    el.removeAttribute('elode');
				try{vdom = _component_(fite(skip),B);}catch(err)
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
            el = document.body.querySelector(A.substring(1));
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
        if(fite(el[0])=="style"){
            el = _element_(A,B);
            return el;
        }
        el = _component_(A,B); //Elode - HTML Element
        return el; //Return HTML Element (DOM)
    };

})(document,window); //END - Elode.js
