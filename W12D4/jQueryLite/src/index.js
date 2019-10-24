const DomNodeCollection = require('./dom_node_collection.js');

const _afterReadyCbs = [];
let _isReady = false;

window.$l = function (arg) {
  if (arg instanceof HTMLElement) {
    return new DomNodeCollection(Array.from(arg))
  }
  if (typeof(arg) === "function") {

    return storeCallback(arg);
  }
}

$l.extend = function (mainObj, ...otherObjs) {
  let objs = Array.from(otherObjs);
  objs.forEach(obj => {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      mainObj.key = obj.key;
    })
  })
  return mainObj;
}

const defaultOptions = {
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  success: () => {},
  error: () => {},
  url: "",
  method: "GET",
  data: {}
}

$l.ajax = function (options) {
  options = $l.extend(defaultOptions, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);

  xhr.onload = function () {
    if(xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  }
  xhr.send(JSON.parse(options.data));
}


storeCallback = func => {
  if (!_isReady) {
    _afterReadyCbs.push(func);
  } else {
    func();
    $(() => alert("the document is ready"));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _isReady = true;
  _afterReadyCbs.forEach(func => func());
});


getDomNodes = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  const nodeListArray = Array.from(nodeList);
  return new DomNodeCollection(nodeListArray);
};

