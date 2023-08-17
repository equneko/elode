# Map
Manipulate `Array` to be reactive as a listed `Child` with a container `Root`

## Get Started
Based on `Array.map(fn)` function, Elode.js using that implementations with Reactive. <br>
in order to get Listing or something to list the child with a cointainer. And of course, <br>
that's can be Update and Noticed every change on the Array data that was changed too.

## Define
```javascript
  import { use, map, render } from 'elode'

  use("div", "li")

  let Frameworks = ['React', 'Vue', 'Angular'];
  const MyJSMap = map("ul#MyJSMap", Frameworks, (child) => li(child));
```
