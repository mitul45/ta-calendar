import React from 'react';

const START_TIME = 9.5;
const END_TIME = 18;

var TaskCreator = React.createClass({
  
  getInitialState() {
    return {
      startTime: START_TIME,
      taskName: "",
      taskDuration: 0.5,
    }
  },


  /**
   * TimeSlot will call this function when it wants to create a task.
   * This function will eventually call setTask method of each timeslots to set tasks for that period.
   * @param {String} startSlotID - id of the slot from which a task will start.
   * @param {Number} duration - number of hours the task will take.
   * @param {String} name - task name
   */
  createTask(startSlotID, duration, name) {
    console.log('task created');
    //var endSlotID = startSlotID + (duration * 2); // one hour is two slots.
    //var current = startSlotID;
    //while(current < endSlotID) {
      //this.refs[current].setTask(name);
      //current++;
    //}
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

  handleStartTimeChange(event) {
    this.setState({
      startTime: event.target.value
    })
  },

  formatTime(time) {
    if (Number.isInteger(time))
      return time + ":00";
    else
      return ((time - 0.5) + ":30");
  },


  render() {
    const startTimes = [];

    for (let i = START_TIME; i < END_TIME; i += 0.5) {
      startTimes.push(<option value={i}> { this.formatTime(i) } </option>);
    }
    
    return (
      <form className='task-creator'>
        <div>
          <input 
            type='text'
            placeholder='task...'
            value={this.state.taskName}
            onChange={this.handleTaskNameChange}
          />
        </div>
        <div>
          <select value={this.state.taskDuration} onChange={this.handleTaskDurationChange}>
            <option value="0.5"> 30 minutes </option>
            <option value="1"> 1 hour </option>
            <option value="1.5"> 1 hour, 30 minutes </option>
            <option value="2"> 2 hours </option>
            <option value="2.5"> 2 hours, 30 minutes </option>
            <option value="3"> 3 hours </option>
          </select>
        </div>
        <div>
          <select value={this.state.startTime} onChange={this.handleStartTimeChange}>
            { startTimes }
          </select>
        </div>
        <div>
          <button onClick={this.handleTaskCreation}> Add </button>
        </div>
      </form>
    )
  }
})

export default TaskCreator;
