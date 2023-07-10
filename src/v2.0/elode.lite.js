/* 
====================================================================

    Elode.js (Lite) - v2.0 (Release: 28-06-2023) 
    ~ A unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -

====================================================================
*/

(function _ElodeMain_(_$W,_$D){"use strict";function _h_(T,I){var name=I.name.split(_$W.Elode.__hookTag__),value=null==I.value?"":I.value;""==name[0]?_$W.Elode.__hook__[name[1]](T,value):eval("_$W.Elode.__hook__."+name[0]+"."+name[1]+"(T,value);")}function _p_(E){E.root=E.parentElement,E.node=E.children,E.add=E.appendChild,E.set=E.replaceChild,E.anim={fade:function(set,time){var opacity=!0==set?0:100,val=1e4/eval(time);return E.style.opacity=opacity+"%",_ff_(time,function(){set?opacity+=val:opacity-=val,!0==set&&opacity>=100&&(opacity=100),!1==set&&opacity<=0&&(opacity=0),E.style.opacity=opacity+"%"}),E},fadeIn:function(t){return this.fade(!0,t)},fadeOut:function(t){return this.fade(!1,t)}},E.attr=function(t,n){return null==t&&null==n?E.attributes:null==n?E.getAttribute(t):(E.setAttribute(t,n),null!=E.parentNode)?E.parentNode:E},E.on=function(event,callback){return eval("E.on"+event+" = callback;"),E.addEventListener(event,function(){this.react(),null!=this.root&&this.root.react&&this.root.react()}),E},E.class=function(t){return null==t?E.classList:E.attr("class",t)},E.css=function(t){return null==t?{add:function(t){var n=E.css("");return E.attr("style",n+";"+t)},del:function(t){var n=E.css("");return n.I(t)&&(n=n.split(t).join("")),E.attr("style",n)}}:""==t?E.attr("style"):E.attr("style",t)},E.html=function(t){return null==t?E.outerHTML:(E.innerHTML=t,E)},E.txt=function(t){return null==t?E.innerText:(E.innerText=t,E)},E.val=function(t){return null==t?E.value:(E.value=t,E)},E.show=function(){return E.style.display="",E},E.hide=function(){return E.style.display="none",E},E.toggle=function(attrib,value){var i,attr=E.attr(attrib),ident=" ",match="",reg="";if(null==attr&&(E.attr(attrib,""),attr=E.attr(attrib)),value.constructor==Array)for(i=0;i<value.length;i++)E.toggle(attrib,value[i]);else(match=eval("attr.match("+(reg="/^("+value.trim()+")|\\s+("+value.trim()+")|\\s+("+value.trim()+")$/g")+")"))?(eval("attr = attr.replace("+reg+',"")'),E.attr(attrib,attr.trim())):E.attr(attrib,(attr+ident+value).trim());return E},E.get=function(t){return"number"==typeof t?_p_(E.node[t]):_p_(E.querySelector(t))},E.cell=function(t){for(var n=E.root,e=[];null!=n&&n!=_$D.body;)e.push(n),n=n.root;return null==t?e:e[e.length-1-t]},E.destroy=function(t){if(null!=E.onDestroy&&E.onDestroy.constructor==Function&&E.onDestroy(),null==t)return E.parentElement.removeChild(E);if("number"==typeof t)return E.removeChild(E.node[t]);if(t.constructor==Array){for(i=0;i<t.length;i++)E.removeChild(t[i]);return}return E.removeChild(t)},E.clone=function(t){var n;return n=null!=E.__query__&&null!=E.__property__?_$W.Elode(E.__query__,E.__property__):_p_(E.cloneNode(!0)),null!=t&&_ep_(t,n),n},E.seen=function(t){if(null==t){var n=!0;return"none"==E.style.display&&(n=!1),n}return"string"==typeof t?E[t]?E.show():E.hide():t?E.show():E.hide(),E},E.prop=function(t){return null!=t&&(_ep_(t,E,!0),E.react()),E},E.react=function(){var t;if(E.init&&(E.__react__=E.init()),_v_(E),null!=E.children)for(t=0;t<E.children.length;t++)E.children[t].react&&E.children[t].react(),E.children[t].root=E;return null!=E.onReact&&E.onReact.constructor==Function&&E.onReact(E.memo),E},E.delay=function(t,n){return _ff_(t,null,null,function(){n(E)}),E},E.render=function(t){if(_r_(E,t,!1),null!=t?E.root=t:E.root=_$D.body,E.__init__(),E.react(),null!=E.onCreate)try{E.onCreate()}catch(n){}return E.__runtime__(),E},E.__init__=function(){if(!_$W.Elode.__disableHook__){var i,attr=E.attr(),del=[];if(null!=attr){for(i=0;i<attr.length;i++)attr[i].name.includes(_$W.Elode.__hookTag__)&&(_h_(E,attr[i]),attr[i]&&del.push(attr[i].name));for(i=0;i<del.length;i++)E.removeAttribute(del[i])}}if(E.childNodes){var i,elchild=E.childNodes;for(i=0;i<elchild.length;i++)elchild[i].__init__&&elchild[i].__init__()}if(E.__property__){var k,objref=E.__property__;for(k in objref)E[k].constructor!=Function&&E.hasOwnProperty(k)&&!E.hasOwnProperty("$"+k)&&eval("Object.defineProperty(E, '$"+k+"', {set: function(v){   this."+k+"= v;    this.react();}})")}return E.onCreate&&E.onCreate(),E},E.__runtime__=function(){return _x_(E),E},E.__xss__=!1;var i,C=E.childNodes;if(null!=C&&C.length>0)for(i=0;i<C.length;i++)_p_(C[i]);return E}function _x_(t){if(null!=t.onRender&&t.onRender.constructor==Function){var n,e=null!=t.interval?t.interval:1e3;t.start=function(){null==t.interval|!1==t.interval&&(t.interval=!0),n=setInterval(function(){t.onRender(),t.react()},e)},t.stop=function(){clearInterval(n),t.interval=!1},t.start()}}function _v_(E){function evaluate(T){if(null==T.__react__)return null;var i,j,e,k,v,x,db,r=_SBA_(T.__react__,"{,}"),xss=!1;if(null!=r)for(i=0,x=T.__react__;i<r.length;i++){if("html"==(v=r[i].substring(1,r[i].length-1)).substring(0,4)?(v=v.substring(4).trim(),xss=!0,T.__xss__||(T.__xss__=!0)):xss=!1,"$"==(k=v.split(" ")[0].trim())[0]&&(T.getAttribute?null==T.getAttribute("ref")&&T.setAttribute("ref",""):null==T.parentNode.getAttribute("ref")&&T.parentNode.setAttribute("ref","")),null!=(db=_SBA_(v,"{,}")))for(j=0;j<db.length;j++){var c,s=db[j].substring(1,db[j].length-1),h=null,t="";if("#"==s.trim()[0])t=s.trim().substring(0,2),s=s.split(t).join("").trim(),s=" "==t[1]?"cell(0)."+s:"cell("+t[1]+")."+s;else if("*"==s.trim()[0]){var l,cc=_cc_(s,"*"),extra="";for(l=0;l<cc.len;l++)extra+="parentNode.";s=extra+cc.str.trim()}try{c=eval("T."+s),(null==c||void 0==c)&&(c=eval("T.parentNode."+s))}catch(err){try{c=eval("T.parentNode."+s)}catch(err2){c=null}}(void 0==c||null==c)&&(c=""),c.constructor.toString().includes("Element")&&(h=c),/^\d+$/.test(c)||(c='"'+c+'"'),v=v.replace(db[j],c)}try{e=void 0==_$W.eval(v)?"":_$W.eval(v),"string"==typeof e?e.includes("HTML")&&e.includes("Element")&&(e=h.outerHTML):e.constructor.toString().includes("Element")&&(e=e.outerHTML)}catch(err){e=""}xss||"string"!=typeof e||(e=_$W.Elode.xss(e)),x=x.replace(r[i],e)}else T.init&&(x=T.__react__);null!=x&&("function Text() { [native code] }"==T.constructor?(xss||(x=_$W.Elode.xss(x)),x!=T.textContent&&(T.textContent=x)):x!=T.innerHTML&&(T.innerHTML=x))}if(null!=E.__react__){var i,ch=E.childNodes;if(null!=ch&&ch.length>1&&!E.__xss__)for(i=0;i<ch.length;i++)evaluate(ch[i]);else evaluate(E)}}function _ev_(t){try{"function Text() { [native code] }"==t.constructor?t.__react__||t.textContent.includes("!elode_")||(t.__react__=t.textContent):t.__react__||t.textContent.includes("!elode_")||(t.__react__=t.innerHTML.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&"));var n,e=t.childNodes;if(null!=e)for(n=0;n<e.length;n++)_ev_(e[n])}catch(r){console.log(r)}}function _ep_(t,n,e){var r,o,l,i=null!=t?Object.keys(t):null;if(null!=i){for(o=0;o<i.length;o++)if(_so_(n,i[o],t[i[o]],e),"style"==i[o])for(l=0,r=Object.keys(t.style);l<r.length;l++)_so_(n.style,r[l],t.style[r[l]],e)}}function _so_(t,n,e,r){if(null!=t&&null!=n&&null!=e){var o,l=e.constructor==Object?Object.keys(e):null;if(r&&null!=l)for(o=0;o<l.length;o++)_so_(t,n+"."+l[o],e[l[o]]);else t[n]=e}return t}function _cc_(t,n){var e,r=0;for(e=0;e<t.length&&(r+=1,t[e]==n);e++);return{str:t.trim().substring(e),len:r}}function _err_(t){var n='ELODE_ERROR "'+t+'"',e=_$W.Elode("div#elode_error() "+n);return console.log(n),e.attr("style","color:red;background-color:black;padding:16px"),e}function _ff_(t,n,e,r){null==e&&(e=100);var o=0,l=setInterval(function(){(o+=e)>t&&(r&&r(),clearInterval(l)),n&&n()},e)}function _SBA_(t,n,e){var r,o,l,i=[],u=0,c="",a=t.trim(),s="Symbol Between Algorithm Error";if(n=n.trim().split(","),!t.includes(n[0])&&!t.includes(n[1]))return null;if(!t.includes(n[0])&&t.includes(n[1]))return _err_(s+": Symbol Not Found! for '"+n[0]+"'");if(t.includes(n[0])&&!t.includes(n[1]))return _err_(s+": Symbol Not Found! for '"+n[1]+"'");for(r=0,t=t.trim().split("");r<t.length;r++)t[r]===n[0]&&(l=!0,u+=1),l&&(c+=t[r]),t[r]===n[1]&&(u>1?u-=1:(l=!1,i.push(c.trim()),c="",u=0,o=r));return 1==u?(null!=e&&e(s+": No Closing Symbol! at "+a.substring(o+1)),null):i}function _shd_(el,data,value){if("*"==data[0]){var i,c=_cc_(data,"*");for(i=0;i<c.len;i++)c.str="root."+c.str;data=c.str}if("$"==data.trim()[0])return eval("_$W."+data+" = value;");try{el[data]?eval("el."+data+" = value;"):eval("el.root."+data+" = value;")}catch(err){}}function _ghd_(el,data){if(null==data)return null;if("*"==data[0]){var i,c=_cc_(data,"*");for(i=0;i<c.len;i++)c.str="root."+c.str;data=c.str}if("$"==data.trim()[0])return eval("_$W."+data);try{return eval("el."+data)}catch(err){try{return eval("el.root."+data)}catch(err){return eval(data)}}}for(var x in _$W.Elode=function(t,n){if(null!=t||null!=n){var e=null;if("string"==typeof t){if(e=_$D.querySelector(t),null!=n&&(_ep_(n,e),e.__property__=n),_ev_(e),_v_(e),_p_(e),e.__init__(),e.react(),null!=e.onCreate)try{e.onCreate()}catch(r){}_x_(e)}return e}},_$W.Elode.app=function(t,n){if(null!=t&&"string"==typeof t){var e,r=_$D.querySelectorAll(t);for(e=0;e<r.length;e++)n(r[e]);return r}},_$W.Elode.init=function(t){return t=_p_(t)},_$W.Elode.hook=function(t){for(var n in t)_$W.Elode.__hook__[n.toLowerCase()]=t[n];return t},_$W.Elode.__hook__={},_$W.Elode.__disableHook__=!1,_$W.Elode.__hookTag__=":",_$W.Elode.xss=function(t){return t.includes("<")||t.includes(">")?t.split("<").join("&lt;").split(">").join("&gt;"):t.split("&lt;").join("<").split("&gt;").join(">")},_$W.Elode.__info__={VERSION:"2.0 Lite",CODE:2028062023},Object.keys||(Object.keys=function(t){var n,e=[];for(n in t)obj.hasOwnProperty(n)&&e.push(n);return e}),String.prototype.includes||(String.prototype.includes=function(t){return this.indexOf(t)>-1}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),_$W.Elode.__hook__.on={},HTMLElement.prototype)if("on"==x.substring(0,2)){var name=x.substring(2);eval("_$W.Elode.__hook__.on."+name+" = function(el, data){\nel.on('"+name+"', function () { var exec = data.replace(/[^a-zA-Z0-9 ]/g, '');\ntry { \nif(this[exec]==null||isNaN(this[exec])) eval('this.root.' + data.trim());\nelse eval('this.'+ data.trim());\n} catch (err) {\n}\n});\n};")}_$W.Elode.hook({def:function(el,data){var i,x;for(i in null==el.__property__&&(el.__property__={}),data=data.split(",")){if(data[i].includes(":")){var fun=el.onReact;el.onReact=function(){fun&&fun(),el[(x=data[i].split(":"))[0]]=_ghd_(el,x[1])}}try{eval("el."+data[i]),eval("el.__property__."+data[i])}catch(err){}}el.react()},model:function(t,n){var e,r,o=0;t.constructor==HTMLInputElement?t.on("input",function(){if(r=t.val(),t.attr().type){if("checkbox"==t.attr().type.value)r=t.checked;else if("radio"==t.attr().type.value)for(e=0;e<t.root.node.length;e++)t.root.node[e]==t&&(r=o),t.root.node[e].attr().type&&"radio"===t.root.node[e].attr().type.value&&o++;else"file"==t.attr().type.value&&(r=t.files)}_shd_(t,n,r)}):t.constructor==HTMLSelectElement&&t.on("input",function(){r=t.selectedOptions,_shd_(t,n,r)})},seen:function(t,n){t.__proto__.__seen=n;var e=t.onReact;t.onReact=function(){e&&e(),t.seen(_ghd_(t,t.__proto__.__seen))}},do:function(el,action){el.__proto__.__do=action;var fun=el.onCreate;el.onCreate=function(){fun&&fun(),eval("this."+el.__proto__.__do)}},if:function(el,data){var fun=el.onReact;el.__proto__.__ifdef=data,el.onReact=function(){fun&&fun();try{el.__proto__.__if=_ghd_(el,el.__proto__.__ifdef),el.__proto__.__if?eval("this."+el.__proto__.__then):null!=el.__proto__.__else&&eval("this."+el.__proto__.__else)}catch(err){}}},then:function(t,n){t.__proto__.__then=n},else:function(t,n){t.__proto__.__else=n},once:function(t){t.__react__&&(t.__react__=null)},delay:function(el,data){var time,action;time=(action=data.split(" "))[0].trim(),action=data.replace(time,""),el.delay(eval(time),function(el){eval("el."+action)})}})})(window,document);

/* 
    elode.lite.js

    @contributors:
    - equneko (Muhammad Alfajri Arraihan)
*/