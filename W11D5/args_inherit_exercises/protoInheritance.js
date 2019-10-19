function SuperClass () {};
function Surrogate () {};
function Subclass () {}; 

Surrogate.prototype = SuperClass.prototype; 

Subclass.prototype = new Surrogate(); 

Subclass.prototype.constructor = Subclass;


// console.log(Surrogate.prototype);
// console.log(Subclass.prototype);
// console.log(Subclass.constructor);


//------------------------------------------------------------------------

Function.prototype.inherits = function (superClass) {
  this.prototype = new superClass();
  this.prototype.constructor = this;
}

function MovingObject(name) {
  this.name = name;
};
Ship.inherits(MovingObject);
Asteroid.inherits(MovingObject);

function Ship (name) {
  MovingObject.call(this, name);
}; 
Ship.prototype.fly = function () {
  console.log(`${this.name} is flying!`);
};


function Asteroid (name) {
  MovingObject.call(this, name);
};




const ship = new Ship("My Ship");
console.log(ship.name);
const asteroid = new Asteroid("Flaming Hot");
console.log(asteroid.name);
console.log(Asteroid.prototype);
console.log(Ship.prototype);
