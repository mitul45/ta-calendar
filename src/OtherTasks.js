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
      taskList: [
        'your upcoming tasks go here',
        'try marking this one as done!'
      ],
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

  /**
   * Add a task, and update localStorage.
   * @param {String} newTask
   */
  createTask(newTask) {
    let taskList = this.state.taskList;
    taskList.push(newTask);
    const newState = {
      taskList: taskList,
      newTask: '',
    };

    this.setState(newState);
    this.serializeState(newState);
  },

  /**
   * Save task on enter and empty the input box on esc.
   * @param {any} event
   */
  handleKeyDown(event) {
    if (event.keyCode === 13 ) {
      return this.createTask(this.state.newTask);
    } else if (event.keyCode === 27) {
      this.setState({
        newTask: '',
      })
    }
  },

  /**
   * Keep state and view in sync
   */
  handleChange(event) {
    this.setState({
      newTask: event.target.value,
    })
  },

  /**
   * Remove item from tasklist, and update localStorage.
   * 
   * @param {String} taskToRemove
   */
  removeTask(taskToRemove) {
    let taskList = JSON.parse(JSON.stringify(this.state.taskList));
    let newTaskList = taskList.filter(function(task) {
      return task !== taskToRemove;
    })

    const newState = {
      taskList: newTaskList,
    };

    this.setState(newState);
    this.serializeState(newState);
  },

  render () {
    let tasks = [];
    const that = this;
    this.state.taskList.forEach(function(task) {
      tasks.push(
        <li className='other-tasks__task-list__item'>
          {task}&nbsp;
          (<a href='#'
            onClick={() => that.removeTask(task)}
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
