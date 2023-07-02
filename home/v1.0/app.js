var _ = Elode, MainMenu = 
_("#MainMenu.container.center").render();

NavigationBar({
    judul: "Elode",
    desc: "A Unique Way Web Development",
    logo: "res/logo_v1.svg",
    menu:[
      ["Get Started","play"], ["Documentation","book"],
      ["Example App","window-maximize"], ["Community","users"]
    ]
}).render("#MainMenu");

_(["#post-card.center.rds.gd-dark.container[style width:80%]",
    Jumbotron(),
    PostCard({
        addc:".bg-violet.white",
        judul:"Unique HTML Syntax",
        desc:"Typing with different style"
    }),
    PostCard({
        addc:".bg-blue.white",
        judul:"Reactivity",
        desc:"Using JS event listener"
    }),
    PostCard({
        addc:".bg-yellow.dark",
        judul:"Javascript Friendly",
        desc:"Based on EcmaScript v5"
    })
]).render("#MainMenu");

var Content = _("#Content[style padding:1em 4em]").render();

ContentPage({
    id:"GetStarted",
    judul:"Getting Started",
    post:`
        <b.indigo.f0 Elode> ()(Element Lode) is a unique javascript module/framework 
        for creating <b.blue.f0 HTML Element>
        Based on <b.f0 Javascript ES5> (EcmaScript 2005) that can support old web browsers.
        And also support with another javascript modules/frameworks <b.f0 to work together!>
    `,
coding:`  //Basic Hello World
var Element = Elode(\"h1 Hello World\"),
  Component = Elode([
    \"div#app.container\",
    \"h1 Hello Elode.js!",
    Element //Add exiting element
]).render();
`
}).render("#Content");

hljs.highlightAll();