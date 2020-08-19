# Visualizing forces acting on nodes during force layout

This is a very simple visualization, created from this [tweet](https://twitter.com/anvaka/status/1295619610893365248).

It makes nodes brighter when they have more force applied to them during force layout:

![highlighted nodes](https://i.imgur.com/gNwTWfx.png)

Play with it here: http://anvaka.github.io/color-force-vis

### Compiles and hot-reloads for development

```
npm start
```

This should render a simple graph and you can do some basic layout. You can drop `.dot` files into it
to load new graphs.

### Compiles and minifies for production

```
npm run build
```

## What's inside?

* [ngraph.graph](https://github.com/anvaka/ngraph.graph) as a graph data structure
* [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout) for the basic graph layout
* [w-gl](https://github.com/anvaka/w-gl) - super duper obscure (and fast) WebGL renderer.
* vue.js powered UI and dev tools.

## Thanks!

* Stay tuned for updates: https://twitter.com/anvaka
* If you like my work and would like to support it - https://www.patreon.com/anvaka