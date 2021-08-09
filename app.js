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
function getProperties (res, context, complete){
    db.pool.query("SELECT propertyID, propAddress FROM Properties;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.properties = results;
        complete();
    });
}

function getLandscapingSessions (res, context, complete){
    db.pool.query("SELECT sessionID, sessionDate, Properties.propAddress AS address FROM CompletedLandscapingSessions JOIN Properties ON CompletedLandscapingSessions.propertyID = Properties.propertyID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.sessions = results;
        complete();
    });
}

function getCrewLeaders (res, context, complete){
    db.pool.query("SELECT fname, lname, phoneNumber, Properties.propAddress AS address FROM CrewLeaders JOIN Properties ON CrewLeaders.propertyID = Properties.propertyID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.CrewLeaders = results;
        complete();
    });
}

function getEmployees(res, context, complete){
    db.pool.query("SELECT Employees.fname, Employees.lname, Employees.phoneNumber, CrewLeaders.fname AS leaderfirst, Crewleaders.lname AS leaderlast FROM Employees JOIN CrewLeaders ON Employees.leaderID = CrewLeaders.ID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.CrewLeaders = results;
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
    //var mysql = req.app.get('db');
    getLandscapingSessions(res, context, complete);
    getProperties(res, context, complete);
    //res.render('CompletedLandscapingSessions', context); 
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('CompletedLandscapingSessions', context); 
        }
    }      
});  

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

app.get('/PropertyOwners', function(req, res){
    let query1 = "SELECT * FROM PropertyOwners;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('PropertyOwners', {data: rows}); 
    })                    
    });  

app.post('/PropertyOwners', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO PropertyOwners (fname, lname, email) VALUES (?,?,?)";
    var inserts = [req.body.fname, req.body.lname, req.body.email];
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('PropertyOwners');
        }
    })
})

app.get('/CrewLeaders', function(req, res){
    var callbackCount = 0;
    var context = {};
    //var mysql = req.app.get('db');
    getCrewLeaders(res, context, complete);
    getProperties(res, context, complete);
    //res.render('CompletedLandscapingSessions', context); 
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('CrewLeaders', context); 
        }
    }      
                   
});  

app.post('/CrewLeaders', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO CrewLeaders (fname, lname, phoneNumber, propertyID) VALUES (?,?,?,?)";
    var inserts = [req.body.fname, req.body.lname, req.body.phoneNumber, req.body.propertyID];
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('CrewLeaders');
        }
    })
})

app.get('/Employees', function(req, res){
    var callbackCount = 0;
    var context = {};
    //var mysql = req.app.get('db');
    getCrewLeaders(res, context, complete);
    getEmployees(res, context, complete);
    //res.render('CompletedLandscapingSessions', context); 
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('Employees', context); 
        }
    }                 
});  

app.post('/Employees', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Employees (fname, lname, phoneNumber, leaderID) VALUES (?,?,?,?)";
    var inserts = [req.body.fname, req.body.lname, req.body.phoneNumber, req.body.leaderID];
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('Employees');
        }
    })
})

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