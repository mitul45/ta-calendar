import React from 'react';
import Utils from './Utils';
import ReactDOM from 'react-dom';

var TimeSlot = React.createClass({
  
  getInitialState() {
    return {
      taskName: this.props.timeSlot.taskName,
      editable: false,
    }
  },

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
   * Mark this slot as editable, and show input field.
   */
  handleDoubleClick() {
    this.setState({
      editable: true,
      newTask: this.props.timeSlot.taskName,
    })
  },

  /**
   * Keep view and state in sync
   */
  handleTextChange(event) {
    this.setState({
      newTask: event.target.value,
    })
  },

  /**
   * Save task on enter and restore to previous on esc.
   */
  handleKeyDown(event) {
    if (event.keyCode === 13 ) {
      this.createTask(this.state.newTask);
    } else if (event.keyCode === 27) {
      this.setState({
        editable: false,
      })
    }
  },

  /**
   * create task in parent scope.
   * @param {any} taskName
   */
  createTask(taskName) {
    this.props.createTask(this.props.timeSlot, taskName);
    this.setState({
      editable: false,
    })
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
            { this.state.editable 
              ? <input
                  autoFocus
                  className='time-slot__task__name--input'
                  type='text' 
                  value={this.state.newTask} 
                  onKeyDown={this.handleKeyDown} 
                  onChange={this.handleTextChange}
                />
              : this.props.timeSlot.taskName
            }
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
