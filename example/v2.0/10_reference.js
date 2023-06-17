/* 
    Reference
    by equneko (13/06/2023)
*/

Elode.ref({
    test:"Hello World"
});

Elode(["div",
    "h1[onclick test('Hello Reference!')] Click Me {$test}",
    "marquee {$test} Elode.js!",

    "input[style font-size:14pt|placeholder Realtime Editor| oninput test(this.val())]",
    "br","br", "button[style font-size:14pt|onclick alert($test)] Get Reference"
]).render();