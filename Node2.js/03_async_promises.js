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

// this does nothing
getText('./subfolder/read.txt')

// this will work
getText('./subfolder/read.txt')
    .then((result) => {
        console.log(result)
    }).catch((err) => { 
        console.log(err)
    })