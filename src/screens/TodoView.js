import React from 'react';
import {observer} from 'mobx-react';

import {ViewModelContext} from '../contexts';

@observer
class TodoView extends React.Component {
  static contextType = ViewModelContext;

  render() {
    const model = this.context.todoViewModel;

    return (
      <div style={{ padding: 20 }}>
        <h1>React & MobX Todos</h1>
        <div style={{ margin: 10 }}>
          <button style={{ margin: 10 }} onClick={() => model.add()}>New Todo</button>
          <button style={{ margin: 10 }} onClick={() => model.load()}>Reload Todos</button>
          <button style={{ margin: 10 }} onClick={() => model.save()}>Save Todos</button>
        </div>
        {model.todos.map((todo, index) => <TodoDetail key={todo.id} model={model} todo={todo} index={index} />)}
        <br />
        <TodosMeta />
      </div>
    );
  }
}

@observer
class TodoDetail extends React.Component {
  render() {
    const { model, todo, index } = this.props;

    return (
      <div>
        <strong style={{ color: todo.isDone ? 'green' : 'red' }}>#{index + 1} |</strong>

        <input style={{ margin: 5 }} type="checkbox" checked={todo.isDone} onChange={e => todo.isDone = e.target.checked} />
        <input size={200} style={{ margin: 5, padding: 5 }} type="text" value={todo.text} onChange={e => todo.text = e.target.value} />
        <button style={{ margin: 5 }} onClick={() => model.remove(todo)}>Delete</button>
      </div>
    );
  }
}

@observer
class TodosMeta extends React.Component {
  static contextType = ViewModelContext;
  
  render() {
    const {todoViewModel} = this.context;
    const totalTodos = todoViewModel.todos.length;
    const numValidTodos = todoViewModel.todos.filter(todo => todo.isValid).length;
    const numCompleteTodos = todoViewModel.todos.filter(todo => todo.isDone).length;
  
    return (
      <div style={{ border: '1px solid black', padding: 10 }}>
        <h2>Todos Metadata</h2>
        <p>Valid #: {numValidTodos}</p>
        <p>Invalid #: {totalTodos - numValidTodos}</p>
        <p>Completed #: {numCompleteTodos}</p>
        <p>Incomplete #: {totalTodos - numCompleteTodos}</p>
      </div>
    );
  }
}

export default TodoView;
