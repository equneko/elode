var TimerApp = function(){
    return Elode([".container",
        "h1 Timer Test",
        "p[style margin-left:0.8em] This is timer: {{time}}",
        "button.btn.bg-blue.hoverx Start",
        "button.btn Stop"
    ],{
        time:0, start: false,

        onCreate:function(){
            var view = this._node[1],
                start = this._node[2],
                stop = this._node[3];

            start.onclick = function(){
                this._root.start = true;
                view.style.color = "black";
            }
            stop.onclick = function(){
                this._root.start = false;
                view.style.color = "red";
            }
        },
        onRender:function(){
            if(this.start)this.time++;
        }
}).render();
};

TimerApp(); TimerApp(); TimerApp();