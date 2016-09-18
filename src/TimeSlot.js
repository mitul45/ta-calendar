import React from 'react';
import Utils from './Utils';

var TimeSlot = React.createClass({
  
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
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td className='time-slot__task'> 
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
