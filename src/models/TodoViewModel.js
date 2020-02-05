import {observable, action} from 'mobx';

import {Todo} from './Todo';

class TodoViewModel {
  @observable todos = [];

  storage = null;

  constructor({ storage }) {
    this.storage = storage;
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
    if (!this.storage) return;

    const json = JSON.parse(this.storage.getItem('todos') || '[]');
    this.todos = json.map(todoJson => Todo.deserialize(todoJson));

    return this.todos;
  }

  save() {
    if (!this.storage) return;

    if (this.todos.filter(todo => !todo.isValid).length > 0) {
      return alert('Unable to save due to invalid todos');
    }

    const json = this.todos.map(todo => todo.serialize());
    this.storage.setItem('todos', JSON.stringify(json));
  }
}

export {TodoViewModel}
