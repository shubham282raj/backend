// event-driven programming
// used heavily in node.js

const EventEmitter = require('events');

// we can either use this class or we can extend 
// this class in our own custom class

// here we just want to emit an event 
// so we are making an instance of this class
const customEmitter = new EventEmitter();

// on - listen for an event
// emit - emit an event

// 'response' is name of the event
customEmitter.on('response', (name, id) => {
    console.log(`data received user ${name} with id:${id}`);
});

customEmitter.on('response', () => {
    console.log('some other logic');
})

customEmitter.emit('response', 'john', 34);

customEmitter.on('response', () => {
    console.log('a newer logic');
})

//output:
// data received user john with id:34
// some other logic

// 'a newer logic' will not be printed 
// because it is after the emit