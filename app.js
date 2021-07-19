// App.js

/*
    SETUP
*/
var express = require('express');   
var app     = express();          
var db = require('./database/db-connector');
var exphbs = require('express-handlebars');
PORT        = 5461;

app.engine('.hbs', exphbs({                     
    extname: ".hbs"
}));

app.set('view engine', '.hbs'); 

/*
    ROUTES
*/
app.get('/', function(req, res){
        res.render('index');                    
    });                                        
/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});