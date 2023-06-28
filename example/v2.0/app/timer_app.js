const { use, render } = Elode;

use('div', 'h1', 'p', 'button');

render(
    App = div("#TimerApp",
        h1("Timer App"),
        p("Build in <b Elode.js>"),
        timer = h1("{{hours} <= 9 ? '0'+{hours}:{hours}} " +
            " : {{miniute} <= 9 ? '0'+{miniute}:{miniute}}" +
            " : {{second} <= 9 ? '0'+{second}:{second}}"),
        set = button("Stop"),
        button(".reset Reset", {
            onclick() {
                App.prop({ hours: 0, miniute: 0, second: 0 });
            }
        })
        , {
            hours: 0, miniute: 0, second: 0, isStart: false,
            setState(state) {
                if (state) {
                    set.txt("Start");
                    App.stop();
                } else {
                    set.txt("Stop");
                    App.start();
                }
                set.toggle("class", "start");
                timer.toggle("style", "color:red");
            },
            onCreate() {
                set.on("click", function () {
                    App.setState(App.isStart = !App.isStart);
                });
            },
            interval: 1000,
            onRender() {
                this.second++;
                if (this.second >= 59) {
                    this.miniute += 1;
                    this.second = 0;
                }
                if (this.miniute >= 59) {
                    this.hours += 1;
                    this.miniute = 0;
                }
            }
        })
);