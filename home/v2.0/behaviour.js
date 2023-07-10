function AppareanceHandler() {
    app(".btn.menu", function(x) {x.toggle("class",["bg-dark","wheat"])});
    app(".border-d", function(x) {x.toggle("class", "border-l")});
    app(".nav", function(x) {x.toggle("class", ["bg-white", "bg-dark wheat"])});
    app(".nav", function(x) {x.toggle("class", "shadow")});
    app(".sha-test", function(x) {x.toggle("class", "shahover")});
    app("body", function(x) {x.toggle("class", "bg-dark")});
    app("h1.bold", function(x) {x.toggle("class", ["dark", "violet"])});
    app("h1.hw", function(x) {x.toggle("class", ["dark", "wheat"])});
    app("p.gray", function(x) {x.toggle("class", "wheat")});
    app(".nomenu.btn.bg-dark", function(x) {x.toggle("class", ["white", "bg-wheat","dark"])});
    app(".nomenu.btn.dark.border-d", function(x) {x.toggle("class", "wheat")});
    app(".content", function(x) {x.toggle("class", "bg-sdark")});
    app("li.mx-16", function(x) {x.toggle("class", "wheat")});
    app(".react-vct", function(x) {x.toggle("class", ["bg-white", "bg-dark"])});
    app(".rct", function(x) {x.toggle("class", "wheat")});
    app(".sideview", function(x) {x.toggle("class", "shadow")});
    app(".round-img", function(x) {x.toggle("class", "grayscale")});

    if ($darkMode) {
        darkSpan(span(".medium.fa.fa-moon-o"));
        app(".round-img", function(x) {
            x.style.opacity = "100%";
        });
    } else {
        darkSpan(span(".medium.fa.fa-sun-o"));
        app(".round-img", function(x) {
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