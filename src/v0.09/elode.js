/* 
    Elode.js (Source) - v0.9 (Release: 25-09-2022) 
    ~ An unique javascript module for creating element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -
*/
(function(_doc,_win){'use strict';
if('undefined' == typeof _win){ alert("ElodeWindowError(e)");return;}
   /* Create Query Element*/
   function _element_(x,y){
      var q = x.trim(), b, e, xq,xk,xd,xa = [], i,o,ox, ve; if(q.includes("$")){q = q.split("$")}         
      if(q.constructor == Array){ //Check if it was binding to the renderer
         b = q[0].trim(); q = x.replace(b,'').replace('$','').trim();
      } ve = _doc.createElement('div');
      /* Expression: (data : el.db) (!h1,h2,h3) */
         var exrgx = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/gmi,
         xre = q.trim().match(exrgx), xtr, exkey, exval;
         
         try{
          if(xre != null){ //Element Expression
            xtr = xre[0].substr(1,xre[0].length-2);
            xtr = xtr.trim().split(':');
            exkey = xtr[0].trim(); exval = xtr[1].trim();
            q = q.replace(xre[0],'');
          }
         }catch(err){if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}}

      /* Attributes: [style color:blue | placeholder Username] */
            var attrgx = /\[(?:[^\]\[]+|\[(?:[^\]\[]+|\([^\]\[]*\])*\])*\]/gmi,
            attr = q.trim().match(attrgx);

            if(attr != null){ //Element Attributes
                var vttr = attr[0].substr(1,attr[0].length-2), key, i,
                addAttr = function(z){
                    key = z.split(' ');
                    ve.setAttribute(key[0].trim(),
                    z.split(' ').toString().replaceAll(',',' ').replace(key[0],'').trim());
                }
                if(vttr.includes('|')){
                    vttr = vttr.split('|');
                    for(i = 0; i < vttr.length; i++){
                        try{addAttr(vttr[i].trim()); q = q.replace(attr[0],'');}catch(err){if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}}
                    }
                }else{
                    try{addAttr(vttr.trim()); q = q.replace(attr[0],'');}catch(err){if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}}
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
         if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}
      }
      e.innerHTML = xd;
      if(xa.length>0){
         for(i = 0; i < xa.length; i++){
            e.setAttribute(xa[i][0],xa[i][1]); //Apply Attributes
         }
      }
      /* Element Attributes Adapter */
      function attrAdapt(x,y){
         if(y.hasAttributes()){ var vettr = y.attributes, v, k;
            for(k = 0; k <vettr.length; k++){
                v = vettr[k]; x.setAttribute(v.name,v.value);
            }
         }
      }
      attrAdapt(e,ve);
            
      //Define databases
      if(y != null){ 
         e.db = y;
      }

      //If defined as multitag elements
      try{
         xtr = xtr.toString().trim();
         if(xtr[0]=="!"){
            if(e.hasAttributes()){ //Fix parent element bug (hasAttributes)
               while(e.attributes.length > 0)
                  e.removeAttribute(e.attributes[0].name);
            }
            e.innerHTML = ""; //Fix parent element bug (first value)
            xtr = xtr.substr(1);
            xtr = xtr.split(",");
            for(i = 0; i < xtr.length; i++){
               e.appendChild(_element_(xtr[i].trim()+" "+xd.replaceAll("!index",i),y)[0]);
            }
            return [e,b];
         }
      }catch(err){
         if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}
      }
            
      //If defined as repeated elements
      if(exkey != null && exval != null){
         var bundle = _doc.createElement('div'), EXVAL;
         try{var el = e; EXVAL = eval(exval)}catch(err){EXVAL='';if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)};}
         if(EXVAL.constructor == Array){
            for(i = 0; i < EXVAL.length; i++){
               var xe = _doc.createElement(e.tagName), 
               rgx = /\{(?:[^}{]+|\{(?:[^}{]+|\([^}{]*\})*\})*\}/gmi, mrg, j, m, n, o;
               xe.innerHTML = e.innerHTML; attrAdapt(xe,e);
               mrg = xe.innerHTML.match(rgx);
               if(mrg != null){ 
                  for(j = 0; j < mrg.length; j++){ o = exval+"["+i+"]";
                     m = xe.innerHTML; n = mrg[j].replaceAll(""+exkey,o).replaceAll("index",i);
                     xe.innerHTML = m.replace(mrg[j],n);
                  }
               }
               bundle.appendChild(xe);
               if(y != null){ //Define databases
                  bundle.db = y;
               }
            }
         }
         return [bundle,b];
      }
      return [e,b];
   }
   /* Invoke Element Component */
   function _component_(x,y){
      var rgx = /\<(?:[^><]+|\<(?:[^><]+|\([^><]*\>)*\>)*\>/gmi,
          e = _element_(x,y), q = x.match(rgx),i,o,r = x;
            if(q != null){ //Invoke Element Ex:<h1 Hello World>
               e[0].innerHTML = '';
                for(i = 0; i < q.length; i++){
                    o = q[i].trim(); o = o.substr(1,o.length-2);
                    if(o.match(rgx) != null){
                        o = o.replace(o,_component_(o)[2]);
                    }
                    r = _element_(o,y); e[0].appendChild(r[0]);
                    x = x.replace(q[i].trim(),r[0].outerHTML);
                }
            }else{ elodeAll(e[0]); return e; }

            if(e[0].hasAttributes()){ //Fix parent element bug (hasAttributes)
               while(e[0].attributes.length > 0)
                  e[0].removeAttribute(e[0].attributes[0].name);
            }

            function elodeAll($){
               $.base = $.innerHTML;
               var xc = $.children, i;
               if(xc.length>0){
                  for(i = 0; i < xc.length; i++){
                     xc[i].base = xc[i].innerHTML;
                     elodeAll(xc[i]);
                  }
               }
            }
            elodeAll(e[0]);
            
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
   function _evaluate_(x,y,z){ var evl, el = _property_(y), vl;
      if(el.parentElement!=null&&el.parentElement.base!=null)el = el.parentElement;
      try{evl = eval(x.replaceAll('$',"_win."));}catch(err){if(_win.Elode.DEBUG){console.log("[ELODE_DEBUG] "+err)}} 
      if(typeof evl=='undefined') evl='';
      vl = y.base.replaceAll(x,evl);
      if(z!=null){vl = z.replaceAll(x,evl);}
      y.innerHTML = vl; return vl;
   }
   /* Reactivity Element Expression */
   function _react_(x){
      if(x.parentElement!=null&&x.parentElement.base!=null)x = x.parentElement;
      var rgx = /\{(?:[^}{]+|\{(?:[^}{]+|\([^}{]*\})*\})*\}/gmi, i, j,
      e = x.base.match(rgx), ch, r;
      if(e!=null){
         ch = x.children;
         if(ch.length>0){
            for(i = 0; i < ch.length; i++){
               e = ch[i].base.match(rgx);
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
         }else{
            for(i = 0; i < e.length; i++){
               r = _evaluate_(e[i],x,r);
            }
         }
      }
      return x;
   }
   /* Elode Element Property */
   function _property_(x){ var i,j,k;
      x._append = function($){
         x.appendChild($); return x;}
      x._attr = function(A,B){
         if(A == null && B == null) return x.attributes;
         if(B == null)return x.getAttribute(A);
         x.setAttribute(A,B);
         if(x.parentElement!=null) return x.parentElement;
         return x;
      }
      x._id = function($){return x._attr("id",$);}
      x._class = function($){return x._attr("class",$);}
      x._css = function($){if($==null){return x.style;}return x._attr("style",$);}
      x._on = function($,F){
         x.addEventListener($,function(ev){
            if(x.parentElement!=null&&x.parentElement.base!=null)
            {F(ev,x.parentElement,x)}else{F(ev,x)}
            _react_(x);
         });
         if(x.parentElement!=null&&x.parentElement.base!=null) return x.parentElement;
         return x;
      }
      x._load = function(F){return x._on("load",F);}
      x._click = function(F){return x._on("click",F);}
      x._dclick = function(F){return x._on("dblclick",F);}
      x._hover = function(F){return x._on("hover",F);}
      x._focus = function(F){return x._on("focus",F);}
      x._input = function(F){return x._on("input",F);}
      x._keycode = function(C,F,B){
         return x._on("keyup",function(ev){
            if(ev.keyCode == C){
               if(F!=null)F(ev,x); 
               if(B!=null)B.click();
            }
         });
      }
      x._child = x.children;
      x._html = function($){ if($==null)return x.outerHTML;
         else x.innerHTML = $; return x;
      };
      x._text = function($){ if($==null)return x.innerText;
         else x.innerText = $; return x;
      };
      x._val = function($){ if($==null)return x.value;
         else x.value = $; return x;
      };
      x._show = function(){x._css().display=''; return x;}
      x._hide = function(){x._css().display='none'; return x;}
      for(i = 0; i < x._child.length; i++){
         j = x._child[i]; j = _property_(j);
         k = j.getAttribute("id");
         eval("if(x.$tag==null){x.$tag=[j];}\
            else{x.$tag.push(j);}\
         ".replaceAll("tag",j.tagName.toLowerCase()));
         if(null != k){eval("x."+k+"=j;");}
      }
      x._render = function($){return _render_(x,$)[0];}
      x._react = function(){return _react_(x);}
      x._update = function(){
         var u = _win.Elode(x.elode,x.db);
         x.innerHTML = u.innerHTML;
         return u;
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
      return x;
   }

   /* Elode.JS - An unique javascript module to create element */
   _win.Elode = function ElodeModule(A,B){
      /* Elode Define Variable */
      var A_c = A.constructor, i = 0, j = 0,
         AB = A == null && B == null; if(AB){ return "ElodeNullPointer(e)" }
      
      /* If A param defined as a string then, Query Element Manager */
      if(A_c == String){
          //HTML Template Adapter
         if(A.trim()[0]=='!'){ A = A.substr(1);
            var e = _doc.querySelector(A), ex,
            eq = e.getAttribute("elode");
            ex = _component_(eq.trim(),B);
            e.elode = A.trim();_react_(ex[0]);
            e.innerHTML = ex[0].innerHTML; 
            e.removeAttribute("elode");
            e = _property_(e); return e;
         }
         //HTML Query Adapter
         var e = _component_(A.trim(),B);
         e[0].elode = A.trim(); _react_(e[0]);
         e[0] = _property_(e[0]);
         if(e[1] == null) return e[0];
         _render_(e,e[1]); 
         return e[0];
      }
   };

   _win.Elode.DEBUG = false;
   _win.Elode.as = function(x){eval("_win."+x+"=_win.Elode;"); return _win.Elode};
   _win.Elode.app = function(x,y){
      var ve = _doc.createElement('div'), i; 
      ve.id = x; ve = _property_(ve);
      for(i = 0; i < y.length; i++){
         ve.appendChild(y[i]);
      }
      return ve;
   };
   _win.Elode.scope = function(x,y,z){
         if(z==null)z = _doc;
         if(y!=null) return z.querySelectorAll(x)[y];
         else return z.querySelector(x);
   };
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
})(document,window);