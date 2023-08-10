/*
*
* PointsTrail();
* light animation...
*/

class PointsTrail{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/

	constructor(_p){

		this.p = _p;

		this.pointersAmmount = 20;

		this.pointersArray = new Array();

		this.lastDrawStatus = false;

		this.primaryColor = '#ff0066';

		this.secondaryColor = '#ff0066';

		for(var i = 0; i< this.pointersAmmount; i++){

			this.point = new Point(_p, this.displayWidth/2, this.displayWidth/2, this.p.random(30, 60), this.p.random(3, 5));

			this.pointersArray.push(this.point);

		}

	}

	/*
	*
	* setup();
	* initial setup for all the components...
	*/

	setup(_primaryColor, _secondaryColor){ 

		this.location = this.p.createVector(40, 50);

		this.velocity = this.p.createVector(40, 50);
		
		this.acceleration = this.p.createVector(40, 50);

		this.primaryColor = _primaryColor;
		
		this.secondaryColor = _secondaryColor;

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

		if(posX == undefined && posY == undefined) return;

		if(isDrawing != this.lastDrawStatus){

			console.log("setting up new...press or release: " + posX + " - " + posY);

			for(var i = 0; i< this.pointersArray.length; i++){

				this.pointersArray[i].position = this.p.createVector(posX, posY);

				this.pointersArray[i].lastPosition = this.p.createVector(posX, posY);

			}
		}

		this.lastDrawStatus = isDrawing;


		if(isDrawing){

			let pointer = this.p.createVector(posX, posY);

			for(var i = 0; i< this.pointersArray.length; i++){

				//...

				var hex1 = this.primaryColor.replace('#', '');

			    var bigint1 = parseInt(hex1, 16);

			    var r1 = (bigint1 >> 16) & 255;

			    var g1 = (bigint1 >> 8) & 255;
			    
			    var b1 = bigint1 & 255;

			    let c1 = this.p.color(r1, g1, b1);

			    //...

			    var hex2 = this.secondaryColor.replace('#', '');

			    var bigint2 = parseInt(hex2, 16);

			    var r2 = (bigint2 >> 16) & 255;

			    var g2 = (bigint2 >> 8) & 255;
			    
			    var b2 = bigint2 & 255;

			    let c2 = this.p.color(r2, g2, b2);

			    //...

			    let percent = (i * 1 / this.pointersArray.length);

			    console.log(percent);

			    let interA = this.p.lerpColor(c1, c2, percent);

				//...

				this.pointersArray[i].update();

				this.pointersArray[i].arrive(pointer, isDrawing);

				//this.p.circle(this.pointersArray[i].position.x, this.pointersArray[i].position.y, this.pointersArray[i].size/10);

				//this.p.stroke('#00d2ff');
				
				//this.p.stroke(this.primaryColor);
				
				this.p.stroke(interA);

				this.p.strokeWeight(1);

				this.p.line(this.pointersArray[i].position.x, this.pointersArray[i].position.y, this.pointersArray[i].lastPosition.x, this.pointersArray[i].lastPosition.y)
				
				this.pointersArray[i].lastPosition = this.pointersArray[i].position.copy();

			}

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