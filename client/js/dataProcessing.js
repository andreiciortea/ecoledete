define([ 'model/RobotState', 'strategy','jquery'], 
function(robotState, strategy) {
	
	var self;
		
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
            		//*
            		self.server.sendCommand(
				{ motor_command: [
					    {name: "right", action: "start", speed: self.state.motors[0]},
					    {name: "left", action: "start", speed: self.state.motors[1]}                    
					]
				}
            		);//*/
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
		if(value.r > 128 && value.g < 100 && value.b < 100) {
			result = 'red';
		} else if(value.g > 128 && value.r < 100 && value.b < 100) {
			result = 'green';
		} else if(value.b > 128 && value.g < 100 && value.r < 100) {
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
