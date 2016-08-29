import React from 'react';

var TimeSlot = React.createClass({
  
  /**
   * Convert a JS number to human readable time.
   * 10.5 -> "10:30"
   * @param {Number} time
   * @returns {String} Human readable time
   */
  formatTime(time) {
    if (Number.isInteger(time))
      return time + ":00";
    else
      return ((time - 0.5) + ":30");
  },

  /**
   * Format a slot object to human readable time. 
   * @param {Object} slot
   * @returns {String}
   */
  formatSlot(slot) {
    return this.formatTime(slot.startTime) + ' – ' + this.formatTime(slot.endTime);
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
