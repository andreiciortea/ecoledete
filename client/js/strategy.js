define([],
function() {
	
	var defaultSpeed = 400;
	var decreaseRate = 0.7;

	var processState = function(state) {
		
		switch(line) {
			case -1 : state.motors[0] *= decreaseRate;
			case 0 : {
					state.motors[0] = defaultSpeed;
					state.motors[1] = defaultSpeed;
				}
			case 1 : state.motors[1] *= decreaseRate;
		}

		return state;
	};
	
	return {processState: processState};
});
