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
    return this.formatTime(slot.startTime) + ' to ' + this.formatTime(slot.endTime);
  },

  getInitialState() {
    return {
      showInputFields: false,
      taskName: ""
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
  handleTaskCreation() {
    // if input fields are already shown, create a new task.
    if (this.state.showInputFields) {
      this.props.createTask(this.props.timeSlot.id, Number(this.state.taskDuration), this.state.taskName)
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

  handleTaskDurationChange(event) {
    this.setState({
      taskDuration: event.target.value
    })
  },

  render() {
    return (
      <tr>
        <td> { this.formatSlot(this.props.timeSlot.slot) } </td>
        <td> { this.state.taskName } </td>
        <td> <span>
              { this.state.showInputFields
                ? <span>
                    <input 
                      type='text'
                      placeholder='What do you want to do?'
                      value={this.state.taskName}
                      onChange={this.handleTaskNameChange}
                    />
                    <select value={this.state.taskDuration} onChange={this.handleTaskDurationChange}>
                      <option value="0.5"> 30 minutes </option>
                      <option value="1"> 1 hour </option>
                      <option value="1.5"> 1 hour, 30 minutes </option>
                      <option value="2"> 2 hours </option>
                      <option value="2.5"> 2 hours, 30 minutes </option>
                      <option value="3"> 3 hours </option>
                    </select>
                      
                  </span>
                : null }
                <button onClick={this.handleTaskCreation}> Add Task </button>
              </span>
        </td>
      </tr>
    )
  }
})

export default TimeSlot;