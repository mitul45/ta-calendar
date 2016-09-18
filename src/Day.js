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
    const timeSlots = [];
    let id = 0;

    // create half hours slots based on START_TIME and END_TIME
    for(let current = Utils.START_TIME; current < Utils.END_TIME; current += 0.5) {
      timeSlots.push({ 
        id: id++,
        taskName: "",
        slot: {
          startTime: current,
          endTime: current + 0.5
        },
      });
    }
    return {
      timeSlots,
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
    startTime = Number(startTime);
    duration = Number(duration);
    const endTime = startTime + duration;

    // #deepcopy
    let newSlots = JSON.parse(JSON.stringify(this.state.timeSlots));

    newSlots.forEach(function (timeSlot) {
      if (timeSlot.slot.startTime >= startTime  && timeSlot.slot.endTime <= endTime) {
        timeSlot.taskName = name;
      }
    })
    this.setState({
      timeSlots: newSlots
    });
  },

  
  render() {

    const slotRows = [];
    this.state.timeSlots.forEach(function (timeSlot) {
        slotRows.push(<TimeSlot key={timeSlot.id} timeSlot={timeSlot} />)
    })

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
