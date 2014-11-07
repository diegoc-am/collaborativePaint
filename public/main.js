(function(){

	document.addEventListener('DOMContentLoaded',function(){
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var paintColor = '#' + Math.random().toString(16).substring(2,8);
		
		context.lineJoin = "round";
		context.lineWidth = 5;

		function draw(x,y,type, emit, color){
			
			if(emit){
				socket.emit('draw',{
					x: x,
					y: y,
					type: type,
					color: color
				});
			}

			context.strokeStyle = color || paintColor ;
				
			switch(type){
				case "down":
					context.beginPath();
					context.moveTo(x,y);
					break;
				case "move":
					context.lineTo(x,y);
					context.stroke();
					break;
				default:
					context.closePath();
					break;
			}
		}


		function mouseMove(e){
			draw(e.layerX, e.layerY, 'move',true);
		}


		canvas.addEventListener('mousedown', function(e){
			draw(e.layerX, e.layerY, 'down', true);
			canvas.addEventListener('mousemove',mouseMove);
		});

		canvas.addEventListener('mouseup', function(e){
			draw(e.layerX, e.layerY, 'up', true);
			canvas.removeEventListener('mousemove',mouseMove);
		});

		var socket = io();

		socket.on('draw', function(data){
			draw(data.x, data.y, data.type, false, data.color);
		});

		socket.on('load', function(data){
			for (var i = data.length - 1; i >= 0; i--) {
				draw(data[i].x,data[i].y,data[i].type, false, data[i].color)
			}
		});


	});

})();