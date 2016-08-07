import React from 'react';

import './App.css';
import Day from './Day';
import TaskCreator from './TaskCreator';
import Header from './Header';
//import TomorrowList from './TomorrowList';

var App = React.createClass({
  render () {
    return (
      <div>
        <Header />
        <TaskCreator />
        <Day title='Today'/>
      </div>
    );
  }
})

export default App;
