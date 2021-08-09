// App.js

/*
    SETUP
*/
var express = require('express');   
var app     = express();          
var db = require('./database/db-connector');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
PORT        = 5467;

app.engine('.hbs', exphbs({                     
    extname: ".hbs"
}));

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', '.hbs'); 

/*
    FUNCTIONS
*/
function getProperties (res, db, context, complete){
    db.pool.query("SELECT propertyID, propAddress FROM Properties;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.properties = results
        complete();
    });
}

function getLandscapingSessions (res, db, context, complete){
    db.pool.query("SELECT * FROM CompletedLandscapingSessions;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.sessions = results
        complete();
    });
}

/*
    ROUTES
*/
app.get('/index', function(req, res)
    {
        res.render('index')                
    });      

app.get('/properties', function(req, res){
    let query1 = "SELECT * FROM Properties;"; 

        db.pool.query(query1, function(error, rows, fields){

            res.render('properties', {data: rows}); 
        })                        
    });  

app.post('/properties', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Properties (propAddress) VALUES (?)";
    var inserts = [req.body.propAddress]
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('properties');
        }
    })
})

app.get('/CompletedLandscapingSessions', function(req, res){
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getLandscapingSessions(res, mysql, context, complete);
    getProperties(res, mysql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('CompletedLandscapingSessions', context); 
        }
    }      
});  
/*
app.post('/CompletedLandscapingSessions', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO CompletedLandscapingSessions (sessionDate, propertyID) VALUES (?,?)";
    var inserts = [req.body.sessionDate, req.body.propertyID];
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('CompletedLandscapingSessions');
        }
    })
})
*/
app.get('/PropertyOwners', function(req, res){
    let query1 = "SELECT * FROM PropertyOwners;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('PropertyOwners', {data: rows}); 
    })                    
    });  

app.get('/CrewLeaders', function(req, res){
    let query1 = "SELECT * FROM CrewLeaders;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('CrewLeaders', {data: rows}); 
    })                          
    });  

app.get('/Employees', function(req, res){
    let query1 = "SELECT * FROM Employees;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('Employees', {data: rows}); 
    })                        
    });  

app.get('/PropertyOwned', function(req, res){
    let query1 = "SELECT * FROM PropertyOwned;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('PropertyOwned', {data: rows}); 
    })                       
    });  
/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});