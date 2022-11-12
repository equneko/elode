'use strict';

//Biend Memory, Allocation Of All BiendComponent
class BiendMemory {
    constructor(){
        this.databind = {
            query:[], data:[]
        };
    }
}
let _Biend_mem = new BiendMemory();

//Biend Class, Foundation Of All BiendComponent
class Biend {
    static doc = document;
    constructor(a,b){
        this._ = (na,nb)=>{
            let elem;
            if(na == null && nb == null){
                Biend.render(this.html,Biend.doc.body);
                return this.html;
            }else{
                elem = this.html+new Biend(na,nb).html;
            }

            this.html = elem;
            return this;
        }

        let renderElement = (tag,prop,val)=>{
            //Setup Properties
            this.tag = tag; this.prop = prop; this.val = val; 
            tag = tag.trim(); val = val.trim();

            this.html = "<"+tag+""+prop+">"+val+"</"+tag+">";

            this.elem = Biend.doc.createElement(tag.toUpperCase());
            this.elem.innerHTML = this.html;
            this.child = this.elem.children[0].children;

            //Render Html Element
            return this.html;
        }
        let dataExtractor = (data,def)=>{
            //Data Extractor For Identifier
            switch(data.constructor){
                case String:{
                    if(def == Biend){
                        return new Biend(data).html;
                    }
                    return data.trim(); break
                }
                case Biend:{
                    return data.html; break
                }
                case Array:{
                    let r = '';
                    for(let i = 0; i < data.length; i++){
                        let j = data[i];
                        if(j.includes('=')){
                            r += dataExtractor(data[i],Biend);
                        }else{ r += dataExtractor(data[i]);}
                    }
                    return r; break
                }
                default:{
                    return data;
                }
            }
        }
        let propBind = (query,type)=>{
            //Classes Bind Element - Property
            let q = query.trim();
            if(q.includes(type)){
                let cls = q.trim().split(type); 
                let bind = ''; q = cls[0];
                for(let i = 0; i < cls.length; i++){
                    if(i == 0) continue;
                    bind += cls[i];
                }
                switch(type){
                    case '#':{
                        return " id=\""+bind+"\""; break
                    }
                    case '.':{
                        return " class=\""+bind+"\""; break
                    }
                    case '@':{
                        return " name=\""+bind+"\"";
                    }
                }
            }

            return '';
        }
        let queryElement = (query)=>{
            //Element Builder - Query Usagement
            let q = query.trim(); let qy;
            let prop = '';
            if(q.includes('=')){
                qy = q.split('=');
                //Check Ids
                prop += propBind(qy[0],'#');
                //Check Classes
                prop += propBind(qy[0],'.');
                //Check Names
                prop += propBind(qy[0],'@');


                
                if(prop.length > 0){
                    if(qy[0].includes('#')){ qy[0] = qy[0].split('#')[0]; }
                    else if(qy[0].includes('.')){ qy[0] = qy[0].split('.')[0];}
                    else if(qy[0].includes('@')){ qy[0] = qy[0].split('@')[0];}
                }

                this.html = renderElement(qy[0],prop,qy[1]);
            }

            return this.html;
        }
        let createElement = (query,data)=>{
            //Element Builder - Standard Usagement
            let q = query.trim();
            let d = dataExtractor(data);
            let prop = '';
              //Check Ids
              prop += propBind(q,'#');
              //Check Classes
              prop += propBind(q,'.');
              //Check Names
              prop += propBind(q,'@');

             if(prop.length > 0){
                if(q.includes('#')){ q = q.split('#')[0]; }
                else if(q.includes('.')){ q = q.split('.')[0];}
                else if(q.includes('@')){ q = q.split('@')[0];}
            }
            
            this.html = renderElement(q,prop,d);
            return this.html;
        }

        let dataBinding = (query,data)=>{
            //Data Binding
            let q = query.trim(); 
            let d = dataExtractor(data);
            let db = _Biend_mem.databind;
            let dbq = db["query"];

            if(dbq.length > 0){
                for(let i = 0; i < dbq.length; i++){
                    let dque = dbq[i].split(":");
                    if(dque[0] == q){
                        let x = db["data"][i];
                        for(let j = 0; j < x.length; j++){
                            let xd = x[j].innerHTML;
                            let r =  xd.replaceAll(new RegExp(dque[1],"gi"),d);
                            x[j].innerHTML = r;
                        }
                        return;
                    }
                }
            }
            let el = Biend.doc.body.children;
            let rel = [];
            dbq.push(q+":"+d);
            for(let i = 0; i < el.length; i++){
                let inner = el[i].innerHTML;
                if(inner.includes(q)){
                    el[i].innerHTML = inner.replaceAll(q,d);
                    rel.push(el[i]);
                }else{ continue; }
                db["data"].push(rel);
            }
            for(let i = 0; i < dbq.length; i++){
                if(dbq[i].includes(q)){
                    return db["data"][i]
                }
            }
        }

        //Biend Main
        if(a != null && b == null){
            queryElement(a);
        }else{
            if(a[0] == "$"){
                dataBinding(a,b);
            }
            createElement(a,b);
        }

        return this.html;
    }
    
    bind(scope){
        let typ = scope.constructor.toString();
        if(typ.includes("HTML") && typ.includes("Element")){
            scope.innerHTML = this.html; return;
        }
        let el = Biend.doc.querySelector(scope);
        el.innerHTML = this.html;

        let elms = Biend.doc.body.children;
        for(let i = 0; i < elms.length; i++){
            if(elms[i] == this.elem){
                elms[i].innerHTML = this.elem.innerHTML;
            }
        }
        this.scope = el;
        return this;
    }

    set(data){
        let change = (value)=>{
            let con = value.constructor;
            if(con == String){
                return value;
            }else if(con == Biend){
                return value.html;
            }
            else if(con == Array){
                for(let i = 0; i < value.length; i++){
                    let v = value[i];
                    if(v != null){
                        this.child[i].innerHTML = change(v);
                    }else{ continue; }
                }
                return this.elem.innerHTML;
            }
        }

        this.elem.innerHTML = change(data);
        if(typeof this.scope != 'undefined'){
            Biend.render(this.elem.innerHTML,this.scope);
        }
    }

    get(index){
        return this.child[index];
    }

    static render(biend,scope){
        let byp = biend.constructor;
        let dom = biend;
        if(byp == biend){
            dom = biend.html;
        }

        let el;
        if(scope != null){
            if(typeof scope == 'string'){
                let typ = scope.constructor.toString();
                if(typ.includes("HTML") && typ.includes("Element")){
                    scope.innerHTML = dom;
                }
                el = Biend.doc.querySelector(scope);
            }else{
                el = scope;
            }
        }else{
            el = Biend.doc.body;
        }
        el.innerHTML = dom;

        if(byp == Biend){
            let elms = Biend.doc.body.children;
            for(let i = 0; i < elms.length; i++){
                if(elms[i].innerHTML == biend.html){
                   elms[i].innerHTML = Biend.elem.innerHTML;
                }
            }
        }

    }
}
//Public usagement like JQuery ($) but Biend (_)
let _ = (query,data)=>{return new Biend(query,data);}
