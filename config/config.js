module.exports = {
	development: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/noder'
		, pubhub: "http://pubsubhubbub.appspot.com"
		, app: {
			name: 'Folio - My portfolio'
			, baseURL: "folio.dev:3000"
			, key: "express.sid"
			, secret: "noderblogger"
			, session: null
		}
		, superfeedr: {
			user: "brunoqs"
			, password: "b1r2u3n4"
		}
		, facebook: {
			clientID: "486133094757475"
			, clientSecret: "fa587fbedb18b7ec1866f96a7f41f967"
			, callbackURL: "http://noder.app.com:3000/auth/facebook/callback"
		}
		, twitter: {
			clientID: "LdKuAiI17qNpC2SLNsXEbA"
			, clientSecret: "vs3eqg7BJO0bMRds6UXisqaKLddRNTwmO42VUEY4GI4"
			, callbackURL: "http://noder.app.com:3000/auth/twitter/callback"
		}
		, google: {
			clientID: "901779458674.apps.googleusercontent.com"
			, clientSecret: "FFVQOLl2CD9P59hxomUj5du2"
			, callbackURL: "http://noder.app.com:3000/auth/google/callback"
		}
	}
	, test: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/noder'
		, pubhub: "http://pubsubhubbub.appspot.com"
		, app: {
			name: 'Folio - Social Blogger'
			, baseURL: "folio.dev:3000"
			, key: "express.sid"
			, secret: "noderblogger"
			, session: null
		}
		, superfeedr: {
			user: "brunoqs"
			, password: "b1r2u3n4"
		}
		, facebook: {
			clientID: "486133094757475"
			, clientSecret: "fa587fbedb18b7ec1866f96a7f41f967"
			, callbackURL: "http://noder.app.com:3000/auth/facebook/callback"
		}
		, twitter: {
			clientID: "LdKuAiI17qNpC2SLNsXEbA"
			, clientSecret: "vs3eqg7BJO0bMRds6UXisqaKLddRNTwmO42VUEY4GI4"
			, callbackURL: "http://noder.app.com:3000/auth/twitter/callback"
		}
		, google: {
			clientID: "901779458674.apps.googleusercontent.com"
			, clientSecret: "FFVQOLl2CD9P59hxomUj5du2"
			, callbackURL: "http://noder.app.com:3000/auth/google/callback"
		}
	}
	, production: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/noder'
		, pubhub: "http://pubsubhubbub.appspot.com"
		, app: {
			name: 'Folio - Social Blogger'
			, baseURL: "folio.dev:3000"
			, key: "express.sid"
			, secret: "noderblogger"
			, session: null
		}
		, superfeedr: {
			user: "brunoqs"
			, password: "b1r2u3n4"
		}
		, facebook: {
			clientID: "486133094757475"
			, clientSecret: "fa587fbedb18b7ec1866f96a7f41f967"
			, callbackURL: "http://noder.app.com:3000/auth/facebook/callback"
		}
		, twitter: {
			clientID: "LdKuAiI17qNpC2SLNsXEbA"
			, clientSecret: "vs3eqg7BJO0bMRds6UXisqaKLddRNTwmO42VUEY4GI4"
			, callbackURL: "http://noder.app.com:3000/auth/twitter/callback"
		}
		, google: {
			clientID: "901779458674.apps.googleusercontent.com"
			, clientSecret: "FFVQOLl2CD9P59hxomUj5du2"
			, callbackURL: "http://noder.app.com:3000/auth/google/callback"
		}
	}
}
