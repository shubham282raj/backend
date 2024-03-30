// we destructure the require('fs') to get only two parts
const {readFileSync, writeFileSync} = require('fs')

// alternate method
// const fc = require('fs')
// fc.readFileSync

console.log('start')

const first = readFileSync('./subfolder/read.txt', 'utf8')
const second = readFileSync('./subfolder/read2.txt', 'utf8')
console.log(first)
console.log(second)

// overwrite the file
writeFileSync('./subfolder/write.txt', 'hello_world')
console.log('done with writing the file')

console.log('executing rest of the code')

// append the file
writeFileSync(
    './subfolder/read.txt',
    'This the append text',
    {flag: 'a'}
)