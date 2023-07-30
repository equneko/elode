const { app, use, ref, hook, init, render, xss } = Elode;

const Logo = "res/images/logo.png",
      NavLinks = [
    "[:docs_link ][aria-label Elode.js Documentation]Learn",
    "[:docs_link ][aria-label Elode.js Documentation]Docs",
    "[:docs_link ][aria-label Elode.js Documentation]Reference",
    "[:link https://github.com/equneko/elode/tree/main/example/v2.0 ][aria-label Elode.js Example] Example",
    "[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH ][aria-label Elode.js Community] Community",
    "[:github_link ][aria-label Elode.js Github] <span.medium.fa.fa-github>",
    "[:link https://github.com/equneko/elode/stargazers ][aria-label Elode.js Stargazer Github] " +
    "<span.fa.fa-star> <span[style font-size:9pt] {$stargazer}>",
    "{html $darkSpan}",
    "[:link https://github.com/equneko/elode/releases/tag/v2.0 ][aria-label Elode.js Release] " +
    "<span.medium.fa.fa-download> <span[style font-size:9pt] v2.0>",
    "{html $sideSpan}",
],
devs = [
    "!res/images/mark.jpg",
    "equneko",
    "!res/images/sikochengoren.jpg",
    "!res/images/komeng.jpg",
    "udinesia325",
    "DimasAdiPutra",
    "ezmemoar",
    "galihapriansyah",
    "rifkidocs",
    "RaffiHDMedia",
    "seonha14"
].concat(Array(17).fill("none"));

use('div', 'h1', 'p', 'input', 'span', 'ul', 'li', 'img', {
    link: 'a.btn[href #]'
})

ref({
    darkSpan: span(".medium.fa.fa-moon-o"),
    sideSpan: span(".medium.fa.fa-bars"),
    darkMode: false,
    stargazer: ''
})

hook({
    github_link(el) {
        el.href = "https://github.com/equneko/elode";
        el.target = "_blank";
    },
    docs_link(el) {
        el.href = "https://github.com/equneko/elode/tree/main/docs";
        el.target = "_blank";
    },
    link(el, data) {
        el.href = data;
        el.target = "_blank";
    },
    searchClick(el) {
        el.onclick = function (e) {
            e.preventDefault();
            window.open("https://github.com/search?q=repo%3Aequneko%2Felode%20&type=code", "_blank");
        }
    }
})

init(document.body);
fetch("https://api.github.com/repos/equneko/elode")
    .then(res => res.json()).then(res => {
        stargazer(formatNum(res.stargazers_count));
    }).catch(err => console.log(err));

window.onscroll = function (e) {
    if (window.scrollY >= 100) {
        Promote.hide();
    } else {
        Promote.show();
    }
}

render(
    div("#app.center",
        div(".sticky[style z-index:1]",
            Promote = div(".promote.bg-violet.white",
                p(".center[style margin:0; padding:0.7em 0em;font-size:10pt]",
                    "span Support this experimental project by ",
                    "a[:link https://github.com/equneko/elode/stargazers |aria-label Elode.js Github].white.hover <b Give a star at Github <span.fa.fa-github>>",
                    "span  or you can join our ",
                    "a[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH |aria-label Elode.js Community].white.hover <b <span.fa.fa-comments> Community Team!>")
            ),
            Nav = NavBar({
                title: "Elode.js"
            }),
            SideBar = SideView(),
            LGooo = LetsGoo()
        ),

        GetView = GetStarted({
            image: Logo,
            title: "A <span.violet Unique> Way <br> Web <span.fa.fa-code> Development",
            subtext: "<b Creating>, composing and rendering <b HTML Element> in a unique way!"
        }),

        h1(".browser-title.bold.gray[style margin:1em 0em] Browser <span.fa.fa-rocket> Support"),
        BrowserSupport(),

        UniqueView = Content({
            id: "UniqueSyntaxHTMLQuery",
            attr: "[style background-color:#d9d2ff]",
            title: "<span.violet Unique> <span.fa.fa-code> Syntax <br> " + xss("<HTML-Query>"),
            subtext: "Bring a unique syntax <b HTML-Query> as a <b HTML-Templating> <br>" +
                "Based on <b CSS-Selector> that you have already know <br>" +
                "Write less code, different and simplest way! ",
            link1: "https://codepen.io/equneko/pen/qBQmYMq",
            link2: "https://github.com/equneko/elode#unique-"
        }, [
            div(".carbon",
                img("[src res/images/carbon1.png|style width:700px | alt Example of Carbon #1]")
            ),
        ]),

        DeclarativeView = Content({
            id: "BuildComponentWithDeclarative",
            attr: "[style background-color:#fbe5f5]",
            title: "Build Component <br> With <span.fa.fa-object-group> <span.red Declarative>",
            subtext: "It's natural from <b HTML-DOM>. Build your own component based on elements. <br>" +
                "There's no need to touch your <b HTML-Files>. Just code in <b JavaScript> <br>" +
                "and now, you have an <b Extra Time> for do something...",
            btn: "bg-red",
            link1: "https://codepen.io/equneko/pen/rNQmvqa",
            link2: "https://github.com/equneko/elode#declarative-"
        }, [
            div(".preview.flex[style padding:0em 2em]",
                div(".carbon",
                    img("[src res/images/carbon2.png | alt Example of Carbon #2|style width:600px;transform: rotate(1deg)]")
                ),
                div(".center[style width:100%]",
                    A = ExampleButton(1280),
                    B = ExampleButton(A.x * 10),
                    C = ExampleButton((B.x / A.x) * 9999),
                )
            )
        ]),

        LightweightView = Content({
            id: "ALowLevelLightweightLibrary",
            attr: "[style background-color:#fcecd5]",
            title: "A Low Level <br> <span.orange Lightweight> <span.fa.fa-lightbulb-o> Library",
            subtext: "Low cost and minimalist size, under <b 25KB!> write in <b JavaScript ES5>. <br>" +
                "This <b Experimental Project> need to more know how can to be a library for you, <br>" +
                "of course. We hopes that you have interested to using <b Elode.js>! ~",
            btn: "bg-orange",
            link1: "https://codepen.io/equneko/pen/MWzmGzN",
            link2: "https://github.com/equneko/elode#lightweight-"
        }, [
            div(".preview.flex[style padding:0em 2em]",
                ul(".center[style padding:0!important; width:100%]",
                    ["React", "Vue", "Elode"].map(
                        (value, index) => li(".mx-16 [style font-size:4em]" + (index + 1) + "." + value)
                    )
                ),
                div(".carbon",
                    img("[src res/images/carbon3.png | alt Example of Carbon #3|style width:600px;transform: rotate(-1deg)]")
                ),
            )
        ]),

        ReactiveView = Content({
            id: "FlowReactiveOnEventListener",
            attr: "[style background-color:#d5e0fc]",
            title: "Flow <span.fa.fa-spin.fa-refresh> <span.blue Reactive> <br> On Event Listener",
            subtext: "How it works? <b Elode.js> using <b Event Listener> for reactive case. <br>" +
                "Every changes no effect to the <b HTML-Body/Root>. Just in the element itself. <br>" +
                "<b No Virtual-DOM>, but <b Real-DOM> is actually fast and quick to be reactive",
            btn: "bg-blue",
            link1: "https://codepen.io/equneko/pen/BaGRxvO",
            link2: "https://github.com/equneko/elode#reactive-"
        }, [
            div(".preview.flex[style padding:0em 2em]",

                div(".carbon",
                    img("[src res/images/carbon4.png | alt Example of Carbon #4|style width:600px;transform: rotate(1deg)]")
                ),
                div(".center[style width:100%]",
                    App = div(".react-vct.bg-white[style padding: 3em 2em;border-radius: 1em;margin:2em 0em]",
                        h1(".rct[style margin:0] Hello, {{name} == '' ? 'Alf Equilfe':{name}}"),
                        p(".rct Level: {{level}} | Health Point: {{hp}}"),
                        input(".btn.bg-wheat.dark[name example|placeholder Your Name|style padding:0.8em 4em]", {
                            oninput:function() {
                                App.name = this.val();
                            }
                        }),
                        link(".sha-test.shahover.bg-blue[style " +
                            "display:block;font-size:12pt;margin: 0em 6em ] Upgrade", {
                            onclick:function(e) { e.preventDefault(); App.level++; App.hp += App.level * 2; }
                        })

                        , { name: "Alf Equilfe", level: 0, hp: 100 }
                    )
                )
            )
        ]),

        AlternativeView = Content({
            id: "AlternativeWayTheLiteVersion",
            attr: "[style background-color:#e2ffe6]",
            title: "<span.green Alternative> <span.fa.fa-send-o> Way <br> The Lite Version!",
            subtext: "Confused with <b HTML-Query?> you can try the <b Elode.js Lite!> version. <br>" +
                "It's just do <b Model View Controller> with <b Hook/Directive> for manage your data in HTML <br>" +
                "Only <b 12KB> and you can try Elode.js with minimalist feature!",
            btn: "bg-green",
            link1: "https://codepen.io/equneko/pen/BaGRVGB",
            link2: "https://github.com/equneko/elode#elodejs-lite-lightweight-edition"
        }, [
            div(".preview.flex[style padding:0em 2em]",
                div(".center[style padding:0!important; width:100%]",
                    "h1.rct Hello {{user}}",
                    "p.rct Message: {{message}}",
                    link(".sha-test.shahover.bg-green[style " +
                        "display:block;font-size:12pt;margin: 0em 6em ] Login", {
                        onclick:function(e) { e.preventDefault(); this.root.login(); }
                    })
                ,{
                    user:"SiKochengOren",
                    message:"Welcome to Elode.js Lite!",
                    login(){
                        alert(this.user +" login successfully!");
                    }
                }),
                div(".carbon",
                    img("[src res/images/carbon5.png | alt Example of Carbon #5 |style width:600px;transform: rotate(-1deg)]")
                ),
            )
        ]),

        ExtraView = Content({
            id: "WhatsTheNext",
            attr: "[style background-color:#fff]",
            title: "<span.violet What's The Next?> <br> How About <span.fa.fa-book> Learn It?",
            subtext: "<b Elode.js> is basically hard to understand, if you don't take it to learn. <br>" +
                "But at least, it was easy to use in your web! Just paste the CDN links, <br>" +
                "and lets gooo! Welcome to this <b Experimental Project>. Have a nice day! ~",
            btn: "NONE"
        }),

        GetElode = div(".content.center[style margin: -4em 0em]",
            link(".get-elode.sha-test.shahover.bg-violet[style " +
                "display:block;font-size:17pt;margin: 1.5em 2em | aria-label Copy Paste CDN Links of Elode.js] Get <span.fa.fa-code> Elode.js", {
                onclick:function(e) {
                    e.preventDefault();
                    navigator.clipboard.writeText("<script src=\"https://elode.js.org/src/v2.0/elode.min.js\"></script>");
                    LGooo.letsgoo();
                }
            }),
        ),

        CommunityView = Content({
            id: "JoinOurCommunity.bg-white.center",
            title: "Join Our <span.fa.fa-users> Community <br>Lets Learn Together!",
            subtext: "Wants to know how <b Elode.js> was made? Lets join us now! <br>" +
                "There's a discussion, ask a question, polling and much more. <br>" +
                "Lets we learn together how <b Web Development's> working...",
            btn: "NONE"
        }),

        DevBadge = CommunityWidget(),
    ),

    Footer = div("#footer.content.center.[style padding:3em 0em]",
        p(".gray © 2022 - 2023 <b Elode.js> - Experimental Project."),
        p(".gray Open Source - Licensed under the <b MIT Licence>"),

        "br",
        [
            "[:link https://github.com/equneko/elode ][aria-label Elode.js Github] <span.fa.fa-github>",
            "[:link https://codepen.io/equneko/ ][aria-label Elode.js CodePen] <span.fa.fa-codepen>",
            "[:link https://web.facebook.com/alfequneko19 ][aria-label Alf Equilfe's Facebook] <span.fa.fa-facebook-official>",
            "[:link https://instagram.com/alfequneko19 ][aria-label Alf Equilfe's Instagram] <span.fa.fa-instagram>",
            "[:link https://twitter.com/alfequneko19 ][aria-label Alf Equilfe's Twitter] <span.fa.fa-twitter>",
            "[:link https://m.youtube.com/@alfequilfe ][aria-label Alf Equilfe's Youtube] <span.fa.fa-youtube-play>",
            "[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH ][aria-label Elode.js Community] <span.fa.fa-whatsapp>"

        ].map(
            function(x){ return link(".navlist.medium.menu.bg-trans.dark.bottom-link[style margin:0.3em -0.5em] " + x) }
        )
    )
)
