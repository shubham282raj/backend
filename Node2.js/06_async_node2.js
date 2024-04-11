const {readFile, writeFile} = require('fs').promises

const start = async () => {
    try {
        const first = await readFile('./subfolder/read.txt', 'utf8')
        const second = await readFile('./subfolder/read2.txt', 'utf8')

        await writeFile('./subfolder/write.txt', `This is the result: ${first}, ${second}`)

        console.log(first, second)

        const third = await readFile('./subfolder/write.txt', 'utf8')
        console.log(third)
    } catch (error) {
        console.log(error)
    }
}

start()