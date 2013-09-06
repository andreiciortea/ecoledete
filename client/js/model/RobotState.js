define([], 
function() {
	var RobotState = function() {
		this.line = 0;
		this.obstacle = undefined;
		this.motors = [0,0];
		this.previousMotors = [-1,-1];
	}
	
	return new RobotState();
});
