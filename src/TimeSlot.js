import React from 'react';
import Utils from './Utils';

var TimeSlot = React.createClass({
  
  /**
   * Format a slot object to human readable time. 
   * @param {Object} slot
   * @returns {String}
   */
  formatSlot(slot) {
    return Utils.formatTime(slot.startTime);
  },

  deleteTask() {
    this.props.deleteTask(this.props.timeSlot);
  },

  handleCheckboxChange(event) {
    this.props.completeTask(this.props.timeSlot, event.target.checked);
  },

  /**
   * Ask for input and create task
   */
  handleDoubleClick() {
    const taskName = prompt('What do you want to achieve?', this.props.timeSlot.taskName);
    if(taskName)
      this.createTask(taskName);
  },

  /**
   * create task in parent scope.
   * @param {any} taskName
   */
  createTask(taskName) {
    this.props.createTask(this.props.timeSlot, taskName);
  },

  render() {
    return (
      <tr className={this.props.timeSlot.active? 'time-slot--active': ''}>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td 
          className={this.props.timeSlot.done ? 'time-slot__task time-slot__task--done' : 'time-slot__task'}
          onDoubleClick={this.handleDoubleClick}
        > 

          <input type="checkbox"
            checked={this.props.timeSlot.done}
            onChange={this.handleCheckboxChange}
          />
          
          <span className='time-slot__task__name'>
            { this.props.timeSlot.taskName }
          </span>

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
