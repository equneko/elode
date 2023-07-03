/* 
    Tic Tac Toe
    by equneko (22/06/2023)
    
    Tutorial from:
    https://medium.com/@canankorkut1/how-to-create-a-tic-tac-toe-with-html-css-and-javascript-10a25fddd356
*/

const { app, use, ref, render } = Elode;

// Includes usable HTML-Tag using Elode-Use
use('div', 'h1', 'p', 'button')

// Define Global Data using Elode-Reference
ref({
    player: "X",
    win: false
})

// Main Render
render(

    // MyGame - Root
    div("#MyGame",
        h1("Tic Tac Toe"),
        p("Next Player: {$player}"),

        // Game Win Tag hide default using Elode-Directive :seen
        p("[:seen $win] <b[style color:red] Game End> The Winner's Player {$player}!"),

        // Board - Component
        div("#board",

            // Create 3x3 = 9 Blocks Element with Array.map()
            Array(9).fill(0).map((x) =>

                // Define Blocks
                div(".block {{value} == 0 ? '':{value}}", {
                    value: x, // value as label of 

                    // Blocks Click Event
                    onclick() {

                        // Check if Block's not blank and if game finished then block the click
                        if (this.value != 0 || $win) return;

                        // Change the value of blocks with current $player
                        this.value = $player;

                        // Calculate win algorithm
                        if (this.checkWin()) return win(true);

                        // Change the current $player
                        player($player == "X" ? "O" : "X");

                    },

                    // Calculate Win Event
                    checkWin() {
                        // Define required variable
                        var i, block = this.root.node,

                            algorithm = [ // Tic Tac Toe Algorithm
                                [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6]
                            ];

                        // Execution of algorithm
                        for (i = 0; i < algorithm.length; i++) {
                            const [a, b, c] = algorithm[i];
                            if (block[a].value == $player &&
                                block[b].value == $player &&
                                block[c].value == $player)
                                return true;
                        }
                        return false;
                    }
                })

            )
        ),

        // Reset Button - Element
        button(".btn Reset", {
            onclick() {
                // Using Elode-App to scope all of Blocks with CSS-Selector
                app(".block", x => x.prop({value:0})); 
                // Reset Win
                win(false);
            }
        }),

        // Copyright Footer - Element
        p("Build in <b Elode.js>")
    )
)
