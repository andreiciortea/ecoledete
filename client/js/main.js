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
function(Server, dataProcessing, VirtualJoystickView) {
	console.log("Init Client App");
	
	$('#server-state').html('Disconnected');

	var server = new Server(dataProcessing);
	var joystickView = new VirtualJoystickView(server);
	
	
	console.log($('#direction').attr('value'));
});
