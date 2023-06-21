const { use, map, router, render } = Elode;

use('h1','p','a','li')

let links = ['Home','Gallery','About'];
function LinkedLink(){
    return map("ul",links,(x)=>li(a("[href ?/"+x.toLowerCase()+"]"+x)));
}

router({
    "/":(args)=>{
        render(
            h1("Elode.js Router"),
            args ? p(args):'',
            p("Belajar <b Elode.js> Router"),
            LinkedLink()
        )
    },
    "home":()=>{ router("","Loh Balik Lagi :v"); },
    
    "gallery":()=>{
        render(
            h1("Gallery"),
            LinkedLink()
        )
    },
    "about":()=>{
        render(
            h1("About"),
            LinkedLink()
        )
    }
});

