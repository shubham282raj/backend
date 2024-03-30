// Built-in Modules

// OS
// PATH
// FS
// HTTP

const os = require('os')

// info about current user
const user = os.userInfo()
console.log(user)

//method returns the system uptime in seconds
const uptime = os.uptime()
console.log(uptime, 'seconds')

const currentOS = {
    name: os.type(),
    release: os.release(),
    total_mem: os.totalmem(),
    free_mem: os.freemem()
}
console.log(currentOS)