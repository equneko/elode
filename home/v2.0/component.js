function NavBar(data) {
    return div(".nav.bg-white.shadow[style opacity:95%]",
        div(".bg-trans[style display:inline-flex]",
            link(".bg-trans.dark[style margin:0.2em 0.03em;margin-left:1em][:link https://equneko.github.io/elode]",
                "img[src " + Logo + "| width 24]",
            ),
            link(".bg-trans.menu.dark[style margin:0.3em 0.03em;margin-left:-2.5em][:link https://equneko.github.io/elode] " + data.title),

            link(".search.bg-trans.menu.dark[style margin:0.3em 0.03em;margin-right:-1em][:searchClick] <span.fa.fa-search>"),
            link("#Search.bg-wheat[style padding:0;width:15em][:searchClick] <span.gray[style font-size:9pt] Search... CTRL+K>"),

            div(
                NavLinks.map(
                    (value, i) => {
                        if (i == 7) {
                            return link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] " + value, {
                                onclick(e) {
                                    e.preventDefault();
                                    AppareanceHandler();
                                }
                            })
                        } else {
                            return link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] " + value, {
                                onCreate() {
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

function GetStarted(data) {
    return div(".ctr.center[@fade_in 500 | style margin-top:125px]",
        "img.logo[src " + data.image + "| width 128]",

        h1(".bold.large.dark.m0 " + data.title),
        p(".medium.gray " + data.subtext),

        "div[style margin-bottom:3em]",

        div(
            link(".bg-violet.sha-test.shahover Get Started <span.fa.fa-play>" +
                "[:github_link]"),

            link(".nomenu.white.bg-dark.sha-test.shahover [:docs_link] <span.fa.fa-book> API Reference"), "br",
        ),

        "div.spA[style margin-bottom:2.5em]",

        link(".nomenu.dark.bg-trans.border-d.sha-test.shahover " +
            "[:link https://codepen.io/equneko/pen/BaGobLa]" +
            "  Code <span.fa.fa-code> Playground"),

        "div.spB[style margin-bottom:5em]",

    )
}

function Content(data, NextComponent) {
    if (data.btn == null) data.btn = "bg-violet";
    if (NextComponent == null) NextComponent = "div.none-element.hide";
    if (data.link1 == null) data.link1 = "#";
    if (data.link2 == null) data.link2 = "#";

    return div("#" + data.id + ".content.center[@fade_in 500]" + data.attr,
        NextComponent,

        h1(".bold.large.dark.m0.hw " + data.title),
        p(".medium.gray " + data.subtext),

        data.btn != "NONE" ? "div[style margin-bottom:2.5em]" : "div.none-element.hide",


        data.btn != "NONE" ? div(
            link(".sha-test.shahover." + data.btn + " <span.fa.fa-code> Try It" +
                "[:link " + data.link1 + "]"),

            link(".nomenu.sha-test.shahover.dark.bg-trans.border-d.mx-16 " +
                "[:link " + data.link2 + "]" +
                "  Learn More <span.fa.fa-arrow-right>")
        ) :
            "div.none-element.hide"
    )
}

function LetsGoo() {
    return div(".letsgoo.content[style margin:0em auto]",
        img("[src res/images/letsgoo.svg| style width:400px]")
        , {
            letsgoo() {
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
            onCreate() {
                this.hide();
            }
        })
}

function ExampleButton(num) {
    return link(".sha-test.shahover.bg-red[style " +
        "display:block;font-size:1.5em;margin: 1em 3em] Count {{count()}}", {
        x: num,
        count() {
            return formatNum(this.x);
        },
        onclick(e) {
            e.preventDefault();
            this.x++;
        }
    })
}

function CommunityWidget() {
    return div(".devbadge.content.list-round.center[style padding:0em 2em 4em 2em;margin-top:-2em]",
        devs.map(
            x => img(".round-img[src " + x + "|style width:5em;height:5em]")
        )
    )
}

function BrowserSupport() {
    const browsers = [
        "Chrome", "Edge", "Firefox", "Explorer", "Android"
    ];

    return div(".browser-list.list-round.center[style margin-top:-2em]",
        browsers.map(
            x => img(".round-img.bg-trans[src res/images/" + x.toLowerCase() + ".png]")
        )
    )
}

function SideView() {
    return div(".sideview.shadow.hide.bg-white.content.center[style width:21%; opacity:95%; border-radius:8px; position:relative; float:right]",
        NavLinks.map((val, i) =>
            [0, 1, 2, 3, 4, 5, 6, 8].indexOf(i) != -1 ? link(".navlist.menu.bg-trans.border.dark[style display:block;] " + val) :
                div(".hide")
        )
    )
}