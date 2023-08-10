/*
*
* MaskTrail();
* clipping this.mask...
*/

class MaskTrail{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/

	constructor(_p){

		this.p = _p;

		this.vid;

		this.myMask;

		this.pointersAmmount = 50;

		this.pointersArray = new Array();

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

	setup(){ 

		this.vid = this.p.createVideo(['videos/0.mp4'], this.onVideoLoad);

		this.myMask = this.p.createGraphics(this.p.displayWidth, this.p.displayHeight);

		this.myMask.noStroke();

		this.myMask.fill(255);

		this.myMask.circle(300, 300, 150);

		this.masked;

		this.p.imageMode(this.p.CENTER);

		this.location = this.p.createVector(40, 50);

		this.velocity = this.p.createVector(40, 50);
		
		this.acceleration = this.p.createVector(40, 50);

		this.maxSpeed;
	}

	/*
	*
	* onVideoLoad();
	* when the asset is loaded...
	*/

	onVideoLoad = () =>{

		this.vid.volume(0);
		
		this.vid.loop();

		this.vid.hide();

		this.vid.size(this.p.displayWidth, this.p.displayHeight)
	}

	/*
	*
	* update(actualVisualization);
	* update the data...
	*/

	run = (isDrawing, posX, posY) =>{

		this.myMask.clear();

		this.myMask.noStroke();

		this.myMask.fill(255);

		let period = 120;

		let amplitude = 300;

		let tempX = amplitude * this.p.cos(this.p.TWO_PI * this.p.frameCount / period);

		let val = this.p.displayWidth;

		let mouse = this.p.createVector(posX, posY);

		for(var i = 0; i< this.pointersArray.length; i++){

			this.pointersArray[i].update();

			this.pointersArray[i].arrive(mouse, isDrawing);

			this.myMask.circle(this.pointersArray[i].position.x, this.pointersArray[i].position.y, this.pointersArray[i].size);

		}

		this.img = this.vid.get();

		this.img.mask(this.myMask);

		this.p.clear();

		this.p.copy(

			this.img, 

			posX-val/2, 

			posY-val/2, 

			val, val, 

			posX-val/2, 

			posY	-val/2, 

			val, 

			val)


	}

}