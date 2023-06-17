/* 
    Hello World
    by equneko (07/06/2023)
*/

// Basic
Elode("h1 Hello World").render();

// Next
Elode("div <h1 Hello World> <p Learn Elode.js Web Development>").render();

// Extended
Elode.use('marquee','h1','p','b');

marquee(
    h1("Hello World"),
    p("Learn ",b("Elode.js!"))
).render();