function _gcd(a, b) {
	if (!b) return a;
	return _gcd(b, a % b);
}

function gcd(numbers) {
	// numbers.length > 1
	let div = _gcd(numbers[0], numbers[1]);
	for(let i=2; i<numbers.length; i++) {
		div = _gcd(div, numbers[i]);
	}
	return div;
}

function _lcm(a, b) {
	return Math.abs(a*b)/_gcd(a, b);
}

function lcm(numbers) {
	// numbers.length > 1
	let div = _lcm(numbers[0], numbers[1]);
	for(let i=2; i<numbers.length; i++) {
		div = _lcm(div, numbers[i]);
	}
	return div;
}

function frac(d) {
	d = Math.abs(d);
	if(d === Math.floor(d)) return [d, 1];
	let tens = Math.pow(10, d.toString().length - 2);
	let f = [tens*d, tens];
	let div = _gcd(f[0], f[1]);
	return [f[0]/div, f[1]/div];
}

function randint(a, b) {
	return Math.floor(Math.random()*(b-a)+a);
}

function sample(numbers, k) {
	let copy = [];
	for(let i=0; i<numbers.length; i++) {
		copy.push(numbers[i]);
	}
	let s = [];
	while (copy.length > 0 && s.length < k) {
		let i = randint(0, copy.length);
		s.push(copy[i]);
		copy.splice(i, 1);
	}
	return s;
}

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function dec(a, n) {
	let e = Math.pow(10, n);
	return Math.floor(a*e)/e;
}