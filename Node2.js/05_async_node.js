const {readFile, writeFile} = require('fs')
const util  = require('util')

const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const start = async () => {
    try {
        const first = await readFilePromise('./subfolder/read.txt', 'utf8')
        const second = await readFilePromise('./subfolder/read2.txt', 'utf8')

        await writeFilePromise('./subfolder/write.txt', `This is the result: ${first}, ${second}`)

        console.log(first, second)

        const third = await readFilePromise('./subfolder/write.txt', 'utf8')
        console.log(third)
    } catch (error) {
        console.log(error)
    }
}

start()