# Init
Including main tools `Action` of Elode.js for HTMLElement (DOM)
- [Get Started](https://github.com/equneko/elode/blob/main/docs/reference/init.md#get-started)
- [Initialize](https://github.com/equneko/elode/blob/main/docs/reference/init.md#initialize)
- [Fun Fact :v](https://github.com/equneko/elode/blob/main/docs/reference/init.md#fun-fact-:v)

## Get Started
Initialize the Elode.js action functions to do DOM manipulation. <br>
it's usually for some case that Original HTML Elements need to get <br>
an actions from Elode.js. Seems like `$(".jquery").show()` JQuery actions. <br>

## Initialize
```javascript
  const { init } = Elode;

  // <h1 id="text">Hello {{message}}</h1>

  let myText = document.getElementById("text");
  myText.prop({message:"World"}); // it's actually not working :v
  myText = init(myText);
  myText.prop({message:"World"}); // yeah it's worked!
```
Based on the code above, the `init` feature, make the origin HTML Element (DOM) become to the Elode.js Element.<br>
It's cause the DOM Prototypes has been included all of standard actions from Elode.js. And it's worked <br>
when you access the reactive `prop` as well as the example shows. Actually it's seems like injections

## API
`init(element)` - initialize the origin HTML Element (DOM) becomes to the Elode.js Element

## Fun Fact :v
The `init` feature's actually just for experiments to `build` feature that has been canceled in the release of `v2.0` <br>
But at least, maybe sometimes it's become useful for something? like you need to transform HTMLElement to ElodeElement?
