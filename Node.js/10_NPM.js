// NPM - Node Package Manager

// Reuse our own code in other project
// Use code written by other devs
// Share our solutions with other devs

// Package, Modules, Dependencies
// These are basically sharable js code

// There is no quality control
// Anyone can publish anything

// npm -global
// npm --version
// npm -v

// local dependency - use it only for particular project
// npm i <package_name>
// npm install <package_name>

// global dependency - use it in any project
// npm install -g <package_name>
// sudo npm install -g <package_naem>

// package.json
// manifest file (stores important info about project/package)
// manual approach (create package.json and create properties etc)
// npm init (step by step, press enter to skip)
// npm init -y (everthing default)

// npm i lodash

const _ = require('lodash')

const items = [1, [2, [3, [4]]]]
const new_items = _.flattenDeep(items)
console.log(new_items)

// SHARE CODE with others - package.json
// when we share our code with someone or on github
// we don't share node_modules folder
// npm install
// this will check for all the dependencies in package.json
// and install all of them with the proper versions

// UNINSTALLING packages
// npm uninstall <package_name>

// npx - Node Package Execute
// node version > 5.6
// npx create-react-app my-app

// package-lock.json
// contains version of dependencies of dependencies
// eg bootstrap requires jquery's some version
// but you using newer one, so bootstarp will have 
// it's own version of jquery registered in 
// package-lock.json and your jquery will have its 
// own version in package.json