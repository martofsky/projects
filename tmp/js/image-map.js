// create imagemaps
function initImageMaps() {
	var imageList = document.getElementsByTagName('img');
	for(var i = 0; i < imageList.length; i++) {
		if(imageList[i].getAttribute('usemap')) {
			new ImageMap({
				image: imageList[i]
			})
		}
	}
}

// image map module
function ImageMap(opt) {
	this.options = {
		delay: 50,
		image: null,
		hoverClass:'activestate'
	}
	for(var p in opt) {
		if(opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
ImageMap.prototype = {
	init: function() {
		if(typeof this.options.image === 'object') {
			this.getElements();
			this.addHandlers();
		}
	},
	getElements: function() {
		this.mapId = this.options.image.getAttribute('usemap');
		this.mapId = this.mapId.substring(1);
		this.map = document.getElementById(this.mapId);
		if(this.map) {
			this.areas = this.map.getElementsByTagName('area');
		}
	},
	addHandlers: function() {
		if(this.areas) {
			for(var i = 0; i < this.areas.length; i++) {
				(function(inst){
					var timer;
					var area = inst.areas[i];
					var node = document.getElementById(inst.areas[i].alt);
					if(node) {
						area.onmouseover = function() {
							clearTimeout(timer);
							timer = setTimeout(function(){
								inst.addClass(node, inst.options.hoverClass);
							},inst.options.delay)
						}
						area.onmouseout = function() {
							clearTimeout(timer);
							timer = setTimeout(function(){
								inst.removeClass(node, inst.options.hoverClass);
							},inst.options.delay)
						}
						node.onmouseover = function() {
							clearTimeout(timer);
						}
						node.onmouseout = function() {
							clearTimeout(timer);
							timer = setTimeout(function(){
								inst.removeClass(node, inst.options.hoverClass);
							},inst.options.delay)
						}
					}
				})(this);
			}
		}
	},
	hasClass: function(el,cls) {
		return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	},
	addClass: function(el,cls) {
		if (!this.hasClass(el,cls)) el.className += " "+cls;
	},
	removeClass: function(el,cls) {
		if (this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
}

if (window.addEventListener) window.addEventListener("load", initImageMaps, false);
else if (window.attachEvent) window.attachEvent("onload", initImageMaps);