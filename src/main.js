var component = require("./components/example")

var m = require("mithril")

m.mount(document.body, component)
//kick off live editing
require("./patch")