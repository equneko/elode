const { app, use, ref, hook, init, render, xss } = Elode;
const NavLinks=["[:docs_link ][aria-label Elode.js Documentation]Learn","[:docs_link ][aria-label Elode.js Documentation]Docs","[:docs_link ][aria-label Elode.js Documentation]Reference","[:link https://github.com/equneko/elode/tree/main/example/v2.0 ][aria-label Elode.js Example] Example","[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH ][aria-label Elode.js Community] Community","[:github_link ][aria-label Elode.js Github] <span.medium.fa.fa-github>","[:link https://github.com/equneko/elode/stargazers ][aria-label Elode.js Stargazer Github] <span.fa.fa-star> <span[style font-size:9pt] {$stargazer}>","[aria-hidden true]{html $darkSpan}","[:link https://github.com/equneko/elode/releases/tag/v2.0 ][aria-label Elode.js Release] <span.medium.fa.fa-download> <span[style font-size:9pt] v2.0>","[aria-hidden true]{html $sideSpan}",],devs=["https://pps.whatsapp.net/v/t61.24694-24/346897446_2444024912414790_8302301259971813308_n.jpg?ccb=11-4&oh=01_AdQ3TPaU5oltv2e88EKluCubDUNCSNbkDrQZYdHzHwsL2g&oe=64AA724C","https://scontent.fcgk3-2.fna.fbcdn.net/v/t39.30808-6/333604896_1987057801495581_4408880671083462446_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHkrvIYaT494GJEnB1r-1dLJfW1_wKhOxgl9bX_AqE7GOWBx0DAoRetfCrz4_vQGZlbqMRlGVjshByb2588qlU_&_nc_ohc=8uk7UUuo3x4AX9-icZN&_nc_zt=23&_nc_ht=scontent.fcgk3-2.fna&oh=00_AfA5ydV1jR3hEcXHlaw4tCEvE5jmoaoUx1kpRrZ3UsWYsA&oe=64A33B04","https://pps.whatsapp.net/v/t61.24694-24/212876418_333228348285185_3112125496364721239_n.jpg?ccb=11-4&oh=01_AdQROKi8v_lhnvh8Wv0x3x4VOPayA3A41DtDuqwG0HyX_A&oe=64AA8860","https://pps.whatsapp.net/v/t61.24694-24/247489062_276207104529571_8520361568215759458_n.jpg?ccb=11-4&oh=01_AdRuRN6dy00bZZGwWJG3wpfWOBmd4GPaAylgCFdG4BHFYQ&oe=64AA717E","https://pps.whatsapp.net/v/t61.24694-24/343922909_1367110727192212_2751505412663114921_n.jpg?ccb=11-4&oh=01_AdSQxr6CJhfQWXlp3xsHvDgITf_irst-ImeEvPS0AbJedg&oe=64AA85C9","https://scontent.fcgk3-2.fna.fbcdn.net/v/t39.30808-6/327043935_6015342811837784_7599685354632291744_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHRZv8OWTJ2HQu8KkMzLXP3anhbF1snEcdqeFsXWycRx_F1akjg9AmwA6aqe0XbySDCSb1LIhi3IfDtB8xZRDZ_&_nc_ohc=N14kDT1k9u0AX9SRC00&_nc_zt=23&_nc_ht=scontent.fcgk3-2.fna&oh=00_AfAxyfvBugqyWwKJBD7wZ362zaDCFak8JoLwbkqEqfbXwA&oe=64A2EA1D","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/346938865_178601574845249_2134153380493012230_n.jpg?ccb=11-4&oh=01_AdR7x46aBLjYLKWGYrldNrRDDeBa0k3737YAxTMJP_i-4g&oe=64AA725A","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/354655950_652995290182201_8816429831816682299_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdR3CsJjC-xFBUje1mai3wviUezx-v6x_r9kwa1OZdbrIQ&oe=64AA55E8","res/images/no-profile.png","res/images/no-profile.png","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/353102058_168760992855990_820429132719490090_n.jpg?ccb=11-4&oh=01_AdTN6yCKSOBh3utz_vid-2E2ArLD_N5ooAJjNstIlnX8XA&oe=64A9E606","https://pps.whatsapp.net/v/t61.24694-24/341570095_496011579276205_6894345429497711949_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTebgKjYV82xk79FIpLiQ7p1rdzvxCVJFeIVw773XsPuQ&oe=64AA5E5E","res/images/no-profile.png","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/356031905_1002611270900982_6852749669977236559_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRw6B4tXNeXesFhI0FuMV5szROtmxRN-tQCsR8-YmwD8g&oe=64AA80EA","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/345025332_1380775749434788_4946863572979003777_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTKaTqJ2Ax0zP0x6TFe-UwUhIKAv49nkHTGv4YNURRzYQ&oe=64A9A95B","https://pps.whatsapp.net/v/t61.24694-24/351428898_166068399662297_6754532948036977637_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTL6Onm6FmC3VwyevX3fdNFLXyTngMo6pVYhKH9uYp4AQ&oe=64AA7BE4","res/images/no-profile.png","res/images/no-profile.png","res/images/no-profile.png","res/images/no-profile.png","res/images/no-profile.png","https://pps.whatsapp.net/v/t61.24694-24/341442039_959730798793708_1475162040899102252_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRa8h5LZouGfjIMR-jMlqxIfjW9J3k9bjKj5Uh6wpdexA&oe=64A9B6D9","https://pps.whatsapp.net/v/t61.24694-24/317776194_530672162579669_1904951367112372765_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdQTYjDbcrcZQV7g6mtknIaWrxmoEFUK2W5tgVdrEbZYdQ&oe=64AA78CE"];function AppareanceHandler(){app(".btn.menu",a=>a.toggle("class",["bg-dark","wheat"])),app(".border-d",a=>a.toggle("class","border-l")),app(".nav",a=>a.toggle("class",["bg-white","bg-dark wheat"])),app(".nav",a=>a.toggle("class","shadow")),app(".sha-test",a=>a.toggle("class","shahover")),app("body",a=>a.toggle("class","bg-dark")),app("h1.bold",a=>a.toggle("class",["dark","violet"])),app("h1.hw",a=>a.toggle("class",["dark","wheat"])),app("p.gray",a=>a.toggle("class","wheat")),app(".nomenu.btn.bg-dark",a=>a.toggle("class",["white","bg-wheat","dark"])),app(".nomenu.btn.dark.border-d",a=>a.toggle("class","wheat")),app(".content",a=>a.toggle("class","bg-sdark")),app("li.mx-16",a=>a.toggle("class","wheat")),app(".react-vct",a=>a.toggle("class",["bg-white","bg-dark"])),app(".rct",a=>a.toggle("class","wheat")),app(".sideview",a=>a.toggle("class","shadow")),app(".round-img",a=>a.toggle("class","grayscale")),$darkMode?(darkSpan(span(".medium.fa.fa-moon-o")),app(".round-img",a=>{a.style.opacity="100%"})):(darkSpan(span(".medium.fa.fa-sun-o")),app(".round-img",a=>{a.style.opacity="70%"})),darkMode(!$darkMode)}function formatNum(a){let e,g=""+a;return a>=1e3?(e=(e=""+Math.floor(a/1e3)).length,g.substring(0,e)+","+g.substring(e)):a}function NavBar(e){return div(".nav.bg-white.shadow[style opacity:95%]",div(".bg-trans[style display:inline-flex]",link(".bg-trans.dark[style margin:0.2em 0.03em;margin-left:1em][:link https://equneko.github.io/elode][aria-label Elode.js Github]","img[src "+Logo+"| width 24]"),link(".bg-trans.menu.dark[style margin:0.4em 0.03em;margin-left:-2.5em][:link https://equneko.github.io/elode][aria-label Elode.js Github] "+e.title),link(".search.bg-trans.menu.dark[style margin:0.3em 0.03em;margin-right:-1em][:searchClick][aria-label Elode.js Search at Github] <span.fa.fa-search>"),link("#Search.bg-wheat[style margin:1em 0.5em 1.4em 0.5em;padding:0;width:15em][:searchClick][aria-label Elode.js Search at Github]"),div(NavLinks.map((e,t)=>7==t?link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] "+e,{onclick(e){e.preventDefault(),AppareanceHandler()}}):link(".navlist.menu.bg-trans.dark[style margin:0.3em -0.5em] "+e,{onCreate(){t<5&&this.attr("hide950",""),9==t&&(this.attr("show950",""),this.onclick=function(e){e.preventDefault(),SideBar.classList.contains("hide")?(SideBar.toggle("class"," hide"),SideBar.delay(10,function(){SideBar.toggle("class"," anim-side")}),sideSpan(span(".medium.fa.fa-close"))):(SideBar.toggle("class"," anim-side"),SideBar.delay(100,function(){SideBar.toggle("class"," hide")}),sideSpan(span(".medium.fa.fa-bars")))}),-1!=[4,5,6,8].indexOf(t)&&this.attr("hide500","")}})))))}function GetStarted(e){return div(".ctr.center[@fade_in 500 | style margin-top:125px]","img.logo[src "+e.image+"| width 128]",h1(".bold.large.dark.m0 "+e.title),p(".medium.gray "+e.subtext),"div[style margin-bottom:3em]",div(link(".bg-violet.sha-test.shahover Get Started <span.fa.fa-play>[:github_link |aria-label Elode.js Github]"),link(".nomenu.white.bg-dark.sha-test.shahover [:docs_link |aria-label Elode.js Documentation] <span.fa.fa-book> API Reference"),"br"),"div.spA[style margin-bottom:2.5em]",link(".nomenu.dark.bg-trans.border-d.sha-test.shahover [:link https://codepen.io/equneko/pen/BaGobLa][aria-label Elode.js CodePen Playground]  Code <span.fa.fa-code> Playground"),"div.spB[style margin-bottom:5em]")}function Content(e,t){return null==e.btn&&(e.btn="bg-violet"),null==t&&(t="div.none-element.hide"),null==e.link1&&(e.link1="#"),null==e.link2&&(e.link2="#"),div("#"+e.id+".content.center[@fade_in 500]"+e.attr,t,h1(".bold.large.dark.m0.hw "+e.title),p(".medium.gray "+e.subtext),"NONE"!=e.btn?"div[style margin-bottom:2.5em]":"div.none-element.hide","NONE"!=e.btn?div(link(".sha-test.shahover."+e.btn+" <span.fa.fa-code> Try It[:link "+e.link1+"]"),link(".nomenu.sha-test.shahover.dark.bg-trans.border-d.mx-16 [:link "+e.link2+"]  Read More <span.fa.fa-arrow-right>")):"div.none-element.hide")}function LetsGoo(){return div(".letsgoo.content[style margin:0em auto]",img("[src res/images/letsgoo.png| style width:400px|alt Elode.js Thanks Sticker LetsGoo]"),{letsgoo(){let e=this;e.show(),e.anim.fadeIn(100),e.delay(5e3,function(){e.anim.fadeOut(1e3),e.delay(1e3,function(){e.hide()})})},onCreate(){this.hide()}})}function ExampleButton(e){return link(".sha-test.shahover.bg-red[style display:block;font-size:1.5em;margin: 1em 3em | aria-hidden true] Count {{count()}}",{x:e,count(){return formatNum(this.x)},onclick(e){e.preventDefault(),this.x++}})}function CommunityWidget(){return div(".devbadge.content.list-round.center[style padding:0em 2em 4em 2em;margin-top:-2em]",devs.map(e=>img(".round-img[src "+e+"|style width:5em;height:5em|alt Elode.js Developers Profile]")))}function BrowserSupport(){return div(".browser-list.list-round.center[style margin-top:-2em]",["Chrome","Edge","Firefox","Explorer","Android"].map(e=>img(".round-img.bg-trans[src res/images/"+e.toLowerCase()+".png|alt Elode.js Browser Logo List]")))}function SideView(){return div(".sideview.shadow.hide.bg-white.content.center[style width:21%; opacity:95%; border-radius:8px; position:relative; float:right]",NavLinks.map((e,t)=>-1!=[0,1,2,3,4,5,6,8].indexOf(t)?link(".navlist.menu.bg-trans.border.dark[style display:block;] "+e):div(".hide")))}const Logo="res/images/logo.png";use("div","h1","p","input","span","ul","li","img",{link:"a.btn[href #]"}),ref({darkSpan:span(".medium.fa.fa-moon-o"),sideSpan:span(".medium.fa.fa-bars"),darkMode:!1,stargazer:""}),hook({github_link(e){e.href="https://github.com/equneko/elode",e.target="_blank"},docs_link(e){e.href="https://github.com/equneko/elode/tree/main/docs",e.target="_blank"},link(e,t){e.href=t,e.target="_blank"},searchClick(e){e.onclick=function(e){e.preventDefault(),window.open("https://github.com/search?q=repo%3Aequneko%2Felode%20&type=code","_blank")}}}),init(document.body),fetch("https://api.github.com/repos/equneko/elode").then(e=>e.json()).then(e=>{stargazer(formatNum(e.stargazers_count))}).catch(e=>console.log(e)),window.onscroll=function(e){window.scrollY>=100?Promote.hide():Promote.show()},render(div("#app.center",div(".sticky[style z-index:1]",Promote=div(".promote.bg-violet.white",p(".center[style margin:0; padding:0.7em 0em;font-size:10pt]","span Support this experimental project by ","a[:link https://github.com/equneko/elode/stargazers |aria-label Elode.js Github].white.hover <b Give a star at Github <span.fa.fa-github>>","span  or you can join our ","a[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH |aria-label Elode.js Community].white.hover <b <span.fa.fa-comments> Community Team!>")),Nav=NavBar({title:"Elode.js"}),SideBar=SideView(),LGooo=LetsGoo()),GetView=GetStarted({image:"res/images/logo.png",title:"A <span.violet Unique> Way <br> Web <span.fa.fa-code> Development",subtext:"<b Creating>, composing and rendering <b HTML Element> in a unique way!"}),h1(".browser-title.bold.gray[style margin:1em 0em] Browser <span.fa.fa-rocket> Support"),BrowserSupport(),UniqueView=Content({id:"UniqueSyntaxHTMLQuery",attr:"[style background-color:#d9d2ff]",title:"<span.violet Unique> <span.fa.fa-code> Syntax <br> "+xss("<HTML-Query>"),subtext:"Bring a unique syntax <b HTML-Query> as a <b HTML-Templating> <br>Based on <b CSS-Selector> that you have already know <br>Write less code, different and simplest way! ",link1:"https://codepen.io/equneko/pen/qBQmYMq",link2:"https://github.com/equneko/elode#unique-"},[div(".carbon",img("[src res/images/carbon1.png|style width:700px | alt Example of Carbon #1]")),]),DeclarativeView=Content({id:"BuildComponentWithDeclarative",attr:"[style background-color:#fbe5f5]",title:"Build Component <br> With <span.fa.fa-object-group> <span.red Declarative>",subtext:"It's natural from <b HTML-DOM>. Build your own component based on elements. <br>There's no need to touch your <b HTML-Files>. Just code in <b JavaScript> <br>and now, you have an <b Extra Time> for do something...",btn:"bg-red",link1:"https://codepen.io/equneko/pen/rNQmvqa",link2:"https://github.com/equneko/elode#declarative-"},[div(".preview.flex[style padding:0em 2em]",div(".carbon",img("[src res/images/carbon2.png | alt Example of Carbon #2|style width:600px;transform: rotate(1deg)]")),div(".center[style width:100%]",A=ExampleButton(1280),B=ExampleButton(10*A.x),C=ExampleButton(B.x/A.x*9999)))]),LightweightView=Content({id:"ALowLevelLightweightLibrary",attr:"[style background-color:#fcecd5]",title:"A Low Level <br> <span.orange Lightweight> <span.fa.fa-lightbulb-o> Library",subtext:"Low cost and minimalist size, under <b 25KB!> write in <b JavaScript ES5>. <br>This <b Experimental Project> need to more know how can to be a library for you, <br>of course. We hopes that you have interested to using <b Elode.js>! ~",btn:"bg-orange",link1:"https://codepen.io/equneko/pen/MWzmGzN",link2:"https://github.com/equneko/elode#lightweight-"},[div(".preview.flex[style padding:0em 2em]",ul(".center[style padding:0!important; width:100%]",["React","Vue","Elode"].map((e,t)=>li(".mx-16 [style font-size:4em]"+(t+1)+"."+e))),div(".carbon",img("[src res/images/carbon3.png | alt Example of Carbon #3|style width:600px;transform: rotate(-1deg)]")))]),ReactiveView=Content({id:"FlowReactiveOnEventListener",attr:"[style background-color:#d5e0fc]",title:"Flow <span.fa.fa-spin.fa-refresh> <span.blue Reactive> <br> On Event Listener",subtext:"How it works? <b Elode.js> using <b Event Listener> for reactive case. <br>Every changes no effect to the <b HTML-Body/Root>. Just in the element itself. <br><b No Virtual-DOM>, but <b Real-DOM> is actually fast and quick to be reactive",btn:"bg-blue",link1:"https://codepen.io/equneko/pen/BaGRxvO",link2:"https://github.com/equneko/elode#reactive-"},[div(".preview.flex[style padding:0em 2em]",div(".carbon",img("[src res/images/carbon4.png | alt Example of Carbon #4|style width:600px;transform: rotate(1deg)]")),div(".center[style width:100%]",App=div(".react-vct.bg-white[style padding: 3em 2em;border-radius: 1em;margin:2em 0em]",h1(".rct[style margin:0] Hello, {{name} == '' ? 'Alf Equilfe':{name}}"),p(".rct Level: {{level}} | Health Point: {{hp}}"),input(".btn.bg-wheat.dark[name example|placeholder Your Name|style padding:0.8em 4em]",{oninput(){App.name=this.val()}}),link(".sha-test.shahover.bg-blue[style display:block;font-size:12pt;margin: 0em 6em | aria-hidden true] Upgrade",{onclick(e){e.preventDefault(),App.level++,App.hp+=2*App.level}}),{name:"Alf Equilfe",level:0,hp:100})))]),AlternativeView=Content({id:"AlternativeWayTheLiteVersion",attr:"[style background-color:#e2ffe6]",title:"<span.green Alternative> <span.fa.fa-send-o> Way <br> The Lite Version!",subtext:"Confused with <b HTML-Query?> you can try the <b Elode.js Lite!> version. <br>It's just do <b Model View Controller> with <b Hook/Directive> for manage your data in HTML <br>Only <b 12KB> and you can try Elode.js with minimalist feature!",btn:"bg-green",link1:"https://codepen.io/equneko/pen/BaGRVGB",link2:"https://github.com/equneko/elode#elodejs-lite-lightweight-edition"},[div(".preview.flex[style padding:0em 2em]",div(".center[style padding:0!important; width:100%]","h1.rct Hello {{user}}","p.rct Message: {{message}}",link(".sha-test.shahover.bg-green[style display:block;font-size:12pt;margin: 0em 6em | aria-hidden true] Login",{onclick(e){e.preventDefault(),this.root.login()}}),{user:"SiKochengOren",message:"Welcome to Elode.js Lite!",login(){alert(this.user+" login successfully!")}}),div(".carbon",img("[src res/images/carbon5.png | alt Example of Carbon #5 |style width:600px;transform: rotate(-1deg)]")))]),ExtraView=Content({id:"WhatsTheNext",attr:"[style background-color:#fff]",title:"<span.violet What's The Next?> <br> How About <span.fa.fa-book> Learn It?",subtext:"<b Elode.js> is basically hard to understand, if you don't take it to learn. <br>But at least, it was easy to use in your web! Just paste the CDN links, <br>and lets gooo! Welcome to this <b Experimental Project>. Have a nice day! ~",btn:"NONE"}),GetElode=div(".content.center[style margin: -4em 0em]",link(".get-elode.sha-test.shahover.bg-violet[style display:block;font-size:17pt;margin: 1.5em 2em | aria-label Copy Paste CDN Links of Elode.js] Get <span.fa.fa-code> Elode.js",{onclick(e){e.preventDefault(),navigator.clipboard.writeText('<script src="https://cdn.jsdelivr.net/gh/equneko/elode/src/v2.0/elode.min.js"></script>'),LGooo.letsgoo()}})),CommunityView=Content({id:"JoinOurCommunity.bg-white.center",title:"Join Our <span.fa.fa-users> Community <br>Lets Learn Together!",subtext:"Wants to know how <b Elode.js> was made? Lets join us now! <br>There's a discussion, ask a question, polling and much more. <br>Lets we learn together how <b Web Development's> working...",btn:"NONE"}),DevBadge=CommunityWidget()),Footer=div("#footer.content.center.[style padding:3em 0em]",p(".gray \xa9 2022 - 2023 <b Elode.js> - Experimental Project."),p(".gray Open Source - Licensed under the <b MIT Licence>"),"br",["[:link https://github.com/equneko/elode ][aria-label Elode.js Github] <span.fa.fa-github>","[:link https://codepen.io/equneko/ ][aria-label Elode.js CodePen] <span.fa.fa-codepen>","[:link https://web.facebook.com/alfequneko19 ][aria-label Alf Equilfe's Facebook] <span.fa.fa-facebook-official>","[:link https://instagram.com/alfequneko19 ][aria-label Alf Equilfe's Instagram] <span.fa.fa-instagram>","[:link https://twitter.com/alfequneko19 ][aria-label Alf Equilfe's Twitter] <span.fa.fa-twitter>","[:link https://m.youtube.com/@alfequilfe ][aria-label Alf Equilfe's Youtube] <span.fa.fa-youtube-play>","[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH ][aria-label Elode.js Community] <span.fa.fa-whatsapp>"].map(e=>link(".navlist.medium.menu.bg-trans.dark.bottom-link[style margin:0.3em -0.5em] "+e))));