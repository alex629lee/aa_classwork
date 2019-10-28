import React from 'react';

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: 0};
    this.tabs = props.tabs;
    this.select = this.select.bind(this);
  }

  select(idx) {
    this.setState({selected: idx});
    console.log(this.state.selected);
  }

  render() {
    const tabs = this.tabs.map((tab, i) => {
      return <li key={i}>
        <h1 onClick={() => this.select(i)}>{tab.title}</h1>
        <article className={tab.title}>{tab.content}</article> 
      </li>
    });
    return <ul className="tabs">{tabs}</ul>
  }
}

export default Tabs;