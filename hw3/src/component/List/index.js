import React, { Component } from 'react'
import Task from '../Task'

export default class List extends Component {
  render() {
    const {tasks, UpdateTaskStatus, DeleteTask} = this.props
    return (
      <ul className='todo-app__list' id='todo-list'>
        {
          tasks.map(task =>{
            return <Task key={task.id} {...task} UpdateTaskStatus={UpdateTaskStatus} DeleteTask={DeleteTask}></Task>
          })
        }
      </ul>
    )
  }
}
