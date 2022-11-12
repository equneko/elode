Elode([
    "#todo-app.container",
    "h1.dark {{app.name}}",
    "p.grey[style margin-left:1em] {{app.desc}}",
    "input#task[placeholder ketik sesuatu...|style margin-top:1em].btn.medium",
    "button#btn.btn.bg-blue.hoverx.medium Tambah #{{count}}",
    "ul[style list-style-type:none].container#test"
],{
    count: 1,

    app:{
        name:"Apa yang kamu akan lakukan?",
        desc:"tambahkan tugas ke dalam list aplikasi tugas ini"
    },

    onCreate:function(){
        var btn = this._get(3),
            task = this._get(2);

        task.addEventListener("keyup",function(ev){
            if(ev.keyCode == 13){
                btn.click();
            }
        });

        btn.onclick = function(){
            var $ = this._root;

            if(task._val().length <= 0) return;
            Elode("li.list[style margin-bottom:0.5em] <p.inline[style width:90%] "
                +$.count+". "+task._val()+
                "> <button.btn.bg-red.hoverx.inline X>",
            { count:$.count,
                    onCreate:function(){
                        var btn = this._get(0);
                            btn.onclick = function(){
                                $.prop({count:this._root.count});
                                this._root._remove();
                            }
                    },
                    onRemove:function(){
                        alert(this.count+" Removed");
                    }
            }).render("#test");

            task._val("");

            $.prop({count:$.count+1});
        }
    }

}).render();