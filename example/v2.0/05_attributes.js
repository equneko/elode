/* 
    Attributes
    by equneko (08/06/2023)
*/

// HTML ID (Identification)
Elode("h1#title Hello I'm Title!").render();

// HTML CLASS (Classification)
Elode("p.subtext I'm Sub Text!").render();

// HTML ATTRIBUTE (Attribution)
Elode(`form
    <h1 Login>
    <input[style margin:4px | placeholder Username | type text]> <br>
    <input[style margin:4px | placeholder Password | type password]> <br>

    <div[style margin:16px]>

    <button[onclick alert('login')] Login>
    <button[onclick alert('register')] Register>
`).render();