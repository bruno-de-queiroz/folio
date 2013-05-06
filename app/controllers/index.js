var prefix = ''
, view_path = '/';

module.exports = function(app) {

	var index = function(req,res){
		res.render( 'frontend/index', {
			title: app.locals.__('Folio')
			, pageName: "Welcome"
		})
	};

	var admin = function(req,res){
		res.redirect('/admin/articles');
	};

	app.get("/",index);
	app.get("/admin",admin);

}