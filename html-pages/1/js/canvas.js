const body = document.getElementById('body');
const html = document.getElementById('html');
const button = document.getElementById('send');
html.style.overflow = "auto";
body.style.overflow = "auto";

function myCanvas (el) {
	
	// Объявление контекста и тд
	const ctx = el.getContext('2d');
	const pixel = 10;

	let is_mouse_down = false;
	canvas.width = 280;
	canvas.height = 280;

	// Рисование линий

	this.drawLine = function (x1, y1, x2, y2, color = 'gray') {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 0.1;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	// Рисование клетки (Для this.calculate)

	this.drawCell = function (x, y, w, h) {
		ctx.fillStyle = '#0A0A0A';
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 10;
		ctx.rect(x, y, w, h);
		ctx.fill();
	}

	// Очистка холста

	this.clear = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.getElementById('result').innerHTML="";
		button.style.display = '';
	}

	// Рисование сетки (Для this.calculate)

	this.drawGrid = function () {
		const w = canvas.width;
		const h = canvas.height;
		const p = w / pixel;

		const xStep = w / p;
		const yStep = h / p;

		for (let x = 0; x < w; x += xStep) {
			this.drawLine(x, 0, x, h);
		}

		for (let y = 0; y < h; y += yStep) {
			this.drawLine(0, y, w, y);
		}
	}

	// Рассчёт пикселей и запись в массив, а также рисование сетки и клеточек

	this.calculate = function (draw = false) {
		const w = canvas.width;
		const h = canvas.height;
		const p = w / pixel;

		const xStep = w / p;
		const yStep = h / p;

		const vector = [];
		let __draw = [];

		for (let y = 0; y < w; y += xStep) {
			for (let x = 0; x < h; x += yStep) {
				const data = ctx.getImageData(x, y, xStep, yStep);
				let nonEmptyPixelsCount = 0;

				for (i = 0; i < data.data.length; i += pixel) {
					const isEmpty = data.data[i] === 0;
					if (!isEmpty) {
						nonEmptyPixelsCount += 1;
					}
				}

				if (nonEmptyPixelsCount > 1 && draw) {
					__draw.push([x, y, xStep, yStep]);
				}

				vector.push(nonEmptyPixelsCount > 1 ? 1 : 0);
			}
		}
		if (draw) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.drawGrid();

			for (_d in __draw) {
				
				this.drawCell(__draw[_d][0], __draw[_d][1], __draw[_d][2], __draw[_d][3]);
			}
		}

		button.style.display = 'none';
		return vector;
	}

	// События для компьютера и телефонов

	el.addEventListener('mousedown', function (e) {
		is_mouse_down = true;
		ctx.beginPath();
	})

	el.addEventListener('touchstart', function (e) {
		body.style.overflow = "hidden";
		html.style.overflow = "hidden";
		is_mouse_down = true;
		ctx.beginPath();
	})

	el.addEventListener('mouseup',function (e) {
		is_mouse_down = false;
	})

	el.addEventListener('touchend', function (e) {
		is_mouse_down = false;
		body.style.overflow = "auto";
		html.style.overflow = "auto";
	})

	el.addEventListener('mouseout', function (e) {
		is_mouse_down = false;
	})
	
	el.addEventListener('mousemove', function (e) {
		if (is_mouse_down) {
			ctx.fillStyle = '#0A0A0A';
			ctx.strokeStyle = '#0A0A0A';
			ctx.lineWidth = pixel;

			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(e.offsetX, e.offsetY, pixel / 2, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(e.offsetX, e.offsetY);
		}
	})

	el.addEventListener('touchmove', function (e) {
		getCoords = function(elem) {
			var box = elem.getBoundingClientRect();

			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
				}
		}

		if (is_mouse_down) {
			var x = event.touches[0].pageX - getCoords(el).left;
			var y = event.touches[0].pageY - getCoords(el).top;
			ctx.fillStyle = '#0A0A0A';
			ctx.strokeStyle = '#0A0A0A';
			ctx.lineWidth = pixel;

			ctx.lineTo(x, y);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(x, y, pixel / 2, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	})
}

// Объявление холста

const c = new myCanvas(document.getElementById('canvas'));