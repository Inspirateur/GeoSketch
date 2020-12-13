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
	if(d === Math.floor(d)) return [d, 1];
	let tens = Math.pow(10, d.toString().length - 2);
	let f = [tens*d, tens];
	let div = _gcd(f[0], f[1]);
	return [f[0]/div, f[1]/div];
}
