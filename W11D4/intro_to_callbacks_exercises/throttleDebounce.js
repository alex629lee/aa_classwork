Function.prototype.myThrottle = function (interval) {
  tooSoon = false;

  return (...args) => {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => tooSoon = false, interval);
      this(...args);
    }
  }
}

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// }
// const neuron = new Neuron();
// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// neuron.fire = neuron.fire.myThrottle(500);

//-----------------------------------------------------------------------------

Function.prototype.myDebounce = function(interval) {
  let timeout;

  return (...args) => {
    const func = () => {
      timeout = null;
      this(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(func, interval);
  }
}


function printKevin() {
  console.log("Kevin");
}

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar();
const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
};

//
searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();