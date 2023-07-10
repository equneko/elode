function NavBar(prop) {
    return div(".nav.bg-white.shadow[style opacity:95%]",
        div(".bg-trans[style display:inline-flex]",
            link(".bg-trans.dark[style margin:0.2em 0.03em;margin-left:1em][:link https://equneko.github.io/elode][aria-label Elode.js Github]",
                "img[src " + Logo + "| width 24 | alt Elode.js Logo]",
            ),
            link(".bg-trans.menu.dark[style margin:0.4em 0.03em;margin-left:-2.5em][:link https://equneko.github.io/elode][aria-label Elode.js Github] " + prop.title),

            link(".search.bg-trans.menu.dark[style margin:0.3em 0.03em;margin-right:-1em][:searchClick][aria-label Elode.js Search at Github] <span.fa.fa-search>"),
            link("#Search.bg-wheat[style margin:1em 0.5em 1.4em 0.5em;padding:0;width:15em][:searchClick][aria-label Elode.js Search at Github]"),

            div(
                NavLinks.map(
                    (value, i) => {
                        if (i == 7) {
                            return link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] " + value, {
                                onclick: function (e) {
                                    e.preventDefault();
                                    AppareanceHandler();
                                }
                            })
                        } else {
                            return link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] " + value, {
                                onCreate: function () {
                                    if (i < 5) {
                                        this.attr("hide950", "");
                                    }
                                    if (i == 9) {
                                        this.attr("show950", "");
                                        this.onclick = function (e) {
                                            e.preventDefault();
                                            if (SideBar.classList.contains("hide")) {
                                                SideBar.toggle("class", " hide");
                                                SideBar.delay(10, function () {
                                                    SideBar.toggle("class", " anim-side");
                                                })
                                                sideSpan(span(".medium.fa.fa-close"));
                                            } else {
                                                SideBar.toggle("class", " anim-side");
                                                SideBar.delay(100, function () {
                                                    SideBar.toggle("class", " hide");
                                                })
                                                sideSpan(span(".medium.fa.fa-bars"));
                                            }

                                        }
                                    }
                                    if ([4, 5, 6, 8].indexOf(i) != -1) {
                                        this.attr("hide500", "")
                                    }
                                }
                            });
                        }
                    }
                )
            )
        )
    )
}

function GetStarted(prop) {
    return div(".ctr.center[@fade_in 500 | style margin-top:125px]",
        "img.logo[src " + prop.image + "| width 128 | alt Elode.js Logo]",

        h1(".bold.large.dark.m0 " + prop.title),
        p(".medium.gray " + prop.subtext),

        "div[style margin-bottom:3em]",

        div(
            link(".bg-violet.sha-test.shahover Get Started <span.fa.fa-play>" +
                "[:github_link |aria-label Elode.js Github]"),

            link(".nomenu.white.bg-dark.sha-test.shahover [:docs_link |aria-label Elode.js Documentation] <span.fa.fa-book> API Reference"), "br",
        ),

        "div.spA[style margin-bottom:2.5em]",

        link(".nomenu.dark.bg-trans.border-d.sha-test.shahover " +
            "[:link https://codepen.io/equneko/pen/BaGobLa][aria-label Elode.js CodePen Playground]" +
            "  Code <span.fa.fa-code> Playground"),

        "div.spB[style margin-bottom:5em]",

    )
}

function Content(prop, NextComponent) {
    if (prop.btn == null) prop.btn = "bg-violet";
    if (NextComponent == null) NextComponent = "div.none-element.hide";
    if (prop.link1 == null) prop.link1 = "#";
    if (prop.link2 == null) prop.link2 = "#";

    return div("#" + prop.id + ".content.center[@fade_in 500]" + prop.attr,
        NextComponent,

        h1(".bold.large.dark.m0.hw " + prop.title),
        p(".medium.gray " + prop.subtext),

        prop.btn != "NONE" ? "div[style margin-bottom:2.5em]" : "div.none-element.hide",


        prop.btn != "NONE" ? div(
            link(".sha-test.shahover." + prop.btn + " <span.fa.fa-code> Try It" +
                "[:link " + prop.link1 + "]"),

            link(".nomenu.sha-test.shahover.dark.bg-trans.border-d.mx-16 " +
                "[:link " + prop.link2 + "]" +
                "  GitHub <span.fa.fa-arrow-right>")
        ) :
            "div.none-element.hide"
    )
}

function LetsGoo() {
    return div(".letsgoo.content[style margin:0em auto]",
        img("[src res/images/letsgoo.png| style width:400px|alt Elode.js Thanks Sticker LetsGoo]")
        , {
            letsgoo: function () {
                let self = this;
                self.show();
                self.anim.fadeIn(100);
                self.delay(5000, function () {
                    self.anim.fadeOut(1000);
                    self.delay(1000, function () {
                        self.hide();
                    })
                })
            },
            onCreate: function () {
                this.hide();
            }
        })
}

function ExampleButton(num) {
    return link(".sha-test.shahover.bg-red[style " +
        "display:block;font-size:1.5em;margin: 1em 3em ] Count {{count()}}", {
        x: num,
        count: function () {
            return formatNum(this.x);
        },
        onclick: function (e) {
            e.preventDefault();
            this.x++;
        }
    })
}

function CommunityWidget() {
    return div(".devbadge.content.list-round.center[style padding:0em 2em 4em 2em;margin-top:-2em]",
        devs.map(function (x) {
            return img(".round-img[src res/images/no-profile.png|style width:5em;height:5em|alt Elode.js Developers Profile]", {
                onCreate:function(){
                    var self = this;
                    if(x != "none" && x[0] != "!"){
                        fetch("https://api.github.com/users/"+x)
                        .then(v => v.json()).then(function(v){ self.attr("src", v.avatar_url); })
                        .catch(err => console.log(err));
                    }
                    if(x[0] == "!"){
                        self.attr("src",x.substring(1));
                    }
                },
                onclick: function () {
                    if(x != "none" && x[0] != "!")
                        window.open("https://github.com/"+x, "_blank");
                }
            })
        })
    )
}

function BrowserSupport() {
    const browsers = [
        "Chrome", "Edge", "Firefox", "Explorer", "Android"
    ];

    return div(".browser-list.list-round.center[style margin-top:-2em]",
        browsers.map(
            function(x){ return img(".round-img.bg-trans[src res/images/" + x.toLowerCase() + ".png|alt Elode.js Browser Logo List]") }
        )
    )
}

function SideView() {
    return div(".sideview.shadow.hide.bg-white.content.center[style width:21%; opacity:95%; border-radius:8px; position:relative; float:right]",
        NavLinks.map(function (val, i) {
            if ([0, 1, 2, 3, 4, 5, 6, 8].indexOf(i) != -1)
                return link(".navlist.menu.bg-trans.border.dark[style display:block;] " + val)

            return div(".hide");
        })
    )
}