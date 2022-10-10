import React, { Component } from 'react'

export default class Footer extends Component {

  handleShowAll = ()=>{
    this.props.ShowAllTask()
  }

  handleShowActive = ()=>{
    this.props.ShowActiveTask()
  }

  handleShowCompleted = ()=>{
    this.props.ShowCompletedTask()
  }

  handleClearCompleted = ()=>{
    this.props.ClearAllCompleted()
  }

  render() {

    const {tasks} = this.props
    const num_Task = tasks.length
    const num_doneTask = tasks.reduce((pre, task)=>{return pre+(task.done ? 1:0)}, 0)
    const num_undoneTask = num_Task - num_doneTask

    return (
      <footer className="todo-app__footer" id="todo-footer" style={{display:(tasks.length == 0) ? 'none': ''}}>
        <div className="todo-app__total">{num_undoneTask} left</div>
          <ul className="todo-app__view-buttons">
            <button onClick={this.handleShowAll}>All</button>
            <button onClick={this.handleShowActive}>Active</button>
            <button onClick={this.handleShowCompleted}>Completed</button>
          </ul>
        <div className="todo-app__clean">
          <button style={{display:(num_doneTask == 0) ? 'none': ''}} onClick={this.handleClearCompleted}>Clear completed</button>
        </div>
      </footer>
    )
  }
}
