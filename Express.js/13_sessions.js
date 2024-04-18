// by default http is stateless
// we don't know who is making requests

// one of the use of sessions is user authentication

// npm i express-session

import sessions from "express-session";
app.use(sessions());
// call this before app.use(router)

app.use(
  sessions({
    secret: "my secret",
    saveUninitialized: false,
    // users just visiting the website and not
    // doing anything, we don't want to save
    resave: false,
    // don't save the session if nothing has changed
    cookie: {
      maxAge: 60000 * 60, // in milliseconds
    },
  })
);

console.log(req.session);
console.log(req.session.id); // req.sessionID
// Session {
//   cookie: {
//     path: '/',
//     _expires: 2024-04-18T14:53:01.943Z,
//     originalMaxAge: 3600000,
//     httpOnly: true
//   }
// }
// G0fUFhPoTha84_6Qu7fMLJ_ll0wexgCM

// problem is session id is generated every time
// we can solve this by setting a cookie / data

req.session.visited = true;

// this will give us the session data but from 
// the memory, we can also use the session store
req.sessionStore.get(req.session.id, (err, sessionData) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(sessionData);
});
