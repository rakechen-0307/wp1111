import React, { Component } from 'react'
import Header from '../Header'
import Input from '../Input'
import List from '../List'
import Footer from '../Footer'

export default class Main extends Component {

  state = {tasks:[]}

  show_completed = false

  // 新增一個 task
  AddTask = (task)=>{
    const {tasks} = this.state  // 取得現在的狀態
    const NewTasks = [...tasks,task]  // 將新的 task 加到原本 List 的最尾端
    this.setState({tasks:NewTasks})  // 將狀態設置成新的狀態
  }

  // 刪除一個 task
  DeleteTask = (id)=>{
    const {tasks} = this.state
    const NewTasks = tasks.filter((task)=>{  
      return task.id !== id  // 刪除 task.id = id 的那個 task
    })
    this.setState({tasks:NewTasks})
  }

  // 點選 checkbox 時該 task 的狀態變化
  UpdateTaskStatus = (id, done)=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.id === id){return {...task, done:done}}  // 將點選的 task.done 設為新的狀態
      else{return task}
    })
    this.setState({tasks:NewTasks})
  }

  // 顯示所有 task
  ShowAllTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      return {...task, shown:true}
    })
    this.setState({tasks:NewTasks})
    this.show_completed = false
  }

  // 顯示未完成的 task
  ShowActiveTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.done === true){return {...task, shown:false}}
      else{return {...task, shown:true}}
    })
    this.setState({tasks:NewTasks})
    this.show_completed = false
  }

  // 顯示已完成的 task
  ShowCompletedTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.done === true){return {...task, shown:true}}
      else{return {...task, shown:false}}
    })
    this.setState({tasks:NewTasks})
    this.show_completed = true
  }

  // 清除所有已完成的 task
  ClearAllCompleted = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.filter((task)=>{
      return task.done === false
    })
    this.setState({tasks:NewTasks})
  }

  render() {
    const {tasks} = this.state
    return (
      <div id='root' className='todo-app__root'>
        <Header></Header>
        <div className='todo-app__main'>
          <Input AddTask={this.AddTask} show_completed={this.show_completed}></Input>
          <List tasks={tasks} UpdateTaskStatus={this.UpdateTaskStatus} DeleteTask={this.DeleteTask}></List>
        </div>
        <Footer tasks={tasks} ShowAllTask={this.ShowAllTask} ShowActiveTask={this.ShowActiveTask} ShowCompletedTask={this.ShowCompletedTask} ClearAllCompleted={this.ClearAllCompleted}></Footer>
      </div>
    )
  }
}
