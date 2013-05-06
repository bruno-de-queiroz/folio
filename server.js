GLOBAL.moo = require('./lib/mootools/mootools')
GLOBAL.mongoose = require('mongoose')
GLOBAL.mediator = require("./lib/mediator")

var loadFiles = function(path,app,passport,auth){
	fs.readdirSync(path).forEach(function (file) {
		if(/\.js$/.test(file)){
			require(path+'/'+file)(app,passport,auth)
		} else
			loadFiles(path+"/"+file,app,passport,auth);
	});
}

var env = process.env.NODE_ENV || 'development'
	, port = process.env.PORT || 3000
	, models_path = __dirname + '/app/models'
	, controllers_path = __dirname + '/app/controllers'
	, config = require('./config/config')[env]
	, express = require('express')
	, fs = require('fs')
	, passport = require('passport')
	, auth = require('./app/middlewares/auth')
	, mongoose = require('mongoose')
	, Superfeedr = require('superfeedr')
	, subscriber = new Superfeedr(config.superfeedr.user, config.superfeedr.password);

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
fs.readdirSync(models_path).forEach(function (file) {
	require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()

// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
loadFiles(controllers_path,app, passport, auth);

// Load socket
var io = require('./config/socketio')(app,config,port);

require('./helpers/mediator')(io,subscriber,config);


console.log('Express app started on port '+port)