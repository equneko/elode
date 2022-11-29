_("h3#attention.small.center.ctr.gd-att.white "+
"Support this project by <a.o-hover.yellow[href #] <span.fa.fa-dollar> Donate> our development or"+
" <a.[href #|style padding:4px 16px].rds.o-hover.bg-dark.white Give a star <span.fa.fa-star> at github <span.fa.fa-github>>")
.render(App);

_(["#navbar[style width:100%]",
_([".left.inline",
    "img.inline[src res/images/logo.png|width 18|style margin-right:0.3em]",
    "a#title[href #].dark.medium.inline Elode.js",
    "a#install.a-hover.dark.small[href #|style margin-left:2em] <span.fa.fa-download> v1.0",
    "a#bars.a-hover.dark.large[href #|style margin-left:3em] <span.fa.fa-bars>"]),
_(["#menu.medium.[style float:right].inline", 
    _("a.a-hover.small.dark[href #|style margin-right:1em](for x:$menu) <span <span.fa.{{x[0]}}>> {{x[1]}}",{
        menu:[
            ["fa-github","Github"],
            ["fa-code","Tutorial"],
            ["fa-book","Documentation"],
            ["fa-cubes","Example"],
            ["fa-comments","Community"]
        ]
    }),
])
]).render(App);

_(["#jumbotron.ctr.center.dark",
"h1.mx-8 A <span.violet Unique> Way <br#side> Web <span.fa.fa-code> Development",
"p.medium.grey <b Creating>, Composing and Rendering <b HTML Element> in An Unique Way!",
_(["#getstarted.center.mx-16",
    "a[href #].bold.btn.rds.small.d-hover.bg-violet.mx-8 <span.fa.fa-play> Get Started",
    "a[href #].bold.btn.rds.small.mx-8 <span.fa.fa-download> Install",
    "a.btn-coll.mx-8[href #|style border:1px solid #202020].rds.small.dark <span.fa.fa-clock-o> Show Changelog"
])
]).render(App);

_(["#post-card.bg-dark",
"img[src res/images/background.jpg]",
_(["#content.ctr.flex.[style width:80%]",
    ContentCard({
        class:".bg-violet.white.medium",
        title:"<span.fa.fa-code> Unique",
        desc:"Bring the unique HTML-like syntax type "+
              "for templating web user interface. Write "+
              "quickly, different and less code."
    }),
    ContentCard({
        class:".bg-red.white.medium",
        title:"<span.fa.fa-pencil> Declarative",
        desc:"Using element and component for UI/UX "+
              "front-end development. And it's comes "+
              "natural from HTML-DOM."
    }),
    ContentCard({
        class:".bg-yellow.dark.medium",
        title:"<span.fa.fa-lightbulb-o> Lightweight",
        desc:"Based on Javascript ES5 that can support "+
              "old web browser, safe size for your storage "+
              "and also good for a low-device."
    })
])
]).render(App);

_(["#browsers.ctr.mx-16.center",
    "h1[style font-size:2em].dark Browser Compabilities",
    "p.grey.px-8[style margin-bottom:1em; width:50%] Elode.js support browser, from modern web browser "+
    "to old web browser, able to running this library, but at this time's in-development testing.",
],{
    browser:[
        ["chrome","Full Support"],
        ["edge","Latest Version"],
        ["firefox","Stable Version"],
        ["explorer","IE9+ (IE11 Stable)"],
        ["android","4.4+ (5.0 Stable)"]
    ],
    onCreate:function(){
        var br = this.browser, l = br.length, i;
        for(i = 0; i < l; i++){
            this._add(_([
                ".center.inline","img[width 128|src res/images/"+
                br[i][0]+".png].dark.mx-16",
                "h3.grey.small "+br[i][0].toUpperCase(),
                "p.small.grey(!) "+br[i][1]+""
            ]));
        }
    }
}).render(App);
