/* 
    Basic Tools
    by equneko (08/06/2023)
*/

// Add Element
Elode("div").render()
.add(Elode("h1 Hello World"));

// Set Attribute
Elode("p Hello Attribute")
.attr("style","background-color:yellow").render();

// Define Class
Elode("p Hello Class").class("text medium blue").render();

// CSS Style
Elode("p Hello CSS").css("background-color:cyan; font-size:12pt; font-family:consolas").render();

// Add EventListener
Elode("button Click Me")
.on("click",function(){ 
    alert("Hello On Event"); 
}).render();

// Set innerHTML
Elode("h1 Hello HTML (Set)",{
    onclick(){
        this.html("<marquee>Modified HTML!</marquee>");
    }
}).render();

// Get outerHTML
Elode("h1 Hello HTML (Get)",{
    onclick(){
        alert(this.html());
    }
}).render();

// Set innerText
Elode("h1 Hello TEXT (Set)",{
    onclick(){
       this.txt("Hello Modified Text")
    }
}).render();

// Get innerText
Elode("h1 Hello TEXT (Get)",{
    onclick(){
        alert(this.txt());
    }
}).render();

// Set value of input
Elode("h1 Hello Value <input[placeholder SET VALUE]>",{
    onclick(){
        this.get(0).val("Hello I'm Value!");
    }
}).render();

// Get value of input
Elode("h1 Hello Value <input[placeholder GET VALUE]>",{
    onclick(){
        alert(this.get(0).val());
    }
}).render();

// Show Element
Elode("h1 Show Element").render().show();

// Hide Element
Elode("h1 Hidden Element").render().hide();

// Get Element
Elode("div <h1#title Hello Title> <p Subtitle, learn Elode.js>",{
    onCreate(){
        var title = this.get("#title"),
            subtitle = this.get(1);

            title.css("color:blue");
            subtitle.css("font-family:consolas");
    }
}).render();

// Clone Element
Elode("h1 {{x}} Element",{x:"Original"}).render()
.clone({x:"Cloning"}).render();

// Destroy Element
Elode("h1[onclick this.destroy()] Destroy Element (Click)").render();

// Seen Show/Hide Element
Elode("h1 Seen True Element").render().seen(true);

Elode("h1 Seen False Element").render().seen(false);

// Toggle Element
Elode("h1[style color:red] Click Me Toggle",{
    onclick(){
        this.toggle("style",["color:blue","color:red"]);
    }
}).render();