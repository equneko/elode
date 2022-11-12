'use strict';
/*
    Okeh.js - Simple way to build simple web.
    v0.7 - Initial release, basic feature.

    https://www.github.com/equneko/Okeh
*/

/* OkDocument - short namespace */
let _doc = document;
//OkBasic - query syntax for html elements
let _okehquery = function(q){
    if(q == null) return null;

    let qcon = q.constructor; //Query
    let arrq = qcon == Array; //Array Query
    let objq = qcon == Object; //Object Query
     
    if(!arrq && !objq) q = q.trim(); //Defined as default (String)
    let el = undefined;

    //Multi element maker
    el = _doc.createElement("DIV");
    if(arrq || objq){ let ql = q;
        if(objq){ for(let o in ql){
            if(ql[o] == null){ //If Object Null
                el.appendChild(_doc.createElement(o.toUpperCase()));
                continue;
            }
            el.appendChild(_okehquery(o+" "+ql[o].trim()));
        } return el; } 
    }if(q.includes("|")){
        let ql = q.split('|');
        for(let i = 0; i < ql.length; i++){
            let qy = ql[i].trim();
            el.appendChild(_okehquery(qy));
        }
        return el; //Return Multi HTML element (DOM)
    }

    //Single element maker
    let qi = q.split(" "); 
    let q0 = qi[0].trim(); //Key - tag
    let q1 = q.trim().slice(q0.length); //Value - content

    class keyEval {
        constructor(x) {
            if (x.includes('#')) { x = x.split('#'); this.id = x[1]; x = x[0];}
            if (x.includes('.')) { x = x.split('.'); this.cls = x.slice(1, x.length + 1); 
            this.tag = x[0].trim(); return} this.tag = x;

            return
        }
    }
    let attrEval = function(x,e){
        if(x.id != null){ e.setAttribute("id",x.id.trim());}
        if(x.cls != null){ let r = '';
            for(let i = 0; i < x.cls.length; i++){
                r += x.cls[i].trim()+' ';
            }
            e.setAttribute("class",r.trim());
        }
        return e;
    }

    //Multitag element
    if(q0.includes(',')){
        let x = _doc.createElement('DIV');
        q0 = q0.split(',');
        let kev = new keyEval(q0[0]);
        for(let i = 0; i < q0.length; i++){
            let nkev = new keyEval(q0[i]);
            if(nkev.cls != null) kev = nkev;

            let e = _doc.createElement(nkev.tag.toUpperCase());
            e = new attrEval(kev, e);
            e.innerHTML = q1.trim();
            x.appendChild(e);
        }
        return x;
    }

    //Key evaluation
    let kev = new keyEval(q0);
    el = _doc.createElement(kev.tag.toUpperCase());
    //If defined as unknown element, then just write it (String)
    if(el.constructor.toString().includes("Unknown")){ return q;}
    el = new attrEval(kev, el);

    //Value evaluation
    el.innerHTML = q1.trim();

    return el; //Return a single HTML element (DOM)
}

/* Okeh Class: Foundation of all OkehFeature usagement*/
class Okeh {

    //Key: for identifier query | Val: the data of query
    constructor(key,val){
        if(key == null && val == null) return null;

        if(key != null && val == null){
            this.elem = _okehquery(key); //Return HTML element (DOM)
            this.child = this.elem.children;
            this.html = this.elem.innerHTML;
            this.text = this.elem.textContent;

            //Making child into methods
            for(let i = 0; i < this.child.length; i++){
                let o = this.child[i]; let k = o.tagName.toLowerCase();
                eval("this."+k+" = o;");
            }
        }

        return this; //Return Okeh (Class)
    }

    //Adaptation of _okehquery function
    static write(query,bind){
        let el = query;
        if(query.constructor == Okeh){
            el = query.elem;
        }

        let bindWriter = function(e,x){ //bindWriter: for element rendering
            if(x != null){
                if(typeof x == 'string'){
                    x = _doc.querySelector(bind);
                }
                x.appendChild(e);
            }else{ let b = _doc.body; let cl = b.children[b.children.length-1];
                if(typeof e == 'string'){ cl.insertAdjacentText("beforebegin",e); return; }
                cl.insertAdjacentElement("beforebegin",e);
            }
        }
        let childWriter = function(e,x){ //childWriter: for element's child rendering
            let elc = e.children;
            const elen = elc.length;
            if(elen > 0){
                for(let i = 0; i < elen; i++){
                    childWriter(elc[0],x);
                    bindWriter(elc[0],x);
                }

		        return true;
            }
                return false;
        }

        //mainWriter: all query executed here
        if(typeof query == 'string'){
            el = _okehquery(query);
            if(typeof el == 'string'){
                bindWriter(el,bind);
                return el;
            }
        }
        if(childWriter(el,bind)) return el;
        bindWriter(el,bind);
        return el;
    }
}