// small pieve of data that your web
// server sends to the browser

// the server does not know who is person or
// device sending requests

// let's check if there is a cookie
console.log(req.cookies); // [Object: null prototype] {}
console.log(req.headers.cookie); // undefined

// let's add this cookie on the visiting the / route
res.cookie("hello", "world", { maxAge: 60000 * 60 });
// this cookie expires in 1 hour

// now  try to access this cookie
console.log(req.cookies); // undefined
console.log(req.headers.cookie); // 'hello=world'

// first one is undefined because we are not using cookie-parser
// second one is just a string not yet parsed

// npm i cookie-parser

import cookieParser  from 'cookie-parser'
app.use(cookieParser());
// make sure to put this line above the app.use(router)

console.log(req.cookies); // { hello: 'world' }
console.log(req.headers.cookie); // 'hello=world'

// signed cookies
app.use(cookieParser('my_secret_key'))
// secret can just be any string
res.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });

console.log(req.cookies); // {}
console.log(req.headers.cookie); 
// hello=s%3Aworld.NKVe2GiYkwEVPQavddYuiWOA3MVf8k7I6R%2BHezAPiz0
console.log(req.signedCookies); // { hello: 'world' }