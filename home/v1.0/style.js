var indexCSS = Elode(`style 
@media (max-width:949px){
    .flexlayout{
        display:unset!important;
    }
    .flexlayout > div,
    .flexlayout > pre{
        width:100%;
        display:unset;
    }
    .flexlayout > br{
        display:block;
    }
}

@media (max-width:694px) {
    #menu-bar{
        display: none;
    }
    #desc{
        display: block;
        font-size:14px;
        margin-right:1em;
    }
    #getstarted{
        display:unset;
    }
    #post-card{
        width:90%!important;
    }
}

@media (max-width:819px){
    .postcard{
        display:block;
        margin-right:0;
    }
}

@media (max-width:517px){
    #getstarted{
        display:block;
    }
    #post-card{
        width:100%!important;
    }
}

@media (max-width:350px){
    #jumbotron > h1{
        font-size:1.5em;
    }
    #jumbotron > p{
        font-size:0.8em;
    }
    .postcard > h1{
        font-size:0.9em;
    }
    .postcard > p{
        font-size:0.7em;
    }
}

@media (max-width:249px){
    #nav-bar > a > span{
        display:none;
    }
    #jumbotron > h1{
        font-size:1em;
    }
    #jumbotron > p{
        font-size:0.7em;
    }
    .postcard > h1{
        font-size:0.5em;
    }
    .postcard > p{
        font-size:0.3em;
    }
    .flexlayout > div,
    .flexlayout > pre > code{
        font-size:0.8em;
    }
}
@media (max-width:229px){
    #MainMenu,#Content,#post-card{
        margin:0;
        padding:0;
    }
    .flexlayout *{
        font-size:0.7em;
    }
}
@media (max-width:129px){
    body *{
        font-size:0.5em;
    }
}
`
).render("head");
