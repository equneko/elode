# Hook
Directive shortcut of repeative function ecosystem
- [Get Started](https://github.com/equneko/elode/blob/main/docs/reference/hook.md#get-started)
- [Declaration](https://github.com/equneko/elode/blob/main/docs/reference/hook.md#declaration)
- [Usagement](https://github.com/equneko/elode/blob/main/docs/reference/hook.md#usagement)
- [API](https://github.com/equneko/elode/blob/main/docs/reference/hook.md#api)
- [Builtins](https://github.com/equneko/elode/blob/main/docs/reference/hook.md#builtins)

## Get Started
When you have a repeative function call, using the `hook` <br>
is more good to shortcut the code and make extra manipulation <br>
to your Component or Element. Lets see the next description. <br>

## Declaration
```javascript
  const { hook } = Elode;

  hook({
    click_set_text_upper(el, data){
      el.onclick = function(){
        el.innerText = data.toUpperCase();
      };
    }
  });
```
Declare the `hook` function is basically inside of `hook()` feature. <br>
Dont forget to declare the repeative function. Before you want to use it.

## Usagement
```javascript
  render(
      h1("[:click_set_text_upper You Clicked Me] Click Me"),
      p("Click the text above to see what happens")
  )
```
After you have declared the repeative function that you want to use it. <br>
Now you can easy to use inside the Component/Element's attribute that needs to start with <br>
`:` symbols and then the name of `hooked` function. Like the example above

## API
`hook(objects)` - declare a hook function by JavaScript `objects` {}
```javascript
  hook({
    function_name(element, data-attribute){
        // Do something...
    }
  })
```
`element("[:hook_function data] the content")` - using the hook in Component/Element
```javascript
  render(
    h1("[:my_hook this data show] Show Me")
  )
```

## Builtins
Elode.js has several `hook` functions that included originally for standard purposes. <br>
The builtins hooked function's most used for do short action of some Elode.js actions. <br>
By using the standard hook, you can easy to make Component/Element manipulation.

- [`anim`]() - Animation shortcut version based on `Action`
- [`attr`]() - Attributes change with dynamic style CSS
- [`def`]() - Define or binding a reactive data
- [`memo`]() - Initialize memorize features
- [`model`]() - Modeling `input` value with reactive data
- [`seen`]() - Seen toggler based on true/false change
- [`do`]() - Do self manipulation based on `Action` features
- [`if`]() - If case continue with `then` or `else`
- [`then`]() - Based on above, then is mean when it's become true
- [`else`]() - When it's comes false, then else do it
- [`for`]() - Each array becomes map of `Element`
- [`once`]() - Once reactive change, no more update
- [`delay`]() - Do something with delay time binding
