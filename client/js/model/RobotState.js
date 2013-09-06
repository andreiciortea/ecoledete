define([], 
function() {
	var RobotState = function() {
		this.line = 0;
		this.obstacle = undefined;
		this.motors = [100,100];
		this.previousMotors = [0,0];
	}
	
	return new RobotState();
});
