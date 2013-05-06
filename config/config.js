module.exports = {
	development: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/folio'
		, app: {
			name: 'Folio - My portfolio'
			, baseURL: "folio.dev:3000"
		}
	}
	, test: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/folio'
		, app: {
			name: 'Folio - Social Blogger'
			, baseURL: "folio.dev:3000"
		}
	}
	, production: {
		locales:['br', 'pt', 'en' ]
		, staticMaxAge: 0
		, root: require('path').normalize(__dirname + '/..')
		, db: 'mongodb://localhost/folio'
		, app: {
			name: 'Folio - Social Blogger'
			, baseURL: "folio.dev:3000"
		}
	}
}
