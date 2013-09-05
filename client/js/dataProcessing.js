define([ 'model/RobotState', 'strategy','jquery'], 
function(robotState, strategy) {
	
	var self;
	var minThreshold = 130;
	var maxThreshold = 150;
		
	var DataManager = function() {
		self = this;
		this.server = undefined;
		this.state = robotState;
		this.strategy = strategy;
		this.process = false;
	}
	
	DataManager.prototype.setServer = function(server) {
		console.log("Server is registering to DataManager");
		self.server = server;
	}
	
	DataManager.prototype.dataProcessing = function(data) {		
		if(data.status=="connected") {
			console.log("Init sensor request");
			
			setInterval (sensorQuery , 500 );
		}
		
		var i = 0;
		while (data.sensor_response[i]) {
		    	switch (data.sensor_response[i].name) {
		    		case "color"        : proccessColorSensor(data.sensor_response[i].value);
                    		break;
                    		case "ultrasonic"   : proccessUltrasonicSensor(data.sensor_response[i].value);
                    		break;
		    	}
		    	++i;
            	}
            	
            	if(self.process) {
            		self.process = false;
            		self.state = self.strategy.processState(self.state);
            		console.log(self.state);
            		var cmd = { motor_command: [
					    {name: "right", action: "start", speed: Math.round(self.state.motors[0])},
					    {name: "left", action: "start", speed: Math.round(self.state.motors[1])}                    
					]
				};
            		//*
            		if(self.state.motors[0] != self.state.previousMotors[0] ||
            		self.state.motors[1] != self.state.previousMotors[1]) {
		    		console.log(cmd);
		    		self.state.previousMotors[0] = self.state.motors[0];
		    		self.state.previousMotors[0] = self.state.motors[0];
		    		self.server.sendCommand(
					cmd
		    		);
		    	}//*/
            	}
	};

	var sensorQuery = function() {
		if(self.server == undefined) {
			console.log("error : server is not register in dataManager");
		} else {
		
			self.server.sendCommand(
				{
					sensor_request :		
					[
					    {
						name : "color",
						port : 3
					    },
					    {
						name : "ultrasonic",
						port : 1
					    }
					]		
				}
			);
		}
	}
	
	var proccessColorSensor = function(value) {
		console.log(value);
		var result = "";
		
		if(value.r > maxThreshold && value.g < minThreshold && value.b < minThreshold) {
			result = 'red';
		} else if(value.g > maxThreshold && value.r < minThreshold && value.b < minThreshold) {
			result = 'green';
		} else if(value.b > maxThreshold && value.g < minThreshold && value.r < minThreshold) {
			result = 'blue';
		} else {
			result = 'white';
		}
		
		if($('#left-line').val() == result) {
			$('#lineDetection').text('Left line detected : turn right !!');
			$('#direction').attr('value', -1);
	    		self.state.line = -1;
		} else if ($('#right-line').val() == result) {
			$('#lineDetection').text('Right line detected : turn left !!');
			$('#direction').attr('value', 1);
	    		self.state.line = 1;
		} else{
			$('#lineDetection').text('Nothing detected...');
			$('#direction').attr('value', 0);
	    		self.state.line = 0;
		}
		self.process = true;
	}	
	
	function proccessUltrasonicSensor(value) {
	    self.state.distance = value;
	    value = (value > 190) ? '??' : value;
	    $('#ultrasonicSensorValue').text(value+' cm');   
	    $('#obstacle').attr('value', value); 
	    self.process = true;
	}
	
	return DataManager;
});
