const { use, render } = Elode;

use('div','h1','p',{
    btn:"button[style font-size:18pt]"
});

render(
  div(
    h1("Counter App"),
    p("Simple Counter Application Build In <b Elode.js>"),
    btn("Count {{count}} {{count} <= 1 ? 'time':'times'}",{
        count:0, onclick(){ this.count++; }
    })
  )  
);