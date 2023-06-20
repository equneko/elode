const { use, map, render, XSS } = Elode;

use('div', 'input', 'li', 'button');

render(
    App = div("[id todoapp]",

        "h3 Apa Yang Kamu Ingin Lakukan?",
        
        TaskInput = input("[type text | placeholder Ketik Tugas...]", {
            onkeydown(e) {
                if (e.keyCode == 13) App.addTask();
            }
        }),

        button("Tambah Tugas", {
            onclick(){ App.addTask() }
        }),

        "p Tugas Mu:",

        ListTugas = map("ul", [],
            (x, i) => li("[style margin:4px]", 
            input("[type checkbox]", {
                onclick() { 
                    this.root.toggle("style", "color:blue"); 
                }
            }), "span " + (i + 1) + "." + XSS(x),
            button("[style margin-left:8px] x", {
                onclick() { 
                    this.root.destroy(); 
                    App.task.splice(App.task.indexOf(x), 1); 
                }
            })
        ).render(this)),

        {
            task: [],
            addTask() {
                this.task.push(TaskInput.val());
                ListTugas.map(this.task);
                TaskInput.val("");
            }
    })
);