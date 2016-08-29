import React from 'react';

import './App.css';
import Day from './Day';
import TaskCreator from './TaskCreator';
import Header from './Header';
//import TomorrowList from './TomorrowList';

var App = React.createClass({

  createTask(name, duration, startTime) {
    this.refs.today.createTask(name, duration, startTime);
  },

  render () {
    return (
      <div>
        <Header />
        <TaskCreator createTask={this.createTask} />
        <Day title='Today' ref='today' />
      </div>
    );
  }
})

export default App;
