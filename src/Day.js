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
   *     active: false,
   *     ...
   *   }
   * }
   */
  getInitialState() {

    // if browser has some stored state, that's what we look for :D
    let previousState = this.deserializeState();
    if (previousState) {
      return previousState;
    }

    // otherwise create empty day with no tasks.
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
        active: false,
      });
    }
    return {
      timeSlots,
    }
  },

  /**
   * Set state in localStorage
   * @param {Object} state
   */
  serializeState(state) {
    localStorage.setItem(Utils.localStorageKey, JSON.stringify(state));
  },

  /**
   * Get state from browser's local storage, if it exists
   */
  deserializeState() {
    return JSON.parse(localStorage.getItem(Utils.localStorageKey));
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

    // update localStorage too
    this.serializeState({ timeSlots: newSlots })
  },

  deleteTask(timeSlot) {
    // #deepcopy
    let newSlots = JSON.parse(JSON.stringify(this.state.timeSlots));

    newSlots.forEach(function (slot) {
      if (slot.id === timeSlot.id) {
        slot.taskName = "";
      }
    })

    this.setState({
      timeSlots: newSlots
    });

    // update localStorage too
    this.serializeState({ timeSlots: newSlots })
  },

  /**
   * Get current time in required format
   * 13:30 -> 13.5
   */
  getCurrentTime() {
    const date = new Date();
    return date.getHours() + (date.getMinutes() / 60);
  },

  updateActiveSlot() {
    const current = this.getCurrentTime();

    // #deepcopy
    let newSlots = JSON.parse(JSON.stringify(this.state.timeSlots));
    newSlots.forEach(function (slot) {
      if (slot.slot.startTime <= current && current < slot.slot.endTime) {
        slot.active = true;
      } else {
        slot.active = false;
      }
    })

    this.setState({
      timeSlots: newSlots
    });
  },
  
  componentDidMount() {
    setInterval(this.updateActiveSlot, 1000);
  },

  render() {

    let that = this;
    const slotRows = [];
    this.state.timeSlots.forEach(function (timeSlot) {
        slotRows.push(<TimeSlot key={timeSlot.id} timeSlot={timeSlot} deleteTask={that.deleteTask} />)
    })

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className='time'> Time </th>
              <th className='task'> Task </th>
              <th className='done'> Done </th>
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
