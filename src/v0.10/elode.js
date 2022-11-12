/* 
    Elode.js (Source) - v0.10 (Release: 01-10-2022) 
    ~ An unique javascript module for creating element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equnko/elode -
*/
(function(_doc,_win){'use strict';
//Check if window's not undefined
if('undefined' == typeof _win){ console.log("ElodeWindowError(e)");return;}
function symbetw_algol(a,x){ //a - target  x - symbol
/* 
   @SYMBOL BETWEEN ALGORITHM v1 (30-09-2022)
   ~ Find perfect value between custom symbol. Without RegExp ~

   EX: {this will find} this not
*/
   var e=[],i,j=0,k,l,v,z=a.trim();
   
   x = x.trim().split("");
   //Validation: check if 'a' have symbol x[i]
   for(i = 0; i < x.length; i++){
       if(!a.includes(x[i])) return null;
   }
   //Execution: alogrithm process
   a = a.trim().split(""); v = "";
   for(i = 0; i < a.length; i++){
       if(a[i]===x[0]){ //Open Symbol
           l = true; j+=1;
       }
       if(l){ v+= a[i] } //Record Value
       if(a[i]===x[1]){ //Close Symbol
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
   //Check if error closing symbol
   if(j==1){return "ERROR: No Closing Symbol! at "+z.substring(k+1);}
   return e; //Returns array
   
}// END - SYMBOL BETWEEN

//Define proper for managing properties on element
function __properElem(a,b){ var c;
   for(c in b){
      eval("a."+c+"=b[c]");
   }
}
//Elode basement for reactive expression
function __elodeBase($,x){
   $.base = $.innerHTML;
   if($.constructor==Text)$.base = $.textContent;
   if(x!=null)$.base = x;
   var xc = $.childNodes, i;
   if(xc.length>0){
      for(i = 0; i < xc.length; i++){
         __elodeBase(xc[i],x);
      }
   }
}

   /* Create Query Element*/
   function _element_(x,y){
      var q = x.trim(), b, e, xq,xk,xd,xa = [], i,o,ox, ve; if(q.includes("$")){q = q.split("$")}         
      if(q.constructor == Array){ //Check if it was binding to the renderer
         b = q[0].trim(); q = x.replace(b,'').replace('$','').trim();
      } ve = _doc.createElement('div');
      /* Expression: (data : el.db) (!h1,h2,h3) */
         var xre = symbetw_algol(q,"()"), xtr, exkey, exval;
         
         try{
          if(xre != null){ //Element Expression
            xtr = xre[0].substring(1,xre[0].length-1);
            xtr = xtr.trim().split(':');
            exkey = xtr[0].trim(); exval = xtr[1].trim();
            q = q.replace(xre[0],'');
          }
         }catch(err){
            _debug_(err);
        }

      /* Attributes: [style color:blue | placeholder Username] */
            var attr = symbetw_algol(q,"[]");

            //Check if parent element has an Attribute (fixBUG)
            if(!q.trim().split(" ")[0].includes("[")) attr = null; 

            if(attr != null){ //Element Attributes
                var vttr = attr[0].substring(1,attr[0].length-1), key, i,
                addAttr = function(z){
                    key = z.split(' ');
                    ve.setAttribute(key[0].trim(),
                    z.split(' ').toString().replaceAll(',',' ').replace(key[0],'').trim());
                };
                
                if(vttr.includes('|')){
                    vttr = vttr.split('|');
                    for(i = 0; i < vttr.length; i++){
                        try{addAttr(vttr[i].trim()); q = q.replace(attr[0],'');}catch(err){_debug_(err);}
                    }
                }else{
                    try{addAttr(vttr.trim()); q = q.replace(attr[0],'');}catch(err){_debug_(err);}
                }

            } xq = q.split(' ');

      xk = xq[0].trim(), xd = q.replace(xk,'').trim(); // xk-Key xd-Data

      if(xk.includes('#')){ //Element ID
         o = xk.split('#')[1];
         if(o.includes('.')){ o = o.split('.')[0]; }
         xk = xk.replace('#'+o,''); 
         xa.push(["id",o]); o = null;
      }
      if(xk.includes('.')){ //Element Class
         o = xk.split('.');
         var ox = o.toString(); xk = o[0];
         o = ox.replace(o[0]+',','').replaceAll(',',' ');
         xa.push(["class",o]); o = null; ox = null;
     }
      try{
         e = _doc.createElement(xk); //Create Query Element
      }catch(err){
         e = _doc.createElement('div'); //Create Virtual Element
         _debug_(err);
      }
      
      e.innerHTML = xd; //Base value

      //Fix Blank Element
      if(e.constructor == HTMLUnknownElement){ 
         e.innerHTML = q;
      }
      if(xa.length>0){
         for(i = 0; i < xa.length; i++){
            e.setAttribute(xa[i][0],xa[i][1]); //Apply Attributes
         }
      }
      /* Element Attributes Adapter */
      function attrAdapt(a,b){
         if(b.hasAttributes()){ var vettr = b.attributes, v, k;
            for(k = 0; k <vettr.length; k++){
                v = vettr[k]; a.setAttribute(v.name,v.value);
            }
         }
      }
      attrAdapt(e,ve);
            
      if(y != null){ 
         __properElem(e,y);
      }

      //If defined as a multitag elements
      try{
         xtr = xtr.toString().trim();
         if(xtr[0]=="!"){
            if(e.hasAttributes()){ //Fix parent element bug (hasAttributes)
               while(e.attributes.length > 0)
                  e.removeAttribute(e.attributes[0].name);
            }
            e.innerHTML = ""; //Fix parent element bug (first value)
            xtr = xtr.substring(1);
            xtr = xtr.split(",");
            for(i = 0; i < xtr.length; i++){
               e.appendChild(_element_(xtr[i].trim()+" "+xd.replaceAll("!index",i),y)[0]);
            }
            return [e,b];
         }
      }catch(err){
         _debug_(err);
      }
            
      //If defined as repeated elements
      if(exkey != null && exval != null){
         var bundle = _doc.createElement('div'), EXVAL;
         try{const db = e.db; EXVAL = eval(exval)}catch(err){EXVAL='';_debug_(err);;}
         if(EXVAL.constructor == Array){
            for(i = 0; i < EXVAL.length; i++){
               var xe = _doc.createElement(e.tagName), mrg, j, n, o; attrAdapt(xe,e);
               xe.innerHTML = xd; mrg = symbetw_algol(xd,"{}");
               if(mrg != null){ 
                  for(j = 0; j < mrg.length; j++){ o = exval+"["+i+"]";
                     n = mrg[j].replaceAll(""+exkey,o).replaceAll("index",i);
                     xe.innerHTML = xe.innerHTML.replaceAll(mrg[j],n);
                  }
               }
               bundle.appendChild(xe);
            }
         }
         if(y != null){
            __properElem(bundle,y);
         }
         return [bundle,b,true];
      }
      return [e,b];
   }
   /* Invoke Element Component */
   function _component_(x,y){
      var e = _element_(x,y), q = symbetw_algol(x,"<>"),i,o,r;
            if(q != null){ //Invoke Element Ex:<h1 Hello World>
               if(q.constructor == String){
                  _error_(" SYMBOL BETWEEN "+q); 
                  __elodeBase(e[0]);
                  return [e[0],e[1],x];
               }
               e[0].innerHTML = '';
                for(i = 0; i < q.length; i++){
                    o = q[i].trim(); o = o.substring(1,o.length-1);
                    if(symbetw_algol(o,"<>") != null){
                        //fixed BUG dont forget to place y variable
                        o = o.replaceAll(o,_component_(o,y)[2]); 
                    }

                    r = _element_(o,y);
                    if(r[2]!=null){
                     r = r[0].innerHTML;
                    }else{
                     r = r[0].outerHTML;
                    }
                    x = x.replace(q[i].trim(),r);
                    e = _element_(x,y);
                }
            }

            __elodeBase(e[0]);

            return [e[0],e[1],x];
   }
   /* Rendering Elode to DOM */
   function _render_(x,y){
      if(y == '' || y == null){
         var bi = _doc.body, h = bi.children, l = h.length, i = 0, el = h[i];
               for(i = 0; i < l; i++){  el = h[i]; //Find - last element at html.body
                     if(el.constructor == HTMLScriptElement)break;
                 }
                 //Render - at html.body (DOM)
                 if(x.constructor == Array){
                     bi.insertBefore(x[0],el);
                 }else{
                     bi.insertBefore(x,el);
                 }
                 return [x,y];
      }
      //Render - at html.#id (DOM-Spesific)
      if(x.constructor == Array){
         _doc.querySelector(y).appendChild(x[0]);
      }else{
         _doc.querySelector(y).appendChild(x);
      }
      return [x,y];
   }
   /* Evaluate Element Expression */
   function _evaluate_(__x,__y,__z){ 
      var __evl, __el = __y, __vl;
      if(__el.parentElement!=null&&__el.parentElement.base!=null)
         __el = __el.parentElement;
      const db = __el.db;
      try{__evl = eval(__x);}catch(err){_debug_(err);} 
      if(typeof __evl=='undefined') __evl='';
      __vl = __y.base.replaceAll(__x,__evl);
      if(__z!=null){__vl = __z.replaceAll(__x,__evl);}
      if(__y.constructor==Text){
         if(__y.textContent.trim()!=__vl.trim()) __y.textContent = __vl; return __vl;
      }
      if(__y.innerHTML.trim()!=__vl.trim()) __y.innerHTML = __vl; return __vl;
   }
   /* Reactivity Element Expression */
   function _react_(x){
   if(x.constructor==HTMLStyleElement)return null;
      if(x.parentElement!=null&&x.parentElement.base!=null)x = x.parentElement; 
      var  i, j, e = symbetw_algol(x.base,"{}"), ch, r;
      if(e!=null){
         ch = x.childNodes;
         if(ch.length>0){
            for(i = 0; i < ch.length; i++){
               e = symbetw_algol(ch[i].base,"{}");
               if(e!=null){ r = null;
                  if(e.length>1){
                     for(j = 0; j < e.length; j++){
                       r = _evaluate_(e[j],ch[i],r);
                     }
                  }else{
                     for(j = 0; j < e.length; j++){
                        _evaluate_(e[j],ch[i]);
                     }
                  } 
               }   
            }
         }else return x;
        
      }
      return x;
   }
   /* Elode Element Property */
   function _property_(x){ var i,j,k;
      x.el = {};
      x.child = x.children;
      for(i = 0; i < x.child.length; i++){
         j = x.child[i]; j = _property_(j);
         k = j.getAttribute("id");
         eval("if(x.el.tag==null){x.el.tag=[j];}\
            else{x.el.tag.push(j);}\
         ".replaceAll("tag",j.tagName.toLowerCase()));
         if(null != k){eval("x."+k+"=j;");}
      }
      x._render = function($){
         return _render_(x,$)[0];
      }
      x._react = function(){return _react_(x);}
      x._update = function(){ var i;
         var u = _win.Elode(x.elode,{db:x.db});
         x = u; return u;
      }
      x._scope = function(A,B){return _win.Elode.scope(A,B,x)}
      x._remove = function($){
         if($==null)return x.remove();

         if(typeof $ == 'number'){
            return x.removeChild(x._child[$]);
         }
         if($.constructor == Array){
            for(i = 0; i < $.length; i++){
               x.removeChild($[i]);
            }
            return;
         }
         return x.removeChild($);
      }
      
      x._attr = function(A,B){
         if(A == null && B == null) return x.attributes;
         if(B == null)return x.getAttribute(A);
         x.setAttribute(A,B);
         if(x.parentElement!=null) return x.parentElement;
         return x;
      }
      x._class = function($){if($==null){return x._attr("class");}return x._attr("class",$);}
      x._css = function($){if($==null){return x.style;}return x._attr("style",$);}
      x._on = function($,F){
         x.addEventListener($,function(ev){
            if(x.parentElement!=null&&x.parentElement.elode!=null){
                  F({event:ev,root:x.parentElement,child:x});
            }else{F({event:ev,child:x})}
            _react_(x);
         });
         if(x.parentElement!=null&&x.parentElement.elode!=null)return x.parentElement;
         return x;
      }
      x._click = function(F){return x._on("click",F);}
      x._dclick = function(F){return x._on("dblclick",F);}
      x._hover = function(F){return x._on("hover",F);}
      x._focus = function(F){return x._on("focus",F);}
      x._type = function(F){return x._on("input",F);}
      x._keycode = function(C,F,B){
         return x._on("keyup",function($){
            if($.event.keyCode == C){
               if(F!=null)F($); 
               if(B!=null)B.click();
            }
         });
      }
      x._html = function($){ if($==null)return x.outerHTML;
         else x.innerHTML = $; return x;
      };
      x._txt = function($){ if($==null)return x.innerText;
         else x.innerText = $; return x;
      };
      x._val = function($){ if($==null)return x.value;
         else x.value = $; return x;
      };
      x._show = function(){x._css().display=''; return x;}
      x._hide = function(){x._css().display='none'; return x;}

      return x;
   }

   /* Logging Management */
   function _debug_(err){
    if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err);}
   }
   function _error_(err){
      console.log("[ELODE_ERROR]"+err);
   }

   /* Elode.js - An unique javascript module for composing element */
   _win.Elode = function ElodeModule(A,B){
      /* Elode Define Variable */
      var A_c = A.constructor, i = 0, j = 0,
         AB = A == null && B == null; if(AB){ return "ElodeNullPointer(e)" }
      
      /* If A param defined as a string, then Query Element Manager */
      if(A_c == String){
          //HTML Template Adapter
         if(A.trim()[0]=='!'){ A = A.substring(1);
            var e = _doc.querySelector(A), ex,
            eq = e.getAttribute("elode");
            ex = _component_(eq.trim(),B);
            e.elode = A.trim();_react_(ex[0]);
            e.innerHTML = ex[0].innerHTML; 
            e.removeAttribute("elode");
            e = _property_(e); 
            __properElem(e[0],B);
            return e;
         }
         //HTML JSQuery Adapter
         var e = _component_(A.trim(),B);
         e[0].elode = A.trim(); _react_(e[0]);
         e[0] = _property_(e[0]);
         __properElem(e[0],B);
         if(e[1] == null) return e[0];
         _render_(e,e[1]); 
         return e[0];
      }
   };

   //Elode - property of DEBUG: The key of logger activation
   _win.Elode.DEBUG = false;
   //Elode - property of Component: Template for usable element
   _win.Elode.Component = {
      layout:function(){return _win.Elode("div Layout")},
      header:function(){return _win.Elode("h1 Header")},
      text:function(){return _win.Elode("p Text")},
      button:function(){return _win.Elode("button Button")},
      link:function(){return _win.Elode("a[href] Link")}
   };
   //Elode - property of as: Alias form, make alias for Elode library
   _win.Elode.as = function(x){eval("_win."+x+"=_win.Elode;"); return _win.Elode};
   //Elode - property of using: Element using for usable element
   _win.Elode.using = function(x,y){var i;
      y = y.split(",");
      if(y.length>0){
         for(i = 0; i < y.length; i++){
            eval("_win."+y[i]+"=new x;");
         }
      }
      return _win.Elode;
   }
   //Elode - property of app: Elode application, packed element to be one app
   _win.Elode.app = function(x,y,z){
      var e = x+" ", i; 
      for(i = 0; i < y.length; i++){
         if(y[i].constructor ==  String){
            e += "<"+y[i]+">";
         }else{
            e += "<"+y[i].elode+">";
         }
      }
      e = _win.Elode(e,z);
      e = _property_(e);
      return e;
   };
   //Elode - property of render: Adaptation of _render_ function to Elode
   _win.Elode.render = function(x,y){
      if(x.constructor==Array){ var i, e;
         for(i = 0; i < x.length; i++){
            if(x[i].constructor==Array){
               _win.Elode.render(x[i],y);
               continue;
            }
            _render_(x[i],y);
         }
         if(y==null)return x;
         e = _doc.querySelector(y);
         e = _property_(e); return e;
      }
      _render_(x,y);
         if(y==null)return x;
         e = _doc.querySelector(y);
         e = _property_(e); return e;
   };
   //Elode - property of scope: Adaptation of document.querySelector to Elode
   _win.Elode.scope = function(x,y,z){
      if(z==null)z = _doc;
      if(y!=null) return z.querySelectorAll(x)[y];
      else return z.querySelector(x);
   };
})(document,window); //END - Elode.js