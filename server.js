var env = process.env.NODE_ENV || 'development' 
	, config = require('./config/config')[env]
	, port = process.env.PORT || 3000
	, express = require('express')
	, fs = require('fs')
	, mongoose = require('mongoose')
	, stylus = require("stylus")
	, i18n = require("i18n")
	, nib = require("nib")
	, helpers = require('./lib/view')
	, models_path = __dirname + '/app/models'
	, controllers_path = __dirname + '/app/controllers'
	, app = express();

mongoose.connect(config.db)

fs.readdirSync(models_path).forEach(function (file) {
	require(models_path+'/'+file)
})

i18n.configure({
	locales: config.locales
});

app.locals({
	__: i18n.__,
	__n: i18n.__n
})

app.set('showStackError', true)

app.use(express.compress({
		filter: function (req, res) {
			console.log(res.getHeader('Content-Type'));
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}))
	.use(i18n.init)
	.use(stylus.middleware({
		src: config.root + '/public',
		compile: function(str,path) { return stylus(str).set('filename',path).use(nib()).set('compress', true); }
	}))
	.use(express.static(config.root + '/public', { maxAge : config.staticMaxAge }))
	.use(express.logger('dev'))
	.set('views', config.root + '/app/views')
	.set('view engine', 'jade')
	.use(helpers(config,i18n))
	.use(express.cookieParser())
	.use(express.bodyParser())
	.use(express.methodOverride())
	.use(express.favicon())
	.use(app.router)
	.use(function(err, req, res, next){
		if (~err.message.indexOf('not found')) return next()
		console.error(err.stack)
		res.status(500).render('500', { error: err.stack, pageName: '500' })
	})
	.use(function(req, res, next){
		res.status(404).render('404', { url: req.originalUrl, pageName: '404' })
	})

fs.readdirSync(controllers_path).forEach(function (file) {
	require(controllers_path+'/'+file)(app)
});


app.listen(port);

console.log('Express app started on port '+port)

