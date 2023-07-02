function AppareanceHandler() {
    app(".btn.menu", x => x.toggle("class",["bg-dark","wheat"]));
    app(".border-d", x => x.toggle("class", "border-l"));
    app(".nav", x => x.toggle("class", ["bg-white", "bg-dark wheat"]));
    app(".nav", x => x.toggle("class", "shadow"));
    app(".sha-test", x => x.toggle("class", "shahover"));
    app("body", x => x.toggle("class", "bg-dark"));
    app("h1.bold", x => x.toggle("class", ["dark", "violet"]));
    app("h1.hw", x => x.toggle("class", ["dark", "wheat"]));
    app("p.gray", x => x.toggle("class", "wheat"));
    app(".nomenu.btn.bg-dark", x => x.toggle("class", ["white", "bg-wheat","dark"]));
    app(".nomenu.btn.dark.border-d", x => x.toggle("class", "wheat"));
    app(".content", x => x.toggle("class", "bg-sdark"));
    app("li.mx-16", x => x.toggle("class", "wheat"));
    app(".react-vct", x => x.toggle("class", ["bg-white", "bg-dark"]));
    app(".rct", x => x.toggle("class", "wheat"));
    app(".sideview", x => x.toggle("class", "shadow"));
    app(".round-img", x => x.toggle("class", "grayscale"));

    if ($darkMode) {
        darkSpan(span(".medium.fa.fa-moon-o"));
        app(".round-img", x => {
            x.style.opacity = "100%";
        });
    } else {
        darkSpan(span(".medium.fa.fa-sun-o"));
        app(".round-img", x => {
            x.style.opacity = "70%";
        });
    }
    darkMode(!$darkMode);
}

function formatNum(num) {
    let x, str = ""+ num;
    if (num >= 1000) {
        x = ""+ Math.floor((num / 1000));
        x = x.length;
        return str.substring(0, x) + ","+ str.substring(x);
    }

    return num;
}