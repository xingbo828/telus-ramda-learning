const util = require('util')

global.log = (obj) => global.console.log(util.inspect(obj, {depth: null}))