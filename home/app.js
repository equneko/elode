var _ = Elode, App = _("#app").render();

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
"h1.mx-8 An <span.indigo Unique> Way <br#side> Web <span.fa.fa-code> Development",
"p.medium.grey <b Creating>, Composing and Rendering <b HTML Element> in An Unique Way!",
_(["#getstarted.center.mx-16",
    "a[href #].bold.btn.rds.small.d-hover.bg-indigo.mx-8 <span.fa.fa-play> Get Started",
    "a[href #].bold.btn.rds.small.mx-8 <span.fa.fa-download> Install",
    "a.btn-coll.mx-8[href #|style border:1px solid #202020].rds.small.dark <span.fa.fa-clock-o> Show Changelog"
])
]).render(App);

_(["#post-card.bg-dark",
"img[src res/images/background.jpg]",
_(["#content.ctr.flex.[style width:80%]",
    ContentCard({
        class:".bg-indigo.white.medium",
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

_(["#basics.ctr.mx-16",
    _([".left.flex",
        ContentPost({
            class:".dark",
            title:"<span.fa.fa-cube> Basic Start",
            desc:"Here's a simple Elode.js static-web application using complex "+
              "<b Component> which have some basic <b Element> and it's called declarative UI/UX. "+
              "At the following code, as you can see. <br><br>Unique HTML-like syntax brings you to "+
              "the different style code. And it's not simple as you expected."
        }),
        CodeView({
            title:"app.js", lang:"language-javascript",
            dir:"document/web-projects/ElodeApp/src/",
            coding: "//Create static web component-view"+
                    "\nfunction CreateStaticWeb(data){\n    return Elode([\n\t  \"div#app.container\","+
                    "\n\t  \"h1.purple {{Title}}\",\n\t  \"p.grey {{Description}}\"],"+
                    "\n    data).render(); //Render component to body (default)\n}"+

                    "\n\n//Apply to your custom data"+
                    "\nCreateStaticWeb({\n"+
                    "    Title:\"Daily Anime\",\n    Description:\""+
                    "All about anime news, content, and community\"\n});"+
                    
                    "\n\nCreateStaticWeb({\n"+
                    "    Title:\"Lowcost Coding\",\n    Description:\""+
                    "Your low budget coding tips & tutorial solutions\"\n});",
            result:_(["div",
            "h1.indigo Daily Anime",
            "p.grey All about anime news, content, and community",
            "h1.indigo[style margin-top:16px] Lowcost Coding",
            "p.grey Your low budget coding tips & tutorial solutions"])
        })
    ]),
    "br",
    _([".left.flex",
        CodeView({
            title:"database.js", lang:"language-javascript",
            dir:"document/web-projects/MVC/src/", height:"12em",
            coding:
`//Database for your element
var app = Elode("_#app",{
    user:{
        name:"Alf Equilfe",
        message:"Hello World",
        date:new Date().toLocaleString()
    }
    count:0, show:true,

    onclick:function(){
        if(this.show){
            this.count++;
        }
    }
});

//Binding element (DOM)
app.setAttribute("class","card-yellow");
`,
            result:null
        }),
        ContentPost({
            class:".dark",
            title:"<span.fa.fa-database>  Model View Controller",
            desc:"Hard to using javascript as a web templating? Don't worry about it. "+
              "Elode.js can be a <b Model View Controller> for your exiting web projects. "+
              "You can composing, rendering and managing data more efficient. <br><br>"+
              "Now, based on the following code. bind your data to element need an <b Identification>. "+
              "for example: _#app that means &ltdiv id=\"app\"&gt&lt/div&gt"
        })
    ]),
    _([".left.flex.ctr",
    CodeView({
        title:"index.html", lang:"language-xml",
        dir:"document/web-projects/MVC/src/", height:"12em",
        coding:
`<!-- Bind your data here -->
<div id="app">
    <h1>{{user.name}}</h1>
    <p>{{user.message}} <i>{{user.date}}</i></p>
    <button class="btn">Count {{count}}</button>
</div>`.replaceAll('<','&lt').replaceAll('>','&gt'),
        result:null
    }),

        _([".ctr[style width:45%]",
        _([".ctr.rds.bg-yellow.mx-16",
            "h1 Alf Equilfe",
            "p Hello World <i "+new Date().toLocaleString()+">",
            "button.btn.mx-4 Count {{count}}",
        ],{
            count:0,
            onclick:function(){
                this.count++;
            }
        })
        ])
    ]),
    "br",
    _([".left.flex",
        ContentPost({
            class:".dark",
            title:"<span.fa.fa-th-large> An Application",
            desc:"Build a simple <b Application> with minimalist size using Elode.js "+
              "after you do a basic learning. Let's try to make an app for your experience. "+
              "this library can help you do it and it's not really simple and fast as you expected. "+
              "But, why not? I suggest you to using <b Component Callbacks> to managing your data.<br><br> "+
              
              "First, you need to understand. How callback's work on javascript." +
              " Let's <b Learn More> about it. "+
              "Here's a simple app made by Elode.js. Using callbacks for management data on element/component"
        }),
        CodeView({
            title:"app.js", lang:"language-javascript",
            dir:"document/web-projects/TimerApp/src/",
            height:"12em", coding:
`//TimerApp.js by Alf Equilfe (10/11/2022)
var app = Elode(["#app.container",
    //Unique HTML-like syntax templating
    "h1.purple.large <span.fa.fa-clock-o> Timer App",
    "h1#count.dark.large {{hour}}h:{{miniute}}m:{{second}}s",
    "p.medium.grey Manage data count by click",
    "button#record.btn.bg-purple.d-hover Record",
    "ul.medium#timeCountedDataView"
],{
    //App data
    hour:0, miniute:0, second:0, count:1,
    //Called when element/component created
    onCreate:function(){
        var root = this;
            btn = root._get("#record"),
            view = root._get("#timeCountedDataView");
        
            btn.onclick = function(){
                Elode("li "+root.count+". Recorded "+root._get("#count")._txt()).render(view);
                root.count++;
            };
    },
    //Called when element/component rendering (interval)
    onRender:function(){
        this.second++;
        if(this.second>=60){
            this.miniute+=1;
            this.second = 0;
        }
        if(this.miniute>=60){
            this.hour+=1;
            this.miniute = 0;
        }
    }
//Render to <body></body> default
}).render();
`.replaceAll('<','&lt').replaceAll('>','&gt'),
            result:
                _(["#timer-app",
                    "h1.indigo.large <span.fa.fa-clock-o> Timer App",
                    "h1#count.dark.large {{hour}}h:{{miniute}}m:{{second}}s",
                    "p.medium.grey Manage data count by click",
                    "button#record.btn.bg-indigo.d-hover Record",
                    "ul.medium#timeCountedDataView"
                ],{
                    hour:0, miniute:0, second:0, count:1,
                    onCreate:function(){
                        var root = this;
                            btn = root._get("#record"),
                            view = root._get("#timeCountedDataView");
                            
                            btn.onclick = function(){
                                Elode("li "+root.count+". Recorded "+root._get("#count")._txt()).render(view);
                                root.count++;
                            };
                    },
                    onRender:function(){
                        this.second++;
                        if(this.second>=60){
                            this.miniute++;
                            this.second = 0;
                        }
                        if(this.miniute>=60){
                            this.hour++;
                            this.miniute = 0;
                        }
                    }
                }),
        })
    ])
]).render(App);

hljs.highlightAll();