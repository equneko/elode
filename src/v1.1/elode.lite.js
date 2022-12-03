/* 
    Elode.js (Lite-LightweightEdition) - v1.1 (Release: 20-11-2022) 
    ~ An unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -
*/

(function(_doc,_win){'use strict';function _SBA_(d,f,g){var c,h,m,n,o=[],e=0,p=fite(d);if(f=fite(f).split(","),!there(d,f[0])&&!there(d,f[1]))return null;if(!there(d,f[0])&&there(d,f[1]))return _error_("Symbol Between Algorithm Error: Symbol Not Found! for '"+f[0]+"'");if(there(d,f[0])&&!there(d,f[1]))return _error_("Symbol Between Algorithm Error: Symbol Not Found! for '"+f[1]+"'");for(d=fite(d).split(""),n="",c=0;c<d.length;c++)d[c]===f[0]&&(m=!0,e+=1),m&&(n+=d[c]),d[c]===f[1]&&(1<e?e-=1:(m=!1,o.push(fite(n)),n="",e=0,h=c));return 1==e?(null!=g&&g("Symbol Between Algorithm Error: No Closing Symbol! at "+p.substring(h+1)),null):o}function there(c,a){return-1<c.indexOf(a)}function fite(a){if(null==a||a==null||""==a)return"";var b,d="",e=a.split("");for(b=0;b<e.length;b++)if(" "!=e[b]&&"\n"!=e[b]&&"\t"!=e[b]){d=a.substring(b);break}for(e=d.split(""),b=e.length;0<b;b--)if(" "!=e[b]&&"\n"!=e[b]&&"\t"!=e[b]){d=d.substring(0,b);break}return d}function set_obj(d,a,b,c){if(null!=d&&null!=a&&null!=b){var e,f=b.constructor==Object?Object.keys(b):null;if(c&&null!=f)for(e=0;e<f.length;e++)set_obj(d,a+"."+f[e],b[f[e]]);else d[a]=b}return d}function c_char(c,a){var b,d=0;for(b=0;b<c.length&&(d+=1,c[b]==a);b++);return{str:fite(c.substring(b)),len:d}}function elode_react(a,b){try{a._elode_react="function Text() { [native code] }"==a.constructor?a.textContent:a.innerHTML.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"),null!=b&&(a._elode_react=b)}catch(a){console.log(a)}var c,d=a.childNodes;if(null!=d&&0<d.length)for(c=0;c<d.length;c++)elode_react(d[c],b),_property_(d[c])}function elode_prop(a,b,c){var d,e,f,g=null==a?null:Object.keys(a);if(null!=g)for(e=0;e<g.length;e++)if(set_obj(b,g[e],a[g[e]],c),"style"==g[e])for(d=Object.keys(a.style),f=0;f<d.length;f++)set_obj(b.style,d[f],a.style[d[f]],c)}function _react_($el){function evaluate(a){if(null==a._elode_react)return null;var i,j,e,v,js,x,r=_SBA_(a._elode_react,"{,}");if(null!=r){for(x=a._elode_react,i=0;i<r.length;i++){if(v=r[i].substring(1,r[i].length-1),js=_SBA_(v,"{,}"),null!=js)for(j=0;j<js.length;j++){try{var c,s=js[j].substring(1,js[j].length-1);c=eval("a.parentNode."+s),(null==c||null==c)&&(c=eval("a."+s))}catch(a){c=null}if(null==c)return;"string"==typeof c&&(c="'"+c+"'"),v=v.replace(js[j],c)}try{e=_win.eval(v)}catch(a){}x=x.replace(r[i],e)}"function Text() { [native code] }"==a.constructor?x!=a.textContent&&(a.textContent=x):x!=a.innerHTML&&(a.innerHTML=x)}}if(null!=$el._elode_react){var i,ch=$el.childNodes;if(null!=ch&&0<ch.length)for(i=0;i<ch.length;i++)evaluate(ch[i])}}function _property_(b){var c;b._root=b.parentElement,b._node=b.children,b._add=b.appendChild,b._del=b.removeChild,b._set=b.replaceChild,b._scope=b.querySelectorAll,b._attr=function(a,c){return null==a&&null==c?b.attributes:null==c?b.getAttribute(a):(b.setAttribute(a,c),null==b.parentNode?b:b.parentNode)},b._on=function(a,c){return b.addEventListener(a,function(){c(this._root,this),this._root.react()}),b},b._class=function(a){return null==a?b.classList:b._attr("class",a)},b._css=function(a){return null==a?b.style:b._attr("style",a)},b._html=function(a){return null==a?b.outerHTML:(b.innerHTML=a,b)},b._txt=function(a){return null==a?b.innerText:(b.innerText=a,b)},b._val=function(a){return null==a?b.value:(b.value=a,b)},b._show=function(){return b._css().display="",b},b._hide=function(){return b._css().display="none",b},b._toggle=function(a,c){var d,e=b._attr(a);if(c.constructor==Array)for(d=0;d<c.length;d++)b._toggle(a,c[d]);else null==e&&(b._attr(a,""),e=b._attr(a)),there(e,c)?(e=e.replace(c,""),b._attr(a,fite(e))):b._attr(a,fite(e+" "+c));return b},b._get=function(a){return"number"==typeof a?_property_(b._node[a]):_property_(b.querySelector(a))},b._cell=function(a){for(var c=b.parentElement,d=[];null!=c&&null!=c._elode_property;)d.push(c),c=c.parentElement;return null==a?d:d[d.length-1-a]},b._destroy=function(a){if(null!=b.onDestroy&&b.onDestroy.constructor==Function&&b.onDestroy(),null==a)return b.parentElement.removeChild(b);if("number"==typeof a)return b.removeChild(b._node[a]);if(a.constructor==Array){for(c=0;c<a.length;c++)b.removeChild(a[c]);return}return b.removeChild(a)},b._new=function(){return null!=b._elode_query&&null!=b._elode_property?_win.Elode(b._elode_query,b._elode_property):_property_(b.cloneNode(!0))},b.prop=function(c){return null!=c&&(elode_prop(c,b,!0),b.react()),b},b.react=function(){return _react_(b),b},_react_(b);var a,c,d,e=null==b._elode_property?null:b._elode_property;if(null!=e&&(a=Object.keys(e),null!=a))for(c=0;c<a.length;c++)if(d=e[a[c]],d.constructor==Function&&"on"==a[c].substring(0,2))try{b.addEventListener(a[c].substring(2),function(){this.react(),null!=this.onReact&&this.onReact.constructor==Function&&this.onReact()})}catch(d){b.attachEvent(a[c],function(){this.react(),null!=this.onReact&&this.onReact.constructor==Function&&this.onReact()})}var f=b.childNodes;if(null!=f&&0<f.length)for(c=0;c<f.length;c++)_property_(f[c]);return b}function _rendering_(a){if(null!=a.onRender&&a.onRender.constructor==Function){var b,c=null==a._interval?1e3:a._interval;a._start=function(){null==a._interval|!1==a._interval&&(a._interval=!0),b=setInterval(function(){a.onRender(),a.react()},c)},a._start(),a._stop=function(){clearInterval(b),a._interval=!1}}}function _error_(a){var b="ELODE_ERROR \""+a+"\"",c=_win.Elode("div#elode_error() "+b);return console.log(b),c._attr("style","color:red;background-color:black;padding:16px"),c}Object.keys||(Object.keys=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b}),_win.Elode=function(a,b){if(null!=a||null!=b){var c;if("string"==typeof a&&"_"==a[0]){if(c=document.body.querySelector(a.substring(1)),null!=b&&elode_prop(b,c),elode_react(c),_react_(c),_property_(c),null!=c.onCreate)try{c.onCreate()}catch(a){}return _rendering_(c),c}return"string"!=typeof a&&there(a.constructor.toString(),"Element")?(c=a,elode_prop(b,c),elode_react(c),_react_(c),_property_(c)):void 0}}})(document,window);