var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


var dateFormat = require('dateformat');
var now = new dateFormat();
app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"


});
con.connect(function(error) {
    if (!!error) console.log(error);
    else console.log('Database Connected!');
});



const siteTitle = "Simple application";
const baseURL = "http://localhost:4000/";


app.get('/', function(req, res) {

    con.query("SELECT * FROM e_event ORDER BY e_start_date_ DESC", function(err, result) {
        res.render('pages/index', {
            siteTitle: siteTitle,
            pageTitle: "Event list",
            items: result

        });


    });

});


var server = app.listen(4000, function() {
    console.log("Server started on 4000....");
});