let r1, r2, r3;
let rs1, rs2, rs3;
let l1, l2, l3;
let canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let w = canvas.width;
let h = canvas.height;
let center;
let c = canvas.getContext("2d");
c.lineWidth = 3;
let cyclelen;
let points;
let mstick = 50;


function restart() {
	rs1 = parseFloat(document.getElementById("rs1").value);
	rs2 = parseFloat(document.getElementById("rs2").value);
	rs3 = parseFloat(document.getElementById("rs3").value);
	r1 = 0;
	r2 = 0;
	r3 = 0;
	let s = h/2.1;
	l1 = s/2;
	l2 = s/3;
	l3 = s/6;
	cyclelen = compute_cyclelen([rs1, rs2, rs3]);
	console.log(cyclelen);
	center = [w/2+.5, h/2+.5];
	points = [];
	window.setInterval(update, mstick);
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
	return 360/d;
}

function update() {
	c.clearRect(0, 0, w, h);
	// compute the position of the drawer
	let p1 = [center[0]+Math.cos(r1)*l1, center[1]+Math.sin(r1)*l1];
	let p2 = [p1[0]+Math.cos(r2)*l2, p1[1]+Math.sin(r2)*l2];
	let p3 = [p2[0]+Math.cos(r3)*l3, p2[1]+Math.sin(r3)*l3];
	// add new points until we cycle
	if(points.length <= cyclelen) {
		points.push(p3);
	}
	// draw the drawer
	let r = Math.random()*255;
	if(points.length <= cyclelen) {
		c.strokeStyle = "#AAA";
	} else {
		c.strokeStyle = "#172";
	}
	c.beginPath();
	c.moveTo(center[0], center[1]);
	c.lineTo(p1[0], p1[1]);
	c.lineTo(p2[0], p2[1]);
	c.lineTo(p3[0], p3[1]);
	c.moveTo(p3[0], p3[1]);
	c.closePath();
	c.stroke();

	// draw the lines
	if(points.length > 0) {
		c.strokeStyle = "#FFF";
		c.beginPath()
		c.moveTo(points[0][0], points[0][1]);
		for(let i=1; i<points.length; i++) {
			c.lineTo(points[i][0], points[i][1]);
		}
		c.moveTo(points[points.length-1][0], points[points.length-1][1]);
		c.closePath();
		c.stroke();
	}

	// update the angles
	r1 = (r1 + 2*Math.PI*rs1/360) % (2*Math.PI);
	r2 = (r2 + 2*Math.PI*rs2/360) % (2*Math.PI);
	r3 = (r3 + 2*Math.PI*rs3/360) % (2*Math.PI);
}
