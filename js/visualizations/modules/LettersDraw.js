/*
*
* LettersDraw();
* light animation...
*/

class LettersDraw{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/

	constructor(_p){

		this.p = _p;

		this.x = 0;

		this.y = 0;

		this.stepSize = 5.0;

		this.font = 'Georgia';

		this.letters = 'Hi to everyone! we are Wynwood Boogies!';

		this.fontSizeMin = 3;

		this.angleDistortion = 0.0;

		this.counter = 0;

	}

	/*
	*
	* setup();
	* initial setup for all the components...
	*/

	setup(){ 

		 this.x = this.p.mouseX;
		 
		 this.y = this.p.mouseY;

		 this.p.textFont(this.font);

		 this.p.textAlign(this.p.LEFT);
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

		/*if(isDrawing != this.lastDrawStatus){

			this.x = this.p.mouseX;

			this.y = this.p.mouseY;

		}*/

		if(isDrawing){

			let d = this.p.dist(this.x, this.y, posX, posY);

			console.log(d);

			this.p.textSize(this.fontSizeMin + d / 2);

			let newLetter = this.letters.charAt(this.counter);

			console.log(newLetter);

			this.stepSize = this.p.textWidth(newLetter);

			if (d > this.stepSize) {

				var angle = this.p.atan2(posX - this.y, posY - this.x);

				this.p.push();

				this.p.fill('#ff0066')
		      	
		      	this.p.translate(posX, posY);
		      	
		      	this.p.rotate(this.angle + this.p.random(this.angleDistortion));
		      	
		      	this.p.text(newLetter, 0, 0);
		      	
		      	this.p.pop();

		      	this.counter++;

		      	if (this.counter >= this.letters.length) this.counter = 0;

		      	this.x = this.x + this.p.cos(this.angle) * this.stepSize;
      			
      			this.y = this.y + this.p.sin(this.angle) * this.stepSize;
    		
    		}

		}

		this.lastDrawStatus = isDrawing;

		this.x = this.p.mouseX;

		this.y = this.p.mouseY;

	}

}