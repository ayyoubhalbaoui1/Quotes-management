let express = require('express');
let http = require('http');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));




app.set('view engine', 'ejs');



/*
 *** Import all related javaScript an CSS files to inject in our App
 */

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db"
});

/*
 ***Global site title and base url
 */
const siteTitle = "App";
const baseURL = "http://localhost:3000";


/*
 *** When page is loaded
 */
app.get('/', function(req, res) {
    /*
     *** get the event list
     */
    con.query("SELECT * FROM user", function(err, result) {
        res.render('index', {
            siteTitle: siteTitle,
            pageTitle: "Quotes list",
            items: result
        });
    });
});

app.get('/event/add', function(req, res) {
    /*
     *** add
     */
    res.render('add.ejs', {
        siteTitle: siteTitle,
        pageTitle: "add new Author",
        items: ''
    });
});


app.post('/event/add', function(req, res) {
    let query = "INSERT INTO `user` (nom,prenom) VALUES(";
    query += " '" + req.body.nom + "',";
    query += " '" + req.body.prenom + "')";
    con.query(query, function(err, result) {
        res.redirect(baseURL);
    });
});



app.get('/event/edit/:id', (req, res) => {


    let sql = "Select * from user where id =" + req.params.id;
    let query = con.query(sql, (err, result) => {
        if (err) throw err;
        res.render('edit', {
            siteTitle: siteTitle,
            pageTitle: "Author Info Updates ",
            item: result
        });
    });
});

app.post('/event/edit/:id', (req, res) => {


    let sql = "update user SET nom='" + req.body.nom + "', prenom='" + req.body.prenom + "'where id =" + req.body.id;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(baseURL);
    });
});

/*
 ***Delete
 */

app.get('/event/delete/:id', function(req, res) {

    con.query("DELETE FROM user WHERE id='" + req.params.id + "'", function(err, result) {
        if (result.affectedRows) {
            res.redirect(baseURL);
        }
    })
})

/*
 *** Conetct to the server
 */

let server = app.listen(3000, function() {
    console.log('server started on 3000...');
});