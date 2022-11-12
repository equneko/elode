var _ = Elode, MainMenu = 
_("#MainMenu.container.center").render();

NavigationBar({
    judul: "Elode",
    desc: "An Unique Way Development",
    logo: "res/images/logo.png",
    menu:[
      ["Get Started","play"], ["Documentation","book"],
      ["Example App","window-maximize"], ["Community","users"]
    ]
}).render("#MainMenu");

_(["#post-card.center.rds.gd-dark.container[style width:80%]",
    Jumbotron(),
    PostCard({
        addc:".gd-indigo.white",
        judul:"Unique HTML Syntax",
        desc:"Typing with different style"
    }),
    PostCard({
        addc:".gd-blue.white",
        judul:"Reactivity",
        desc:"Using JS event listener"
    }),
    PostCard({
        addc:".gd-yellow.dark",
        judul:"Javascript Friendly",
        desc:"Based on EcmaScript v5"
    })
]).render("#MainMenu");

var Content = _("#Content[style padding:1em 4em]").render();

ContentPage({
    id:"GetStarted",
    judul:"Getting Started",
    post:`
        <b.indigo.f0 Elode> ()(Element Lode) is an unique javascript module/framework 
        for creating <b.blue.f0 HTML Element>
        Based on <b.f0 Javascript ES5> (EcmaScript 2005) that can support old web browsers.
        And also support with another javascript modules/frameworks <b.f0 to work together!>
    `,
coding:`  //Basic Hello World
var Element = Elode(\"h1 Hello World\"),
  Component = Elode([
    \"div#app.container\",
    \"h1 Hello ElodeJS",
    Element //Add exiting element
]).render();
`
}).render("#Content");

hljs.highlightAll();