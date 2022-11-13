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
            "h1.violet Daily Anime",
            "p.grey All about anime news, content, and community",
            "h1.violet[style margin-top:16px] Lowcost Coding",
            "p.grey Your low budget coding tips & tutorial solutions"])
        })
    ]),
    "br",
    _([".left.flex.ctr",

    _([".b-dark.px-16[style width:45%]",
        "h2.blue HTML Interpreter",
        `p Using Elode.js unique syntax on Direct HTML.
            This is experiment for using direct unique syntax.
            If there's something bug on code, don't worry about it.
            You can using <b elode="unique syntax"> property on tag element`,
        ".center <button.btn Learn More>",
        "br",
        "h2.green Equneko",
        "p I'm an alien-cat!"
    ]),
    CodeView({
        title:"index.html", lang:"language-xml",
        dir:"document/web-projects/HTMLInterpeter/src/", height:"15em",
        coding:
`<!-- HTML Interpeter (Experimental) 

At your script.js file
var app = Elode("!#app"); //for executing syntax

-->
<div id="app">
    h2.blue HTML Interpreter
    p.grey Using Elode.js unique syntax on Direct HTML
        This is experiment for using direct unique syntax.
        If there's something bug on code, don't worry about it.
        You can using
        b elode="unique syntax"
        property on tag element

    div.center
        button.btn Learn More
</div>

<div id="anotherWay" elode="
    h2.green Equneko
    p I'm an alien-cat!
"></div>`.replaceAll('<','&lt').replaceAll('>','&gt'),
        result:null
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
Elode(["#app.container",
    //Unique HTML-like syntax templating
    "h1.violet.large <span.fa.fa-clock-o> Timer App",
    "h1#count.dark.large {{hour}}h:{{miniute}}m:{{second}}s",
    "p.medium.grey Manage data count by click",
    "button#option.inline.btn.bg-violet.d-hover Stop",
    "button#record.inline.btn.bg-dark Record",
    "ul.medium#timeCountedDataView"
],{
    hour:0, miniute:0, second:0, count:1, start:true,

    //Callback: when element created
    onCreate:function(){
        var root = this;
            option = root._get("#option"),
            record = root._get("#record"),
            view = root._get("#timeCountedDataView");

        option.onclick = function(){
            root.start = !root.start;

            root._get("#count")._toggle("class","red");
            this._toggle("class",["bg-red","bg-violet"]);
                        
            if(root.start){
                this._txt("Stop");
                root._start();
            }else{
                this._txt("Start");
                root._stop();
            }
        };

        record.onclick = function(){
            Elode("li "+root.count+". Recorded "+root._get("#count")._txt()).render(view);
            root.count++;
        };
    },

    //Callback: when element rendering (loop)
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

}).render(); //Render to <body></body> (default)
`.replaceAll('<','&lt').replaceAll('>','&gt'),
            result:
                _(["#timer-app",
                    "h1.violet.large <span.fa.fa-clock-o> Timer App",
                    "h1#count.dark.large {{hour}}h:{{miniute}}m:{{second}}s",
                    "p.medium.grey Manage data count by click",
                    "button#option.inline.btn.bg-red.d-hover Stop",
                    "button#record.inline.btn.bg-dark Record",
                    "ul.medium#timeCountedDataView"
                ],{
                    hour:0, miniute:0, second:0, count:1, start:true,

                    onCreate:function(){
                        var root = this;
                            option = root._get("#option"),
                            record = root._get("#record"),
                            view = root._get("#timeCountedDataView");

                            option.onclick = function(){
                                root.start = !root.start;

                                root._get("#count")._toggle("class","red");
                                this._toggle("class",["bg-red","bg-violet"]);
                        
                                if(root.start){
                                    this._txt("Stop");
                                    root._start();
                                }else{
                                    this._txt("Start");
                                    root._stop();
                                }
                            };

                            record.onclick = function(){
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
