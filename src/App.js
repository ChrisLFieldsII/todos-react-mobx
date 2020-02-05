import React from 'react';

import TodoViewModel from './models/TodoViewModel';
import TodoView from './screens/TodoView';

function App() {
  return (
    <TodoView model={new TodoViewModel()} />
  );
}

export default App;
