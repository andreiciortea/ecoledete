define([],
function() {
	
	var defaultSpeed = 75;
	var decreaseRate = 0.1;
	var maxSpeed = 250; 

	// Minimum obstacle distance.
	var obstacleThreshold = 10;

	var processState = function(state) {
		
		/*if (state.obstacle < obstacleThreshold) {
			state = processObstacle(state);
		} else {*/
			state = processLine(state);
		//}
		
		return state;
	};

	var processObstacle = function(state) {
		return state;
	}

	var processLine = function(state) {
		switch(state.line) {
			case -1 :
				state.motors[0] = 0; 
				//state.motors[0] *= decreaseRate; 
				//state.motors[1] /= decreaseRate; 
			 if(state.motors[1] > maxSpeed) { state.motors[1] = maxSpeed;}   
			break;
			case 0 : state.motors[0] = defaultSpeed;
				 state.motors[1] = defaultSpeed;
				 break;
			case 1 :state.motors[1] = 0; 
				//state.motors[1] *= decreaseRate; 
			 //state.motors[0] /= decreaseRate;  
			 if(state.motors[0] > maxSpeed) { state.motors[0] = maxSpeed;}
			break;
		}
		
		return state;
	}
	
	return {processState: processState};
});
