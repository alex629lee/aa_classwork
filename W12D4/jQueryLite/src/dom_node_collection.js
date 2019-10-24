class DomNodeCollection {

  constructor(array) {
    this.nodesArray = array;
  }


  html(str) {
    if (str) {
      this.nodesArray.forEach( node => node.innerHTML = str );
    } else if (this.nodesArray.length > 0) {
      return this.nodesArray[0].innerHTML;
    }
  }

  empty() {
    this.nodesArray.forEach( node => node.innerHTML = "" );
  }

  append(ele) {
    if (typeof ele === "string") {
      this.nodesArray.forEach( node => node.innerHTML += ele )
    } else if (ele instanceof DomNodeCollection) {
      this.nodesArray.forEach ( node => {
        ele.forEach( childNode => {
          node.appendChild(childNode.cloneNode(true))
        })
      })
    } else if (typeof ele === "object" && !(ele instanceof DomNodeCollection)) {
      ele = $l(ele);
    }
  }

  attr(key, val) {
    if (val) {
      return this.nodesArray.forEach( node => node.setAttribute(key, val) );
    } else {
      return this.nodesArray[0].getAttribute(key);
    }
  }


  addClass(className) {
    this.nodesArray.forEach( node => node.classList.add(className));
  }


  removeClass(className) {
    this.nodesArray.forEach( node => node.classList.remove(className) );
  }


  children() {
    let newArr = [];
    this.nodesArray.forEach(node => {
      let childNodes = Array.from(node.children);
      newArr.concat(childNodes);
    })
    return new DomNodeCollection(newArr);

  }

  parent() {
    let newArr = [];
    this.nodesArray.forEach(node => {
      let parentNode = Array.from(node.parentNode);
      newArr.concat(parentNode);
    })
    return new DomNodeCollection(newArr);
  }


  find(selector) {
    let newArr = [];
    this.nodesArray.forEach( node => {
      newArr.concat(Array.from(node.querySelectorAll(selector)));
    } )
    return new DomNodeCollection(newArr);
  }

  remove() {
    this.nodesArray.forEach( node => {
      node.parentNode.removeChild(node)
    } )
  }


  on(e, cb) {
    this.nodesArray.forEach(node => {
      node.addEventListener(e, cb);
      node.cb = cb;
    })
  }

  off(e) {
    this.nodesArray.forEach( node => {
      node.removeEventListener(e, node.cb)
    } )
  }
}


module.exports = DomNodeCollection;