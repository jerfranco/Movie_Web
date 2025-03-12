const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

app.use(express.static("styles"));
app.use(express.static("images"));
app.use(express.static("scripts"));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(`http://localhost:${port}`);
});

