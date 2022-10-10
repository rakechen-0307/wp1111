import React, { Component } from 'react'

export default class Task extends Component {

  // 處理點選 checkbox 時該 task 的狀態變化
  handleTaskFinished = (id)=>{
    return (event)=>{
      this.props.UpdateTaskStatus(id, event.target.checked)
    }
  }

  // 處理刪除一個 task
  handleDelete = (id)=>{
    this.props.DeleteTask(id)
  }

  render() {
    const {id, name, done, shown} = this.props
    return (
      <li className='todo-app__item' style={{display:shown ? '': 'none'}}>
        <div className='todo-app__checkbox'>
            <input id={id} type='checkbox' defaultChecked={done} onChange={this.handleTaskFinished(id)}></input>
            <label htmlFor={id}></label>
        </div>
        <h1 className='todo-app__item-detail' style={{opacity:done ? 0.5:1, textDecoration:done ? 'line-through':'none'}}>{name}</h1>
        <img onClick={()=>this.handleDelete(id)} src='./x.png' className='todo-app__item-x' ></img>
      </li>
    )
  }
}
