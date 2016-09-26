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
    this.props.completeTask(this.props.timeSlot, event.target.checked);
  },

  render() {
    return (
      <tr className={this.props.timeSlot.active? 'time-slot--active': ''}>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td className={this.props.timeSlot.done? 'time-slot__task time-slot__task--done' : 'time-slot__task'}> 

          <input type="checkbox"
            checked={this.props.timeSlot.done}
            onChange={this.handleChange}
          />

          &nbsp;&nbsp;&nbsp;

          { this.props.timeSlot.taskName } 
          { this.props.timeSlot.taskName !== '' ? 
            <button className='time-slot__remove-btn' type='button' onClick={this.deleteTask}> Remove </button>
            : null
          }
        </td>
      </tr>
    )
  }
})

export default TimeSlot;
