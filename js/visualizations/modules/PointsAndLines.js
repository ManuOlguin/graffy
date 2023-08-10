/*
*
* PointsTrail();
* light animation...
*/

class PointsAndLines{

	/*
	*
	* constructor();
	* define the setup variables inside the constructor
	*/
	
	constructor(_p){

		this.p = _p;

		this.pointersAmmount = 10;

		this.pointersArray = new Array();

		this.lastDrawStatus = false;

		this.minDistance = 60;

		var conditionCounter =0;

		for(var i = 0; i< this.pointersAmmount; i++){

			this.point = new Point(_p, this.displayWidth/2, this.displayWidth/2, this.p.random(30, 60), this.p.random(3, 5));

			this.pointersArray.push(this.point);

		}

		this.savedPointsArray = new Array();

		this.savedPointsArray = new Array();

		this.shuffleSavedPointsArray = new Array();

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

		this.maxSpeed;

		this.primaryColor = _primaryColor;
		
		this.secondaryColor = _secondaryColor;
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

			let pointer = this.p.createVector(posX, posY);

			this.savedPointsArray.push(pointer);

			this.tempSavedPointsArray = new Array();

			this.shuffleSavedPointsArray = this.shuffleArray(this.savedPointsArray)
		}

		this.lastDrawStatus = isDrawing;

		if(isDrawing){

			let pointer = this.p.createVector(posX, posY);

			this.tempSavedPointsArray.push(pointer);

			this.savedPointsArray.push(pointer);

			for(var i = 0; i< this.tempSavedPointsArray.length; i++){

				this.p.fill(this.primaryColor);

				this.p.rect(this.tempSavedPointsArray[i].x, this.tempSavedPointsArray[i].y, 3);

				if(this.conditionCounter>=1){

					return;
				}

				for(var j = 0; j< this.shuffleSavedPointsArray.length; j++){

					 if(i!=j){

					 	let d = this.p.dist(this.tempSavedPointsArray[i].x, this.tempSavedPointsArray[i].y, this.shuffleSavedPointsArray[j].x, this.shuffleSavedPointsArray[j].y);

                        if(d<this.minDistance){

                        	this.conditionCounter+=1;

                        	let mapWeight = this.p.map(d, 0, this.minDistance, 3, 0);

                        	let mapAlpha = this.p.map(d, 0, this.minDistance, 1, 0);

                        	if(mapAlpha>.7) mapAlpha = 1;

                        	this.p.strokeWeight(mapWeight);

                        	//...

                        	var hex1 = this.primaryColor.replace('#', '');

						    var bigint1 = parseInt(hex1, 16);

						    var r1 = (bigint1 >> 16) & 255;

						    var g1 = (bigint1 >> 8) & 255;
						    
						    var b1 = bigint1 & 255;

						    let c1 = this.p.color(r1, g1, b1);

						    let str = 'rgba(' + r1 + ',' + g1 + ',' + b1 + ',' + mapAlpha + ')';
           
                        	this.p.stroke(str);
            
                        	this.p.line(this.tempSavedPointsArray[i].x, this.tempSavedPointsArray[i].y, this.shuffleSavedPointsArray[j].x, this.shuffleSavedPointsArray[j].y);


                        }
                    }

				}

			}

		}

	}

	shuffleArray = (array) => {

		let currentIndex = array.length,  randomIndex;

		while (currentIndex != 0) {

			randomIndex = Math.floor(Math.random() * currentIndex);

			currentIndex--;

			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
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