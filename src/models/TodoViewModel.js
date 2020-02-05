import {observable, action} from 'mobx';

import {Todo} from './Todo';

class TodoViewModel {
  @observable todos = [];

  constructor() {
    this.load();
  }

  @action
  add() {
    const todo = new Todo();
    this.todos.push(todo);
    return todo;
  }

  @action
  remove(todo) {
    const index = this.todos.indexOf(todo);
    if (index === -1) return;
    return this.todos.splice(index, 1)[0];
  }

  @action
  load() {
    if (!window.localStorage) return;

    const json = JSON.parse(window.localStorage.getItem('todos') || '[]');
    this.todos = json.map(todoJson => Todo.deserialize(todoJson));

    return this.todos;
  }

  @action
  save() {
    if (!window.localStorage) return;

    if (this.todos.filter(todo => !todo.isValid).length > 0) {
      return alert('Unable to save due to invalid todos');
    }

    const json = this.todos.map(todo => todo.serialize());
    window.localStorage.setItem('todos', JSON.stringify(json));
  }
}

const todoViewModel = new TodoViewModel();

export {todoViewModel, TodoViewModel}
