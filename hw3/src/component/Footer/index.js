import React, { Component } from 'react'

export default class Footer extends Component {

  // 處理顯示所有 task
  handleShowAll = ()=>{
    this.props.ShowAllTask()
  }

  // 處理顯示未完成的 task
  handleShowActive = ()=>{
    this.props.ShowActiveTask()
  }

  // 處理顯示已完成的 task
  handleShowCompleted = ()=>{
    this.props.ShowCompletedTask()
  }

  // 處理清除所有已完成的 task
  handleClearCompleted = ()=>{
    this.props.ClearAllCompleted()
  }

  render() {

    const {tasks} = this.props
    const num_Task = tasks.length
    const num_doneTask = tasks.reduce((pre, task)=>{return pre+(task.done ? 1:0)}, 0)  // 計算 task.done = true 的 task 數量
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
