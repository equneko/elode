// Elode-Import memasukan fitur Elode.js
Elode.import('use','map','render','xss');

// Elode-Use menggunakan HTML-Tag
use('div', 'input', 'li', 'button');

// Main Render <body></body>
render(
  	// @App = <div></div>
    App = div("#TodoApp",

        "h3 Apa Yang Kamu Ingin Lakukan?",
        
        // @TaskInput = <input>
        TaskInput = input("[type text | placeholder Ketik Tugas...]", {
            onkeydown(e) {
                // Tambah tugas dengan ENTER dan memanggil fungsi @App.addTask()
                if (e.keyCode == 13) App.addTask();
            }
        }),

        // Tambah tugas dengan memanggil fungsi @App.addTask()
        button("Tambah Tugas", {
            onclick(){ App.addTask() }
        }),

        "p Tugas Mu:",

        // @ListTugas = @Map<ul></ul>
        ListTugas = map("ul", [],
            (value, index) =>
            // Isi dari @ListTugas berupa <li></li>
            li("[style margin:4px]",
               	
               	// CheckBox
            	input("[type checkbox]", {
                	onclick() { 
                    	this.root.toggle("style", "color:blue"); 
                	}
            	}),
               	// Text (1. Contoh)
                "span "+ (index + 1) + "." + xss(value), // xss(source) bypass XSS Attack
               	// Button
           		button("[style margin-left:8px] hapus", {
                	onclick() {
                        // @ListTugas di splice() Isinya
                    	ListTugas.map.splice(ListTugas.map.indexOf(value), 1); 
                	}
            	})
        )),

    {
      // Database milik @App
        addTask() {
          	// @ListTugas di push map dengan @TaskInput.value
            ListTugas.map.push(TaskInput.val());
            // @TaskInput.value di reset jadi blank
            TaskInput.val("");
        }
    })
)

