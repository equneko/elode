/* 
    Declarative
    by equneko (11/06/2023)
*/


// Basic
var title = Elode("h1 My Website"),
    subtitle = Elode("p Welcome to my website! Build in Elode.js v2!");

Elode(["div",
    title,
    subtitle
]).render();

// Next
function ArticleView(title, description){
    return Elode(["div",
        "h1 "+title,
        "p "+description,
        "button[style margin-right:8px] Read Article", "button Share"
    ]);
}

ArticleView(
    "Elode.js v2 Update!",
    "The experimental project, Elode.js has been updated to v2! "+
    "get started now, learn more about this and bring unique way "+
    "to your web development!"
).render();

// Extended
Elode.use('div','h3','p',{btn:'button[style margin-right:8px]'});

function SosmedPost(title, caption){
    return div(
        h3(title),
        div("",{
            style:{
                width:"128px", height:"128px",
                border:"1px solid black",
                backgroundColor:"grey"
            }
        }),
        p(caption),
        btn("React"),  btn("Comment"),  btn("Share"));
}

SosmedPost("Windows 12 Release?!","That's just a joke :v").render();