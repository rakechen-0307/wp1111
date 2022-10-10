import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">3 left</div>
          <ul className="todo-app__view-buttons">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </ul>
        <div className="todo-app__clean">
          <button>Clear completed</button>
        </div>
      </footer>
    )
  }
}
