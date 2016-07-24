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
    return this.formatTime(slot.startTime) + ' to ' + this.formatTime(slot.endTime);
  },

  getInitialState() {
    return {
      showInputFields: false,
      taskName: null
    }
  },

  setTask(task) {
    this.setState({
      taskName: task
    })
  },

  createTask() {
    // if input fields are already shown, create a new task.
    if (this.state.showInputFields) {
      this.props.createTask(this.props.timeSlot.id, 2, this.state.taskName)
      this.setState({
        showInputFields: false
      })
    } else {
      // show input boxes
      this.setState({
        showInputFields: true
      })
    }
  },

  handleTaskNameChange(event) {
    this.setState({
      taskName: event.target.value
    })
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td> { this.state.taskName } </td>
        <td> <span>
              { this.state.showInputFields
                ? <input 
                    type='text'
                    placeholder='What do you want to do?'
                    value={this.state.taskName}
                    onChange={this.handleTaskNameChange}
                  /> 
                : null }
                <button onClick={this.createTask}> Add Task </button>
              </span>
        </td>
      </tr>
    )
  }
})

var Day = React.createClass({

  // startTime, duration is in hours.
  createTask(startTime, duration, name) {
    var slots = [];
    var endTime = startTime + duration * 2;
    var current = startTime;
    while(current < endTime) {
      this.refs[current].setTask(name);
      current++;
    }
  },

  render() {
    const timeSlots = [];
    let current = START_TIME;
    let id = 1;
    var createTask = this.createTask;
    while(current < END_TIME) {
      timeSlots.push({ 
        id: id++,
        slot: {
          startTime: current,
          endTime: current + 0.5
        }
      });
      current = current + 0.5;
    }

    const rows = timeSlots.map(function(timeSlot) {
      return (<TimeSlot key={timeSlot.id} timeSlot={timeSlot} createTask={createTask} ref={timeSlot.id} />);
    })

    return (
      <div>
        <h2 className='title'> {this.props.title} </h2>
        <table>
          <thead>
            <tr>
              <th> Time </th>
              <th> Tasks </th>
              <th> Add Revision </th>
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
        <Day title='Today'/>
      </div>
    );
  }
})

export default App;
