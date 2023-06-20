const { app, use, hook, render, XSS } = Elode;

use('div', 'h1', 'p', 'input', 'button');

hook({
    alf:{
        login_submit(el){
            if(el.constructor==HTMLInputElement){
                el.on("keydown",function(e){
                    if(e.keyCode==13){
                        Login.SubmitLogin();
                    }
                });
            }else{
                el.on("click",function(){
                    Login.SubmitLogin();
                });
            }
        }
    }
});

let MyApp = app({
    Login: "#login",
    Home: "#home"
}),
    ctr = {
        textAlign: "center"
    },
    userlist = [];

render(
    div("[id loginapp]",
        Login = div("[id login]",
            h1("Login"),
            usr = input("[placeholder Username | type text | alf:login_submit]"), "br",
            psw = input("[placeholder Password | type password | alf:login_submit]"), "br",
            button("[alf:login_submit] Login"),
            button("Register", {
                onclick() {
                    userlist.push({ usr: usr.val(), psw: psw.val() });
                    alert("Sukses Registrasi!");
                }
            }),
            {
                style: ctr,
                SubmitLogin(){
                    var i, x;
                    for (i = 0; i < userlist.length; i++) {
                        x = userlist[i];
                        if (x.usr == usr.val()) {
                            if (x.psw == psw.val()) {
                                Home.prop({
                                    user: x.usr,
                                });
                                Home.react();
                                MyApp.render("Home");
                                usr.val(""); psw.val("");
                                return;
                            } else {
                                alert("Password Salah!");
                                return;
                            }
                        }
                    }
                    alert("Tidak ada user " + usr.val() + ", silahkan register terlebih dahulu!");
                }
            }),

        Home = div("[id home]",
            h1("Home"),
            "p Selamat datang {{user}}!",
            button("Logout", {
                onclick() {
                    Home.user = "";
                    MyApp.render("Login");
                }
            }),
            {
                style: ctr
            })
    )
);

MyApp.render("Login");
