import React from 'react';
import Clock from './frontend/clock';
import Tabs from './frontend/tabs';


const Root = (props) => {
  const array = [
    { title: "one", content: "I am the first" }, 
    { title: "two", content: "Second pane here" }, 
    { title: "three", content: "Third pane here" }
  ];
  
  return <div>
    <Clock />
    <Tabs tabs={array} />
  </div>
};


export default Root; 