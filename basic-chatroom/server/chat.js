var server = require('ws').Server;
var s = new server({port: 5000});
var xo_messages = [];

s.on('connection', function(ws){
	ws.on('error', () => console.log('errored'));
	
	ws.on('message', function(message){

		message = JSON.parse(message);
		
		
		if(message.type == "name") {
			ws.person = message.data.replace(/<[^>]+>/g, '');
			s.clients.forEach(function e(client){
			
			if(client != ws){
				client.send(JSON.stringify({
					name: ws.person,
					data: 'Csatlakozott a beszélgetéshez.'
				}));
			}
			
			else{
				//client.send(xo_messages);
				client.send(JSON.stringify({
					name: ws.person,
					data: 'Csatlakoztál a beszélgetéshez.',
					messages: xo_messages
				}));
			}
			
		});
			return;
		}

		//Üzenetek mentése:
		xo_messages.push(JSON.stringify({name: ws.person, data: message.data}));
		
		//Az összes kliensnek.
		s.clients.forEach(function e(client){
			message.data.replace(/<[^>]+>/g, '');
					
			if(client != ws){
				client.send(JSON.stringify({
					name: ws.person,
					data: message.data
				}));
			}
			
		});
		
	});
	
	ws.on('close', function(client){
			s.clients.forEach(function e(client){
			if(client != ws){
				client.send(JSON.stringify({
					name: ws.person,
					data: 'Kilépett a beszélgetésből.'
				}));
			}
			
		});
	})
});