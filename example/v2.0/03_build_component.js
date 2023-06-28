/* 
    Build Component
    by equneko (08/06/2023)
*/

// Basic
Elode("div <h1 My Website> <p Welcome to my website!>").render();

// Next
Elode(["marquee",
    "p This is an Advertisement Marquee...",
    Elode("button Request Ad {{count}}x",{
        count:0, onclick(){ this.count++; }
    })
]).render();

// Extended
Elode.use('div','h1','p','ul','li');

div(
    h1("Alf Equilfe"),
    p('Anime Illustrator, Indie Game Developer and Web Developer'),
    ul(
        li("I draw stuff"), 
        li("I like to coding"), 
        li("do something with cat!")
    )
).render();