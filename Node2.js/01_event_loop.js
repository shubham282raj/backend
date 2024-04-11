// The event loop allows Node.js to perform 
// non-blocking I/O operations even though 
// JavaScript is single-threaded by offloading
// operations to the system kernel whenever possible.

console.log('first task')
setTimeout(() => {
    console.log('second task')
}, 0)
console.log('third task')

// Output:
// first task
// third task
// second task

const { readFile } = require('fs')

console.log('start')

readFile('./subfolder/read.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('file read')
})
console.log('end')

// Output:
// start
// end
// file read

