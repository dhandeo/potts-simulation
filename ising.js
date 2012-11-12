// Event functions by John Resig
function addEvent(obj, type, fn) {
	if (obj.attachEvent) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn](window.event); }
		obj.attachEvent("on"+type, obj[type+fn]);
	} else {
		obj.addEventListener(type, fn, false);
	}
}
function removeEvent(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent("on"+type, obj[type+fn]);
		obj[type+fn] = null;
	} else {
		obj.removeEventListener(type, fn, false);
	}
} 



function Control(params) {
	var _this = this;
	var _horiz;
	var _action;
	var _enabled;
	
	var _hover = function() {
		_this.obj.style.backgroundPosition = _horiz+"px -"+_this.obj.offsetHeight*1+"px";
	};
	var _unhover = function() {
		_this.obj.style.backgroundPosition = _horiz+"px 0";
	};
	
	this.enable = function() {
		if (!_enabled) {
			addEvent(_this.obj, "mouseover", _hover);
			addEvent(_this.obj, "mouseout", _unhover);
			addEvent(_this.obj, "click", _action);
		}
		_this.obj.style.backgroundPosition = _horiz+"px 0";
		_enabled = true;
	};
	this.disable = function() {
		if (_enabled) {
			removeEvent(_this.obj, "mouseover", _hover);
			removeEvent(_this.obj, "mouseout", _unhover);
			removeEvent(_this.obj, "click", _action);
		}
		_this.obj.style.backgroundPosition = _horiz+"px -"+_this.obj.offsetHeight*2+"px";
		_enabled = false;
	};
	
	this.obj = document.getElementById(params["id"]);
	
	_horiz = parseInt(this.obj.style.backgroundPosition.split(" ", 1)) || 0;
	_action = params["action"] || function() {};
	
	var enable = ("enabled" in params) ? params["enabled"] : true;
	(enable) ? this.enable() : this.disable();
} 



var Slider = function(params) {
	var _obj, _value, _min, _max, _numSteps, _stepSize, _width, _enabled, _dragStartPos, _onmouseupCallback, _onmousedownCallback, _onmousemoveCallback, _dragging;
	var _this = this;
	
	function mouseXCoord(event){
		return (event.pageX) ? event.pageX : event.clientX + document.body.scrollLeft;
	}
	
	this.getValue = function() {
		return _value;
	};
	this.setValue = function(value) {
		if (_numSteps) value = _stepSize*Math.round((value-_min)/_stepSize) + _min;
		if (value > _max || value < _min) value = _min;
		_value = value;
		var pos = (value - _min)*_width/(_max-_min);
		_obj.style.left = pos+"px";
	};
	this.step = function(by) {
		if (!by) by = 1;
		if (_numSteps) this.setValue(this.getValue() + by*_stepSize);
	};
	
	var _onmousedown = function(event) {
		_dragStartPos = mouseXCoord(event) - parseInt(_obj.style.left);
		addEvent(document, "mouseup", _onmouseup);
		addEvent(document, "mousemove", _onmousemove);
		removeEvent(_obj, "mouseout", _unhover);
		_onmousedownCallback(_this.getValue());
		event.preventDefault();
	};
	var _onmousemove = function(event) {
		var pos = mouseXCoord(event) - _dragStartPos;
		if (pos < 0) pos = 0;
		else if (pos > _width) pos = _width;
		
		var oldval = _this.getValue();
		_this.setValue((_max-_min)*pos/_width + _min);
		
		if (_this.getValue() != oldval) _onmousemoveCallback(_this.getValue());
	};
	var _onmouseup = function() {
		removeEvent(document, "mouseup", _onmouseup);
		removeEvent(document, "mousemove", _onmousemove);
		_obj.style.backgroundPosition = "0 0";
		addEvent(_obj, "mouseout", _unhover);
		_onmouseupCallback(_this.getValue());
	};
	var _hover = function() {
		_obj.style.backgroundPosition = "0 -"+_obj.offsetHeight*1+"px";
	};
	var _unhover = function() {
		_obj.style.backgroundPosition = "0 0";
	};
	
	this.enable = function() {
		if (!_enabled) {
			addEvent(_obj, "mousedown", _onmousedown);
			_enabled = true;
		}
		_obj.style.backgroundPosition = "0 0";
		addEvent(_obj, "mouseover", _hover);
		addEvent(_obj, "mouseout", _unhover);
	};
	this.disable = function() {
		if (_enabled) {
			removeEvent(_obj, "mousedown", _onmousedown);
			removeEvent(_obj, "mouseover", _hover);
			_enabled = false;
		}
		_obj.style.backgroundPosition = "0 -"+_obj.offsetHeight*2+"px";
	};
	
	this.setValueInfo = function(min, max, numSteps, defaultVal) {
		_min = min;
		_max = max;
		_numSteps = numSteps || 0;
		if (_numSteps) _stepSize = (_max-_min)/(_numSteps-1);
		if (defaultVal < _min) defaultVal = _min;
		this.setValue(defaultVal);
	}
	
	_obj = document.getElementById(params["id"]);
	_width = _obj.parentNode.offsetWidth;
	_onmouseupCallback = ("onmouseupCallback" in params) ? params["onmouseupCallback"] : function() {};
	_onmousedownCallback = ("onmousedownCallback" in params) ? params["onmousedownCallback"] : function() {};
	_onmousemoveCallback = ("onmousemoveCallback" in params) ? params["onmousemoveCallback"] : function() {};
	this.setValueInfo(params["min"], params["max"], params["numSteps"], ("default" in params) ? params["default"] : params["min"]);
	
	var enable = ("enabled" in params) ? params["enabled"] : true;
	(enable) ? this.enable() : this.disable();
} 



function Tooltip(params) {
	var _this = this;

	var _obj = document.getElementById(params["id"]);
	var _message = params["message"];
	var _shown = false;
	var _timer;
	
	var show = function() {
		Tooltip.popup.firstChild.nodeValue = _message;
		var pos = Tooltip.findPos(_obj);
		var y = pos.y + _obj.offsetHeight + 10;
		Tooltip.popup.style.top = y + "px";
		var x = pos.x - Tooltip.popup.offsetWidth/2 + _obj.offsetWidth/2;
		if (x < 0) x = 0;
		if (x + Tooltip.popup.offsetWidth > window.innerWidth) x = window.innerWidth- Tooltip.popup.offsetWidth;
		Tooltip.popup.style.left = x + "px";
		Tooltip.popup.style.visibility = "visible";
		Tooltip.topPointer.style.left = (pos.x-x + _obj.offsetWidth/2) + "px";
		_shown = true;
	}
	
	addEvent(_obj, "mouseover", function() {
		if (!_shown && Tooltip.enabled) {
			_timer = setTimeout(show, 1000);
		}
	});
	
	addEvent(_obj, "mouseout", function() {
		clearTimeout(_timer);
		Tooltip.popup.style.visibility = "hidden";
		_shown = false;
	});
} 

Tooltip.popup = document.createElement("div");
Tooltip.popup.className = "tooltip";
Tooltip.popup.appendChild(document.createTextNode(""));
Tooltip.topPointer = document.createElement("div");
Tooltip.topPointer.className = "pointer top";
Tooltip.popup.appendChild(Tooltip.topPointer);
document.body.appendChild(Tooltip.popup);

Tooltip.findPos = function(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return {"x": curleft, "y": curtop};
}

Tooltip.enabled = true;


(function() {

/*?
include Slider.js,Control.js,Tooltip.js
?*/
	
function prePlot() {

}

//draw after plotting
function postPlot() {
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000";
	ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
	
	ctx.beginPath();
	ctx.moveTo(canvas.width-13, canvas.height/2);
	ctx.lineTo(canvas.width-1, canvas.height/2);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(canvas.width-13, 1);
	ctx.lineTo(canvas.width-13, canvas.height-1);
	ctx.stroke();
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function showMessage(message, minWidth) {
	clear();
	
	var fontSize = 15;
	ctx.font = fontSize+"px Helvetica";
	
	var lines = message.split("\n");
	var w = minWidth || 0;
	for (var i = 0; i < lines.length; i++) {
		var nw = ctx.measureText(lines[i]).width;
		if (nw > w) w = nw;
	}
	
	var h = (fontSize+3)*lines.length;
	var hpad = 30;
	w += 50;
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#aaa";
	ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);

	ctx.fillStyle = "rgba(240, 240, 255, 1)";
	ctx.strokeStyle = "#aac";
	ctx.fillRect((canvas.width-w)/2, (canvas.height-h-hpad)/2, w, h+hpad);
	ctx.strokeRect((canvas.width-w)/2, (canvas.height-h-hpad)/2, w, h+hpad);

	ctx.fillStyle = "#000";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (var i = 0; i < lines.length; i++) {
		ctx.fillText(lines[i], canvas.width/2, (canvas.height-h)/2 + (i+0.5)*(fontSize+3));
	}
}

var speed = 4;
var delay = 128;
var playing = false;
var timeout;
var state, Mnet;
function plot() {
	if (!state) return;

	draw();
	
	if (playing) timeout = setTimeout(step, delay);
}

function draw() {
	if (!started) return;
	
	var palette = palette_obj.value;
	clear();
	prePlot();
	var state_width = state.length, state_height = state[0].length;
	
	var cs = colors[palette];
	var scalew = state_width/cwidth, scaleh = state_height/cheight;
	for (var i = 0; i < cwidth; i++) {
		for (var j = 0; j < cheight; j++) {
			var k = (i + j*cwidth) * 4; //some sort of correspondence array that saves the results of these 3 lines may speed things up...
			var x = Math.floor(i*scalew);
			var y = Math.floor(j*scaleh);
			var c = (state[x][y] > 0) ? cs[0] : cs[1];
			imageData.data[k] = c[0];    //red
			imageData.data[k+1] = c[1];  //greed
			imageData.data[k+2] = c[2];  //blue
		}
	}
	
	ctx.putImageData(imageData, 2, 2);

	
	Mavg = Mnet/(2*state_width*state_height);
	var c = (Mavg >= 0) ? colors[palette][0] : colors[palette][1];

	ctx.fillStyle = "rgba("+c[0]+", "+c[1]+", "+c[2]+", 1)";
	ctx.fillRect(canvas.width-12, canvas.height/2, 12, -(canvas.height-2)*Mavg);
	
	postPlot();
	
}

function play() {
	playing = true;
	stepButton.disabled = true;
	controlPlay.obj.style.display = "none";
	controlPause.obj.style.display = "block";
	step();
}

function pause() {
	playing = false;
	stepButton.disabled = false;
	controlPause.obj.style.display = "none";
	controlPlay.obj.style.display = "block";
	window.clearTimeout(timeout);
}

function slower() {
	if (speed > 0) speed--;
	updateDelay();
}

function faster() {
	if (speed < 8) speed++;
	updateDelay();
}

function updateDelay() {
	delay = 8;
	for (var i = 0; i < 8-speed; i++) delay *= 2;
	document.getElementById("speed").innerHTML = (speed < 4) ? "1/"+(5-speed)+"x" : (speed-3)+"x";
}

function step() {
	worker.postMessage({"command": "step", "temperature": opt_sliders["temperature"].getValue(), "Bfield": opt_sliders["Bfield"].getValue(), "num_trials": opt_sliders["num_trials"].getValue()});
}

var started = false;
function init() {
	started = true;
	pause();
	var res = Math.round(opt_sliders["resolution"].getValue());
	worker.postMessage({"command": "init", "x": res, "y": res, "initial_state": document.getElementById("initial_state").value});
	startButton.value = "Restart";
}

var controlPlay = new Control({"id": "control_play", "enabled": false, "action": play});
var controlPause = new Control({"id": "control_pause", "enabled": false, "action": pause});
new Control({"id": "control_slower", "action": slower});
new Control({"id": "control_faster", "action": faster});
var stepButton = document.getElementById("step_button");
stepButton.disabled = true;
addEvent(stepButton, "click", step);


var opt_sliders = {};
opt_sliders["temperature"] = new Slider({"id": "temperature", "min": -5, "max": 5, "numSteps": 21, "default": -1});
opt_sliders["Bfield"] = new Slider({"id": "Bfield", "min": -5, "max": 5, "numSteps": 21, "default": 0});
opt_sliders["num_trials"] = new Slider({"id": "num_trials", "min": 0, "max": 10, "numSteps": 21, "default": 5});
opt_sliders["resolution"] = new Slider({"id": "resolution", "min": 50, "max": 500, "numSteps": 19, "default": 250});

var colors = {
	"slytherin": [[220, 220, 220], [0, 65, 1]],
	"gryffindor": [[243, 159, 0], [196, 0, 1]],
	"hufflepuff": [[30, 30, 30], [255, 243, 0]],
	"ravenclaw": [[0, 0, 160], [126, 72, 48]],
	"superman": [[230, 0, 0], [0, 0, 230]],
	"megaman": [[144, 158, 203], [31, 57, 104]],
	"xmen": [[255, 255, 0], [0, 0, 230]],
	"greyscale": [[220, 220, 220], [30, 30, 30]],
	"hulk": [[0, 0, 230], [0, 230, 0]],
	"camo": [[77, 77, 43], [237, 197, 148]],
	"pencil": [[198, 75, 93], [60, 60, 60]],
	"batman": [[0, 0, 230], [30, 30, 30]],
	"ironman": [[130, 0, 0], [148, 141, 66]]
}
var palette_obj = document.getElementById("palette");
for (var x in colors) {
	var opt = document.createElement("option");
	opt.innerHTML = x;
	opt.value = x;
	palette_obj.appendChild(opt);
}
addEvent(palette_obj, "change", draw);

var show_hints = document.getElementById("show_hints");
show_hints.checked = true;
addEvent(show_hints, "change",
	function() {
		if (show_hints.checked) Tooltip.enabled = true;
		else Tooltip.enabled = false;
	}
);


new Tooltip({"id": "temperature_tooltip", "message": "The temperature of the system. The line marked in the center is the Curie temperature. Below this temperature, the system becomes ferromagnetic. Without an applied magnetic field, domains of differing spin form."});
new Tooltip({"id": "magnetic_field_tooltip", "message": "The external magnetic field applied to the system. The individual spins tend to align themselve in the direction of the external field."});
new Tooltip({"id": "color_palette_tooltip", "message": "Change the colors for the different spins."});
new Tooltip({"id": "trials_per_frame_tooltip", "message": "This is the number of trial spins that are chosen for each frame. Increasing this makes the animation progress faster but increases processing time accordingly."});
new Tooltip({"id": "resolution_tooltip", "message": "This controls the total number of spins. Higher resolution makes a nicer picture but increases computation time drastically."});
new Tooltip({"id": "initial_state_tooltip", "message": "The initial configuration of the spins. Warm means the spins are randomly chosen. Cold means they all point one way. These are minimum energy configurations Hot means the spins are chosen so they every neighbor has the opposite spin. This is the highest energy configuration."});




var canvas = document.getElementById("canvas");
var cwidth = canvas.width-4-12, cheight = canvas.height-4;

var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(cwidth, cheight);
for (var i = 0, imax = cwidth; i < imax; i++) {
	for (var j = 0, jmax = cheight; j < jmax; j++) {
		var k = (i + j*cwidth) * 4;
		imageData.data[k+3] = 256;
	}
}

var worker = new Worker("ising-worker.js");
worker.onmessage = function(event) {
	if (event.data.status == "init_complete") {
		controlPlay.enable();
		controlPause.enable();
		stepButton.disabled = false;
	}
	if (event.data.status == "init_complete" || event.data.status == "step_complete") {
		state = event.data.state;
		Mnet = event.data.Mnet;
		plot();
	} else if (event.data.status == "log") {
		if ("console" in window) console.log(event.data.message);
	}
}

var startButton = document.getElementById("start_button");
addEvent(startButton, "click", init);


showMessage("To begin, press the Start button\n on the right and then press play below.");

})();