// App.js

/*
    SETUP
*/
var express = require('express');   
var app     = express();          
var db = require('./database/db-connector');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
PORT        = 5478;
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
    db.pool.query("SELECT fname, lname, phoneNumber, leaderID, Properties.propAddress AS address FROM CrewLeaders JOIN Properties ON CrewLeaders.propertyID = Properties.propertyID;", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.CrewLeaders = results;
        complete();
    });
}

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

function deleteProperties(propertyID, res){
    var sql = "DELETE FROM properties WHERE id = ?";
    //var inserts = [req.params.propertyID];
    //console.log(req.params.propertyID);
    db.pool.query(sql, propertyID, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        //complete();
        //res.redirect('properties');
        res.end();
    })
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

    /*
app.get('/propertiesUpdate/:propertyID', function(req, res){
        
        res.render('propertiesUpdate');
        console.log(req.body, req.params, req.params.propertyID);
    });  

app.post('/propertiesUpdate/:propertyID', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "UPDATE Properties SET propAddress = ? WHERE propertyID = ?;";
    var inserts = [req.body.addressInput, req.params.propertyID]
    console.log(req.params);
    sql = db.pool.query (sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/properties');
        }
    })
})

*/
app.get('/propertiesUpdate/:propertyID', function(req, res){
        
    callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateProperties.js"];
        var mysql = req.app.get('mysql');
        getProperty(res, mysql, context, req.params.propertyID, complete);
        //getPlanets(res, mysql, context, complete);
        console.log("got past getproperty")
        function complete(){
            callbackCount++;
            console.log(callbackCount);
            if(callbackCount >= 1){
                res.render('propertiesUpdate', context);
            }

        }
    });

    function getProperty(res, mysql, context, id, complete){
        //var sql = "SELECT propAddress FROM Properties WHERE id = 1;";
        var inserts = [id];
        var sql = "SELECT propAddress FROM Properties WHERE propertyID = ?;";
        db.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log("get prop 1");
            console.log(results);
            context.property = results[0];
            console.log("get prop 2");
            complete();
        });
    }

    app.post('/propertiesUpdate/:propertyID', function(req, res){
        console.log("got to propertyupdate");
        var mysql = req.app.get('mysql');
        var sql = "UPDATE properties SET propAddress=? WHERE id=?";
        var inserts = [req.body.propAddress, req.params.propertyID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            res.redirect('/properties');
        });
    });







app.get('/properties/delete/:propertyID', function(req, res) {
	console.log("checkpoint 1\n");
    deleteProperties(req.params.id, res);
	res.redirect('/properties');
});

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});