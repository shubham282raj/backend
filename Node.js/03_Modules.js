// Modules
// CommonJS - every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

// console.log(module)
// this will give you a object in while there is an 
// object exports, and you can variables, functions 
// as well as js objects as following
// module.exports = var_name
// module.exports = {var1, var2}
// moduel.exports.var = var

// names is a js object of names as we exported 
const names = require('./03.2_names')
const {john, peter} = require('./03.2_names')

// say_hello is directly a function
// func name can be different that the actual func
const say_hello = require('./03.1_utils')

// names is a js object
console.log(names)

say_hello(names['john'])
say_hello(names.peter)
say_hello(john)
say_hello(peter)

// importing files compile the .js file and run them here
require('./03.3_direct_func_call')