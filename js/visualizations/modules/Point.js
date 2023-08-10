/*
*
* Point();
* generic class for this point. i will try to be as flexible as possible
* in order to use this class for several animations, considering thar we will
* work with steering behaviours.
*/

class Point {

  constructor(_p, x, y, _maxSpeed, _maxForce) {

    this.p = _p;
    
    this.acceleration = this.p.createVector(10, 10);
    
    this.velocity = this.p.createVector(10, 10);
    
    this.position = this.p.createVector(x, y);

    this.lastPosition = this.p.createVector(x, y);
    
    this.restPosition = this.p.createVector(this.p.random(0, this.p.displayWidth), this.p.random(0, this.p.displayHeight));
    
    this.r = 20;
    
    this.maxspeed = _maxSpeed;
    
    this.maxforce = _maxForce;

    this.maxSize = this.p.random(3, 250);

    this.minSize = this.p.random(5, 10);

    this.size = this.p.random(10, 50);
  }

  /*
  *
  * update();
  * general update laws...
  */

  update() {
  
    this.velocity.add(this.acceleration);
  
    this.velocity.limit(this.maxspeed);
  
    this.position.add(this.velocity);
  
    this.acceleration.mult(0);
  }

  /*
  *
  * applyForce(force);
  * may the force be with you.
  */


  applyForce(force) {
  
    this.acceleration.add(force);
  
  }

  /*
  *
  * arrive(target, drawing);
  * arriving there...
  *
  * @param target - where should we arrive...
  * @param drawing - check if is drawing...
  *
  */


  arrive(target, drawing) {

    let desired;

    if(drawing == true){

      desired = p5.Vector.sub(target, this.position);

    }else{

      desired = p5.Vector.sub(target, this.position);

    }

    let period = 120;

    let amplitude = 100;

    let tempX = amplitude * this.p.cos(this.p.TWO_PI * this.p.frameCount / period);
    

    let d = desired.mag();

    if (d < 600) {

      this.size = this.p.map(d, 0, 600, this.maxSize, this.minSize) + this.p.map(tempX, -100, 100, 50, 100);

    }

    if (d < 300) {
    
      var m = this.p.map(d, 0, 300, 0, this.maxspeed);
    
      desired.setMag(m);
    
    } else {
    
      desired.setMag(this.maxspeed);
    
    }

    
    let steer = p5.Vector.sub(desired, this.velocity);
    
    steer.limit(this.maxforce);  // Limit to maximum steering force
    
    this.applyForce(steer);
  
  }

  /*
  *
  * display();
  * possible we are going to use it as debugger...
  *
  */


  display() {
  
    let theta = this.velocity.heading() + this.p.PI / 2;
  
    this.p.fill(255, 0, 0);
  
    this.p.stroke(200);
  
    this.p.strokeWeight(1);
  
    this.p.push();
  
    this.p.translate(this.position.x, this.position.y);
  
    this.p.rotate(theta);
  
    this.p.beginShape();
  
    this.p.vertex(0, -this.r * 2);
  
    this.p.vertex(-this.r, this.r * 2);
  
    this.p.vertex(this.r, this.r * 2);
  
    this.p.endShape(this.p.CLOSE);
  
    this.p.pop();




  }
}