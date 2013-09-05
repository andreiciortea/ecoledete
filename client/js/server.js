define([], 
function() {
	var Server = function(incomingData) {
		this.isNXTConnected = false;
		this.NXTConnectionMode = 'bt';
		this.ws = new WebSocket("ws://127.0.0.1:8080/NXTWebSocketServer/socket");
		//this.ws = {};
	    
		this.ws.onopen = function(event) {
			console.log("Connected to the websocket server");
			this.isNXTConnected = true;
			this.sendCommand({action: "connect", mode: this.NXTConnectionMode}, true);
		};

		this.ws.onmessage = function(event) {
			console.log("Incoming data : " + event.data);
			if (event.data == 'Ok')
			    return;        
		
			ob = eval('(' + event.data + ')');
			if (!isNXTConnected) {
			    if ('status' in ob && ob.status == 'connected') {
				isNXTConnected = true;
			    }else{
				isNXTConnected = false;
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
		console.log(this.ob);
	    if (this.isNXTConnected ||  con)
		this.ws.send(JSON.stringify(ob));
	    else
		console.log('Not connected to NXT');
	}
	
	return Server;
});
