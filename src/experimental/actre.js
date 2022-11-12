/* 
    ActreJS - [Adaptive Component To Render Element]
    ~ Simple way to render html element with simple query ~

    v0.1.7 - @Created (17-09-2022) - by Muhammad Alfajri Arraihan

    [OpenSource Project - Licensed Under MIT]
    Visit "https://github.com/equneko/actre"
*/
!function(_doc,_win){ 'use strict';
if(_win == 'undefined' || _win == null){ console.log('ActreJS - Error(0)'); return;}
    /* Actre - Class model to make an component or element */
    _win.Actre = function ActreClass(query,data){ var divnull = _doc.createElement('div');
        if(query == null && data == null) return divnull;
        var  memory = {},
        //Actre - Properties for html element
          setPropertyOfSelf = ($)=>{
            this._ = (x,y)=>{this.query+="|"+x;this.self = new Actre(this.query,y).self; return this;};
            this.actre = ()=>{
                var drgx = /\{(?:[^}{]+|\{(?:[^}{]+|\([^}{]*\})*\})*\}/gmi,
                d = this.html().match(drgx), z = this.text();
                if(d != null){
                    for(i = 0; i < d.length; i++){
                        var kxt = d[i].substr(1,d[i].length-2), 
                        dxt = eval(kxt);
                        z = z.replaceAll(d[i],dxt);
                        this.html(z);
                    }
                }
                return this;
            };
            this.on = (x,y)=>{
                var core = new Actre($.parentElement);
                $.addEventListener(x,()=>{y(core);});
                return core;
            };
            this.load = (x)=>{return this.on("load",x)};
            this.click = (x)=>{return this.on("click",x)};
            this.dbclick = (x)=>{return this.on("dblclick",x)};
            this.hover = (x)=>{return this.on("hover",x)};
            this.attr = function(x,y){
                if(x != null && y == null) return $.getAttribute(x);
                $.setAttribute(x,y);
            };
            this.id = (x)=>{return this.attr('id',x);};
            this.class = (x)=>{return this.attr('class',x);};
            this.css = (x)=>{return this.attr('style',x);};
            this.child = $.children;
            this.html = function(x){
                if(x == null) return $.outerHTML;
                $.innerHTML = x;
            };
            this.text = function(x){
                if(x == null) return $.innerHTML;
                $.textContent = x;
            };
            this.show = function(){$.style.display = "block";};
            this.hide = function(){$.style.display = "none";};

            if(this.child.length > 0){
                var chi = this.child, i, attr;
                for(i = 0; i < chi.length; i++){
                    if(chi[i].hasAttribute('id')){
                        attr = chi[i].getAttribute('id');
                        eval("this."+attr+"=new Actre(chi["+i+"]).actre();");
                    }
                }
            }
        };
        //Query Interpreter
        //rgx = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/gmi; FOR (expression)
        //rgx = /\[(?:[^\]\[]+|\[(?:[^\]\[]+|\([^\]\[]*\])*\])*\]/gmi; FOR [expression]
        //rgx = /\{(?:[^}{]+|\{(?:[^}{]+|\([^}{]*\})*\})*\}/gmi; FOR {expression}
        //rgx = /\<(?:[^><]+|\<(?:[^><]+|\([^><]*\>)*\>)*\>/gmi; FOR <expression>
        var invokeQ = (x)=>{
            var rgx = /\<(?:[^><]+|\<(?:[^><]+|\([^><]*\>)*\>)*\>/gmi, res = {};
            //ActreSelfInvoke - Query Interpreter
            var e, q = x.match(rgx),i,o,r = x;
            if(q != null){ //Invoke Element Ex:<h1 Hello World>
                for(i = 0; i < q.length; i++){
                    o = q[i].trim(); o = o.substr(1,o.length-2);
                    if(o.match(rgx) != null){
                        o = o.replace(o,invokeQ(o).result);
                    }
                    e = new Actre("!noInvoke!"+o);
                    if(e.self.constructor == Array){
                        var ex = e.self,j,ep = '';
                        for(j = 0; j < ex.length; j++){
                            ep += ex[j].html();
                        }
                        r = r.replace(q[i].trim(),ep);
                    }
                    r = r.replace(q[i].trim(),e.html());
                }
            }
            res.result = r; return res;
        };
        /* ELEMENT NOT AS A QUERY */
        if(typeof query != 'string'){
            var qcon = query.constructor.name;
            if(qcon.includes("HTML") && qcon.includes("Element")){ //Defined as HTMLElement
                this.self = query;
                setPropertyOfSelf(this.self);
                return this;
            }
        }
        
        if(query.trim() == '') return divnull; 
            this.query = query.trim();
        if(query.includes("!noInvoke!")){
            query = query.replace("!noInvoke!",'');
        }else{
            query = invokeQ(query).result;
        }
        //Query Element Maker
        var qelem = function(x){
            if(x.split(' ')[0].includes('!')){ 
            //Loops Element Algorithm
                var xe = x.trim().split('!'), i, len = eval(xe[0]),xin,xres ='';
                for(i = 0; i < len; i++){
                    xin = xe.toString().replaceAll(',',' ');
                    xres += x.replace(xe[0]+'!','')+'|';
                }
                x = xres.substr(0,xres.length-1);
                return new Actre("!noInvoke!"+x).self;
            }
            //Virtual element
            var ve = _doc.createElement('div'), qy = x.trim(),
            attrgx = /\[(?:[^\]\[]+|\[(?:[^\]\[]+|\([^\]\[]*\])*\])*\]/gmi,
            attr = qy.match(attrgx);

            if(attr != null){ //Attributes of an element
                var vttr = attr[0].substr(1,attr[0].length-2), key, i,
                addAttr = function(x){
                    key = x.split(' ');
                    ve.setAttribute(key[0].trim(),
                    x.split(' ').toString().replaceAll(',',' ').replace(key[0],'').trim());
                }
                if(vttr.includes(',')){
                    vttr = vttr.split(',');
                    for(i = 0; i < vttr.length; i++){
                        addAttr(vttr[i].trim());
                    }
                }else{
                    addAttr(vttr.trim());
                }
                qy = qy.replace(attr[0],'');
            }
            
            var qyl = qy.split(' '),
            qy0 = qyl[0].trim(), qy1 = qy.substr(qy0.length).trim(),
            id = '', cls = '';

            if(qy0.includes('#')){ //Id of an element
                id = qy0.split('#')[1];
                if(id.includes('.')){ id = id.split('.')[0]; }
                qy0 = qy0.replace('#'+id,'');
            }
            if(qy0.includes('.')){ //Class of an element
                cls = qy0.split('.');
                var scls = cls.toString(); qy0 = cls[0];
                cls = scls.replace(cls[0]+',','').replaceAll(',',' ');
            }
            var e = _doc.createElement(qy0);
            if(id != '') e.setAttribute("id",id);
            if(cls != '') e.setAttribute("class",cls);
            if(ve.hasAttributes()){ var vettr = ve.attributes, v, k;
                for(k = 0; k <vettr.length; k++){
                    v = vettr[k];
                    e.setAttribute(v.name,v.value);
                }
            }
            e.innerHTML = qy1; return e; //Return - Html element (DOM)
        };
            //Multiple - Build multiple element with query
            if(query.includes('|')){
                var qy = query.split('|'), qarr = [], i,j, obj,
                ve = _doc.createElement('div'); //Virtual element
                for(i = 0; i < qy.length; i++){
                    obj = new Actre("!noInvoke!"+qy[i]);
                    if(obj.self.constructor == Array){
                        for(j = 0; j < obj.self.length; j++){
                            ve.appendChild(obj.self[j].self);
                            qarr.push(obj.self[j]);
                        }
                    }else{ ve.appendChild(obj.self); qarr.push(obj); }
                }
                this.self = qarr;
                this.virtual = ve;
                setPropertyOfSelf(ve);
                 return this; //Return - Collection of element (Array);
            }
            this.self = qelem(query);
            if(this.self.constructor == HTMLUnknownElement) this.self = qelem("div "+query);
                setPropertyOfSelf(this.self);
            return this; //Return - Single element (DOM)
    }
    /* actre - Objective model to use as a prototype of ActreClass */
    _win.actre = {
        write: function(query,bind=_doc.body){
            var domRender = function(a,b){
                if(b == _doc.body){
                    var h = b.children, l = h.length, i = 0, e = h[i];
                    for(i = l; i > 0; i--){ e = h[i-1];
                        if(e.constructor != HTMLScriptElement)
                            e = h[i+1]; break;
                    }
                    b.insertBefore(a,e); //Render - Before body <script> element
                    return a;
                }
                b.appendChild(a); //Render - Append child into <binded> element
                return a;
            };
            var render = function(x,y){ //Actre - Create bind element
                if(x.constructor.name == 'ActreClass'){
                    if(x.self.constructor == Array){
                        var i; for(i = 0; i < x.self.length; i++){
                            domRender(x.self[i].actre().self,y); //Render - Multiple element
                        }
                        return x.actre().self; //Return - Multiple element (ArrayObject)
                    }
                    return domRender(x.actre().self,y);
                }
                var z = new Actre(x).actre();
                if(z.self.constructor == Array){
                    var i; for(i = 0; i < z.self.length; i++){
                        domRender(z.self[i],y); //Render - Multiple element
                    }
                    return z.self; //Return - Multiple element (ArrayObject)
                }
                return domRender(z.self,y); //Rendereturn - Single element (DOM)
            };
            if(typeof bind == 'string') bind = _doc.querySelector(bind);
            if(typeof query == 'string') return render(query,bind);
            if(query.constructor == Array){
                var i; for(i = 0; i < query.length; i++)
                { actre.write(query[i],bind); } return query;
            }
            if(query.constructor.name == 'ActreClass') return render(query,bind);
            return domRender(query,bind);
        }
    }
}(document,window);