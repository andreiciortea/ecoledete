define([], 
function() {
	var Server = function(incomingData) {
		var self = this;
		this.isNXTConnected = false;
		this.NXTConnectionMode = 'usb';
		this.ws = new WebSocket("ws://127.0.0.1:8080/NXTWebSocketServer/socket");
		//this.ws = {};
	    
		this.ws.onopen = function(event) {
			console.log("Connected to the websocket server");
			self.isNXTConnected = true;
			self.sendCommand({action: "connect", mode: self.NXTConnectionMode}, true);
			$('#server-state').html('Connected');
		};

		this.ws.onmessage = function(event) {
			//console.log("Incoming data : " + event.data);	// <=========
			if (event.data == 'Ok')
			    return;        
		
			ob = eval('(' + event.data + ')');
			if (!self.isNXTConnected) {
			    if ('status' in ob && ob.status == 'connected') {
				self.isNXTConnected = true;
			    }else{
				self.isNXTConnected = false;
			    }
			}
			incomingData(ob); 
		};

		this.ws.onclose = function(event) {
			console.log("Disconnected to the websocket server");
			this.isNXTConnected = false;
		};
		
		//incomingData({sensor_response:[{name:'color',value:{r:42, g:55, b:255}}]});
	}

	Server.prototype.sendCommand = function(ob, con) {
	    //console.log(ob);
	    if (this.isNXTConnected ||  con)
		this.ws.send(JSON.stringify(ob));
	    else
		console.log('Not connected to NXT');
	}
	
	return Server;
});
