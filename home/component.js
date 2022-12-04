/* =================================== COMPONENT =================================== */

function ContentCard(data){
    return _([".content.ctr.left.mx-16"+data.class,
        "h2.large[style margin-bottom:0.5em] "+data.title,
        "p.small[style line-height:1.5em] "+data.desc,
    ]);
}


function ContentPost(data){
    return _([".content.ctr.left.mx-16"+data.class,
        "h2[style margin-bottom:0.5em] "+data.title,
        "p[style line-height:1.5em] "+data.desc,
    ]);
}

function CodeView(data){
    if(data.height==null)data.height = "9em";

    return _(["pre.codeview[style width:50%;]",
        "p.small.px-8.b-dark[style font-family:sans-serif] <b <span.fa.fa-code> "+data.title+">"+
        "  <span.grey(!) <span.fa.fa-folder> (../"+data.dir+")>"+
        "<a[href #|style float:right].grey <span.fa.fa-copy>>",
        "code[style padding:16px 32px;height:"+data.height+"].small.bg-dark.white.card.left."+data.lang,
        "p#result.bg-violet.white.small.px-8[style font-family:sans-serif] <span.fa.fa-globe> <b  Result>",
        "#view.ctr.b-dark.[style font-family:sans-serif; font-size:0.5em]"
        ],{
            onCreate:function(){
                this.node[1].html(data.coding);
                if(data.result==null){
                    this.get("#result").hide();
                    this.get("#view").hide();
                    return;
                }
                var root = this.get("#view");
                data.result.render(root);
                
            }
    });
}