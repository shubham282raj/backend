// HTTP: Hyper Text Transfer Protocol

/*
HTTP MESSAGES

    -----------> request ------------>
    |                                |
computer                       node/express
    |                                |
    <----------- response <-----------
_
*/

/*
node -v
npm init -y
npm i express
npm i -D nodemon // development dependency

add scripts for dev and start in package.json
"scripts": {
    "start": "node 01_intro.js",
    "start:dev": "nodemon 01_intro.js"
}

add this so that we can use ES6 modules
model import export statements instead
of require and module.exports
then change the file extension to .mjs
"type": "module",

import express from 'express'
this express is a top level function
so we declare a variable and call it
const app = express()
*/