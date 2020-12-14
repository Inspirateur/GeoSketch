let r1, r2, r3;
let rs1, rs2, rs3;
let l1 = 1/2;
let l2 = 1/3;
let l3 = 1/6;
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
	rs1 = parseFloat(document.getElementById("rs1").value);
	rs2 = parseFloat(document.getElementById("rs2").value);
	rs3 = parseFloat(document.getElementById("rs3").value);
	r1 = 0;
	r2 = 0;
	r3 = 0;
	resize();
	cyclelen = compute_cyclelen([rs1, rs2, rs3]);
	console.log(cyclelen);
	points = [];
	taskid = window.setInterval(update, mstick);
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
	let p1 = [Math.cos(r1)*l1, Math.sin(r1)*l1];
	let p2 = [p1[0]+Math.cos(r2)*l2, p1[1]+Math.sin(r2)*l2];
	let p3 = [p2[0]+Math.cos(r3)*l3, p2[1]+Math.sin(r3)*l3];
	// add new points until we cycle
	if(points.length <= cyclelen) {
		points.push(p3);
	}
	// draw the drawer
	if(drawer) {
		let r = Math.random()*255;
		if(points.length <= cyclelen) {
			c.strokeStyle = "#AAA";
		} else {
			c.strokeStyle = "#172";
		}
		c.beginPath();
		c.moveTo(0, 0);
		c.lineTo(p1[0]*s, p1[1]*s);
		c.lineTo(p2[0]*s, p2[1]*s);
		c.lineTo(p3[0]*s, p3[1]*s);
		c.moveTo(p3[0]*s, p3[1]*s);
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
	r1 = (r1 + 2*Math.PI*rs1/unit) % (2*Math.PI);
	r2 = (r2 + 2*Math.PI*rs2/unit) % (2*Math.PI);
	r3 = (r3 + 2*Math.PI*rs3/unit) % (2*Math.PI);
}
