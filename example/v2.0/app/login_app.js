const { app, use, hook, render } = Elode;

use('div', 'h1', 'p', 'input', 'button');

hook({
    alf: {
        login_submit(el) {
            if (el.constructor == HTMLInputElement) {
                el.on("keydown", function (e) {
                    if (e.keyCode == 13) {
                        Login.SubmitLogin();
                    }
                });
            } else {
                el.on("click", function () {
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
    div("#loginapp",
        Login = div("#login",
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
                SubmitLogin() {
                    var i, x;
                    for (i = 0; i < userlist.length; i++) {
                        x = userlist[i];
                        if (x.usr == usr.val()) {
                            if (x.psw == psw.val()) {
                                Home.prop({
                                    user: x.usr,
                                });
                                MyApp.set("Home");
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

        Home = div("#home",
            h1("Home"),
            p("Selamat datang {{user}}!"),
            button("Logout", {
                onclick() {
                    Home.user = "";
                    MyApp.set("Login");
                }
            }),
        {
            style: ctr
        })
    )
);

MyApp.set("Login");
