import React from 'react';
import Utils from './Utils';

var TimeSlot = React.createClass({
  
  getInitialState() {
    return {
      done: false,
    }
  },

  /**
   * Format a slot object to human readable time. 
   * @param {Object} slot
   * @returns {String}
   */
  formatSlot(slot) {
    return Utils.formatTime(slot.startTime) + ' – ' + Utils.formatTime(slot.endTime);
  },

  deleteTask() {
    this.props.deleteTask(this.props.timeSlot);
    
    // reset done
    this.setState({
      done: false,
    })
  },

  handleChange(event) {
    let newState = {};
    newState.done = event.target.checked;
    this.setState(newState);
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td className={this.state.done? 'time-slot__task time-slot__task--done' : 'time-slot__task'}> 
          { this.props.timeSlot.taskName } 
          { this.props.timeSlot.taskName !== '' ? 
            <button className='time-slot__remove-btn' type='button' onClick={this.deleteTask}> Remove </button>
            : null
          }
        </td>
        <td>
          <input type="checkbox"
            checked={this.state.done}
            onChange={this.handleChange}
          />
        </td>
      </tr>
    )
  }
})

export default TimeSlot;
