# App
Application tools for `View` and `Scope` management

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
