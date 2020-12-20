let rs;
let rspeeds;
let n = 3;
let ls;
let drawer = true;
let taskid = null;
let canvas = document.getElementById("canvas");
let s;
let c = canvas.getContext("2d");
c.lineWidth = 3;
let cyclelen;
let points;
let unit = 360;
let mstick = 10;
window.addEventListener('resize', resize);


function check_drawer() {
	drawer = document.getElementById("drawer").checked;
}

function resize() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	s = Math.min(canvas.width, canvas.height)/2.1;
	c.translate(canvas.width/2, canvas.height/2)
	console.log(s);
}

function restart() {
	if(taskid !== null) {
		window.clearInterval(taskid);
	}
	rspeeds = [];
	rs = [];
	ls = []
	for(let i=0; i<n; i++) {
		rspeeds.push(document.getElementById(`rs${i+1}`).value);
		rs.push(0);
		ls.push(1/(2*(i+1)));
	}
	resize();
	cyclelen = compute_cyclelen(rspeeds);
	console.log(cyclelen);
	points = [];
	taskid = window.setInterval(update, mstick);
}

function random_nice() {
	let numbers = [randint(1, 13), randint(2, 13)];
	// add numbers till we reach n
	while (numbers.length < n) {
		let s = sample(numbers, 2);
		let div = gcd(s);
		if(div === 1) {
			numbers.push(s[0]*s[1]);
		} else {
			numbers.push(div*randint(2, 5));
		}
	}
	// randomly set negatives
	for(let i=0; i<numbers.length; i++) {
		if (Math.random() < .4) {
			numbers[i] *= -1;
		}
	}
	// randomly set errors
	for(let i=0; i<randint(1, 3); i++) {
		let j = randint(0, numbers.length);
		numbers[j] += dec(Math.pow(Math.random(), 3), 1)+.1;
	}
	// shuffle the numbers
	numbers = shuffle(numbers);
	// set the values in the HTML
	for(let i=0; i<n; i++) {
		document.getElementById(`rs${i+1}`).value = numbers[i];
	}
	restart();
}

function compute_cyclelen(r_speeds) {
	// find the biggest real d such that every rs/d is an integer
	let rs_num = [];
	let rs_dem = []
	for(let i=0; i<r_speeds.length; i++) {
		let f = frac(r_speeds[i]);
		rs_num.push(f[0]);
		rs_dem.push(f[1]);
	}
	let d = gcd(rs_num)/lcm(rs_dem);
	console.log(d);
	// compute the amount of iteration needed to cycle
	return unit/d;
}

function update() {
	c.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
	// the points are dynamically translated and scaled each time (in case they change)
	// all the points are stored in a coordinate agnostic to s w and h
	// compute the position of the drawer
	let ps = [[Math.cos(rs[0])*ls[0], Math.sin(rs[0])*ls[0]]];
	for(let i=1; i<n; i++) {
		ps.push([ps[i-1][0]+Math.cos(rs[i])*ls[i], ps[i-1][1]+Math.sin(rs[i])*ls[i]]);
	}
	// add new points until we cycle
	if(points.length <= cyclelen) {
		points.push(ps[ps.length-1]);
	}
	// draw the drawer
	if(drawer) {
		if(points.length <= cyclelen) {
			c.strokeStyle = "#AAA";
		} else {
			c.strokeStyle = "#172";
		}
		c.beginPath();
		c.moveTo(0, 0);
		for(let i=0; i<ps.length; i++) {
			c.lineTo(ps[i][0]*s, ps[i][1]*s)
		}
		c.moveTo(ps[ps.length-1][0]*s, ps[ps.length-1][1]*s);
		c.closePath();
		c.stroke();
	}

	// draw the lines
	if(points.length > 0) {
		c.strokeStyle = "#FFF";
		c.beginPath()
		c.moveTo(points[0][0]*s, points[0][1]*s);
		for(let i=1; i<points.length; i++) {
			c.lineTo(points[i][0]*s, points[i][1]*s);
		}
		c.moveTo(points[points.length-1][0]*s, points[points.length-1][1]*s);
		c.closePath();
		c.stroke();
	}

	// update the angles
	for(let i=0; i<rs.length; i++) {
		rs[i] = (rs[i] + 2*Math.PI*rspeeds[i]/unit) % (2*Math.PI);
	}
}
