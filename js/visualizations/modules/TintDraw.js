/*
*
* TintDraw();
* light animation...
*/

class TintDraw{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/

	constructor(_p){

		 this.distance = 150;

		 this.spring = 0.5;

		 this.friction = 0.5;

		 this.size = 25;

		 this.diff = this.size/8;

		 this.x = this.y = this.ax = this.ay = this.a = this.r = this.f = 0;

		 this.oldR = 0;

		this.p = _p;


		/*this.pointersAmmount = 10;

		this.pointersArray = new Array();

		this.lastDrawStatus = false;

		for(var i = 0; i< this.pointersAmmount; i++){

			this.point = new Point(_p, this.displayWidth/2, this.displayWidth/2, this.p.random(30, 60), this.p.random(3, 5));

			this.pointersArray.push(this.point);

		}*/

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

	run = (isDrawing, posX, posY, color) =>{

		if(posX == undefined && posY == undefined){

			return;
		}

		if(isDrawing){

			this.oldR = this.r;

			this.mX = posX;
			
			this.mY = posY;
			
			if(!this.f) {

				console.log("entering");
			
			  this.f = 1;
			
			  this.x = this.mX;
			
			  this.y = this.mY;
			
			}
			
			this.ax += ( this.mX - this.x ) * this.spring;
			
			this.ay += ( this.mY - this.y ) * this.spring;
			
			this.ax *= this.friction;
			
			this.ay *= this.friction;
			
			this.a += this.p.sqrt( this.ax*this.ax + this.ay*this.ay ) - this.a;
			
			this.a *= 0.6;
			
			this.r = this.size - this.a;

			let i;

			for( i = 0; i < this.distance; ++i ) {

			  this.oldX = this.x;
			  
			  this.oldY = this.y;
			  
			  this.x += this.ax / this.distance;
			  
			  this.y += this.ay / this.distance;
			  
			  this.oldR += ( this.r - this.oldR ) / this.distance;
			  
			  if(this.oldR < 1) this.oldR = 1;

			  this.p.stroke(color);
			  
			  this.p.strokeWeight( this.oldR+this.diff );
			  
			  this.p.line( this.x, this.y, this.oldX, this.oldY );
			  
			  this.p.strokeWeight( this.oldR );
			  
			  this.p.line( this.x+this.diff*5, this.y+this.diff*5, this.oldX+this.diff*5, this.oldY+this.diff*5 );
			  
			  this.p.line( this.x+this.diff*4, this.y+this.diff*4, this.oldX+this.diff*4, this.oldY+this.diff*4 );
			  
			  this.p.line( this.x+this.diff*3, this.y+this.diff*3, this.oldX+this.diff*3, this.oldY+this.diff*3 );
			  
			  this.p.line( this.x+this.diff*2, this.y+this.diff*2, this.oldX+this.diff*2, this.oldY+this.diff*2 );
			  
			  this.p.line( this.x-this.diff, this.y-this.diff, this.oldX-this.diff, this.oldY-this.diff );
			
			}

		}else{

			this.ax = this.ay = this.f = 0;

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