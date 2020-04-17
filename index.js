const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


// Middleware  serve the static web pages
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './views')));

// *********** BODY-PARSER ***********
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// *********** MIDDLEWARE ***********
app.set('view engine', 'ejs');

// routes to navigate between the pages
app.get('/', (req, res, next) => {
    res.render('index.ejs', { title: 'Authenticate' });
})

// app.get('/authentication', (req, res, next) => {
//     res.render('authentication.ejs', {title : 'Authentication Page'});
// })

app.get('/apis/citation', (req, res, next) => {
    res.render('addCitation.ejs', { title: 'Add New Citation', success: '' });
})

app.get('/apis/author', (req, res, next) => {
    res.render('addAuthor.ejs', { title: 'Add New Author', success: '' });
})


app.use('/apis', require('./core/route/route.js'));



const port = 5000;
app.listen(port, () => {
    console.log(`the server is running on the port: ${port}`);
    
})