import React, { Component } from 'react';
import TimeSlot from './TimeSlot'

const START_TIME = 9.5;
const END_TIME = 18;

var Day = React.createClass({

  /**
   * TimeSlot will call this function when it wants to create a task.
   * This function will eventually call setTask method of each timeslots to set tasks for that period.
   * @param {String} startSlotID - id of the slot from which a task will start.
   * @param {Number} duration - number of hours the task will take.
   * @param {String} name - task name
   */
  createTask(startSlotID, duration, name) {
    var slots = [];
    var endSlotID = startSlotID + duration * 2; // one hour is two slots.
    var current = startSlotID;
    while(current < endSlotID) {
      this.refs[current].setTask(name);
      current++;
    }
  },

  render() {
    const timeSlots = [];
    let current = START_TIME;
    let id = 0;
    var createTask = this.createTask; // timeSlot will call this function when user wants to add a task.

    // create half hours slots based on START_TIME and END_TIME
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

    // Each time slot is a row
    const rows = timeSlots.map(function(timeSlot) {
      return (<TimeSlot key={timeSlot.id} timeSlot={timeSlot} createTask={createTask} ref={timeSlot.id} />);
    })

    // Create a table for this day
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

export default Day;