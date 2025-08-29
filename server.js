const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware to protect form.html
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html');
    } 
}

// Handle login request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        req.session.user = username;
        res.redirect('/jqueryplugin.html');
    } else {
        res.send(`
            <h3 style="text-align:center;color:red;">
                Invalid credentials<br>
                <a href="/login.html">Try again</a>
            </h3>
        `);
    }
});

// Handle logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login.html');
    });
});

// Prevent direct access to form.html without session
app.get('/jqueryplugin.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/jqueryplugin.html'));
});
 
// Default route
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
