function FlexLayout(child){
    return Elode([".flexlayout[style display:flex;text-align:center]"].concat(child))
}
function NavigationBar(data){
    var _ = Elode;

    return _([
        "#nav-bar.ctr.center",
        _([
            "a[href].dark.large.inline",
            "img[src "+data.logo+"| width 21]",
            "span[style margin-left:0.3em].f0 {{judul}}.js",
            "span#desc.f1[style margin-left:0.5em; margin-bottom:0.5em].medium.grey {{desc}}"
        ]), 
        _([
            "ul#menu-bar.ctr[style font-size:0.8em; margin-top:1em]",
            _("li(for x:$menu)[style margin-left:0.1em].inline "+
              "<a.btn.f1[style font-family:Tahoma] <span.fa.fa-{{x[1]}}> {{x[0]}} >"
            ,{ menu:data.menu,
                onCreate:function(){
                    this._node[0].href = "#"+this.x[0].replace(' ','');
                }
            })
        ]),
        "div#getstarted.hide"+
        "[style width:100%] "+
        "<button.btn.f1 <span.fa.fa-play> Get Started> <button.btn <span.fa.fa-bars>>"
    ],data);
}
function Jumbotron(){
    return Elode([
        "#jumbotron.ctr.center[style margin-bottom:2em;width:70%].white.bg-dark.px-64",
        `h1.f2[style font-weight:700] 
            A <span.red.f2 Unique> Javascript Module <br>
            <span.f2.grey for Creating <span.blue.f2 HTML Element>>
        `,
        "p.f1 Creating, Composing and Rendering HTML Element in A Unique Way!"
    ]);
}

function PostCard(data){
    return Elode([
        ".postcard.ctr.inline"+data.addc,
        "h1.large.f2 {{judul}}", "p.medium.opacity.f0 {{desc}}"
    ],data);
}

function ViewPage(data){
    return Elode([
        ".viewpage.medium.left[style width:40%]",
        "h1.dark.f2[style margin-bottom:0.3em] {{judul}}",
        "p.grey.f1.thin "+data.post
    ],data)
}

function CodeView(data){
    var _ = Elode;
    return _(["pre.codeview.f3",
        "code.medium.bg-dark.white.card.left.language-javascript"
        ],{
            onCreate:function(){
                this._node[0]._html(data.coding);
            }
        });
}

function ContentPage(data){
    var r = FlexLayout([
        ViewPage({
            judul:data.judul,
            post:data.post,
        }),
        "br.hide",
        CodeView({coding:data.coding})
    ]); r.id = data.id;

    return r;
}