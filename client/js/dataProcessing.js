define(['jquery'], 
function() {
	var dataProcessing = function(data) {
		console.log('Receive Data');
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
	};

	var proccessColorSensor = function(value) {
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
			$('#direction').attr('value', 1);
		} else if ($('#right-line').val() == result) {
			$('#lineDetection').text('Right line detected : turn left !!');
			$('#direction').attr('value', -1);
		} else{
			$('#lineDetection').text('Nothing detected...');
			$('#direction').attr('value', 0);
		}
	}	
	
	function proccessUltrasonicSensor(value) {
	    value = (value > 190) ? '??' : value;
	    $('#ultrasonicSensorValue').text(value+' cm');   
	    $('#obstacle').attr('value', value); 
	}
	
	return dataProcessing;
});
