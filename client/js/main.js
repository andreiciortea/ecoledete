require.config({
	baseUrl: "./js",
	paths: {
		"jquery":	"lib/jquery",
		"jquery-ui":	"lib/jquery-ui.min",
		"bootstrap":	"lib/bootstrap.min",
		"raphael":	"lib/raphael"
	},
	shim: {
		"bootstrap": {
			deps: ["jquery"],
			exports: "$.fn.popover"
		},
		'jquery-ui': {
			export: "$",
			deps: ['jquery'],
		}
	}
});

require(['server', 'dataProcessing', 'view/VirtualJoystickView', 'jquery', 'jquery-ui'], 
function(Server, DataManager, VirtualJoystickView) {
	console.log("Init Client App");
	
	$('#server-state').html('Disconnected');

	var dataManager = new DataManager();
	var server = new Server(dataManager.dataProcessing);
	dataManager.setServer(server);
	
	var joystickView = new VirtualJoystickView(server);
	
	
	$("#stop").on("click", function() {
		console.log("STOP !");
		var cmd = { motor_command: [
					    {name: "both", action: "block", speed: 0}                   
					]
				};
				
				server.sendCommand(
					cmd
		    		);
		server.ws.close();
	});
});
