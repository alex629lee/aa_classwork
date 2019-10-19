function sum(...args) {
  let sum = 0;
  args.forEach(num => sum += num);
  return sum;
}
console.log(sum(1,2,3,4));
console.log(sum(1,2,3,4,5));


//------------------------------------------------------------------------

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Function.prototype.myBind = function (context) {
  let func = this;
  let otherArgs = Array.from(arguments).slice(1);
  return function() {
    return func.apply(context, otherArgs.concat(Array.from(arguments)));
  }
};


const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
markov.says.myBind(pavlov, "meow", "Kush")();
markov.says.myBind(pavlov)("meow", "a tree");
markov.says.myBind(pavlov, "meow")("Markov");
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");

//------------------------------------------------------------------------


function curriedSum(numArgs) {
  const numbers = [];
  function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let sum = 0;
      numbers.forEach((num) => {sum += num;});
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
}
const currSum = curriedSum(4);
console.log(currSum(5)(30)(20)(1)); // => 56


//------------------------------------------------------------------------


Function.prototype.curry = function (numArgs) {
  const args = [];
  const func = this;

  function _curriedFunc (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func(...args);
    } else {
      return _curriedFunc;
    }
  }
  return _curriedFunc;
};

const func2 = function (...nums) {
  let sum = 0;
  nums.forEach(num => {sum += num});
  return sum;
}
const curry2 = func2.curry(4);
console.log(curry2(5)(30)(20)(1));
