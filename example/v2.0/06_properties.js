/* 
    HTML Properties
    by equneko (08/06/2023)
*/

// Basic
Elode("h1 Hello Properties!",{
    id:'title',
    style:{
        color:'blue'
    }
}).render();

// Extended
Elode("button Click Me!",{
    style:{
        fontSize:'17pt',
        border:'none',
        borderRadius:'8px',
        color:'white',
        padding:'4px 16px',
        backgroundColor:'black',
        
    },
    onclick(){
        alert("Uwoooghhhjj");
    }
}).render();