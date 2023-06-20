'use strict'

let nguli = (el)=>{
    let rot = document;
    let res = rot.body.innerHTML;
    let cid = rot.body.children;
    let objc = {};

    for(var i = 0; i < cid.length; i++){
        let K = cid[i].getAttributeNames();
        if(K == null || !K.includes(el)) continue;
        let V = cid[i].getAttribute(K);

        this.obj = cid[i];
        this.parm = V;
    }

    this.build = (objs)=>{
        let O = this.obj;

        let V = O.innerHTML;
        alert(V);
    }

    return this;
}

nguli("rumah").build({
    title:"<h1>$0</h1>"
});