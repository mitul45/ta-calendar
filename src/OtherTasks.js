import React from 'react';
import Utils from './Utils'

var OtherTasks = React.createClass({

  getInitialState() {
    // if browser has some stored state, restore that
    let previousState = this.deserializeState();
    if (previousState) {
      return previousState;
    }

    return {
      taskList: [],
      newTask: '',
    }
  },

  /**
   * Set state in localStorage
   * @param {Object} state
   */
  serializeState(state) {
    localStorage.setItem(Utils.otherTaskStorageKey, JSON.stringify(state));
  },

  /**
   * Get state from browser's local storage, if it exists
   */
  deserializeState() {
    return JSON.parse(localStorage.getItem(Utils.otherTaskStorageKey));
  },

  createTask(newTask) {
    let taskList = this.state.taskList;
    taskList.push(newTask);
    this.setState({
      taskList: taskList,
      newTask: '',
    })

    this.serializeState(this.state)
  },

  handleKeyDown(event) {
    if (event.keyCode == 13 ) {
      return this.createTask(this.state.newTask);
    }
  },

  handleChange(event) {
    this.setState({
      newTask: event.target.value,
    })
  },

  removeItem(taskToRemove) {
    let taskList = JSON.parse(JSON.stringify(this.state.taskList));
    let newTaskList = taskList.filter(function(task) {
      return task !== taskToRemove;
    })

    this.setState({
      taskList: newTaskList,
    })

    this.serializeState(this.state);
  },

  render () {
    let tasks = [];
    const that = this;
    this.state.taskList.forEach(function(task) {
      tasks.push(
        <li className='other-tasks__task-list__item'>
          {task}&nbsp;
          (<a href='#'
            onClick={() => that.removeItem(task)}
          >done</a>)
        </li>
      );
    })

    return (
      <div className='other-tasks right'>
        <input
          className='other-tasks__input' 
          type='text' 
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown} 
          value={this.state.newTask} 
          placeholder='Sometime in future...'
        />
        <ol className='other-tasks__task-list'>
          {tasks}
        </ol>
      </div>
    );
  }
})

export default OtherTasks;
