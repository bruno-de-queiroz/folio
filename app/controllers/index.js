var prefix = ''
, view_path = '/';

module.exports = function(app) {

	var index = function(req,res){
		res.render( 'index', {
			title: app.locals.__('Welcome')
			, pageName: "Welcome"
		})
	};

	app.get("/"+prefix,index);

}