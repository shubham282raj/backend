const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    // this will send the whole file at once
    // const text = fs.readfileSync("./subfolder/read.txt", "utf8");
    // res.end(text);

    // this will send the file in chunks
    const fileStream = fs.createReadStream("./subfolder/read.txt", "utf8");
    fileStream.on('open', ()=>{
        fileStream.pipe(res)
    })
    fileStream.on('error', (err)=>{
        res.end(err)
    })
  })
  .listen(5000);
