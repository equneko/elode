# App
Application tools for `View` and `Scope` management

- [Get Started](https://github.com/equneko/elode/edit/main/docs/reference/app.md#get-started)
- [View](https://github.com/equneko/elode/edit/main/docs/reference/app.md#app)
- [API]
- [Example]
- [Scope]

## Get Started
`app` is the management tools for `View` and `Scope` purposes. <br>
it's most used for do **Single Page Application** with simple and efficient way. <br>

## View
Component placed at `<body></body>` container with structured list <br>
but sometimes we need to manage their function or state of `display` prototype. <br>
the efficient way to do that's using an `app` features. Here's the example:
```javascript
  const { app, use, render } = Elode;

  use('div','h1','p')

  let myApp = app({
      v1: "#view1",
      v2: "#view2"
  });

  render(
    div("#view1",
        h1("View 1"),
        p("This section of view1")
    ),
    div("#view2",
        h1("View 2"),
        p("This section of view2")
    )
  )

  //Apply only show the Component #view1
  myApp.set("v1");
```
Based on the example above, as you can see. `View` is actually a management state <br>
for several `Component` that needs to control with efficient way. It's can be simple <br>
to show/hide only customize view like `v1` as a `#view1` or `v2` as a `#view2`.

## API
- `db` - Database (Object) it's returned from the first initialize/configuration of `app`
- `at(target, action)` - Manage the `target` Component in the `app` with an `action`
- `set(targets)` - Show only custom `targets` Components in the `app`
- `get(target)` - Get only the `target` Component in the `app`

## Example:
```javascript
  console.log(myApp.db.v1) // Result: #view1
```
```javascript
  myApp.at("v1", function(el){
      el.innerHTML = "Hello View 1";
  });
  //ES6 Arrow Function
  myApp.at("v1", el => { ... });
```
```javascript
  myApp.set("v2"); //Show only #view2
  myApp.set(["v1","v2"]) //Show only both
```
```javascript
  let view1 = myApp.get("v1"); //Get the #view1
```

## Scope
There's another function that `app` can do for manage `Scope` Element. <br>
it's seems like `app.at(target, action)` but do you know? that's based on the `Scope` <br>
the API of `app.at` is actually implementation of `app(target, action)` <br>
```javascript
  app(".someclass", function(el){
      el.innerText = "Hello Scope";
  });

  app("#ListView", el => el.destroy());
  app("[attr]", el => el.txt("Text Modified!"));
```
