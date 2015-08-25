var m = require("mithril")

var style = require("../styles/example.js")

module.exports = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(ctrl){
		return m("div", {style: style.css() },

			m("h1", "Welcome"),
			m("div.input-group",

					m("span.input-group-addon#addon","Label: "),
					m("input[type=text].form-control",{
						inputValue: ctrl.inputValue(),
						oninput: m.withAttr("value", ctrl.inputValue),
						placeholder: "Edit src/components/example live!"
					}, "")

			)
		)
	}
}