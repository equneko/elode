app = Elode.app("#TodoApp.container",[
    "h1[style margin-bottom:0.5em] What Do You Want To Do?",
    "input#field.container[style margin-right:0.5em]",
    "button#btn.medium.btn.bg-blue.hoverx Add List",
    "ol.container.large {db.list}"
],{db:{list:[]}})
.btn._click(function($){
    var db = $.root.db;
    var field = $.root.field;

    db.list += "<li>"+field.value+"</li>";
    field.value = "";
    
})
._render();

app.field._keycode(13,null,app.btn);