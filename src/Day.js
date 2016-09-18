/**
 * Module for displaying a day's tasks.
 */
import React from 'react';
import TimeSlot from './TimeSlot'
import Utils from './Utils'

const START_TIME = Utils.START_TIME;
const END_TIME = Utils.END_TIME;

var Day = React.createClass({

  /**
   * @returns
   * {
   *   timeSlots: {
   *     9.5: {
   *       id: 0,
   *       taskName: 'Get started',
   *       slot: {
   *         startTime: '9.5',
   *         endTime: '10'
   *       }
   *     },
   *     ...
   *   }
   * }
   */
  getInitialState() {
    const timeSlots = {};
    let current = START_TIME;
    let id = 0;

    // create half hours slots based on START_TIME and END_TIME
    while(current < END_TIME) {
      timeSlots[current] = { 
        id: id++,
        taskName: "",
        slot: {
          startTime: current,
          endTime: current + 0.5
        },
      };
      current +=  0.5;
    }

    return {
      timeSlots: timeSlots,
    }
  },

  /**
   * Add a task - update the state accordingly
   * 
   * @param {String} name
   * @param {any} duration
   * @param {any} startTime
   */
  addTask(name, duration, startTime) {
    startTime = Number(startTime)
    duration = Number(duration)
    const endTime = startTime + duration

    let newState = JSON.parse(JSON.stringify(this.state))

    var current = startTime;
    while(current < endTime) {
      newState.timeSlots[current].taskName = name;
      current += 0.5;
    }
    this.setState(newState);
  },

  
  render() {

    const slotRows = [];
    for (let slot in this.state.timeSlots) {
      if (this.state.timeSlots.hasOwnProperty(slot)) {
        const timeSlot = this.state.timeSlots[slot];
        slotRows.push(<TimeSlot key={timeSlot.id} timeSlot={timeSlot} />)
      }
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className='time'> Time </th>
              <th className='task'> Tasks </th>
            </tr>
          </thead>
          <tbody>
            {slotRows}
          </tbody>
        </table>
      </div>
    )
  }
})

export default Day;
