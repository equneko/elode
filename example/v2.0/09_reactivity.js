/* 
    Reactivity
    by equneko (13/06/2023)
*/

// Basic
Elode(["div",
    "h1 Reactive Button",
    Elode("button Count {{x}} {{x} <= 1 ? 'time':'times'}",{
        x:0, onclick(){ this.x++; }
    })
]).render();

// Next
Elode(["form",
    "h1 {{model} == '' ? 'Reactive Input':{model}}",
    Elode("input[placeholder input something...]",{
        oninput(){
            this.root.prop({
                model:this.val()
            });
        }
    })
],{
    model:""
}).render();