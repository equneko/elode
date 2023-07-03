Elode("h1 Hello World!")._render();
Elode("(!h1,h2,h3,h4,h5,h6) Hello World Multitag!")._render();
Elode("h1(data : el.db.data) {data} Hello World Loop! ",{data:[1,2,3,4,5]})._render();

Elode("button.btn.large Counter {el.db.count}",{count:0})
._click(function(ev,el){
    el.db.count++;
})._render();

Elode("br")._render();

Elode(" <h1#testmodel Test Model> <input.large[placeholder Input Something]>")
._class("container")._child[1].
_input(function(ev,root,el){
    var model = root._child[0];
    model.innerText = el.value;
})._render();
