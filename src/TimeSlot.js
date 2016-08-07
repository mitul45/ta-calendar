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

  getInitialState() {
    return {
      taskName: "",
    }
  },

  /**
   * Set task for this particular time slot.
   * This will be called from Day (parent). 
   * @param {String} task: task name
   */
  setTask(task) {
    this.setState({
      taskName: task
    })
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td> { this.state.taskName } </td>
      </tr>
    )
  }
})

export default TimeSlot;
