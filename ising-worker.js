var p;
var B = 0;
var J = 1;
var mu = 1;
var k = 1;
var T = 1;//2*J/k; //Tc = 2*J/k
var iterations_per_frame;
var state_width, state_height;
var Mnet = 0;
var N;

function log(message) {
	postMessage({"status": "log", "message": message});
}

var initial_states = {
	"warm": function(i, j) {
		return (Math.random() > 0.5) ? 1 : -1;
	},
	
	"cold_up": function(i, j) {
		return 1;
	},
	
	"cold_down": function(i, j) {
		return -1;
	},
	
	"hot": function(i, j) {
		var v = (i % 2) ? 1 : -1;
		v *= (j % 2) ? 1 : -1;
		return v;
	}
}

onmessage = function(event) {
	if (event.data.command == "init") {
		N = event.data.x*event.data.y;
		Mnet = 0;
		
		state_width = event.data.x;
		state_height = event.data.y;
		
		state = new Array(state_width);
		for (var i = 0; i < state_width; i++) state[i] = new Array(state_height);
		
		initial = event.data.initial_state;
		
		//Random start
		for (var i = 0; i < state_width; i++) {
			for (var j = 0; j < state_height; j++) {
				state[i][j] = initial_states[initial](i,j);
				Mnet += state[i][j];
			}
		}
		postMessage({"status": "init_complete", "state": state, "Mnet": Mnet});
	} else if (event.data.command == "step") {

		T = 2*J*Math.pow(10, event.data.temperature/2)/k;
		B = event.data.Bfield;
		iterations_per_frame = 2*N/(51-5*event.data.num_trials);
		log(iterations_per_frame);
		log(N/5);
		
		for (var n = 0; n < iterations_per_frame; n++) {

			var i = Math.round(Math.random()*(state_width-1));
			var j = Math.round(Math.random()*(state_height-1));
			
			var ip = i+1, jp = j+1, im = i-1, jm = j-1;
			if (ip == state_width) ip = 0;
			if (jp == state_height) jp = 0;
			if (im == -1) im = state_width-1;
			if (jm == -1) jm = state_height-1;
			
			var dE = (J*(state[i][jp] + state[ip][j] + state[im][j] + state[i][jm]) + B*mu) * 2;
			if (state[i][j] > 0) dE *= -1;

			var prob = Math.exp(dE/(k*T));
			if (prob >= Math.random()) {
				Mnet -= 2*state[i][j];
				state[i][j] *= -1;
			}
		}
		postMessage({"status": "step_complete", "state": state, "Mnet": Mnet});
	}
}
