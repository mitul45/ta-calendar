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

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td> { this.props.timeSlot.taskName } </td>
      </tr>
    )
  }
})

export default TimeSlot;
