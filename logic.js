var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');

		var brushSize = 10;
		var brushColor = '#000000';
    var eraserMode = false;

		canvas.addEventListener('mousedown', startDraw);
		canvas.addEventListener('mousemove', draw);
		canvas.addEventListener('mouseup', endDraw);

		document.getElementById('save').addEventListener('click', function() {
			var link = document.createElement('a');
			link.download = 'image.png';
			link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			link.click();
		});

    document.getElementById('clear').addEventListener('click', function() {
      if (confirm("Do you really want to clear the content?")) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    });

    document.getElementById('brushSize').addEventListener('change', function() {
			changeBrushSize(this.value);
		});

		document.getElementById('colorPicker').addEventListener('change', function() {
			changeBrushColor(this.value);
		});

    document.getElementById('canvasWidth').addEventListener('change', function() {
			changeCanvasWidth(this.value);
		});

    document.getElementById('canvasHeight').addEventListener('change', function() {
			changeCanvasHeight(this.value);
		});

    document.getElementById('eraser').addEventListener('click', function() {
			if (eraserMode) {
				this.innerHTML = 'Eraser';
				this.style.backgroundColor = '';
				this.style.color = '';
				context.globalCompositeOperation = 'source-over';
				changeBrushColor(brushColor);
				changeBrushSize(brushSize);
				eraserMode = false;
			} else {
				this.innerHTML = 'Brush';
				this.style.backgroundColor = '#ffffff';
				this.style.color = '#000000';
				context.globalCompositeOperation = 'destination-out';
				changeBrushColor('#ffffff');
				changeBrushSize(brushSize);
				eraserMode = true;
			}
			
		});

		function startDraw(e) {
			context.beginPath();
			context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
			canvas.addEventListener('mousemove', draw);
		}

		function draw(e) {
			context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
			context.lineWidth = brushSize;
			context.strokeStyle = brushColor;
			context.stroke();
		}

		function endDraw() {
			canvas.removeEventListener('mousemove', draw);
		}

		function changeBrushSize(size) {
			brushSize = size;
		}

    function changeCanvasHeight(size) {
			canvas.height = size;
		}

    function changeCanvasWidth(size) {
			canvas.width = size;
		}

		function changeBrushColor(color) {
			brushColor = color;
		}