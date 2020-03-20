// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = 3000;
//DB Setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connect');
});
db.on('error', function(err){
  console.log('DB ERROR :', err);
});

//Other Setting
app.set('port', port);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// routes
app.use('/', require('./routes/home')); // 1
app.use('/contacts', require('./routes/contacts')); // 2


app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});

// application Setting
// app.configure(function(){
//   app.set('port', port);
//   app.set('views', __dirname+'/views');
//   app.set('view engine', 'ejs');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
// });
