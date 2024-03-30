// we destructure the require('fs') to get only the readFile and writeFile
const {readFile, writeFile} = require('fs')

// alternate method
// const fc = require('fs')
// fc.readFile

console.log('start')

readFile('./subfolder/read.txt', 'utf8', (err, result)=>{
    if(err){
        console.log("Error:", err)
        return 
    }
    const first = result;
    readFile('./subfolder/read2.txt', 'utf8', (err, result)=>{
        if(err){
            console.log("Error:", err)
            return
        }
        const second = result;
        writeFile(
            './subfolder/write.txt', 
            `${first}, ${second}`,
            (err, result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(result) // undefined
                console.log('done with writing the task')
            }
        )
    })
    return
})

console.log('executing rest of the code')