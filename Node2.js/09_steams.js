// read or write sequentially

// writable
// readable
// duplex
// transform

// streams extend EventEmitter class

// readable streams

const { createReadStream } = require("fs");

const stream = createReadStream("./subfolder/read.txt", {
  highWaterMark: 90000,
//   encoding: "utf8"
});

// by default it reads 64kb (65536 bytes) at a time
// chunk of 64kb size
// last buffer - remainder
// highWaterMark - size of buffer

stream.on("data", (result) => {
  console.log(result.toString());
});

stream.on("error", (err) => {
  console.log(err);
});