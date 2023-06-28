/* 
    Elode.js (Project) - v1.3 
    ~ A unique javascript library for creating HTML element ~

    [OpenSource Project - Under The MIT License] 
     - https://www.github.com/equneko/elode -

    AUTHOR [ Your Name ]
    DESCRITPTION [ Description ]
*/
var { use, app } = Elode;

use({
 title:"h1.dark",
 text:"p.dark[style margin:24px]", 
 logo:"img.o-hover",
 btn:"a[href #].btn.bg-violet.white.rds.d-hover"
});

app("#App.content.center",[
    logo("[src assets/logo.svg| width 128 | style margin-bottom:18px]"),
    title("Get Started to <a[href #].violet.dh-color Elode.js!>"),
    text("Edit 'src/app.js' to start building app!"),
    btn("Learn More",{href:"https://github.com/equneko/elode"})
]).render();