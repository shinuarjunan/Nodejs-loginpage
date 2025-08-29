const express = require('express');
const session = require('express-session');
 
const app = express();
const PORT = 3000;
 
// Middleware for sessions
app.use(session({
  secret: 'mySecretKey',           // used to sign the session ID cookie
  resave: false,                   // don't save session if unmodified
  saveUninitialized: true,         // save new sessions
//   cookie: { maxAge: 60000 }        // session max age in ms
}));
 
// Home route
app.get('/', (req, res) => {
  if(req.session.user){
    res.render("/login.html")
  }else{
    res.render("/login.html")
  }
});
 
app.get("/login.html", (req, res) =>{
  res.render("/login.html")
})
 
app.post("/login.html", (req, res) =>{
  req.body.username == "admin" && password=="admin"
 
  req.session.user = { user:"admin" };
  res.redirect("/");
})
 
// Destroy session
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error destroying session');
    }
    res.send('Session destroyed. <a href="/">Start again</a>');
  });
});
 
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});