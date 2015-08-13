var m = require("mithril")

module.exports = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(ctrl){
		return [
			m("h1", "Welcome"),
			m("div.input-group",

					m("span.input-group-addon#addon","Schedule Name: "),
					m("input[type=text].form-control",{
						inputValue: ctrl.inputValue(),
						oninput: m.withAttr("value", ctrl.inputValue),
						placeholder: "Edit src/components/example live!"
					}, "")

			)


		]
	}
}