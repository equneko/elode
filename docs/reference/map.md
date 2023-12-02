# Map
Manipulate `Array` to be reactive as a listed `Child` with a container `Root`

## Get Started
Based on `Array.map(fn)` function, Elode.js using that implementations with Reactive. <br>
in order to get Listing or something to list the child with a cointainer. And of course, <br>
that's can be Update and Noticed every change when the Array data was changed.

## Define
```javascript
  import { use, map, render } from 'elode'

  use("div", "li")

  let Frameworks = ['React', 'Vue', 'Angular'];

  render(
    div(
      "h1 JS Frameworks",
      map("ul#MyJSMap", Frameworks, (child) => li(child));
  )
```
Map's actually extended `Array.map(fn)` on the Elode.js List Structures that was modified with Reactive. <br>
The different's while the map just place the parameter `callback` function. But in Elode.js map's using 3 parameter <br>
that required for definition of Container and also List of Child. Example's `ul` element as a Container, `Frameworks` as <br>
a List and the Child's `li` element. Lets see the next details here:

## Usagement
```javascript
  //Adding
  Frameworks.push("Elode");

  //Removing
  Frameworks.splice(1, 0);

  //Filtering
  Frameworks.filter( v => v.includes("e"));
```
Using Map's just for declare/configure an `Array` to be reactive as a component update. <br>
So, if you have some synchronize data into a component. Just call Map to make your data `Array` <br>
connected to the component that you want to update everytime without reconfigure again.

## Callback
Talking about Reactivity, we know that will be synchronized between model, view and controller. <br>
the model itself was a data structure `Array` and the view's a `Component (ul/div/etc)` but what's the controller? <br>
Ok. here you go. the controller's also known as modifier between model and view. that was a Callback `function` <br>
```javascript

  //Control the Map using Callback
  let myMap = map("ul#Students", StudentList, studentCheck);

  //A Function that controls the Map
  function studentCheck(object){
    if(object != null)
      return li(object.name);
    else
      return li("ERROR");
  }
```
