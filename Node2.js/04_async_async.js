const {readFile} = require('fs')

const getText = (path) => {
    return new Promise((resolve, reject)=>{
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

const start = async () => {
    try {
        const first = await getText('./subfolder/read.txt')
        const second = await getText('./subfolder/read2.txt')
        console.log(first)
        console.log(second)
    } catch (error) {
        console.log(error)
    }
}

start()