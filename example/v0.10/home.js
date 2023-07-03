Elode.as("_");

_(`head$style 


    #Main{
        width:100%;
        height:21em;
        display:flex;
        position:relative;
    }
    #Main > img{
        width:100%;
        height:21em;
        position:absolute;
        object-fit:cover;
        filter:brightness(21%);
    }
    #Main > h1{
        position:absolute;
        width:100%;
        text-align:center;
        top:1em;
        font-size:3em;
    }
    #Main > p{
        position:absolute;
        width:100%;
        text-align:center;
        bottom:7.5em;
        font-size:1.5em;
    }
    #Main > #Menu{
        position:absolute;
        width:100%;
        text-align:center;
        bottom:8em;
    }
    #Main > #Extra{
        width:100%;
        text-align:right;
        position:absolute;
        top:0;
    }

    #Feature{
        width:100%;
        position:absolute;
        top:14em;
    }

    #Slogan > h1{
        color:#291e5a;
        font-family: sans-serif;
        font-size: 4em;
        font-weight: bolder;
    }
    
    .colorful{
        font-family: sans-serif;
        background: -webkit-linear-gradient(right,#d83e02,#b402d8);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`);


let Main = _(`$#Main

    <img[src res/images/background.png]>
    <div#Extra.container
        <div.inline(x : db.extra)[style margin-right:0.5em]
            <button.btn-coll.rds <span.ic {x[0]}> {x[1]}>>
    >
    <h1.white <span.rds.bg-white.dark[style padding:0 0.3em] <span.indigo E>lode>.js>
<p.white An Unique Javascript Module For Creating Element>
    <div#Menu
        <button.btn.bg-blue.xhover[style margin-right:0.5em](x : db.menu) 
            <span.ic {x[0]}> {x[1]}>>
`,{
    db:{menu:[
        ["play_arrow","Get Started"],
        ["code","Learn Syntax"],
        ["web","Example App"],
        ["book","Documentation"]
    ],
    extra:[
        ["code","Github"],
        ["download","v0.10 (01-10-2022)"]
    ]}
})._scope("#Menu").el.button[0]._class("btn bg-blue xhover elight");

let Feature = _(`$#Feature.container.center

    <div.inline.left.card.gd-indigo.white[style margin-right:0.5em; width:28%]
        <h1.medium[style margin-bottom:0.5em] 
            <span.ic.large[style margin-right:0.5em] code> Unique Html Syntax>
        <p.small.opacity
            <b Elode.js> brings you to the unique html syntax
            typing. That can be a simple way? No! But this unique
            syntax made you to be confused if you don't understand. 
        >
        <button.btn.bg-white.dark.hoverx.rds[style margin-top:1em;float:right] 
            Learn More <span.ic.medium play_arrow>>
    >
    <div.inline.left.card-sel.gd-dark.white[style margin-right:0.5em; width:28%]
        <h1.large[style margin-bottom:0.5em] 
            <span.ic.large[style margin-right:0.3em] repeat> Element Reactivity>
        <p.small.opacity
            <b Element> can be reactive! it's natural from javascript itself.
            No more additional method. You can be free to using reactive way
            with your own code. Make <b reactivity> to your application.
        >
        <button.btn-coll.rds[style margin-top:1em;float:right] 
            Learn More <span.ic.medium play_arrow>>
    >
     <div.inline.left.card.gd-yellow.dark[style margin-right:0.5em; width:28%]
        <h1.medium[style margin-bottom:0.5em] 
            <span.ic.large[style margin-right:0.5em] web> Javascript Friendly>
        <p.small.opacity
            Using <b HTML DOM> as a component based for building user
            interface. Make your own element friendly usable for
            <b Javascript> with extended feature of element.
        >
        <button.btn.bg-white.dark.hoverx.rds[style margin-top:1em;float:right]
             Learn More <span.ic.medium play_arrow>>
    >
`);

let Slogan = _(`$#Slogan.container.center[style 
        position:absolute; width:100%; text-align:center; top:33em]

    <h1.welcome
        The <b.colorful Unique><br>
        Javascript Module
    >
    <p.medium.grey[style margin-top:1em] 
        <b Creating>, Composing And Rendering <b HTML> Element In An <b Unique> Way>

`);
