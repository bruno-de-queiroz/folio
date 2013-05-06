var moment = require("moment")
	, pluralize = require("./pluralize")
	, helpers = {
		capitalize : function(str){
			return str.charAt(0).toUpperCase() + str.substr(1,str.length-1)
		}
		, pluralize: pluralize
		, locale: "en"
		, random: function(array){
			return array[Math.floor(Math.random()*array.length)];
		}
		, stripScript: function(str) {
			return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
		}
		, setLocale : function(value) {
			locale = value;
				moment.lang(locale);
		}
		, getLocale : function() {
			return locale;
		}
		, floatToMoney : function(num) {
			x = 0;
			if(num<0){
				num = Math.abs(num);
				x = 1;
			}
			if(isNaN(num)) num = "0";
			cents = Math.floor((num*100+0.5)%100);
			num = Math.floor((num*100+0.5)/100).toString();
			if(cents < 10) cents = "0" + cents;
			for(var i = 0; i < Math.floor((num.length-(1+i))/3); i++) num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
			ret = num + ',' + cents;
			if (x == 1) ret = ' - ' + ret;
			return ret;
		}
		, moneyToFloat : function(str) {
			return parseFloat(str.replace(/\./gm,'').replace(',','.'));
		}
		, removeSpecialChars : function(value){
			var blackList = 'áàãâäéèêëíìîïóòõôöúùûüç',
			whiteList = 'aaaaaeeeeiiiiooooouuuuc',
			result = '';
			for (var i=0; i < value.length;i++) {
				if (blackList.indexOf(value.charAt(i))!=-1) {
					result += whiteList.substr(blackList.search(value.substr(i,1)),1);
				} else {
					result += value.substr(i,1);
				}
			}
			return result;
		}
		, dateFormat: function(date){
			return moment(date).fromNow();
		}
	}

module.exports = helpers;