/*
*
* SimpleDraw();
* light animation...
*/

class SimpleDraw{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/

	constructor(_p){

		this.p = _p;

		this.pointersAmmount = 2;

		this.pointersArray = new Array();

		this.lastDrawStatus = false;

		this.seed = this.p.random(1000);

		this.bx = 0;

		this.by = 0;

		for(var i = 0; i< this.pointersAmmount; i++){

			this.point = new Point(_p, this.displayWidth/2, this.displayWidth/2, 50, 10);

			this.pointersArray.push(this.point);

		}

	}

	/*
	*
	* setup();
	* initial setup for all the components...
	*/

	setup(){ 

		this.location = this.p.createVector(40, 50);

		this.velocity = this.p.createVector(40, 50);
		
		this.acceleration = this.p.createVector(40, 50);

		this.maxSpeed;
	}

	/*
	*
	* update(actualVisualization);
	* update the data...
	*
	* importante. Tengo que reemplazar aca por x e y de OSC...
	*
	*/

	run = (isDrawing, posX, posY) =>{

		if(isDrawing != this.lastDrawStatus){

			for(var i = 0; i< this.pointersArray.length; i++){

				this.pointersArray[i].position = this.p.createVector(posX, posY);

				this.pointersArray[i].lastPosition = this.pointersArray[i].position.copy();

			}
		}

		this.lastDrawStatus = isDrawing;


		if(isDrawing){

			let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);

			//...

			if(this.p.frameCount%7==0){

				this.stipple(this.p.mouseX, this.p.mouseY, '#ff0066');

				this.splatter(this.p.mouseX, this.p.mouseY, '#ff0066');

			}
			//...

			for(var i = 0; i< this.pointersArray.length; i++){

				this.pointersArray[i].update();

				this.pointersArray[i].arrive(mouse, isDrawing);

				this.p.stroke('#ff0066');

				//
				let d = this.p.dist(this.pointersArray[i].position.x, this.pointersArray[i].position.y, this.pointersArray[i].lastPosition.x, this.pointersArray[i].lastPosition.y);

				console.log(d);

				let minLine = 1;

				let maxline = 30;

				let minDistance = 0;

				let maxDistance = 60;

				let mapped = this.p.constrain(this.p.map(d, maxDistance, minDistance, minLine, maxline), minLine, maxline);

				this.p.strokeWeight(mapped);


				this.p.line(this.pointersArray[i].position.x, this.pointersArray[i].position.y, this.pointersArray[i].lastPosition.x, this.pointersArray[i].lastPosition.y)
				
				this.pointersArray[i].lastPosition = this.pointersArray[i].position.copy();

			}

		}

	}

	/*
	*
	* stipple();
	* some stipples here...
	*
	* @param _bx  - to check
	* @param _by - to check
	*/

	stipple = (bx, by, c) =>{

		this.p.noStroke();

		this.p.fill(c);

		let radius = this.p.random(3, 12);

		this.p.ellipse(bx+this.p.random(-30,30), by+this.p.random(30,-30), radius);

		radius = this.p.random(3, 12);

		this.p.ellipse(bx+this.p.random(-30,30), by+this.p.random(30,-30), radius);

	}

	/*
	*
	* splatter();
	* and some stipples here...
	*
	* @param _bx  - to check
	* @param _by - to check
	*
	*/

	splatter = (_bx,_by) =>{

		this.bx = _bx + this.p.random(-15,15);

		this.by = _by + this.p.random(-15,15);

		let mx = 10 * this.p.mouseX;

		let my = 10 * this.p.mouseY;

		for(let i=0; i<80; i++){

			this.seed+=.01;

			let x = this.bx+mx*(0.5-this.p.noise(this.seed+i));

			let y = this.by+my*(0.5-this.p.noise(this.seed+2*i));

			let s = 50/this.p.dist(this.bx, this.by, x, y);

			if(s>20) s=20;

			let a = 255-s*5;

			this.p.noStroke();

			//this.p.c.setAlpha(a);

			this.p.fill('#ffffff');

			this.p.ellipse(x,y,s);

			this.seed+=.01;

		}

	}

	/*
	*
	* update();
	* update the data...
	*/

	update = () =>{



	}

	/*
	*
	* draw();
	* draw it...
	*/

	draw = () =>{

	}

}