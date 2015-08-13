var watch = require('watch')
var path = require('path')
var fs = require('fs')
var m = require('mithril')


absolute_path = (f) => {
  f = path.resolve(".", f)
  return f[0].toUpperCase() + f.slice(1)
}


watch.watchTree('.', function (f, curr, prev) {

  if( typeof f != "string") return;

  var require_path = absolute_path(f)

  if(require.cache[ require_path ] === undefined) return;

  fs.readFile(require_path , function(err, buffer){

    var old_require = require

    var patched_path = path.dirname(require_path)

    require = function(module_path){
      if(module_path.indexOf(".") > -1){
        return old_require(path.resolve(patched_path , module_path))
      } else {
        return old_require(module_path)
      }
    }

    var file_text = (""+buffer)

    var module = { exports: {} };
    try {
      var evald = eval(""+file_text)
    } catch(e) {
      console.error("Patch:", e.message)
      return;
    } finally {
      require = old_require
    }

    for(var key in require.cache[require_path ].exports){
      require.cache[require_path ].exports[key] = module.exports[key]
    }
    m.redraw()
    console.log("patched: ",f)
  })


})