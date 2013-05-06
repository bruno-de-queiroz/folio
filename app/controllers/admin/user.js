var UserController = function(app,passport,auth){

	var controller = require("../../abstracts/admin/controller")
	, _ = require('lodash')
	, Users = new controller("users",app,passport,auth);

	Users.extend({
		signin: {
			render : function (req, res) {}
		}
		, authCallback: {
			render : function (req, res, next) {
				res.redirect('/admin/users/'+req.user.id);
			}
		}
		, login : {
			mapping : "/admin/login"
			, render : function (req, res) {
				res.render('admin/users/login', {
					title: app.locals.__('Login')
					, message: req.flash('error')
					, pageName: "login"
					, providers : [ 'facebook', 'twitter' , 'google' ]
				})
			}
		}
		, signup : {
			mapping : "/admin/signup"
			, render : function (req, res) {
				var User = Users.model('User')

				res.render( 'admin/users/signup', {
					title: app.locals.__('Sign up')
					, user: new User()
					, pageName: "sign-up"
				})
			}
		}
		, logout : {
			mapping : "/admin/logout"
			, render : function (req, res) {
				req.logout()
				res.redirect('/admin/login')
			}
		}
		, session : {
			mapping : '/admin/users/session'
			, method : "post"
			, filters : [ passport.authenticate('local', {failureRedirect: '/admin/login', failureFlash: 'Invalid email or password.'}) ]
			, render : function (req, res) {
				res.redirect('/admin/articles');
			}
		}
		, update : {
			filters : [ auth.requiresLogin , auth.hasAuthorization ]
			, render : function(req, res){
				var user = Users.model('User');

				user = _.extend(req.user, req.body);


				user.save(function(err, doc) {
					if (err) {
						res.render( 'admin/users/show', {
							title: user.name
							, user: user
							, pageName: "user-setup"
							, providers : [ 'facebook', 'twitter' , 'google' ]
						})
					}
					else {
						res.redirect('/admin/articles')
					}
				})
			}
		}
		, create : {
			mapping : "/admin/users/add"
			, method : "post"
			, filters : [ ]
			, render : function (req, res) {
				var User = Users.model('User')
				, user = new User(req.body)
				, Imager = Users.lib('imager')
				, imagerConfig = Users.config('imager')
				, imager = new Imager(imagerConfig, 'S3');

				user.provider = 'local';
				imager.upload(req.files.picture, function (err, cdnUri, files) {
					if (err)
						return res.render('400')

					if (files.length)
						user.picture = { cdnUri : cdnUri, files : files }

					console.log("Saving User");
					user.save(function(err){
						if (err) {
							res.render('admin/signup', {
								title: app.locals.__('Sign up')
								, user: user
								, pageName: "sign-up"
								, errors: err.errors
							})
						}
						req.logIn(user, function(err) {
							if (err){
								console.log(err);
								return next(err);
							}
							return res.redirect('/admin/articles');
						})
					})
				}, 'user');
			}
		}
		, view  : {
			render : function (req, res) {
				var user = req.profile
				res.render( 'admin/users/show', {
					title: user.name
					, user: user
					, pageName: "user-setup"
					, providers : [ 'facebook', 'twitter' , 'google' ]
				})
			}
		}
	}).virtual([
		{
			mapping : '/auth/facebook'
			, filters : [ passport.authenticate('facebook', { scope: [ 'user_likes' ,'friends_likes', 'publish_stream' , 'email', 'user_about_me'], failureRedirect: '/admin/login' }) ]
			, action : 'signin'
		}
		, {
			mapping : '/auth/facebook/callback'
			, filters : [ passport.authenticate('facebook', { failureRedirect: '/admin/login' }) ]
			, action : 'authCallback'
		}
		, {
			mapping : '/auth/twitter'
			, filters : [ passport.authenticate('twitter', { failureRedirect: '/admin/login' }) ]
			, action : 'signin'
		}
		, {
			mapping : '/auth/twitter/callback'
			, filters : [ passport.authenticate('twitter', { failureRedirect: '/admin/login' }) ]
			, action : 'authCallback'
		}
		, {
			mapping : '/auth/google'
			, filters : [ passport.authenticate('google', { failureRedirect: '/admin/login', scope: 'https://www.google.com/m8/feeds' }) ]
			, action : 'signin'
		}
		, {
			mapping : '/auth/google/callback'
			, filters : [ passport.authenticate('google', { failureRedirect: '/admin/login', scope: 'https://www.google.com/m8/feeds' }) ]
			, action : 'authCallback'
		}
	]).apply({
		usersId : function (req, res, next, id) {
			console.log("Midwares de user");
			var User = Users.model('User')
			, Articles = Users.model('Article');

			User.findOne({ _id : id })
				.exec(function (err, user) {

					Articles.find({ user: id }, function (err, articles) {
						if (err)
							return next(err)
						user.articles = articles;
					})

					if (err) return next(err)
					if (!user) return next(new Error(app.locals.__('Failed to load User %s',id)))

					req.profile = user;

					next()
				})
		}
	}).create();
}

module.exports = UserController