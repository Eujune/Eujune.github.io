// Объявление нейросети
var net = new brain.NeuralNetwork({});

net = net.fromJSON(json);

// Тренировка нейросети

t = function (s) {
		shuffle = function (arr) {
		var currentIndex = arr.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}
		return arr;
	}
	
	s = shuffle(shuffle(shuffle(s)));

	net.train(s, {
		iterations: 1000,
		errorThresh: 0.00000000000000001,
		log: true,
		logPeriod: 1,
		learningRate: 0.1,
		momentum: 0.3
	});
}


// Запуск нейросети

runIt = function () {
	let OUT = net.run(c.calculate(true));
	let big = OUT[0];
	let count = 0;
	for (var i = 0; i < OUT.length; i++) {
		if (big < OUT[i]) {
			big = OUT[i];
			count = i;
		}
	}
	console.log(big, OUT, count)
	document.getElementById('result').innerHTML="Нейронная сеть предсказала цифру " + count;
}
