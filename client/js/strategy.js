define([],
function() {
	
	var defaultSpeed = 400;
	var decreaseRate = 0.7;

	// Minimum obstacle distance.
	var obstacleThreshold = 10;

	var processState = function(state) {
		
		if (state.obstacle < obstacleThreshold) {
			state = processObstacle(state);
		} else {
			state = processLine(state);
		}
		
		return state;
	};

	var processObstacle = function(state) {
		return state;
	}

	var processLine = function(state) {
		switch(state.line) {
			case -1 : state.motors[0] *= decreaseRate; break;
			case 0 : state.motors[0] = defaultSpeed;
				 state.motors[1] = defaultSpeed;
				 break;
			case 1 : state.motors[1] *= decreaseRate; break;
		}
		
		return state;
	}
	
	return {processState: processState};
});
