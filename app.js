// App.js

/*
    SETUP
*/
var express = require('express');   
var app     = express();            
var db = require('./database/db-connector')
PORT        = 5461;                 
var exphbs = require('express-handlebars');     
app.engine('.hbs', exphbs({                     
    extname: ".hbs"
}));
app.set('view engine', '.hbs'); 
app.set('port', 5461);

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