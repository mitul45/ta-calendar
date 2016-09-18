/**
 * Base class
 */
import React from 'react';
import './App.css';
import Day from './Day';
import TaskCreator from './TaskCreator';
import Header from './Header';

var App = React.createClass({

  addTask(name, duration, startTime) {
    this.refs.today.addTask(name, duration, startTime);
  },

  render () {
    return (
      <div>
        <Header />
        <TaskCreator addTask={this.addTask} />
        <Day title='Today' ref='today' />
      </div>
    );
  }
})

export default App;
