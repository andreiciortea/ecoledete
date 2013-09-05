define(['model/VirtualJoystick', 'jquery', 'jquery-ui'], 
function(VirtualJoystick) {

	console.log("Virtual Joystick View Init");

	var VirtualJoystickView = function(ws) {
		var server = ws;
		var joystickSensitivity = 1;
		/* Create sensitivity slider */
		$('#joystickSensitivitySlider').slider({
			step    : 0.2,
			min     : 0.2,
			max     : 3,
			slide   : function(event, ui){
				    joystickSensitivity = $(this).slider('value');
				    $('#joystickSensitivityValue').text('x' + joystickSensitivity);
				},
			value: 1                
		});

		var leftMotorPrevSpeed = 0;
		var rightMotorPrevSpeed = 0;
		var requester = null;
		var requesterRate = 250;
		var joystick = new VirtualJoystick({
			container    : document.getElementById('joystickControlArea'),
			mouseSupport : true
		});

		/* Send commands from joystick */
		$('#joystickControlArea')
		.mousedown(function(){
		    joystickRequester();
		    requester = setInterval(joystickRequester, requesterRate);
		})
		.mouseup(function(){
		    joystickControl(0, 0); // Stop motor on mouse up
		    clearInterval(requester);
		})	
		.on({'touchstart': function(){
		    joystickRequester();
		    requester = setInterval(joystickRequester, requesterRate);
		}})
		.on({'touchend': function(){
		    joystickControl(0, 0); // Stop motor on mouse up
		    clearInterval(requester);
		}});

		function joystickRequester() {
	    
		    var x = joystick.deltaX();
		    var y = joystick.deltaY();
		    $('#axesValues').text('X: ' + x +', Y: ' + y);
		    if (ws != null && ws.readyState == 1)
			joystickControl(x, y); 
		}

		function joystickControl(x, y) {
			var motorsSpeed = convertAxesValues(x, y);

			if (leftMotorPrevSpeed != motorsSpeed[0] && rightMotorPrevSpeed != motorsSpeed[1]) {
			leftMotorPrevSpeed = motorsSpeed[0];
			rightMotorPrevSpeed = motorsSpeed[1];
				  
			server.sendCommand(
			    { motor_command: [
				    {name: "right", action: "start", speed: motorsSpeed[0]},
				    {name: "left", action: "start", speed: motorsSpeed[1]}                    
				]
			    }
			);        
			}    
		}

		function convertAxesValues(x, y)
		{
	    	    var leftMotor, rightMotor;
		    if(x <= 0)
		    {
			leftMotor = y+x;
			rightMotor = y;
		    }else{
			rightMotor = -x+y;
			leftMotor = y;
		    }
		    
		    return [Math.round(rightMotor*joystickSensitivity), Math.round(leftMotor*joystickSensitivity)];
		}
	};


	

	return VirtualJoystickView;
});
