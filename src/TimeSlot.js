import React, { Component } from 'react';

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
      return (time - 0.5 + ":30");
  },

  /**
   * Format a slot object to human readable time. 
   * @param {Object} slot
   * @returns {String}
   */
  formatSlot(slot) {
    return this.formatTime(slot.startTime) + ' to ' + this.formatTime(slot.endTime);
  },

  getInitialState() {
    return {
      showInputFields: false,
      taskName: null
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

  /**
   * Create a task when user clicks on "Add Task" button
   * Basically call parent (Day's) method which will call setTask method for each applicable timeSlots.
   * 
   * Flow: 
   * 1. Add task of any TimeSlot -> Call parent CreateTask -> Call each TimeSlot's setTask
   */
  createTask() {
    // if input fields are already shown, create a new task.
    if (this.state.showInputFields) {
      this.props.createTask(this.props.timeSlot.id, 2, this.state.taskName)
      this.setState({
        showInputFields: false
      })
    } else {
      // show input boxes
      this.setState({
        showInputFields: true
      })
    }
  },

  handleTaskNameChange(event) {
    this.setState({
      taskName: event.target.value
    })
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td> { this.state.taskName } </td>
        <td> <span>
              { this.state.showInputFields
                ? <input 
                    type='text'
                    placeholder='What do you want to do?'
                    value={this.state.taskName}
                    onChange={this.handleTaskNameChange}
                  /> 
                : null }
                <button onClick={this.createTask}> Add Task </button>
              </span>
        </td>
      </tr>
    )
  }
})

export default TimeSlot;