import React from 'react';
import TimeSlot from './TimeSlot'

const START_TIME = 9.5;
const END_TIME = 18;

var Day = React.createClass({

  createTask(name, duration, startTime) {
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
