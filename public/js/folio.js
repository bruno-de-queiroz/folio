var Folio = (function(window){
	var _w = window
		,_d = window.document
		,_b = $("body")
		,_Folio = {}
		, _overLoad = function(options,arguments){
			var args = [];

			for(var i=0,j=arguments.length;i<j;i++)
				args.push(arguments[i].constructor.toString().match(/function\s+(\w+)s*/)[1])
			
			return options[args.toString()].apply(this,arguments);
		}

	_Folio.Animator = function(){
		var _o = {
			"String,Function" : function(elements,callback) {
				this.init(elements,callback);
			},
			"String,String,Function" : function(elements,mode,callback){
				this.setMode(mode);
				this.init(elements,callback);
			}
		}
		return _overLoad.call(this,_o,arguments);
	}

	_Folio.Menu = !function(){
		var _container = _b
			, _el = _b.find("#menu ul")
			, _bindEvents = function() {
				_el.find("a").on("click",function(e){
					e.preventDefault();
					var obj = $(this)
						, parent = obj.parents("li")
						, klass = obj.attr("href").replace("#","");

					_el.find("li.active").removeClass("active");
					parent.addClass("active");
					_container.removeClass().addClass(klass);
				})
			}
			, _init = function(){
				var hash = _d.location.hash;
				if(hash === "")
					_el.find("li:first-child").addClass("active");
				else 
					_container.addClass(hash);

				_bindEvents();
			}
		_init();
	}()

	_Folio.Animator.prototype = function() {
		var _elements = null
			, _callback = null
			, _mode = "flip"
			, _events = {
				animation : "webkitAnimationEnd oanimationend msAnimationEnd animationend"
				, transition : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
			}
			, _next = function(e){
				var obj = _elements.not("."+_mode).first();

				$(e.target).unbind(_events.animation);
				
				if(obj.length != 0)
					obj.addClass(_mode).bind(_events.animation,_next);
				else
					_callback.call(this);
				
			}

		return {
			init : function(elements,callback){
				_elements = $(elements);
				_total = _elements.length;
				_callback = callback;
			}
			, setMode : function(mode){
				_mode = mode;
			}
			, start : function(){
				_elements.first().addClass(_mode).bind(_events.animation,_next);
			}
		}
	}()



	return _Folio;
})(window)

// var animator = new Folio.Animator("#work-gallery li",function(){
// 	console.log("end");
// })

// setTimeout(function(){
// 	animator.start();
// },1500);
