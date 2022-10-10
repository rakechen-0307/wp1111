import React, { Component } from 'react'

export default class Task extends Component {

  handleTaskFinished = (id)=>{
    return (event)=>{
      this.props.UpdateTaskStatus(id, event.target.checked)
    }
  }

  handleDelete = (id)=>{
    this.props.DeleteTask(id)
  }

  render() {
    const {id, name, done} = this.props
    return (
      <li className='todo-app__item'>
        <div className='todo-app__checkbox'>
            <input id={id} type='checkbox' defaultChecked={done} onChange={this.handleTaskFinished(id)}></input>
            <label htmlFor={id}></label>
        </div>
        <h1 className='todo-app__item-detail'>{name}</h1>
        <img onClick={()=> this.handleDelete(id) } src='./x.png' className='todo-app__item-x' ></img>
      </li>
    )
  }
}
