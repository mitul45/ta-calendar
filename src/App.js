import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const START_TIME = 9.5;
const END_TIME = 18;

var TimeSlot = React.createClass({
  
  formatTime(time) {
    if (Number.isInteger(time))
      return time + ":00";
    else
      return (time - 0.5 + ":30");
  },

  formatSlot(slot) {
    return this.formatTime(slot.start) + ' to ' + this.formatTime(slot.end);
  },

  getInitialState() {
    return {
      showInputFields: false,
      task: null
    }
  },

  setTask(task) {
    this.setState({
      task: task
    })
  },

  addTask() {
    this.setState({
      showInputFields: true
    })
  },

  render() {
    return (
      <tr>
        <td> {this.formatSlot(this.props.timeSlot.slot)} </td>
        <td>
          {
            this.state.task
              ? this.state.task
              : <span>
                  { this.state.showInputFields
                  ? <input type='text' placeholder='What do you want to do?' /> 
                  : null }
                  <button onClick={this.addTask}> Add Task </button>
                </span>
          }
        </td>
      </tr>
    )
  }
})

var Day = React.createClass({

  render() {
    const timeSlots = [];
    let current = START_TIME;
    let id = 1;
    while(current < END_TIME) {
      timeSlots.push({ 
        id: id++,
        slot: {
          start: current,
          end: current + 0.5
        }
      });
      current = current + 0.5;
    }

    const rows = timeSlots.map(function(timeSlot) {
      return (<TimeSlot key={timeSlot.id} timeSlot={timeSlot}/>);
    })

    return (
      <div>
        <h2> {this.props.title} </h2>
        <table>
          <thead>
            <tr>
              <th> Time </th>
              <th> Tasks </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
})

var App = React.createClass({
  render () {
    return (
      <div>
        <Day title='Day 1'/>
        <p> Hello React!</p>
      </div>
    );
  }
})

export default App;
