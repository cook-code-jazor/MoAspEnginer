function IClass(){}IClass.extend=function(a,b){if(a&&typeof a=="object"){for(var c in a){if(!a.hasOwnProperty(c)){continue}if(typeof a[c]=="function"){this.prototype[c]=a[c]}}return}if(typeof b!="function"){ExceptionManager.put("0x5ca","IClass.extend(...)","argument 'fn' must be a function.");return}this.prototype[a]=b;return new IFunction(b)};IClass.extend("__destruct",function(){});IClass.create=function(c,a){var d=this;var b=(function(e){return function(){d.call(this);this.__STATUS__=true;if(typeof e=="function"){this.__STATUS__=e.apply(this,arguments)!==false}}})(c);b.prototype=new d();b.extend=d.extend;b.AsPrivate=function(){this.__PRIVATE__=true;return this};if(typeof a=="function"){b.prototype.__destruct=a}return b};function IFunction(a){this.fn=a}IFunction.prototype.AsPrivate=function(){this.fn.__PRIVATE__=true};function IController(){IClass.call(this)}IController.prototype=new IClass();IController.extend=function(a,c,b){if(a&&typeof a=="object"){for(var d in a){if(!a.hasOwnProperty(d)){continue}IController.extend.call(this,d,a[d])}return}if(Mo.Config.Global.MO_ACTION_CASE_SENSITIVITY===false){a=a.toLowerCase()}if(c===true){a+="_Post_"}else{b=c}IClass.extend.call(this,a,b);return new IFunction(b)};IController.extend("assign",function(a,b){Mo.assign(a,b)});IController.extend("display",function(){Mo.display.apply(Mo,arguments)});IController.extend("fetch",function(){return Mo.fetch.apply(Mo,arguments)});IController.create=IClass.create;exports.IController=IController;exports.IClass=IClass;