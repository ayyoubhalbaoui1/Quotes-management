const express = require('express');
const router = express.Router();
const dbconfig = require('../database/database');

// *************************************************************************
// ********************** Author *******************************************
// *************************************************************************

// @ route to add new Authoe to the authors table
// @ description
router.post('/author/add', (req, res, next) => {
    const input = req.body;
    let name = input.fullname;
    let ag = input.age;
    let origin = input.country;
    const sql = "INSERT INTO authors (FullName, Age, Country) VALUES ('" + name + "', '" + ag + "', '" + origin + "')";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('addAuthor.ejs', { title: 'Add new Author', success: 'The Author Was Added Successfully' });
    })
})

// @ route to get all the authors from the database
// @ description
router.get('/author/all', (req, res, next) => {
    const sql = "SELECT * FROM authors";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('displayAuthor.ejs', { title: 'Display', success: 'Records was successfully founded', data: result });
    })
})

// @ route to delete one item 
// @ description
router.get('/author/delete/:id', (req, res, next) => {
    identity = req.params.id;
    const sql = "DELETE FROM authors WHERE id_Author = '" + identity + "'";
    dbconfig.query(sql, (err) => {
        if (err) throw err
        res.redirect('/apis/author/all');
    })
})

// @ route to get the specifique item using the id
// @ description
router.get('/author/edit/:id', (req, res, next) => {
    identity = req.params.id;
    const sql = "SELECT id_Author, FullName, Age, Country FROM authors WHERE id_Author = '" + identity + "'";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('editAuthor.ejs', {title: 'Edit', success: '', data: result });
    })
})

// @ route to update the selected item 
// @ description
router.post('/author/update/', (req, res) => {
    const input = req.body;
    let identity = input.idAuthor;
    let name = input.fullname;
    let ag = input.age;
    let origin = input.country;
    const sql = "UPDATE authors SET FullName= '" + name + "', Age= '" + ag + "', Country= '" + origin + "' WHERE id_Author= '" + identity + "' ";
    dbconfig.query(sql, (err) => {
        if (err) throw err
        res.redirect('/apis/author/all');
    })
})


// **************************************************************************
// ********************* CITATION *******************************************
// **************************************************************************

// @ route to select all the citation from the database
// @ description
router.get('/citation/all', (req, res, next) => {
    // const sql = "SELECT citations.id, citations.Core, citations.Source, citations.Date, authors.FullName, authors.Age, authors.Country FROM citations INNER JOIN authors ON citations.id_Author = authors.id_Author"
    const sql = "SELECT * FROM citations";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('displayCitation.ejs', { title: 'Display', success: 'Records was successfully founded', data: result });
    })
})


// @ route to add new item to the citation table
// @ description
router.post('/citation/add', (req, res, next) => {
    const input = req.body;

    let citationCore = input.core;
    let citationSource = input.source;
    let idAuth = input.authorid;

    const sql = "INSERT INTO citations (Core, Source, id_Author) VALUES ('" + citationCore + "', '" + citationSource + "', '" + idAuth + "')";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('addCitation.ejs', { title: 'Add new Citation', success: 'The Citation Was Added Successfully' });
    })
})

// @ route to delete one item 
// @ description
router.get('/citation/delete/:id', (req, res, next) => {
    identity = req.params.id;
    const sql = "DELETE FROM citations WHERE id = '" + identity + "'";
    dbconfig.query(sql, (err) => {
        if (err) throw err
        res.redirect('/apis/citation/all');
    })
})

// @ route to update one item 
// @ description
router.get('/citation/update/:id', (req, res, next) => {
    identity = req.params.id;
    const sql = "DELETE FROM citations WHERE id = '" + identity + "'";
    dbconfig.query(sql, (err) => {
        if (err) throw err
        res.redirect('/apis/all');
    })
})

// @ route to get the specifique item using the id
// @ description
router.get('/citation/edit/:id', (req, res, next) => {
    identity = req.params.id;
    const sql = "SELECT id, Core, Source, Date, id_Author FROM citations WHERE id = '" + identity + "'";
    dbconfig.query(sql, (err, result) => {
        if (err) throw err
        res.render('editCitation.ejs', { title: 'Edit', success: '', data: result });
    })
})

// @ route to update the selected item
// @ description
router.post('/citation/update/', (req, res, next) => {
    const input = req.body;
    identity = input.idCitation;
    let citationCore = input.core;
    let citationSource = input.source;
    let idAuth = input.authorid;
    const sql = "UPDATE citations SET Core= '" + citationCore + "', Source= '" + citationSource + "', id_Author= '" + idAuth + "' WHERE id = '" + identity + "' ";

    dbconfig.query(sql, (err) => {
        if (err) throw err
        res.redirect('/apis/citation/all');
    })
})



module.exports = router;