// App.js

/*
    SETUP
*/
var express = require('express');   
var router = express.Router(); 
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

//selects attributes from Properties table to be displayed
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



//selects attributes from property owners table to be displayed
function getOwners (res, context, complete){
    db.pool.query("SELECT ownerID, fname, lname, email FROM PropertyOwners;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.owners = results;
        complete();
    });
}



//selects attributes from landscaping session table to be displayed
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



//selects attributes from crew leaders table to be displayed
function getCrewLeaders (res, context, complete){
    db.pool.query("SELECT fname, lname, phoneNumber, leaderID, Properties.propAddress AS address FROM CrewLeaders JOIN Properties ON CrewLeaders.propertyID = Properties.propertyID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.CrewLeaders = results;
        complete();
    });
}


//selects attributes from employees table to be displayed
function getEmployees(res, context, complete){
    db.pool.query("SELECT Employees.fname, Employees.lname, Employees.phoneNumber, CrewLeaders.fname AS leaderfirst, CrewLeaders.lname AS leaderlast FROM Employees JOIN CrewLeaders ON Employees.leaderID = CrewLeaders.leaderID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.employees = results;
        complete();
    });
}


//selects attributes from Property owned table to be displayed
function getPropertyOwned (res, context, complete){
    db.pool.query("SELECT PropertyOwned.propertyID, PropertyOwned.ownerID, Properties.propAddress AS address, PropertyOwners.fname AS ownerfirst, PropertyOwners.lname AS ownerlast FROM PropertyOwned JOIN Properties ON PropertyOwned.propertyID = Properties.propertyID JOIN PropertyOwners ON PropertyOwned.ownerID = PropertyOwners.ownerID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.propertyowned = results;
        complete();
    });
}

/*
    ROUTES
*/

//main page
app.get('/index', function(req, res)
    {
        res.render('index')                
    });      

    //displayes properties
app.get('/properties', function(req, res){
    let query1 = "SELECT * FROM Properties;"; 

        db.pool.query(query1, function(error, rows, fields){

            res.render('properties', {data: rows}); 
        })                        
    });  

    //allows adding new property
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

//allows deleting property
app.delete('/properties/:id',function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE from Properties WHERE propertyID=?";
    var inserts = [req.params.id];
    sql = db.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end()
        }
    })
}); 

//displayes completed landscaping sessions
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


//allows adding completed landscaping sessions
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


//displayes property owners
app.get('/PropertyOwners', function(req, res){
    let query1 = "SELECT * FROM PropertyOwners;"; 

    db.pool.query(query1, function(error, rows, fields){

        res.render('PropertyOwners', {data: rows}); 
    })                    
    });  

    //allows adding new property owner
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

//displays crew leaders
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

//allows adding crew leaders
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

//displays employees
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

//allows adding new employees
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

//displayes property owned
app.get('/PropertyOwned', function(req, res){
    var callbackCount = 0;
    var context = {};
    //var mysql = req.app.get('db');
    getProperties(res, context, complete);
    getOwners(res, context, complete);
    getPropertyOwned(res, context, complete);
    //res.render('CompletedLandscapingSessions', context); 
    function complete(){
        callbackCount++;
        if(callbackCount >= 3){
            res.render('PropertyOwned', context); 
        }
    }          
    });  

    //allows adding new property owned
app.post('/PropertyOwned', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO PropertyOwned (propertyID, ownerID) VALUES (?,?)";
    var inserts = [req.body.propertyID, req.body.ownerID];
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('PropertyOwned');
        }
    })
})

    //displays page for updating properties
app.get('/propertiesUpdate/:propertyID', function(req, res){
    
            res.render('propertiesUpdate');
    });  

    //allows updating properties
app.post('/propertiesUpdate/:propertyID', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "UPDATE Properties SET propAddress = ? WHERE propertyID = ?;";
    var inserts = [req.body.addressInput, req.params.propertyID]
    console.log(req.body, req.params);
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/properties');
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});